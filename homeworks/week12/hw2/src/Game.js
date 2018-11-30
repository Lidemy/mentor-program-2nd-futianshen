import React from 'react'
import { hot } from 'react-hot-loader'

function Square (props) { // function Component
  console.log('square render') // 怎麼使用 Life cycle 讓 square 不會 render 那麽多次 ?
  return ( 
    <button className="square" onClick={props.onClick}>
      <div className={props.status===null ? null : `chess${props.status ? "--black" : "--white"}`}></div>
    </button>
  )
}

class Board extends React.Component {
  render() {
    const {squares} = this.props
    return (
      <div className="game__board">
        {squares.map(square => 
          <Square 
            key={(square.x-1)*19+square.y} 
            x={square.x} 
            y={square.y} 
            status={square.status}
            onClick={() => this.props.onClick(square.x, square.y)}
          />
        )}
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) { // 要設定 this.state 才需要初始化 ?
    super(props)
    let squares = []
    for (let i=1; i<=19; i++) {
      for (let j=1; j<=19; j++) {
        squares.push({'x':i, 'y':j, 'status':null})
      }
    }
    this.state = {
      squares,
      winner: undefined,
      isBlack: true
    }
  }
  
  handleClick = (x, y) => {
    let {squares} = this.state
    let i = 19*(x-1)+(y-1)
    let {isBlack} = this.state
    let {winner} = this.state
    if (squares[i].status===null) { // 防止改變已經有值的 status
      squares[i].status = isBlack ? 1 : 0
      isBlack = !isBlack
    }
    if (winner===undefined) winner = whoWin(squares, x, y)
    else return
    this.setState({
      squares,
      winner,
      isBlack
    })
  } 

  render() {
    let {squares} = this.state
    const {isBlack} = this.state
    const {winner} = this.state
    let monitor
    if (winner!==undefined) {
      monitor = winner===1 ? `Winner: Black` : `Winner: White`
    } else {
      monitor = `Next player: ${isBlack ? 'Black' : 'White'}`
    }
    return (
      <main className="game">
        <Board 
          squares={squares} 
          onClick={(x, y) => this.handleClick(x ,y)} 
        />
        <div className="game__info">
          <h2 className="game__player">{monitor}</h2>
        </div>
      </main>
    )
  }
}

export default hot(module)(Game)

// 邏輯：找出自己位置，在4個不同方向，相對於所在位置的前後4個方塊(加自己一共9個)，從第一個方塊開始，判斷下一個方塊的顏色是否和自己的顏色相同，若連續四次相同，代表五子連線。
function whoWin(squares, x, y) { 
  
  let counter
  // 橫 
  counter = 0
  for (let i=x, j=y-4; j<=y+4 && (0<j && j<=18); j++) {
    let curr = 19*(i-1)+(j-1)
    let next = 19*(i-1)+j
    
    if (squares[curr].status!==null) {
      if (squares[curr].status===squares[next].status) {
        counter = counter+1
      } 
      if (counter === 4) {
        return squares[curr].status
      } 
    }
  }
  // 直
  counter = 0
  for (let i=x-4, j=y; i<=x+4 && (0<i && i<=18); i++) { 
    let curr = 19*(i-1)+(j-1)
    let next = 19*(i)+(j-1)
    if (squares[curr].status!==null) {
      if (squares[curr].status===squares[next].status) {
        counter = counter+1
      }
      if (counter === 4) {
        return squares[curr].status
      }  
    }
  }
  // 斜（左上->右下）
  counter = 0
  for (let i=x-4, j=y-4; i<=x+4 && (0<i && 0<j && i<=18 && j<=18); i++,j++) { 
    let curr = 19*(i-1)+(j-1)
    let next = 19*i+j
    if (squares[curr].status!==null) {
      if (squares[curr].status===squares[next].status) {
        counter = counter+1
      }
      if (counter === 4) {
        return squares[curr].status
      }  
    }
  } 
  // 斜（右上->左下）  
  counter = 0
  for (let i=x-4, j=y+4; i<=x+4 && (0<i && 0<j && i<=18 && j<=19); i++,j--) {
    let curr = 19*(i-1)+(j-1)
    let next = 19*i+(j-2)
    if (squares[curr].status!==null) {
      if (squares[curr].status===squares[next].status) {
        counter = counter+1
      }
      if (counter === 4) {
        return squares[curr].status
      }  
    }
  }
}