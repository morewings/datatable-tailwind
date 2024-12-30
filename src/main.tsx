import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@phosphor-icons/web/bold';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
