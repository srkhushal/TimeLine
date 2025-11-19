import { createRoot } from 'react-dom/client'
import { Providers } from './providers/index.jsx'
import './index.css'
import "./utils/fixes"
// localStorage.clear();



createRoot(document.getElementById('root')).render(
  <Providers />
)
