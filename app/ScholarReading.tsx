'use client';
import {useEffect,useRef,useState} from 'react';
import {Check,ChevronRight,BookOpen} from 'lucide-react';
import {useLanguage} from './Language';
const labels:Record<string,string>={research_fields:'研究领域',academic_views:'学术观点',research_methods:'研究方法',argumentation:'论证习惯',language_style:'语言风格'};
type Props={session:any;request:(action:string,data?:object)=>Promise<any>;onProgress:()=>Promise<any>;onComplete:()=>Promise<void>};
export default function ScholarReading({session,request,onProgress,onComplete}:Props){
 const {t,language}=useLanguage();
 const authors:string[]=session.profile.authors,records=session.profile.reading.records;
 const [index,setIndex]=useState(Math.max(0,authors.findIndex(a=>!records[a]?.completedAt))),[data,setData]=useState<any>(null),[seconds,setSeconds]=useState(0),[atEnd,setAtEnd]=useState(false),[confirmed,setConfirmed]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const panel=useRef<HTMLDivElement>(null),author=authors[index];
 useEffect(()=>{let alive=true;setData(null);setSeconds(0);setAtEnd(false);setConfirmed(false);setError('');request('readOpen',{author}).then(result=>{if(alive)setData(result);}).catch(e=>{if(alive)setError(e.message);});return()=>{alive=false;};},[author,request]);
 useEffect(()=>{if(!data)return;const timer=setInterval(()=>{if(!document.hidden&&document.hasFocus())setSeconds(s=>s+1);},1000);return()=>clearInterval(timer);},[data]);
 useEffect(()=>{const node=panel.current;if(!node||!data)return;node.scrollTop=0;setAtEnd(false);const check=()=>{if(node.scrollTop+node.clientHeight>=node.scrollHeight-5)setAtEnd(true);};const resize=new ResizeObserver(check);resize.observe(node);node.addEventListener('scroll',check);requestAnimationFrame(check);return()=>{resize.disconnect();node.removeEventListener('scroll',check);};},[data,language]);
 const material=data?.material,already=!!records[author]?.completedAt,wait=Math.max(0,(data?.minimumSeconds||8)-seconds);
 async function proceed(){setBusy(true);setError('');try{if(!already)await request('readDone',{author,reachedEnd:atEnd,confirmed,activeSeconds:seconds});await onProgress();if(index<authors.length-1)setIndex(i=>i+1);else{await request('finishReading');await onComplete();}}catch(e){setError((e as Error).message);}finally{setBusy(false);}}
 return <div className="reading-content"><div className="reading-heading"><div><span className="reading-kicker"><BookOpen size={17}/>{t(session.profile.role==='full'?'学者资料 · 全面信息':'学者资料 · 基础信息')}</span><h1>{t('阅读所选学者资料')}</h1><p>{t('请逐位阅读至末尾，确认后进入标注。')}</p></div><span className="reading-progress">{index+1} / {authors.length}</span></div>
 <div className="scholar-tabs">{authors.map((name,i)=><button type="button" key={name} disabled={busy||i>index&&!records[name]?.completedAt} className={index===i?'active':''} onClick={()=>setIndex(i)}>{records[name]?.completedAt&&<Check size={15}/>} {t(name)}</button>)}</div>
 {error&&<div className="error" role="alert">{t(error)}</div>}
 <div className="scholar-reading-panel" ref={panel} role="region" aria-label={t('学者资料正文')} tabIndex={0}>
 {!material?<p>{t('正在加载学者资料…')}</p>:<article><h2>{t(material.name)}</h2><section><h3>{t('生平简介 · Profile')}</h3><p>{material.biography[language]}</p></section>
 <section><h3>{t('结构化信息 · Persona')}</h3><dl className="persona-grid">{material.persona.map((row:any)=><div key={row.key}><dt>{t(labels[row.key])}</dt><dd>{row.summary[language].map((text:string,i:number)=><p key={i}>{text}</p>)}</dd></div>)}</dl></section>
 {material.works&&<section><h3>{t('本轮涉及著作')}</h3><div className="reading-works">{material.works.map((book:any)=><div key={book.id}><h4>{language==='zh'?book.titleZh:book.titleEn}</h4><p>{book.summary[language]}</p>{book.sourceUrl&&<a href={book.sourceUrl} target="_blank" rel="noreferrer">{t('来源与书目')} ↗</a>}</div>)}</div></section>}
 {material.examples&&<section><h3>{t('典型文段示例')}</h3>{material.examples.map((sample:any,i:number)=><figure key={sample.sourceId}><figcaption>{i+1}. {language==='zh'?sample.titleZh:sample.titleEn}</figcaption><blockquote translate="no">{sample.text}</blockquote></figure>)}</section>}
 <section className="reading-sources"><h3>{t('资料来源')}</h3><p>{t(material.examples?'结构化信息沿用项目现有 persona；著作简介为内容提要。示例保留原文语言。':'结构化信息沿用项目现有 persona。')}</p>{material.sources.map((url:string,i:number)=><a key={url} href={url} target="_blank" rel="noreferrer">{t('生平资料来源')} {i+1} ↗</a>)}</section><p className="reading-end">{t('本位学者资料已到末尾')}</p></article>}
 </div>
 <div className="reading-actions"><div><label><input type="checkbox" checked={already||confirmed} disabled={!data||!atEnd||wait>0||already||busy} onChange={e=>setConfirmed(e.target.checked)}/>{t('我已阅读并了解这位学者的资料')}</label><small aria-live="polite">{already?t('已完成阅读'):!atEnd?t('请继续阅读至末尾'):wait>0?t('请继续阅读，剩余秒数：')+' '+wait:t('可以确认并继续')}</small></div><button className="primary" onClick={proceed} disabled={busy||!data||(!already&&(!atEnd||wait>0||!confirmed))}>{index===authors.length-1?t('完成阅读，开始标注'):t('确认并阅读下一位')}<ChevronRight size={17}/></button></div>
 </div>;
}
