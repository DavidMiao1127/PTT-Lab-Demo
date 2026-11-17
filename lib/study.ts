import catalogue from '../data/discipline-selection.json';
export const disciplines=catalogue.primary;
export const catalogueVersion=catalogue.version;
export const domains=[{id:'law',name:'法律'},{id:'economics',name:'经济学'},{id:'philosophy',name:'哲学'},{id:'computer_science',name:'计算机科学'},{id:'literature',name:'文学'}];
/** Research-team mappings, distinct from an author's biographical credentials. */
export const authorSubjects=[
 {name:'江平',domain:'law',primary:'03',secondary:'0301'},
 {name:'高铭暄',domain:'law',primary:'03',secondary:'0301'},
 {name:'Oliver Wendell Holmes Jr.',domain:'law',primary:'03',secondary:'0301'},
 {name:'Benjamin N. Cardozo',domain:'law',primary:'03',secondary:'0301'},
 {name:'Adam Smith',domain:'economics',primary:'02',secondary:'0201'},
 {name:'John Maynard Keynes',domain:'economics',primary:'02',secondary:'0201'},
 {name:'Thorstein Veblen',domain:'economics',primary:'02',secondary:'0201'},
 {name:'厉以宁',domain:'economics',primary:'02',secondary:'0202'},
 {name:'John Stuart Mill',domain:'philosophy',primary:'01',secondary:'0101'},
 {name:'Friedrich Nietzsche',domain:'philosophy',primary:'01',secondary:'0101'},
 {name:'Bertrand Russell',domain:'philosophy',primary:'01',secondary:'0101'},
 {name:'冯友兰',domain:'philosophy',primary:'01',secondary:'0101'},
 {name:'王阳明',domain:'philosophy',primary:'01',secondary:'0101'},
 {name:'Edsger W. Dijkstra',domain:'computer_science',primary:'08',secondary:'0812'},
 {name:'Yoshua Bengio',domain:'computer_science',primary:'08',secondary:'0812'},
 {name:'Kaiming He',domain:'computer_science',primary:'08',secondary:'0812'},
 {name:'William Shakespeare',domain:'literature',primary:'05',secondary:'0502'},
 {name:'鲁迅',domain:'literature',primary:'05',secondary:'0501'},
 {name:'曹雪芹',domain:'literature',primary:'05',secondary:'0501'},
 {name:'Jane Austen',domain:'literature',primary:'05',secondary:'0502'},
 {name:'Leo Tolstoy',domain:'literature',primary:'05',secondary:'0502'}
];
export const authorMappingVersion='research-team-category-discipline-v2';
export type Peer='small'|'large'|'cross'|'pending';
export function classifyPeer(primary:string,secondary:string,author:string):Peer{
 const subject=authorSubjects.find(a=>a.name===author);if(!subject)return 'pending';
 if(primary!==subject.primary)return 'cross';
 if(!secondary||secondary==='primary-only')return 'pending';
 return secondary===subject.secondary?'small':'large';
}
export const peerNames:Record<string,string>={small:'小同行',large:'大同行',cross:'跨学科',pending:'待细分'};
export function subjectNames(primary:string,secondary:string){const p=disciplines.find(p=>p.code===primary);return {primary:p?.name||primary,secondary:p?.secondary.find(s=>s.code===secondary)?.name||(secondary==='primary-only'?'仅一级方向':secondary)};}
export function validSubject(primary:string,secondary:string){const p=disciplines.find(p=>p.code===primary);return !!p&&(p.secondary.length>0?p.secondary.some(s=>s.code===secondary):secondary==='primary-only');}
