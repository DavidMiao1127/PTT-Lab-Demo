import basePairs from '../data/demo-session-pairs.json';

const id = 'demo-001';
const createdAt = Date.UTC(2026, 10, 16, 4, 0);
const profile = {
  name: 'Demo participant', author: 'Adrian Hartwell', peer: 'small', domain: 'philosophy',
  specialty: 'Philosophy', role: 'basic', familiarity: 3,
};
const answers = basePairs.map((pair, index) => ({
  pair_id: pair.id, choice: index === 1 ? 'B' : 'A', real: 'A',
  correct: index !== 1, confidence: [4, 3, 5][index], active_ms: [19300, 32800, 58400][index],
  author: pair.author, baseline: pair.baseline, level: pair.level,
}));
const session = {
  id, profile, status: 'complete',
  items: JSON.stringify(basePairs.map(pair => ({id: pair.id, flip: false}))),
  created_at: createdAt, completed_at: createdAt + 135000,
};
const sentence = basePairs[0];
const text = sentence.a;
const offset = sentence.context_before.length;
const evidence = [{
  pair_id: sentence.id,
  payload: JSON.stringify({
    factors: ['语言风格：句法与段落节奏'],
    reason: 'The contrast between the apparent simplicity of the question and its deeper difficulty influenced this illustrative judgment.',
    quotes: [{ side: 'A', scope: 'full', text, start: offset, end: offset + text.length }],
  }),
}];
const visits = answers.map(({pair_id}, index) => ({ pair_id, opened_at: createdAt + index * 25000 }));

const events = basePairs.map((pair, index) => {
  const start = createdAt + index * 25000 + 1200;
  const w = 1280, h = 800;
  const coordinates = [[235,130], [302,193], [421,253], [470,281], [515,281], [560,281], [628,320], [718,400], [839,518], [980,598]];
  const points = coordinates.map(([x, y], i) => ({
    type: i === coordinates.length - 1 ? 'click' : 'move', t: start + i * 700, x, y, w, h,
  }));
  const dwell = {
    type: 'selection_dwell', w, h, t: start + 6400,
    dwell: {
      id: 'demo-dwell-' + index, side: 'A', stage: 'judgment', startedAt: start + 1700, durationMs: 4700,
      start: pair.context_before.length, end: pair.context_before.length + pair.a.length,
      text: index === 0 ? text : pair.a.slice(0, 106),
      rects: [{ x: 410, y: 255, width: 242, height: 37 }],
    },
  };
  dwell.dwell.end = dwell.dwell.start + dwell.dwell.text.length;
  return { pair_id: pair.id, payload: JSON.stringify([...points, dwell]) };
});

export function getAdminData(page = 0) {
  return { total: 1, page, pageSize: 25, records: page ? [] : [{ ...session, answers, flags: [] }] };
}
export function getAdminDetail(selectedPair?: string) {
  const visible = selectedPair ? events.filter(event => event.pair_id === selectedPair) : events;
  return { session, answers, evidence, visits, events: visible, eventTotal: visible.length, simulated: true };
}
