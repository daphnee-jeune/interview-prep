import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Score from './exercises/async-callback-stale-state'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Score />
  </StrictMode>,
)
