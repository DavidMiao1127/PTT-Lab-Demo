import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from './Language';
import Platform from './Platform';
import Admin from './admin/page';
import './globals.css';

function Demo() {
  const [admin, setAdmin] = useState(location.hash === '#admin');
  useEffect(() => {
    const switchView = () => {
      setAdmin(location.hash === '#admin');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', switchView);
    return () => window.removeEventListener('hashchange', switchView);
  }, []);
  return <LanguageProvider>{admin ? <Admin /> : <Platform />}</LanguageProvider>;
}

createRoot(document.getElementById('root')!).render(<Demo />);
