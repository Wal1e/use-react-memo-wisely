# use-react-memo-wisely

## Get Started
&emsp;&emsp;快速响应的UI深受用户的喜爱，对于用户来说，小于100毫秒的UI响应延迟是即时的，但当延迟达到100到300毫秒之间时，已经可以感知到变化，为了提高用户界面性能，React提供了更高阶的组件React.memo。当使用React.memo包装一个组件时，React会将被包装组件的渲染保存起来，在下次被使用且props没有发生变化时，则直接用保存的结果（即只要props参数没有发生改变，渲染结果也不会改变）

## Re-render in React
&emsp;&emsp;这里先简单铺垫一下，来聊一聊React是如何进行render和re-render，以此更好引出提升性能相关的话题，清楚渲染机同学可直接跳到下一段，当在React中讨论render的时，通常讲的的是render函数的执行，在函数式组件中，整个函数的执行等同于类组件中render函数的执行，但render函数的执行，并不意味着UI的更新。首先我们知道组件的state改变会执行re-render，如果该组件还有children，即使children的props没有任何改变，也会进行re-render，当react决定更新dom的时候，会首先更新当前组件，然后在和上次渲染的结果进行对比，如果不同才会更新dom。

&emsp;&emsp;先来一起看下这个例子，点击查看[demo](https://codepen.io/wal1e/pen/LYQjBmp)

```
const App = () => {
  const [msg, setMsg] = React.useState('');
  return (
    <>
      <Comment msg={msg} />
      <Comment />
    </>
  );
};​
```

&emsp;&emsp;当在父组件APP里改变msg的state时,因为state 的改变，父组件将会re-render，它的两个子组件也会re- render，即时第二个子组件没有接收任何的props，这就意味着render函数执行了三次，但是真正的Dom改变仅仅发生在被传入msg属性的子组件，但当render函数或者函数式组件重新执行的时候，里面的所有代码都将会在次被执行。

![avatar](http://m.qpic.cn/psc?/V51THoPy1K00071vRFGs1boXQx4NfRqy/bqQfVz5yrrGYSXMvKr.cqbkL2eSEVvQZEoDNV2EeMMGXJmG7sPcmfL6hAtzXh8G*E6bVZruinSKhIcpQ2xVdggEJBm3gViy1BQc9gHHQtJw!/b&bo=GgNzAgAAAAABF1g!&rf=viewer_4)

&emsp;&emsp;在这个例子里，react仅仅只需要维护一个很小的组件树，但是可以想象一下，在一个复杂的应用里，如果每个节点都有更多的子节点，而这些子节点又可能有子组件，会发生什么情况，我们将如何对此进行优化呢？
## 又一个例子
&emsp;&emsp;通过刚刚例子我们已经知道父组件在re-render时，其所有后续子组件都将重新渲染，无论其props是否已更改。开头已经说过React.memo会将被包装组件的渲染保存起来，在下次被使用且props没有发生变化时，则直接用保存的结果，一起在来看下另一个小例子，通过视图可以更形象化的来展示使用memo和不使用的对比效果，在输入框里输入任意内容，可看到update的次数变化，请点击我的[codeopen](https://codepen.io/wal1e/pen/BaYROQe)，在线查看具体代码效果。

![avatar](http://a1.qpic.cn/psc?/V51THoPy1K00071vRFGs1boXQx4NfRqy/bqQfVz5yrrGYSXMvKr.cqZ1bEyGJKJnEbi1ghaVjuelOvRsIhvSWSOvYghUQioMji3mmIAXUsWGufebEoVWCGb91eKo17phdQhw6F3cH52Y!/c&ek=1&kp=1&pt=0&bo=JQN3AgAAAAABF2M!&tl=1&vuin=987261988&tm=1653292800&dis_t=1653296389&dis_k=a871e9d6e3977e0ead4c3a74b9bfefb6&sce=60-2-2&rf=viewer_4)

&emsp;&emsp;橘色的组件里包括三个子组件，一个输入框和两个展示更新次数的组件，顶部的更新次数对应的是父组件，背景为黑色的是两个子组件，其中左侧的组件被包装在React.memo函数里，用来阻止当props没有改变时执行re-render操作。
## React.memo
&emsp;&emsp;接下来让我一起看下React.memo是如何工作的

&emsp;&emsp;React.memo允许你通过「记住」上一次的computions，在多次渲染之间缓存计算结果。react.memo工作的机制其实就是当函数组件在props没有变化时，渲染的结果也会和上次一样，然后该组件就会告诉react，这次你就别对我进行渲染啦，直接拿我上次的渲染结果就好了，这样还提升了render performance。有过类组件开发经验的同学想必已经想到shouldUpdateComponent，在我们从类组件转为函数式组件时，React.memo便是对应了shouldUpdateComponent。

## 常规用法
&emsp;&emsp;最基本的用法如下所示，就是使用React.memo包裹一个函数式组件，请点击[常规用法](https://codepen.io/wal1e/pen/BaYROQe)，在线查看具体代码效果。
```
const MemoCom = React.memo(()=>{
  let leftRef = useRef(0)
  return <Updates count={leftRef.current++}></Updates>
})
const App = () => {
  const [text, setText] = useState('')
  return (
    <div className="App">
       <MemoCom />
    </div>
  );
}
```
&emsp;&emsp;当父组件state改变执行re-render时，MemoCom会被阻止进行re-render，这个小小的改变将会帮你的组件提升渲染性能。

## prop是对象时
&emsp;&emsp;因为只对组件的属性进行浅比较，在re-render更新App时，data变量也被再次声明，这将导致对象在实际上并不一样，因为前后的data对象.有不同的的引用。
```
const MemoCom = React.memo(()=>{
  let leftRef = useRef(0)
  return <Updates count={leftRef.current++}></Updates>
}, (prevProps, nextProps) => {
  return prevProps.data.name === nextProps.data.name
})

const App = () => {
  const [text, setText] = useState('')
  const data = {name:'memo'}
  return (
    <div className="App">
       <MemoCom data={data}/>
    </div>
  );
}
```
&emsp;&emsp;React.memo用它的第二个参数提供了一种解法来解决这个问题，这个参数接受一个是否相等的函数，可以控制组件是否需要更新。点击查看[React.memo之prop是object类型](https://codepen.io/wal1e/pen/GRQvBMr)。

&emsp;&emsp;还有另外一种方式来解决该问题，可以使用React.memo来包裹该对象，这样就会缓存对象变量而不会在创造一个新的对象。
```
const data = React.memo(()=>({
  name:'memo'
}), [])
```

## prop是函数时
&emsp;&emsp;在js中，函数的行为和对象相似，也会导致我们之前遇到的相似问题，函数变量在每次组件更新的时候重新被声明，字组件就于是就认为函数对象被改变，因为有不同的引用，我们可以像处理对象一样，通过缓存函数来解决这个问题。
```
const testFn = useCallback(()=>{
   console.log('testFn')
},[])
```


