import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';



function Square(props) {

  return (
    <button className="square" onClick={props.onClick}>{props.value}</button>
  );

}


class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), xIsNext: true
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const updated_state = { squares: squares, xIsNext: !(this.state.xIsNext) };
    this.setState(updated_state);
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

//=============================== Calculating Winner ==========================
/*
[
  [0  1  2]
  [3  4  5]
  [6  7  8]
]
*/

function calculateWinner(squares){
  const lines = [
    [0,1,2], [3,4,5],[6,7,8],
    [0.3,6], // Horizontal
    [1,4,7], // Horizontal
    [3,5,8], // Horizontal
    [0,4,8], // Diagonal
    [6,4,2] // Diagonal
  ];

  for(let i = 0; i < lines.length; i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
    return null;
  }
}
