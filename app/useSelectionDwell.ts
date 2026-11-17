'use client';
import {useEffect,useRef} from 'react';
import {displayText} from '../lib/passages';
import {selectionPolicy,type SelectionDwell} from '../lib/selection-policy';
type Pair={id:string;a?:string;b?:string;level?:string;contextBefore?:string;contextAfter?:string};
export function useSelectionDwell(pair:Pair|null,stage:string,emit:(data:SelectionDwell)=>void){
 const handler=useRef(emit);handler.current=emit;const end=useRef<()=>void>(()=>{});
 useEffect(()=>{
  if(!pair||!stage){end.current=()=>{};return;}
  let track:{key:string;data:SelectionDwell;elapsed:number;last:number;sent:number}|null=null;
  function snapshot(){
   if(document.hidden||!document.hasFocus())return null;
   const sel=window.getSelection();if(!sel||sel.isCollapsed||sel.rangeCount!==1)return null;
   const range=sel.getRangeAt(0);
   for(const side of ['A','B']){
    const node=document.getElementById('text-'+side);if(!node||!node.contains(range.startContainer)||!node.contains(range.endContainer))continue;
    const text=range.toString();if(text.length<2||text.length>selectionPolicy.maxTextLength)return null;
    const prefix=range.cloneRange();prefix.selectNodeContents(node);prefix.setEnd(range.startContainer,range.startOffset);
    const start=prefix.toString().length;if(displayText(pair!,side).slice(start,start+text.length)!==text)return null;
    const clip=node.getBoundingClientRect();const rects=Array.from(range.getClientRects()).filter(r=>r.right>Math.max(0,clip.left)&&r.left<Math.min(innerWidth,clip.right)&&r.bottom>Math.max(0,clip.top)&&r.top<Math.min(innerHeight,clip.bottom)).slice(0,32).map(r=>({x:Math.round(r.x),y:Math.round(r.y),width:Math.round(r.width),height:Math.round(r.height)}));
    if(!rects.length)return null;
    return {key:side+':'+start+':'+(start+text.length),side,text,start,end:start+text.length,rects};
   }return null;
  }
  function send(phase:SelectionDwell['phase']){if(!track||track.elapsed<selectionPolicy.thresholdMs)return;handler.current({...track.data,phase,durationMs:Math.floor(track.elapsed)});track.sent=track.elapsed;}
  function finish(){if(track){const now=performance.now();track.elapsed+=Math.min(Math.max(0,now-track.last),500);send('end');track=null;}}
  function sync(){const found=snapshot(),now=performance.now();if(!found){finish();return;}if(track&&track.key!==found.key)finish();
   if(!track){track={key:found.key,data:{policyVersion:selectionPolicy.version,thresholdMs:selectionPolicy.thresholdMs,id:crypto.randomUUID(),phase:'start',...found,scope:'full',startedAt:Date.now(),durationMs:0,stage},elapsed:0,last:now,sent:0};return;}
   track.elapsed+=Math.min(Math.max(0,now-track.last),500);track.last=now;track.data.rects=found.rects;
   if(track.elapsed>=selectionPolicy.thresholdMs&&!track.sent)send('start');else if(track.sent&&track.elapsed-track.sent>=selectionPolicy.checkpointMs)send('update');
  }
  end.current=finish;document.addEventListener('selectionchange',sync);window.addEventListener('blur',finish);document.addEventListener('visibilitychange',sync);window.addEventListener('focus',sync);
  const timer=setInterval(sync,250);sync();return()=>{finish();clearInterval(timer);document.removeEventListener('selectionchange',sync);window.removeEventListener('blur',finish);document.removeEventListener('visibilitychange',sync);window.removeEventListener('focus',sync);end.current=()=>{};};
 },[pair?.id,stage]);
 return ()=>end.current();
}
