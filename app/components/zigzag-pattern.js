import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ZigzagPatternComponent extends Component {
  @tracked output = '';
  @tracked timeout = 200;

  get cols() {
    return (
      Math.ceil(this.args.word.length / (2 * this.args.rows - 2.0)) *
      (this.args.rows - 1)
    );
  }

  get matrix() {
    const rows = this.args.rows;
    const word = this.args.word;
    if (rows < 1 || word.length < 1) return [[]];
    if (rows == 1) return [[...word]];

    let matrix = Array(parseInt(rows))
      .fill(0)
      .map(() => Array(this.cols).fill(''));
    let currRow = 0;
    let currCol = 0;
    let currStringIndex = 0;

    // create visualization, use more efficient algorithm to generate final string
    while (currStringIndex < word.length) {
      while (currRow < rows && currStringIndex < word.length) {
        matrix[currRow][currCol] = word[currStringIndex];
        currRow++;
        currStringIndex++;
      }

      currRow -= 2;
      currCol++;

      let colCheck = currRow > 0 && currCol < this.cols;
      while (colCheck && currStringIndex < word.length) {
        matrix[currRow][currCol] = word[currStringIndex];
        currRow--;
        currCol++;
        currStringIndex++;
        colCheck = currRow > 0 && currCol < this.cols;
      }
    }

    return matrix;
  }

  @action
  run() {
    document.getElementById('run').setAttribute('disabled', true);
    const matrix = document.getElementById('zigzag').children;

    // reset
    this.output = '';
    for (let row of matrix) {
      for (let col of row.children) {
        let classes = col.classList;
        classes.forEach((cls) => {
          if (cls.startsWith('row')) {
            col.classList.remove(cls);
          }
        });
      }
    }

    let timeout = parseInt(this.timeout);
    for (let row = 0; row < matrix.length; row++) {
      for (let col of matrix[row].children) {
        if (col.innerHTML != '') {
          //console.log(timeout)
          setTimeout(() => {
            col.classList.add(`row${row}`);
            this.output += col.innerHTML;
          }, timeout);
          timeout += parseInt(this.timeout);
        }
      }
    }
    setTimeout(
      () => document.getElementById('run').removeAttribute('disabled'),
      timeout
    );
  }
}
