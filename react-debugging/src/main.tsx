import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UserProfile from './exercises/race-condition'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProfile userId='1' />
  </StrictMode>,
)
