import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PlayerBridge } from './PlayerBridge'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlayerBridge />
  </StrictMode>,
)