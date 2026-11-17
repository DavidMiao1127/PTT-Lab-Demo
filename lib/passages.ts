/** Exact displayed text; no normalization, so evidence offsets remain reproducible. */
export function displayText(pair:{a?:string;b?:string;level?:string;contextBefore?:string;contextAfter?:string},side:string){
 const candidate=(side==='A'?pair.a:pair.b)||'';
 return pair.level&&pair.level!=='passage'?(pair.contextBefore||'')+candidate+(pair.contextAfter||''):candidate;
}
