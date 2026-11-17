import { useEffect, useRef, useState } from 'react';
import { Download } from 'lucide-react';
import { useLanguage } from '../Language';
import { getAdminData, getAdminDetail } from '../../lib/demo-admin';
import { domains, peerNames } from '../../lib/study';
import { exposureLabels, useStatisticFormats } from './AnnotationStatistics';

function download(data: unknown, filename: string) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

type RecordDetail = ReturnType<typeof getAdminDetail>;

function AnnotationDetail({ detail, pairId, onSelectPair }: {
  detail: RecordDetail;
  pairId: string;
  onSelectPair: (id: string) => void;
}) {
  const { t, language } = useLanguage();
  const [selectionId, setSelectionId] = useState('');
  const canvas = useRef<HTMLCanvasElement>(null);
  const events = detail.events.flatMap(batch => batch.payload);
  const selections = events.filter(event => event.type === 'selection_dwell');
  const selected = selections.find(event => event.dwell.id === selectionId);

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext('2d');
    if (!element || !context) return;
    const { width, height } = element;
    context.fillStyle = '#f6f8f0';
    context.fillRect(0, 0, width, height);
    const points = detail.events.flatMap(batch => batch.payload)
      .filter(event => event.type !== 'selection_dwell')
      .filter(event => !selected || event.t >= selected.dwell.startedAt && event.t <= selected.t)
      .sort((a, b) => a.t - b.t);
    context.lineWidth = 1.2;
    context.strokeStyle = '#6b926688';
    context.beginPath();
    for (const [index, point] of points.entries()) {
      const x = point.x / point.w * width;
      const y = point.y / point.h * height;
      if (index === 0 || point.t - points[index - 1].t > 3000) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.stroke();
    for (const point of points.filter(point => point.type === 'click')) {
      context.beginPath();
      context.fillStyle = '#b47450';
      context.arc(point.x / point.w * width, point.y / point.h * height, 4, 0, Math.PI * 2);
      context.fill();
    }
    if (selected) {
      context.strokeStyle = '#9276b2';
      context.fillStyle = '#9276b222';
      for (const rect of selected.dwell.rects) {
        const x = rect.x / selected.w * width;
        const y = rect.y / selected.h * height;
        const w = rect.width / selected.w * width;
        const h = rect.height / selected.h * height;
        context.fillRect(x, y, w, h);
        context.strokeRect(x, y, w, h);
      }
    }
  }, [detail, selected]);

  return <section className="admin-detail">
    <div className="section-heading">
      <div><h2>{t('标注过程与原文证据')}</h2><p>{t('记录 ')}{detail.session.id}</p></div>
      <button type="button" className="secondary" onClick={() =>
        download(getAdminDetail(detail.session.id), 'aptbench-simulated-' + detail.session.id + '.json')}>
        <Download size={15}/> {t(' 导出完整记录')}
      </button>
    </div>
    <select value={pairId} aria-label={language === 'en' ? 'Select a judgment' : '选择判断记录'}
      onChange={event => onSelectPair(event.target.value)}>
      {detail.answers.map((answer, index) => <option key={answer.pair_id} value={answer.pair_id}>
        {String(index + 1).padStart(2, '0')} · {answer.baseline} · {answer.choice} / {answer.confidence}
      </option>)}
    </select>
    <div className="selection-records">
      <h3>{t('文本选中停留记录')}</h3>
      <p>{t('仅作为判断依据的复核线索，不直接推断重要性。')}</p>
      {selections.map(({ dwell }) => <article key={dwell.id} className={dwell.id === selectionId ? 'active' : ''}>
        <div>
          <b>{t('文本 ')}{dwell.side}</b>
          <span>{(dwell.durationMs / 1000).toFixed(1)} {t('秒')} · {t('文本判断')} · {new Date(dwell.startedAt).toISOString()} · [{dwell.start}, {dwell.end})</span>
          <button type="button" className="text-button" onClick={() => setSelectionId(dwell.id)}>{t('查看同期轨迹')}</button>
        </div>
        <blockquote translate="no">{dwell.text}</blockquote>
      </article>)}
      {selectionId && <button type="button" className="secondary" onClick={() => setSelectionId('')}>{t('显示全部轨迹')}</button>}
    </div>
    <div className="trajectory">
      <canvas ref={canvas} width={1000} height={550} />
      <p>{language === 'en' ? 'Simulated pointer trace. Green shows movement and brown indicates a click.' : '模拟鼠标轨迹。绿色表示移动，棕色表示点击。'}</p>
    </div>
    <div className="evidence-exports">
      {detail.evidence.filter(entry => entry.pair_id === pairId).map(({ id, payload }) => <article key={id}>
        <small>{payload.factors.map(t).join(' · ')}</small>
        <p translate="no">{payload.reason}</p>
        {payload.quotes.map(quote => <blockquote key={quote.start} translate="no">{t('文本 ')}{quote.side}：{quote.text}</blockquote>)}
      </article>)}
    </div>
  </section>;
}

export default function AnnotationRecords() {
  const { t, language } = useLanguage();
  const [page, setPage] = useState(0);
  const [detail, setDetail] = useState<RecordDetail | null>(null);
  const [pairId, setPairId] = useState('');
  const formats = useStatisticFormats();
  const data = getAdminData(page);

  function inspect(id: string, selectedPair?: string) {
    const pair = selectedPair || getAdminDetail(id).answers[0].pair_id;
    setPairId(pair);
    setDetail(getAdminDetail(id, pair));
  }

  function changePage(next: number) {
    setPage(next);
    setDetail(null);
  }

  return <>
    <div className="admin-actions">
      <span>{t('第 ')}{page + 1} {t(' 页 · 每页最多 ')}{data.pageSize} {t(' 轮')}</span>
      <button type="button" className="secondary" onClick={() => download(data, 'aptbench-simulated-page-' + (page + 1) + '.json')}>
        <Download size={15}/> {language === 'en' ? 'Export this page' : '导出本页记录'}
      </button>
      <button type="button" className="secondary" disabled={page === 0} onClick={() => changePage(page - 1)}>{t('上一页')}</button>
      <button type="button" className="secondary" disabled={(page + 1) * data.pageSize >= data.total} onClick={() => changePage(page + 1)}>{t('下一页')}</button>
    </div>
    <div className="admin-table-wrap"><table>
      <thead><tr>{['参与者 / 编号', '身份与领域', '进度', '准确率', '活跃时间', '复核线索', '操作'].map(heading =>
        <th key={heading} scope="col">{t(heading)}</th>)}</tr></thead>
      <tbody>{data.records.map(record => {
        const { profile, answers, statistics } = record;
        const domain = domains.find(domain => domain.id === profile.domain);
        const minutes = Math.round(answers.reduce((total, answer) => total + answer.active_ms, 0) / 60_000);
        return <tr key={record.id}>
          <td><b>{language === 'en' ? 'Demo participant' : '示例参与者'}</b><small>{record.id}</small></td>
          <td>{t(peerNames[profile.peer])} · {t(domain?.name || profile.domain)}
            <small>{t(exposureLabels[profile.role])}</small>
            <small>{t(profile.author)}{profile.familiarity && <> {t(' · 熟悉度 ')}{profile.familiarity}/5</>}</small>
          </td>
          <td>{t('已完成')}<small>{answers.length} / {record.items.length} {t(' 题')}</small></td>
          <td>{formats.percent.format(statistics.accuracy)}</td>
          <td>{minutes} {t(' 分钟')}</td>
          <td className="flags">{t('文本选中停留记录')}<small>{t('仅供人工复核')}</small></td>
          <td><button type="button" className="text-button" onClick={() => inspect(record.id)}>{t('查看记录')}</button></td>
        </tr>;
      })}</tbody>
    </table></div>
    {detail && <AnnotationDetail key={detail.session.id + ':' + pairId} detail={detail} pairId={pairId}
      onSelectPair={selected => inspect(detail.session.id, selected)} />}
  </>;
}
