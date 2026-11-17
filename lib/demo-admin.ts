import { basePairs, type Pair } from './demo-corpus';

export const granularities = ['passage', 'paragraph', 'sentence'] as const;
export const exposureLevels = ['general', 'basic', 'full'] as const;
export const baselines = [
  { id: 'B1', label: 'No Persona' },
  { id: 'B2', label: 'Name-only' },
  { id: 'B3', label: 'Multi-tier Persona' },
  { id: 'B4', label: 'Biographical Profile' },
  { id: 'B5', label: 'Few-shot' },
  { id: 'B6', label: 'Personalized RAG' },
] as const;

export type Level = typeof granularities[number];
export type Exposure = typeof exposureLevels[number];
type Baseline = typeof baselines[number]['id'];
type Side = 'A' | 'B';
type Answer = {
  pair_id: string; real: Side; choice: Side; correct: boolean; confidence: number;
  active_ms: number; author: string; baseline: Baseline; level: Level;
};
type Trial = { pair: Pair; answer: Answer };
type Point = { type: 'move' | 'click'; t: number; x: number; y: number; w: number; h: number };

function seededRandom(seed: number) {
  return () => {
    seed = (seed + 0x6D2B79F5) >>> 0;
    let mixed = Math.imul(seed ^ (seed >>> 15), seed | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(values: readonly T[], random: () => number) {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const domains = [...new Set(basePairs.map(pair => pair.domain))];
const authorsByDomain = new Map(domains.map(domain => [
  domain, [...new Set(basePairs.filter(pair => pair.domain === domain).map(pair => pair.author))],
]));
const pairsByAuthor = new Map([...authorsByDomain.values()].flat().map(author => [
  author, Object.fromEntries(granularities.map(level => [
    level, basePairs.filter(pair => pair.author === author && pair.level === level),
  ])),
]));
const peerGroups = ['small', 'large', 'cross'];
const pageSize = 25;
const roundCount = 162;

function createRound(index: number) {
  const random = seededRandom(5901 + index * 239);
  const role = exposureLevels[index % exposureLevels.length];
  const domain = domains[index % domains.length];
  const authors = authorsByDomain.get(domain)!;
  const author = authors[Math.floor(index / domains.length) % authors.length];
  const skill = (random() - .5) * .22;
  const created_at = Date.UTC(2026, 10, 16, 12) - index * 14 * 60_000;
  const profile = {
    author, domain, role,
    peer: role === 'general' ? 'pending' : peerGroups[Math.floor(index / 3) % peerGroups.length],
    familiarity: role === 'general' ? null : 2 + index % 4,
  };

  // Each round provides one observation for every granularity × baseline cell.
  const trials = shuffle(granularities.flatMap((level, levelIndex) => {
    const pairs = shuffle(pairsByAuthor.get(author)![level], random);
    return baselines.map(({ id: baseline }, methodIndex): Trial => {
      const pair = pairs[methodIndex];
      const accuracy = .65 + [.04, 0, -.07][levelIndex]
        + [-.055, .005, .065][index % exposureLevels.length]
        + [.10, .05, 0, .02, -.04, -.07][methodIndex] + skill;
      const correct = random() < accuracy;
      const real: Side = random() < .5 ? 'A' : 'B';
      const choice = correct ? real : real === 'A' ? 'B' : 'A';
      const confidence = Math.max(1, Math.min(5, Math.round(
        2.8 + (correct ? .65 : -.15) + (accuracy - .6) + (random() - .5) * 2.6,
      )));
      const active_ms = Math.round([61_000, 40_000, 24_000][levelIndex] * (.55 + random()));
      return { pair, answer: { pair_id: pair.id, real, choice, correct, confidence, active_ms, author, baseline, level } };
    });
  }), random);
  const answers = trials.map(trial => trial.answer);
  const elapsed = answers.reduce((sum, answer) => sum + answer.active_ms, 0);
  const session = {
    id: 'round-' + String(index + 1).padStart(3, '0'), profile, status: 'complete' as const,
    items: trials.map(({ pair, answer }) => ({ id: pair.id, flip: pair.real !== answer.real })),
    created_at, completed_at: created_at + elapsed,
  };
  return { session, trials, answers };
}

const rounds = Array.from({ length: roundCount }, (_, index) => createRound(index));
const roundsById = new Map(rounds.map(round => [round.session.id, round]));
const observations = rounds.flatMap(({ session, answers }) => answers.map(answer => ({ ...answer, role: session.profile.role })));

function summarize(answers: readonly Answer[]) {
  const count = answers.length;
  return {
    count,
    accuracy: count ? answers.filter(answer => answer.correct).length / count : 0,
    confidence: count ? answers.reduce((sum, answer) => sum + answer.confidence, 0) / count : 0,
  };
}

export const adminStatistics = {
  rounds: rounds.length,
  overall: summarize(observations),
  granularity: granularities.map(id => ({ id, ...summarize(observations.filter(answer => answer.level === id)) })),
  exposure: exposureLevels.map(id => ({ id, ...summarize(observations.filter(answer => answer.role === id)) })),
  baseline: baselines.map(({ id, label }) => ({ id, label, ...summarize(observations.filter(answer => answer.baseline === id)) })),
};

export function getAdminData(page = 0) {
  const records = rounds.slice(page * pageSize, (page + 1) * pageSize).map(({ session, answers }) => ({
    ...session, answers, statistics: summarize(answers),
  }));
  return { total: rounds.length, page, pageSize, records, simulated: true };
}

function evidenceText(pair: Pair, answer: Answer) {
  const flip = answer.real !== pair.real;
  const candidate = (answer.choice === 'A') !== flip ? pair.a : pair.b;
  const text = candidate.slice(0, 210).trimEnd();
  const start = pair.context_before.length;
  return { side: answer.choice, scope: 'full' as const, text, start, end: start + text.length };
}

export function getAdminDetail(id: string, selectedPair?: string) {
  const round = roundsById.get(id);
  if (!round) throw new Error('Unknown simulated annotation record.');
  let time = round.session.created_at;
  const visits = round.trials.map(({ answer }) => {
    const visit = { pair_id: answer.pair_id, opened_at: time };
    time += answer.active_ms;
    return visit;
  });

  const evidence = round.trials.slice(0, 2).map(({ pair, answer }, index) => ({
    id: id + '-evidence-' + index, pair_id: pair.id,
    payload: {
      factors: ['语言风格：句法与段落节奏'],
      reason: 'The selected span and its connection to the surrounding text informed this simulated judgment.',
      quotes: [evidenceText(pair, answer)],
    },
  }));
  const events = round.trials.flatMap(({ pair, answer }, index) => {
    if (selectedPair && pair.id !== selectedPair) return [];
    const start = visits[index].opened_at + 1200;
    const w = 1280, h = 800;
    const coordinates = [[210, 135], [315, 192], [440, 265], [500, 310], [540, 312], [553, 350], [589, 400], [720, 520], [860, 630]];
    // Draw the same sequence for a given pair whether viewing or exporting the round.
    const jitter = seededRandom(Number(id.slice(-3)) * 601 + index * 3209);
    const points: Point[] = coordinates.map(([x, y], i) => ({
      type: i === coordinates.length - 1 ? 'click' : 'move', t: start + i * 850,
      x: x + Math.round(jitter() * 34), y: y + Math.round(jitter() * 30), w, h,
    }));
    const dwell = {
      type: 'selection_dwell' as const, w, h, t: start + 5600,
      dwell: {
        id: id + '-dwell-' + index, stage: 'judgment', startedAt: start + 1900, durationMs: 3700,
        ...evidenceText(pair, answer), rects: [{ x: 420, y: 263, width: 260, height: 42 }],
      },
    };
    return [{ pair_id: pair.id, payload: [...points, dwell] }];
  });

  return { session: round.session, answers: round.answers, evidence, visits, events, eventTotal: events.length, simulated: true };
}
