import catalogue from '../data/discipline-selection.json';
export const disciplines=catalogue.primary;
export const catalogueVersion=catalogue.version;
export const domains=[{id:'law',name:'法律'},{id:'economics',name:'经济学'},{id:'philosophy',name:'哲学'},{id:'computer_science',name:'计算机科学'},{id:'literature',name:'文学'}];
/** Research-team mappings, distinct from an author's biographical credentials. */
export const authorSubjects=[
 {name:'顾承远',domain:'law',primary:'03',secondary:'0301'},
 {name:'沈怀川',domain:'law',primary:'03',secondary:'0301'},
 {name:'Edmund Ashford',domain:'law',primary:'03',secondary:'0301'},
 {name:'Nathaniel Fairmont',domain:'law',primary:'03',secondary:'0301'},
 {name:'Arthur Westmere',domain:'economics',primary:'02',secondary:'0201'},
 {name:'Henry Langford',domain:'economics',primary:'02',secondary:'0201'},
 {name:'Edgar Norwick',domain:'economics',primary:'02',secondary:'0201'},
 {name:'周闻达',domain:'economics',primary:'02',secondary:'0202'},
 {name:'Julian Wrenford',domain:'philosophy',primary:'01',secondary:'0101'},
 {name:'Felix Lindenau',domain:'philosophy',primary:'01',secondary:'0101'},
 {name:'Adrian Hartwell',domain:'philosophy',primary:'01',secondary:'0101'},
 {name:'程远舟',domain:'philosophy',primary:'01',secondary:'0101'},
 {name:'陆惟真',domain:'philosophy',primary:'01',secondary:'0101'},
 {name:'Martin Vermeer',domain:'computer_science',primary:'08',secondary:'0812'},
 {name:'Elias Montclair',domain:'computer_science',primary:'08',secondary:'0812'},
 {name:'Daniel Linwood',domain:'computer_science',primary:'08',secondary:'0812'},
 {name:'Percival Rowan',domain:'literature',primary:'05',secondary:'0502'},
 {name:'叶怀青',domain:'literature',primary:'05',secondary:'0501'},
 {name:'苏蘅',domain:'literature',primary:'05',secondary:'0501'},
 {name:'Clara Fenwick',domain:'literature',primary:'05',secondary:'0502'},
 {name:'Nikolai Berezin',domain:'literature',primary:'05',secondary:'0502'}
];
export const authorMappingVersion='research-team-category-discipline-v2';
export type Peer='small'|'large'|'cross'|'pending';
export function classifyPeer(primary:string,secondary:string,author:string):Peer{
 const subject=authorSubjects.find(a=>a.name===author);if(!subject||!primary)return 'pending';
 if(primary!==subject.primary)return 'cross';
 if(!secondary||secondary==='primary-only')return 'pending';
 return secondary===subject.secondary?'small':'large';
}
export const peerNames:Record<string,string>={small:'小同行',large:'大同行',cross:'跨学科',pending:'待细分'};
export function subjectNames(primary:string,secondary:string){const p=disciplines.find(p=>p.code===primary);return {primary:p?.name||primary,secondary:p?.secondary.find(s=>s.code===secondary)?.name||(secondary==='primary-only'?'仅一级方向':secondary)};}
export function validSubject(primary:string,secondary:string){
 if(!primary)return secondary==='';
 const category=disciplines.find(d=>d.code===primary);
 if(!category)return false;
 return secondary===''||(category.secondary.length
  ?category.secondary.some(d=>d.code===secondary)
  :secondary==='primary-only');
}
