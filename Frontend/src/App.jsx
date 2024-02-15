import { useState } from 'react'
import { Button } from "rsuite";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button appearance="primary">Hello World</Button>
    </>
  );
}

export default App
