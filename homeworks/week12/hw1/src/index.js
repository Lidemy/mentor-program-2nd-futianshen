import React from 'react'
import ReactDOM from 'react-dom'

class List extends React.Component {
  constructor (props) { // 如果沒有初始的 state 還需要 constructor 嗎？
    super(props) 
  }
  /* version1 */
  deleteTodoClick = () => { // 怎麼刪除 list ？狀態在哪裡就要改哪裡。
    console.log(this.props)
    const {item, deleteTodo} = this.props
    console.log(deleteTodo)
    console.log(item)
    console.log(deleteTodo(item))
    deleteTodo(item)
  }

  render() {
    console.log('ListItem Render')
    const {item} = this.props // 用 let 和用 const 有差嗎 ？差在哪 ？
    return (
      /* version1 */
      <li>{item.id}: {item.content} <button onClick={this.deleteTodoClick}>X</button></li>
    ) // onClick{} 裡面的 function 前面要加 this
  }
}

class App extends React.Component { 
  constructor (props) { 
    super(props) 
    this.state = {
      inputValue: '',
      todoList: [],
      listItemId: 0 // 這行寫在 this.state 裡面，和寫在 this.state 外面。 this.listItemId 有什麼差別 ？
    }
  }
  inputChange = (e) => { // 為什麼 function 不用宣告 ？
    this.setState({
      inputValue: e.target.value
    })
  }
  addTodoClick = () => {
    const { todoList } = this.state
    const { listItemId } = this.state
    const { inputValue } = this.state
    let id = listItemId // 不能直接改變 state 的數值
    this.setState({ 
      inputValue: '',
      todoList: [...todoList, {
        id: id++,
        content: inputValue
      }],
      listItemId: listItemId + 1
    })
  }
  /* version1 */
  deleteTodo = (todo) => {
    const { todoList } = this.state
    this.setState({
      todoList: todoList.filter(item => item.id !== todo.id)
    })
  /* version2 */
  /* removeTodo = (id) => {
    const { todoList } = this.state
    this.setState({
      todoList: todoList.filter(item => item.id !== id)
    }) */

  }
  render () {
    const { todoList } = this.state
    const { inputValue } = this.state
    console.log('Rerender')
    console.log('Todolist', todoList )
    console.log('inputValue', inputValue)
    return (
      <div>
        <input value={inputValue} onChange={this.inputChange} />
        <button onClick={this.addTodoClick} >Add Todo</button>
        <ul>
          {/* version1 */}
          {todoList.map(item => <List key={item.id} item={item} deleteTodo={this.deleteTodo} />)} {/* key 不會經由 props 傳送到 class List */}

          {/* version2 */}
          {/* todoList.map(item => <List key={item.id} item={item} removeTodo={this.removeTodo}/>) */}

        </ul>
      </div>
    )
  }
} 

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
