import { createRoot } from 'react-dom/client'
import { Providers } from './providers/index.jsx'
import './index.css'

// localStorage.clear();

createRoot(document.getElementById('root')).render(
  <Providers />
)
