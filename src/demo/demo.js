
class Parent extends Component() {
  // 状态管理还是要依赖 class Component
  counts = 0;
  render(){
    <Child counts={this.state.counts} setCounts = { (x) => this.setState({counts: counts++})} />
  }
}

function Child(props){
  const handleClick = () => {
    props.setCounts(props.counts)
  }

  return (
    <>
      <div>{props.counts}</div>
      <button onClick={handleClick}>increase counts</button>
    </>
  )
}

// Function Component是纯函数，利于组件复用和测试
// Function Component的问题在于只是单纯接收props、绑定时间、返回jsx，其本身是无状态的组件，依赖props传入的handle来响应数据的变更
// 所以Function Component不能脱离Class Component来存在

// 所以函数式组件能否脱离类组件独立存在，关键在于让函数组件自身具备状态处理的能力，即在组件首次render后，组件自身能通过某种机制在出发状态的变更并且引起re-render
// 而这种机制就是Hooks