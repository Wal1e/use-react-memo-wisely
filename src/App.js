import './App.css';
import { useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
function App() {
  const Updates = (count) => {
    return <div>更新次数：{count}</div>
  }

  const LeftCom = React.memo(()=>{
    let leftRef = React.ref(0)
    return <Updates count={leftRef.current++}></Updates>
  })

  const RightCom = ()=>{
    let rightRef = React.ref(0)
    return <Updates count={rightRef.current++}></Updates>
  }

  const [text, setText] = useState('')
  let updates = React.ref(0)

  useEffect(()=>{
    updates.current++
  })
  return (
    
    <div className="App">
      <Updates count={updates.current++}></Updates>
      <input value={text} placeholder='请输入' onChange={(e) => setText(e.target.value)}></input>

    </div>
  );
}

export default App;
