export type SampleRow={pairId:string;correct:boolean;confidence:number;author:string;baseline:string};
export const samplingPolicy={version:'proportional-stratified-v2',ratio:0.10,bands:{low:[1,2],medium:[3],high:[4,5]}};
export const evidenceCount=(total:number,ratio=samplingPolicy.ratio)=>Math.min(total,Math.ceil(total*ratio));
export function sampleEvidence(rows:SampleRow[],seed:string,count=evidenceCount(rows.length)){
 const band=(c:number)=>c<=2?'low':c===3?'medium':'high';
 const hash=(s:string)=>Array.from(s).reduce((a,c)=>(Math.imul(a,31)+c.charCodeAt(0))>>>0,0);
 const remaining=[...rows],chosen:SampleRow[]=[];
 const score=(r:SampleRow)=>100/(1+chosen.filter(x=>x.correct===r.correct&&band(x.confidence)===band(r.confidence)).length)+15/(1+chosen.filter(x=>x.author===r.author).length)+10/(1+chosen.filter(x=>x.baseline===r.baseline).length);
 while(chosen.length<Math.min(count,rows.length)){
  remaining.sort((a,b)=>score(b)-score(a)||hash(seed+a.pairId)-hash(seed+b.pairId));chosen.push(remaining.shift()!);
 }return chosen.map(r=>r.pairId);
}
export type DrawRow={id:string;baseline:string};
export function maximumBalancedCount(rows:DrawRow[]){const counts=new Map<string,number>();for(const row of rows)counts.set(row.baseline,(counts.get(row.baseline)||0)+1);if(!counts.size)return 0;const minimum=Math.min(...counts.values());return [...counts.values()].reduce((total,n)=>total+Math.min(n,minimum+1),0);}
/** Randomized round-robin across available methods, no replacement; quotas differ by <=1. */
export function balancedDraw(rows:DrawRow[],count:number,random:()=>number=()=>crypto.getRandomValues(new Uint32Array(1))[0]/4294967296){
 if(!Number.isInteger(count)||count<1||count>rows.length)throw new Error('题量超出作者题库范围');
 const maximum=maximumBalancedCount(rows);if(count>maximum)throw new Error('为保证不同方法均衡，本作者本轮最多 '+maximum+' 题');
 const shuffle=<T>(values:T[])=>{const result=[...values];for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;};
 const groups=new Map<string,DrawRow[]>();for(const row of rows)groups.set(row.baseline,[...(groups.get(row.baseline)||[]),row]);
 for(const [method,group] of groups)groups.set(method,shuffle(group));
 const result:DrawRow[]=[];
 while(result.length<count){for(const method of shuffle([...groups.keys()].filter(method=>groups.get(method)!.length))){result.push(groups.get(method)!.pop()!);if(result.length===count)break;}}
 return shuffle(result).map(row=>row.id);
}

/** Balance task levels first, then authors and generation methods within each level. */
export function drawRound(rows:(DrawRow&{level?:string;author:string})[],count:number,random:()=>number=()=>crypto.getRandomValues(new Uint32Array(1))[0]/4294967296){
 if(!Number.isInteger(count)||count<1||count>rows.length)throw new Error('题量超出所选学者题库范围');
 const levels=['passage','paragraph','sentence'];const remaining=[...rows],chosen:typeof rows=[];
 const used=(key:(r:typeof rows[number])=>string,value:string)=>chosen.filter(r=>key(r)===value).length;
 while(chosen.length<count){
  const available=levels.filter(l=>remaining.some(r=>r.level===l));const min=Math.min(...available.map(l=>used(r=>r.level||'',l)));const ls=available.filter(l=>used(r=>r.level||'',l)===min);const level=ls[Math.floor(random()*ls.length)];
  const candidates=remaining.filter(r=>r.level===level);const score=(r:typeof rows[number])=>used(x=>x.author,r.author)*100+used(x=>x.level+':'+x.author,level+':'+r.author)*10+used(x=>x.baseline,r.baseline)*10+used(x=>x.level+':'+x.baseline,level+':'+r.baseline);
  const best=Math.min(...candidates.map(score));const ties=candidates.filter(r=>score(r)===best);const pick=ties[Math.floor(random()*ties.length)];chosen.push(pick);remaining.splice(remaining.indexOf(pick),1);
 }
 for(let i=chosen.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[chosen[i],chosen[j]]=[chosen[j],chosen[i]];}
 return chosen.map(r=>r.id);
}
