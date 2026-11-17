import fixtures from '../data/demo-pairs.json';
import { authorSubjects } from './study';

const mask = '⟪ACADEMIC_GAP⟫';
export type Pair = (typeof fixtures)[number];
export const basePairs: Pair[] = fixtures;
const imported = new Map<string, Pair>();

export function inventory() {
  return [...basePairs, ...imported.values()];
}

export function sourceTasks() {
  const sources = new Map(inventory().map(pair => [pair.item_id, pair]));
  return [...sources.values()].map(pair => ({
    schema_version: 'apt-source-v1',
    item_id: pair.item_id,
    domain: pair.domain,
    author: pair.author,
    level: pair.level,
    task: pair.task,
    context_before: pair.context_before,
    context_after: pair.context_after,
    real_text: pair.a,
    masked_context: pair.level === 'passage' ? null : pair.context_before + mask + pair.context_after,
  }));
}

export function sourceDownload() {
  return new Blob([sourceTasks().map(row => JSON.stringify(row)).join('\n') + '\n'], { type: 'application/x-ndjson' });
}

function text(row: Record<string, unknown>, field: string, required = true) {
  const value = row[field] ?? '';
  if (typeof value !== 'string' || (required && !value.trim())) throw new Error(`Invalid ${field}.`);
  return value;
}

export async function importFile(file: File) {
  if (file.size > 1_500_000) throw new Error('File exceeds 1.5 MB.');
  const content = new TextDecoder('utf-8', { fatal: true }).decode(await file.arrayBuffer());
  const lines = content.split(/\r?\n/).map((line, index) => ({ line, index })).filter(row => row.line.trim());
  if (!lines.length || lines.length > 1000) throw new Error('Provide 1 to 1,000 data rows.');

  const sources = new Map(inventory().map(pair => [pair.item_id, pair]));
  const pending = new Map<string, Pair>();
  let existing = 0;
  for (const { line, index } of lines) {
    try {
      const row = JSON.parse(line) as Record<string, unknown>;
      if (!row || typeof row !== 'object' || Array.isArray(row)) throw new Error('Expected a JSON object.');
      const method = text(row, 'method').trim();
      const model = text(row, 'model', false).trim();
      const run = text(row, 'run_id', false).trim();
      if (method.length > 120 || run.length > 120 || model.length > 160) throw new Error('Method, model or run ID is too long.');
      const hasPair = 'a' in row || 'b' in row || 'real' in row;
      if (hasPair && (('generated_text' in row) || (row.real !== 'A' && row.real !== 'B'))) {
        throw new Error('Supply a/b with real set to A or B, or generated_text.');
      }
      const real = hasPair ? text(row, row.real === 'A' ? 'a' : 'b') : '';
      const candidate = hasPair ? text(row, row.real === 'A' ? 'b' : 'a') : text(row, 'generated_text');
      let source: Pair;
      if ('item_id' in row) {
        const prior = sources.get(text(row, 'item_id'));
        if (!prior) throw new Error('Unknown item_id. Copy it from the export.');
        if (hasPair && prior.a !== real) throw new Error('The authentic side does not match the exported source.');
        for (const field of ['domain', 'author', 'level', 'task', 'context_before', 'context_after'] as const) {
          if (field in row && row[field] !== prior[field]) throw new Error(`${field} does not match the exported task.`);
        }
        source = prior;
      } else {
        if (!hasPair) throw new Error('item_id is required for generated_text.');
        const author = text(row, 'author');
        const domain = text(row, 'domain');
        if (!authorSubjects.some(subject => subject.name === author && subject.domain === domain)) {
          throw new Error('Choose an author and domain from the catalogue.');
        }
        const level = text(row, 'level');
        if (!['sentence', 'paragraph', 'passage'].includes(level)) throw new Error('Invalid level.');
        const task = text(row, 'task', level === 'passage');
        const context_before = text(row, 'context_before', false);
        const context_after = text(row, 'context_after', false);
        const context = context_before + context_after;
        if (level === 'passage' ? !!context : !context.trim()) throw new Error('Supply shared context only for infilling tasks.');
        if ([task, context, real].some(value => value.includes(mask))) throw new Error('Remove the mask from display fields.');
        const item_id = 'src-' + await hash([author, domain, level, task, context_before, context_after, real]);
        source = { id: item_id, item_id, author, domain, level, task, context_before, context_after, a: real, b: '', real: 'A', baseline: method };
      }
      if (candidate.includes(mask) || source.a.trim() === candidate.trim()) throw new Error('Provide different candidates without the mask.');
      if (source.context_before.length + source.context_after.length + Math.max(source.a.length, candidate.length) > 24000) {
        throw new Error('A reconstructed text exceeds 24,000 characters.');
      }
      const id = 'imp-' + await hash([source.item_id, method, model, run]);
      const prior = imported.get(id) || pending.get(id);
      if (prior) {
        if (prior.b !== candidate) throw new Error('This run already contains different text. Use a new run_id.');
        existing += 1;
        continue;
      }
      const pair = { ...source, id, real: 'A', b: candidate, baseline: method };
      sources.set(pair.item_id, pair);
      pending.set(id, pair);
    } catch (error) {
      throw new Error(`Line ${index + 1}: ${(error as Error).message}`);
    }
  }
  for (const [id, pair] of pending) imported.set(id, pair);
  return { imported: pending.size, existing };
}

async function hash(value: string[]) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(value)));
  return [...new Uint8Array(bytes)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}
