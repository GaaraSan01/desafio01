import { useState } from 'react'
import './App.css'

function App() {

  const [list, setList] = useState([])
  const [undid, setUndid] = useState([])

  

  const handleClick = (event) => {

    const newClick = {
      clientX: event.clientX,
      clientY: event.clientY
    }

    console.log(event)

    setList((prev) => [...prev, newClick])
    setUndid([])
  }

  const handleUndo = (event) => {
    event.stopPropagation()

    if(list.length === 0){
      return;
    }

    const lastItem = list[list.length - 1]
    setUndid((prev) => [...prev, lastItem])

    setList((prev) => {
      const newArray = [...prev].slice(0, -1)
      return newArray
    })
  }

  
  

  const handleRedo = (event) => {
    event.stopPropagation()

    if(undid.length === 0){
      return;
    }

    const reconveredDot = undid[undid.length - 1]

    setUndid((prev) => {
      const newArray = [...prev].slice(0, -1)
      return newArray
    })

    setList((prev) => [...prev, reconveredDot])
  }

  return (
    <div className="App">
      <div className="page" onClick={handleClick}>
        <div className="botao">
          <button onClick={handleUndo}>Desfazer</button>
          <button onClick={handleRedo}>Refazer</button>
        </div>
        
        {list.map((item, index) => <span className='ponto' key={index}  style={{left: item.clientX, top: item.clientY}}/>)}
      </div>
    </div>
  )
}

export default App
