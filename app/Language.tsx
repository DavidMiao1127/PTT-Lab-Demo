'use client';
import {createContext,useContext,useEffect,useState} from 'react';
import {Languages} from 'lucide-react';
import {translate,type Language} from '../lib/translations';
const Context=createContext<{language:Language;setLanguage:(language:Language)=>void;t:(value:string)=>string}>({language:'zh',setLanguage:()=>{},t:v=>v});
export function LanguageProvider({children}:{children:React.ReactNode}){
 const [language,setLanguage]=useState<Language>('zh');
 useEffect(()=>{const saved=localStorage.getItem('apt-demo-language');if(saved==='en'||saved==='zh')setLanguage(saved);},[]);
 useEffect(()=>{localStorage.setItem('apt-demo-language',language);document.documentElement.lang=language==='en'?'en':'zh-CN';document.title=language==='en'?'Personalized Turing Test Annotation':'个性化图灵测试标注平台';},[language]);
 return <Context.Provider value={{language,setLanguage,t:value=>translate(value,language)}}>{children}</Context.Provider>;
}
export const useLanguage=()=>useContext(Context);
export function LanguageSwitch(){const {language,setLanguage}=useLanguage();return <div className="language-switch" aria-label="Language / 语言"><Languages size={14}/><button type="button" aria-pressed={language==='zh'} onClick={()=>setLanguage('zh')}>中文</button><span>/</span><button type="button" aria-pressed={language==='en'} onClick={()=>setLanguage('en')}>English</button></div>;}
