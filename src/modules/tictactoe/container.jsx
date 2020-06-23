import React, { Component } from 'react';
import './style.css';

// This is a class because it requires state management
class TicTacToe extends Component {
  constructor(props) {
    super(props);

    // within our state we store 3 things
    // boardState: this resembles the tictactoe board, 3 rows and 3 columns
    // checked: this determines if an X or a Y is added to the board on click
    // mousePosition: this is updated everytime the mouse is moved within the canvas
    this.state = {
      boardState: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      canvasLocation: 0,
      currentPlayer: 'X',
      mousePosition: {
        x: 0,
        y: 0,
      },
    };
  }

  // this draws our board when the page first loads (load causes componentDidMount function to run)
  componentDidMount() {
    const canvas = window.document.querySelector('canvas');
    const canvasLocation = canvas.getBoundingClientRect();
    this.setState({ canvasLocation });
    this.renderBoard(this.state.boardState)
  }

  // render is where you put the HTML that you want react to display
  render() {
    return (
      <>
        <h1>TicTacToe (aka Naughts & Crosses)</h1>
        <div>
          {/* onMouseMove: triggered everytime the mouse is moved and calls function handleMouse */}
          {/* onClick: triggered everytime a mouse click occurs */}
          {/* canvas: this is where board is displayed */}
          <canvas
            onMouseMove={this.handleMouse}
            onClick={this.handleClick}
            id="canvas0"
            width="480"
            height="480"
            className="board"
          />
        </div>
        {/* this container is where you select which player is currently up: X or O */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>
            {/* when you check this input, then X is up for play */}
            <input
              checked={this.state.currentPlayer === 'X'}
              type="radio"
              name="group1"
              value="X"
              id="radiox"
              onChange={() => this.setState({ currentPlayer: 'X' })}
            /> Team X
          </span>
          <span>
            {/* when you check this input, then O is up for play */}
            <input
              checked={this.state.currentPlayer === 'O'}
              type="radio"
              name="group1"
              value="Y"
              onChange={() => this.setState({ currentPlayer: 'O' })}
            /> Team O
          </span>
          </div>
      </>
    )
  }

  // handleMouse gets the mouse event passed in, it then gets the [X, Y] position
  handleMouse = (e) => {
    this.setState({
      mousePosition: {
        x: e.clientX,
        y: e.clientY,
      }
    })
  }

  // handleClick is ran when user clicks within the canvas
  // it gets the mouseposition, checked, boardState, from the component state management
  // it gets the mousePosition and subtracts canvasLocation to get mouse position within the canvas
  // then the board array is updated to show X or O
  handleClick = () => {
    const { boardState, currentPlayer, mousePosition, canvasLocation } = this.state;

    const locY = mousePosition.y - canvasLocation.top;
    const locX = mousePosition.x - canvasLocation.left;

    const floor =  Math.floor(locY / 160);
    const ceil = Math.floor(locX / 160);

    boardState[floor][ceil] = currentPlayer;
    this.renderBoard(boardState);
  }


  // this renders the canvas using the canvas library included in basic HTM
  renderBoard = (state) => {
    // console.log(JSON.stringify(state));
    var c=document.getElementById("canvas0");
    if (c) {
      var ctx=c.getContext("2d");

      //clear the board
      ctx.fillStyle="#ffffff";
      ctx.fillRect(0, 0, 480, 480);

      //draw the vertical & horizontal lines
      ctx.fillStyle="#000000";
      ctx.fillRect(157, 0, 4, 480);
      ctx.fillRect(317, 0, 4, 480);
      ctx.fillRect(0, 157, 480, 4);
      ctx.fillRect(0, 317, 480, 4);

      //draw the x's and o's
      ctx.font = '160px sans-serif';
      ctx.textBaseline = 'top';

      for(let y = 0; y < state.length; y++) {
        for(let x = 0; x < state[y].length; x++) {
          const c = state[y][x];
          if(c != null) {
            ctx.fillText(c, x*160 + 20, y*160 - 10);
          }
        }
      }
    }
  }
}

export default TicTacToe;
