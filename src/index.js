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
      let flag = [];
      flag.push([i,0])
      for(let j = 1 ;j < cols ; j++) {
        if(squares[i][j] !== squares[i][0]) {
          flag = false;
          break;
        } else {
          flag.push([i,j])
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
      // let flag = true;
      let flag = [];
      flag.push([0,i])
      for(let j = 1 ;j < rows ; j++) {
        if(squares[j][i] !== squares[0][i]) {
          flag = false;
          break;
        } else {
          flag.push([j,i])
        }
      }
      if(flag) {
        // 如果有一个成功了则直接跳出来！
        return flag
      }
    }
  }
  let flag = [];
  for(let i = 0; i < cols ; i++) {
    if(squares[0][0]) {
      if(squares[0][0] !== squares[i][i]) {
        flag = false;
        break;
      } else {
        flag.push([i,i])
      }
    } else {
      flag = false;
    }
  }
  if(flag) {

    return flag
  }
  flag = [];
  for(let i = 0, j = cols -1 ; i < cols ; i++, j--) {
    if(squares[0][cols-1]) {
      if(squares[0][cols-1] !== squares[i][j]) {
        flag = false;
        break;
      } else {
        flag.push([i,j])
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
  function deepClone(oj) {
    if(Array.isArray(oj)) {
      return oj.map(el => {
        return deepClone(el)
      })
    }
    if(typeof oj === 'object' && oj) {
      const object = {};
      for (const key of oj) {
         object[key] = oj[key]
      }
      return object;
    }
    if(typeof oj !== 'object') {
      return oj;
    }
  }
  function BoardRow(props) {
    if(Array.isArray(props.ele)) {
      return (
        <div className="board-row" key={props.y}>
        { 
          props.ele.map((item, x)=> {
          return (<Square value= {item} 
            key= {x}
            onClick = {() => 
              props.onClick(x,props.y)
            }
          />);
          })
        }
        </div>
      )
    } else return null
  }
  class Board extends React.Component {
    renderSquare() {
      // x 表示横坐标，y表示纵坐标
     return this.props.squares.map((ele, y) => (<BoardRow onClick={this.props.onClick} ele={ele} y={y} /> ))
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
                // 在此处修改 生成的棋盘个数即可生成对应的数量，
                squares: this.generate(4,4)
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
        const current = history[this.state.stepNumber];
        const squares = deepClone(current.squares);
        if(squares[y][x] || calculateWinner(squares)) {
          return
        }
        squares[y][x] = this.state.xIsNext ?'X': 'O';
        this.setState({
        history: history.concat([{
            squares,
            locat: `(${x+1}, ${y+1})`
        }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
        })
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
      const winner = calculateWinner(current.squares);

      // const winner = 0;
      const moves = history.map((step, move) => {
        const desc = move ?
        'Move #' + step.locat :
        'Game start';
        return (
            <li key= {move}>
                <a href="#" key= {move} onClick={ () => this.jumpTo(move)}> {desc} </a>
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
  