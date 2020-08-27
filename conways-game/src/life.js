import React from "react";
import Grid from "./grid";
import Buttons from "./buttons";

class Life extends React.Component {
  constructor() {
    super();
    this.speed = 500;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      gridFull: Array(this.cols)
        .fill()
        .map(() => Array(this.rows).fill(false)),
    };
  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy,
    });
  };

  populate = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 3) === 2) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy,
    });
  };

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
  };

  slow = () => {
    this.speed = 100;
    this.playButton();
  };

  fast = () => {
    this.speed = 1000;
    this.playButton();
  };

  clear = () => {
    var grid = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false));
    this.setState({
      gridFull: grid,
      generation: 0,
    });
  };

  gridSize = (size) => {
    switch (size) {
      case "2":
        this.cols = 50;
        this.rows = 30;
        break;
      default:
        this.cols = 70;
        this.rows = 50;
        break;
    }
  };

  gridSize2 = (size) => {
    switch (size) {
      case "2":
        this.cols = 70;
        this.rows = 50;
        break;
      default:
        this.cols = 50;
        this.rows = 30;
        break;
    }
  };

  // preSet = () => {
  //   let gridCopy = arrayClone(this.state.gridFull) * 4;
  //   for (let i = 0; i < this.rows; i++) {
  //     for (let j = 0; j < this.cols; j++) {
  //       if (this.state.gridFull === 0) {
  //         gridCopy[i][j] = true;
  //       }
  //     }
  //   }
  // };

  play = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1)
          if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1,
    });
  };

  componentDidMount() {
    this.populate();
    this.playButton();
    // this.preSet();
  }

  render() {
    return (
      <div>
        <h1>Conways Game of Life</h1>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          populate={this.populate}
          gridSize={this.gridSize}
          gridSize2={this.gridSize2}
          // preSet={this.preSet}
        />
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h1>Generations: {this.state.generation}</h1>
        <h3>The Rules:</h3>
        <h5>
          Any live cell with fewer than two live neighbours dies, as if by
          underpopulation.
          <br />
          Any live cell with two or three live neighbours lives on to the next
          generation.
          <br />
          Any live cell with more than three live neighbours dies, as if by
          overpopulation.
          <br />
          Any dead cell with exactly three live neighbours becomes a live cell,
          as if by reproduction.
        </h5>
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default Life;
