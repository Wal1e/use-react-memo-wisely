import './App.css';
import React,  { useEffect, useState ,useRef } from 'react';

const Updates = ({ count }) => (
  <div>更新次数：{ count }</div>
)

const MemoCom = React.memo(()=>{
  const leftRef = useRef(0)
  return <div className='leftCom'>
    <div>memo:</div>
    <Updates count={leftRef.current++} />
  </div>
})

// const MemoCom = React.memo(()=>{
//   let leftRef = useRef(0)
//   return <Updates count={leftRef.current++}></Updates>
// }, (prevProps, nextProps) => {
//   return prevProps.data.name === nextProps.data.name
// })

const RightCom = ()=>{
  const rightRef = useRef(0)
  return <div className='rightCom'>
    <div>no-memo:</div>
    <Updates count={rightRef.current++} />
  </div>
  
}

const App = () => {
  const foo = 'foo'
  const data = {name:'memo'}
  // const data = React.memo(()=>({
  //   name:'memo'
  // }), [])
  const testFn = ()=>{
    console.log('testFn')
  }
  // const testFn = useCallback(()=>{
  //   console.log('testFn')
  // },[])

  const [text, setText] = useState('')
  const updates = useRef(0)

  useEffect(()=>{
    updates.current++
  })
  return (
    <div className="App">
      <div>
        <Updates count={updates.current} />
      </div>
      <input value={text} placeholder="请输入" onChange={(e) => setText(e.target.value)} />
      <div>
        <MemoCom foo={foo} />
        <RightCom />
      </div>
    </div>
  );
}

export default App;
