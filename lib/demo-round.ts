import materials from '../data/scholar-materials.json';
import { inventory, type Pair } from './demo-corpus';
import { displayText } from './passages';
import { drawRound, sampleEvidence, samplingPolicy } from './sampling';
import { validateDimensions } from './dimensions';
import { authorSubjects, domains, validSubject } from './study';

export type Profile = {
  name?: string;
  domain: string;
  primary: string;
  secondary: string;
  author: string;
  authors: string[];
  researchArea: string;
  careerStage: string;
  role: string;
  familiarity: number;
  consent: boolean;
};

type Status = 'reading' | 'judgment' | 'evidence' | 'complete';
type ReadingReceipt = { openedAt?: number; completedAt?: number };
type Item = { pair: Pair; flip: boolean };
type Answer = { pair_id: string; choice: 'A' | 'B'; confidence: number; active_ms: number };
type Session = {
  id: string;
  profile: Profile & {reading: {records: Record<string, ReadingReceipt>}};
  status: Status;
  items: Map<string, Item>;
  answers: Map<string, Answer>;
  evidence: Map<string, {pair_id: string; payload: string}>;
  selected: string[];
  events: Map<string, unknown[]>;
};

let round: Session | undefined;
const minimumSeconds = 8;
const materialByAuthor = new Map(materials.map(material => [material.name, material]));

function display({ pair, flip }: Item) {
  return {
    id: pair.id, author: pair.author, domain: pair.domain, task: pair.task, level: pair.level,
    a: flip ? pair.b : pair.a, b: flip ? pair.a : pair.b,
    contextBefore: pair.context_before, contextAfter: pair.context_after,
  };
}

function authenticatedRound() {
  if (!round) throw new Error('请先创建标注任务');
  return round;
}

export function getCatalogue() {
  const pairs = inventory();
  return {
    domains, total: pairs.length, ratio: samplingPolicy.ratio,
    authors: authorSubjects.filter(a => pairs.some(pair => pair.author === a.name)).map(a => {
      const pool = pairs.filter(pair => pair.author === a.name);
      return { name: a.name, domain: a.domain, total: pool.length, maxCount: pool.length, methodCount: new Set(pool.map(p => p.baseline)).size };
    }),
  };
}

export function getPair(id: string) {
  const session = authenticatedRound();
  const item = session.items.get(id);
  if (!item || session.status === 'reading') throw new Error('题目不存在');
  return display(item);
}

export function getRound() {
  const session = authenticatedRound();
  const items = session.status === 'reading' ? [] : [...session.items.values()].map(({pair}) => ({id: pair.id, author: pair.author}));
  return {
    id: session.id, profile: session.profile, status: session.status, items,
    answers: [...session.answers.values()], evidence: [...session.evidence.values()], selected: session.selected,
  };
}

// The copied UI calls the same actions as the hosted platform.
export async function api(action: string, data: any = {}) {
  if (action === 'reset') {
    round = undefined;
    return { ok: true };
  }

  if (action === 'start') {
    const { profile: submitted, count } = data;
    if (!submitted?.consent || !['general', 'basic', 'full'].includes(submitted.role)) throw new Error('请完成标注设置并同意数据记录说明');
    const profile = { ...submitted, primary: submitted.primary ?? '', secondary: submitted.secondary ?? '', familiarity: submitted.familiarity ?? 0 };
    if (profile.role !== 'general' && !validSubject(profile.primary, profile.secondary)) throw new Error('请选择专业方向');
    if (profile.role !== 'general' && (!Number.isInteger(profile.familiarity) || profile.familiarity < 0 || profile.familiarity > 5)) throw new Error('请选择熟悉程度');
    const pool = inventory().filter(pair => pair.domain === profile.domain && profile.authors.includes(pair.author));
    if (!Number.isInteger(count) || count < 1 || count > pool.length) throw new Error('题量超出所选学者题库范围');

    // A three-item demo uses one of each task; imported variants take precedence.
    const preferred = ['passage', 'paragraph', 'sentence'].flatMap(level => {
      const choices = pool.filter(pair => pair.level === level && pair.id.startsWith('imp-'));
      return choices.length ? [choices.at(-1)!] : [];
    });
    const ids = drawRound(pool, count);
    for (const candidate of preferred) {
      const index = ids.findIndex(id => pool.find(pair => pair.id === id)?.level === candidate.level);
      if (index !== -1 && !ids.includes(candidate.id)) ids[index] = candidate.id;
    }
    const items = new Map(ids.map(id => [id, { pair: pool.find(pair => pair.id === id)!, flip: Math.random() < .5 }]));
    round = {
      id: crypto.randomUUID(),
      profile: { ...profile, reading: { records: {} } },
      status: profile.role === 'general' ? 'judgment' : 'reading',
      items, answers: new Map(), evidence: new Map(), selected: [], events: new Map(),
    };
    return { id: round.id };
  }

  const session = authenticatedRound();
  if (action === 'readOpen' || action === 'readDone' || action === 'finishReading') {
    if (session.status !== 'reading') throw new Error('当前不在资料阅读阶段');
    const records = session.profile.reading.records;
    if (action === 'finishReading') {
      if (!session.profile.authors.every(author => records[author]?.completedAt)) throw new Error('请先完成全部学者资料阅读');
      session.status = 'judgment';
      return { ok: true };
    }
    const author = data.author as string;
    if (!session.profile.authors.includes(author)) throw new Error('题目不存在');
    const receipt = records[author] ??= {};
    if (action === 'readOpen') {
      receipt.openedAt ??= Date.now();
      const scholar = materialByAuthor.get(author);
      if (!scholar) throw new Error('题目不存在');
      const { examples, works, ...basic } = scholar;
      const material = session.profile.role === 'full' ? { ...basic, examples, works } : basic;
      return { material, minimumSeconds, completed: !!receipt.completedAt };
    }
    if (!receipt.openedAt || Date.now() - receipt.openedAt < minimumSeconds * 1000 ||
        data.activeSeconds < minimumSeconds || !data.reachedEnd || !data.confirmed) {
      throw new Error('请阅读至末尾并确认已阅读');
    }
    receipt.completedAt = Date.now();
    return { ok: true };
  }

  if (session.status === 'reading') throw new Error('请先完成全部学者资料阅读');
  if (action === 'finishJudgment') {
    if (session.status !== 'judgment' || session.answers.size !== session.items.size) throw new Error('请完成所有题目再继续');
    const scored = [...session.answers.values()].map(answer => {
      const {pair, flip} = session.items.get(answer.pair_id)!;
      return {
        pairId: pair.id, correct: answer.choice === (flip ? 'B' : 'A'),
        confidence: answer.confidence, author: pair.author, baseline: pair.baseline,
      };
    });
    session.selected = sampleEvidence(scored, session.id);
    session.status = 'evidence';
    return { ok: true };
  }
  if (action === 'finishEvidence') {
    if (session.status !== 'evidence' || session.evidence.size !== session.selected.length) throw new Error('请完成证据标注');
    session.status = 'complete';
    return { ok: true };
  }

  const item = session.items.get(data.pairId);
  if (!item) throw new Error('题目不属于此任务');
  if (action === 'visit') return { ok: true };
  if (action === 'events') {
    if (!session.events.has(data.batchId) && session.events.size < 2000) session.events.set(data.batchId, data.events);
    return { ok: true };
  }
  if (action === 'answer') {
    if (session.status !== 'judgment' || !['A', 'B'].includes(data.choice) ||
        !Number.isInteger(data.confidence) || data.confidence < 1 || data.confidence > 5) {
      throw new Error('请选择 A/B 和 1–5 分信心');
    }
    session.answers.set(item.pair.id, { pair_id: item.pair.id, choice: data.choice, confidence: data.confidence, active_ms: data.activeMs });
    return { ok: true };
  }
  if (action === 'evidence') {
    const entry = data.entry;
    if (session.status !== 'evidence' || !session.selected.includes(item.pair.id) ||
        !validateDimensions(entry?.dimensions) || (typeof entry.reason !== 'string' || entry.reason.trim().length < 10) || !entry.quotes?.length) {
      throw new Error('请选择一级、二级维度，写至少 10 字说明，并添加原文证据');
    }
    for (const quote of entry.quotes) {
      if (!['A', 'B'].includes(quote.side) || displayText(display(item), quote.side).slice(quote.start, quote.end) !== quote.text) {
        throw new Error('证据必须来自当前题目的准确原文');
      }
    }
    session.evidence.set(item.pair.id, { pair_id: item.pair.id, payload: JSON.stringify(entry) });
    return { ok: true };
  }
  throw new Error('未知操作');
}
