'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LanguageSwitch, useLanguage } from '../Language';
import { adminStatistics } from '../../lib/demo-admin';
import AnnotationRecords from './AnnotationRecords';
import AnnotationStatistics, { useStatisticFormats } from './AnnotationStatistics';
import CorpusExchange from './CorpusExchange';

export default function Admin() {
  const { t, language } = useLanguage();
  const [panel, setPanel] = useState<'statistics' | 'records'>('statistics');
  const label = (zh: string, en: string) => language === 'en' ? en : zh;
  const formats = useStatisticFormats();
  const { overall } = adminStatistics;
  const metrics = [
    [label('全部标注轮次', 'Annotation rounds'), formats.count.format(adminStatistics.rounds)],
    [label('判断总数', 'Total judgments'), formats.count.format(overall.count)],
    [label('整体准确率', 'Overall accuracy'), formats.percent.format(overall.accuracy)],
    [label('平均信心', 'Average confidence'), formats.confidence.format(overall.confidence) + ' / 5'],
  ];
  const tabs = [
    { id: 'statistics', label: label('详细标注统计', 'Detailed Annotation Statistic') },
    { id: 'records', label: label('标注记录', 'Annotation Record') },
  ] as const;

  return <div className="admin-page">
    <header>
      <LanguageSwitch />
      <a href="#annotator"><ArrowLeft size={15}/> {label('标注者视角', 'Annotator view')}</a>
      <span>{t('个性化图灵测试 · 研究后台')}</span>
    </header>
    <div className="admin-content">
      <div className="section-heading"><div>
        <h1>{label('研究者复核与结果分析', 'Researcher Inspection and Result Analysis')}</h1>
        <p>{label('本页的结果、基线对比及行为记录均为模拟数据。', 'Results, baseline comparisons, and interaction records on this page are simulated.')}</p>
      </div></div>
      <CorpusExchange />
      <dl className="admin-stats">
        {metrics.map(([name, value]) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}
      </dl>
      <div className="admin-view-switch" role="group" aria-label={label('结果视图', 'Result view')}>
        {tabs.map(tab => <button type="button" key={tab.id} aria-pressed={panel === tab.id}
          aria-controls={'admin-' + tab.id} onClick={() => setPanel(tab.id)}>{tab.label}</button>)}
      </div>
      <div id="admin-statistics" hidden={panel !== 'statistics'}><AnnotationStatistics /></div>
      <div id="admin-records" hidden={panel !== 'records'}><AnnotationRecords /></div>
    </div>
  </div>;
}
