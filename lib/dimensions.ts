/** Taxonomy transcribed from the research team's reference image. */
export const dimensionVersion='persona-evidence-v2';
export const dimensions=[
 {id:'topic',name:'研究主题',description:'研究者选择什么问题、概念、对象、材料和方法',children:[
  {id:'object',name:'研究问题与对象',theory:'epistemic object',description:'文本使用的对象、案例、数据、实验材料是否符合其习惯'},
  {id:'method',name:'方法与技术路线',theory:'research strategy',description:'是否符合其常用方法、技术路径、识别策略或证明工具'},
  {id:'concepts',name:'核心概念体系',theory:'conceptual repertoire',description:'是否使用其常见概念、分类方式和问题划分'}
 ]},
 {id:'stance',name:'学术立场',description:'研究者如何定位争议、采取何种理论框架和价值判断',children:[
  {id:'paradigm',name:'理论谱系',theory:'paradigm',description:'文本是否属于其一贯依托的理论传统'},
  {id:'position',name:'争议定位',theory:'position-taking',description:'是否按照其习惯划分争议、批评对方或限定问题'},
  {id:'values',name:'价值取向/规范判断',theory:'scientific field',description:'是否体现其常见价值判断、规范原则或评价标准'}
 ]},
 {id:'style',name:'语言风格',description:'研究者如何在学术写作中表达自己、组织论证、使用术语和修辞',children:[
  {id:'terms',name:'术语与搭配',theory:'lexical style',description:'是否使用其常见术语、固定搭配、限定性表达'},
  {id:'syntax',name:'句法与段落节奏',theory:'syntactic style',description:'句长、转折、递进、并列、概括—展开方式是否相似'},
  {id:'rhetoric',name:'修辞与语气',theory:'rhetoric',description:'是否偏谨慎、强判断、批判性、解释性、规范化或技术化'},
  {id:'citation',name:'文献与引用习惯',theory:'citation practice',description:'是否引用同类文献、经典理论、判例、实验、数据或政策材料'}
 ]}
];
export type DimensionSelection={primary:string;secondary:string[]};
export function validateDimensions(value:unknown):value is DimensionSelection[]{
 if(!Array.isArray(value)||!value.length||value.length>dimensions.length)return false;
 const seen=new Set<string>();
 return value.every(v=>{const d=dimensions.find(d=>d.id===v?.primary);if(!d||seen.has(d.id)||!Array.isArray(v.secondary)||!v.secondary.length||v.secondary.length>d.children.length)return false;seen.add(d.id);return new Set(v.secondary).size===v.secondary.length&&v.secondary.every((id:string)=>d.children.some(c=>c.id===id));});
}
export function dimensionLabels(value:DimensionSelection[]){return value.map(v=>{const d=dimensions.find(d=>d.id===v.primary)!;return d.name+'：'+v.secondary.map(id=>d.children.find(c=>c.id===id)!.name).join('、');});}
