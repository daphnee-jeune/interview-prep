import './App.css'
import { Button } from './components/Button'
import { TextField } from './components/Textfield'

function App() {

  return (
    <>
      <Button variant='secondary' size='md' children={<span>Click me</span>} />
      <TextField label='Text field: ' />
    </>
  )
}

export default App
