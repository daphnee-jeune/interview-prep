import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import InfiniteRerender from './exercises/infinite-rerender'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <InfiniteRerender /> */}
  </StrictMode>,
)
