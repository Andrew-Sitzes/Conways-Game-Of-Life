import React from "react";

class Buttons extends React.Component {
  handleSelect = (evt) => {
    this.props.gridSize(evt);
  };

  render() {
    return (
      <div className="center">
        <button className="button" onClick={this.props.playButton}>
          Play
        </button>
        <button className="button" onClick={this.props.pauseButton}>
          Pause
        </button>
        <button className="button" onClick={this.props.clear}>
          Clear
        </button>
        <button className="button" onClick={this.props.slow}>
          Fast
        </button>
        <button className="button" onClick={this.props.fast}>
          Slow
        </button>
        <button className="button" onClick={this.props.populate}>
          Populate
        </button>
        {/* <button className="button" onClick={this.props.preSet}>
          Preset
        </button> */}
        <button className="button" onClick={this.props.gridSize2}>
          Grid Size 1
        </button>
        <button className="button" onClick={this.props.gridSize}>
          Grid Size 2
        </button>
      </div>
    );
  }
}

export default Buttons;
