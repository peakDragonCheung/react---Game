import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
  function Square(props) {
    return (
        <button className="square" onClick= { props.onClick }>
         {props.value}
      </button>
    )
  }
  function calculateWinner(squares) {
  const rows = squares.length;
  const cols = squares[0].length;
  // 纵向判断是否有值相等
  for(let i = 0; i < rows; i++) {
    if(squares[i][0]) {
      let flag = true;
      for(let j = 1 ;j < cols ; j++) {
        if(squares[i][j] !== squares[i][0]) {
          flag = false;
          break;
        }
      }
      if(flag) {
        // 如果有一个成功了则直接跳出来！
        return flag
      }
    }
  }
  for(let i = 0; i < cols; i++) {
    if(squares[0][i]) {
      let flag = true;
      for(let j = 1 ;j < rows ; j++) {
        if(squares[j][i] !== squares[0][i]) {
          flag = false;
          break;
        }
      }
      if(flag) {
        // 如果有一个成功了则直接跳出来！
        return flag
      }
    }
  }
  let flag = true
  for(let i = 0; i < cols ; i++) {
    if(squares[0][0]) {
      if(squares[0][0] !== squares[i][i]) {
        flag = false;
        break;
      }
    } else {
      flag = false;
    }
  }
  flag = true
  for(let i = 0, j = cols -1 ; i < cols ; i++, j--) {
    if(squares[0][cols-1]) {
      if(squares[0][cols-1] !== squares[i][j]) {
        flag = false;
        break;
      }
    } else {
      flag = false;
    }
  }
  if(flag) {
    return flag
  }
  return false;
}
  class Board extends React.Component {
    renderSquare() {
      // x 表示横坐标，y表示纵坐标
     return this.props.squares.map((ele, y) => {
        if(Array.isArray(ele)) {
          return (
            <div className="board-row" key={y}>
            { 
              ele.map((item, x)=> {
              return (<Square value= {item} 
                key= {x}
                onClick = {() => 
                  this.props.onClick(x,y)
                }
              />);
              })
            }
            </div>
          )
        } else return null
      })
    }
    
    render(props) {
      return (
        <div>
        { this.renderSquare() }
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                // squares: new Array(9).fill(null)
                squares: this.generate(3,3)
            }],
            xIsNext: true,
            stepNumber: 0,
        }
    }
    // row 表示几行，col表示多少列
    generate(row, col) {
      const arr = [];
      for(let i = 0 ; i< row; i++)
      {  
        arr.push( Array(col).fill(null))
      }
      return arr;
    }
    handleClick(x,y) {
        const history = this.state.history;
        const current = history[history.length -1];
        const squares = current.squares.slice();
        if(squares[y][x] || calculateWinner(squares)) {
          return
        }
        squares[y][x] = this.state.xIsNext ?'X': 'O';
        this.setState({
        history: history.concat([{
            squares
        }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
        })
        // if(!squares[i] && !calculateWinner(squares)) {
        // squares[i] = this.state.xIsNext ?'X': 'O';
        // this.setState({
        //     history: history.concat([{
        //         squares
        //     }]),
        //     xIsNext: !this.state.xIsNext,
        //     stepNumber: history.length,
        // })
        // }
    }
    jumpTo(step) {
      this.setState({
          stepNumber: step,
          xIsNext: (step % 2) ? false : true,
      })
    }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      // const winner = calculateWinner(current.squares);

      const winner = 0;
      const moves = history.map((step, move) => {
        const desc = move ?
        'Move #' + move :
        'Game start';
        return (
            <li>
                <a href="123" key= {move} onClick={ () => this.jumpTo(move)}> {desc} </a>
            </li>
        )
      })
      let status;
      if(winner) {
        status = 'Winner' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
            squares = { current.squares }
            onClick = { (x,y) => this.handleClick(x,y) }
            />
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <ol>{ moves }</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  