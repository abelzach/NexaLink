import React, { Component } from 'react';
import _ from 'lodash'; // Import lodash

class Puzzle16 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: _.shuffle(_.range(0, 16))
    };
  }

  // updatePosition = (index) => {
  //   let { positions } = this.state;
  //   let emptyIndex = positions.indexOf(0);
  //   let targetIndex = positions.indexOf(index);
  //   const dif = Math.abs(targetIndex - emptyIndex);

  //   if (dif === 1 || dif === 4) {
  //     positions[emptyIndex] = index;
  //     positions[targetIndex] = 0;
  //     this.setState({ positions });

  //     let win = _.every(positions, (value, index, array) => {
  //       value = value || 16;
  //       return index === 0 || parseInt(array[index - 1]) <= parseInt(value);
  //     });

  //     if (win) {
  //       window.alert('You Win!!!');
  //     }
  //   }
  // };
  updatePosition = (index) => {
    let { positions } = this.state;
    let emptyIndex = positions.indexOf(0);
    let targetIndex = positions.indexOf(index);
    const dif = Math.abs(targetIndex - emptyIndex);
  
    if (dif === 1 || dif === 4) {
      positions[emptyIndex] = index;
      positions[targetIndex] = 0;
      this.setState({ positions });
      console.log('Position :: ',positions);
  
      // Define the correct order for the puzzle
      const correctOrder = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
      console.log('Correct order :: ',correctOrder);
  
      // Check if the current positions match the correct order
      const isGameWon = _.isEqual(positions, correctOrder);
  
      if (isGameWon) {
        this.props.onGameWin(true);
        window.alert('You Win!!!');
      }
    }
  };

  render() {
    const layout = _.range(0, 16).map((n) => {
      const row = Math.floor(n / 4);
      const col = n % 4;
      return [80 * col, 80 * row];
    });

    return (
      <div className="game">
        {this.state.positions.map((i, key) => {
          const cellClass = key ? 'cell' : 'empty cell';
          const [x, y] = layout[this.state.positions.indexOf(key)];

          return (
            <div
              key={key}
              className={cellClass}
              onClick={() => this.updatePosition(key)}
              style={{ transform: `translate3d(${x}px,${y}px,0) scale(1.1)` }}
            >
              {key}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Puzzle16;
