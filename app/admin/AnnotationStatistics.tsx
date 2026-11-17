import { useLanguage } from '../Language';
import { adminStatistics, type Exposure, type Level } from '../../lib/demo-admin';

export const exposureLabels: Record<Exposure, string> = {
  general: '不提供额外信息', basic: '基础资料', full: '全面资料',
};

const granularityLabels: Record<Level, { zh: string; en: string }> = {
  passage: { zh: '篇章生成', en: 'Passage generation' },
  paragraph: { zh: '段落补全', en: 'Paragraph infilling' },
  sentence: { zh: '句子补全', en: 'Sentence infilling' },
};

export function useStatisticFormats() {
  const { language } = useLanguage();
  const locale = language === 'en' ? 'en-US' : 'zh-CN';
  return {
    count: new Intl.NumberFormat(locale),
    percent: new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }),
    confidence: new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  };
}

export default function AnnotationStatistics() {
  const { t, language } = useLanguage();
  const label = (zh: string, en: string) => language === 'en' ? en : zh;
  const formats = useStatisticFormats();
  const sections = [
    {
      title: label('按文本粒度', 'By granularity'),
      rows: adminStatistics.granularity.map(row => ({ ...row, label: granularityLabels[row.id][language] })),
    },
    {
      title: label('按资料展示', 'By information exposure'),
      rows: adminStatistics.exposure.map(row => ({ ...row, label: t(exposureLabels[row.id]) })),
    },
    {
      title: label('按生成基线', 'By baseline'),
      rows: adminStatistics.baseline.map(row => ({ ...row, label: row.id + ' · ' + row.label })),
    },
  ];

  return <div className="statistic-groups">
    {sections.map(({ title, rows }) => <section key={title} className="statistic-group">
      <table>
        <caption>{title}</caption>
        <thead><tr>
          <th scope="col">{label('分组', 'Group')}</th>
          <th scope="col">{label('判断数', 'Judgments')}</th>
          <th scope="col">{label('准确率', 'Accuracy')}</th>
          <th scope="col">{label('平均信心（1–5）', 'Avg. confidence (1–5)')}</th>
        </tr></thead>
        <tbody>{rows.map(row => <tr key={row.id}>
          <th scope="row">{row.label}</th>
          <td>{formats.count.format(row.count)}</td>
          <td>{formats.percent.format(row.accuracy)}</td>
          <td>{formats.confidence.format(row.confidence)}</td>
        </tr>)}</tbody>
      </table>
    </section>)}
  </div>;
}
