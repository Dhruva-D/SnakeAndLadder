import React from 'react';
import './Board.css';
import Player from './Player';

const Board = ({ p1Position, p2Position }) => {
  // Generate board cells (100 to 1)
  const cells = [];
  for (let i = 100; i >= 1; i--) {
    cells.push(
      <div key={i} className="box" id={`b${i}`}>
        {i}
      </div>
    );
  }

  return (
    <div className="board-wrapper">
      <div className="cont">
        <img src="/bg/board1.jpg" alt="Game Board" id="boardimg" />
        {cells}
        <Player player={1} position={p1Position} />
        <Player player={2} position={p2Position} />
      </div>
    </div>
  );
};

export default Board;
