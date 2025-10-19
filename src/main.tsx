import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Optionnel: désactiver les logs console selon l'env
if (import.meta.env.VITE_DISABLE_LOGS === 'true') {
  const noop = () => {};
  console.log = noop;
  console.debug = noop;
  console.info = noop;
}

createRoot(document.getElementById("root")!).render(
    <App />
);
