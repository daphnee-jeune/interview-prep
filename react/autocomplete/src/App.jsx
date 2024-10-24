import Input from './components/Input'
import "./App.css";

function App() {
  const data = [
    "Apple",
    "Banana",
    "Orange",
    "Pineapple",
    "Strawberry",
    "Blueberry",
    "Mango",
  ];
  return <>
    <Input suggestions={data} />
  </>;
}

export default App;
