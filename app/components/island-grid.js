import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IslandGridComponent extends Component {
  @tracked count = 0;
  @tracked timeout = 200;

  get matrix() {
    if (this.args.rows < 1 || this.args.cols < 1) return [[]];

    let matrix = Array(parseInt(this.args.rows))
      .fill(0)
      .map(() => Array(parseInt(this.args.cols)).fill('W'));

    return matrix;
  }

  @action
  toggle(row, col) {
    const matrix = document.getElementById('islands').children;
    const element = matrix[row].children[col];
    element.innerHTML = element.innerHTML == 'W' ? 'L' : 'W';
    element.classList.toggle('water');
    element.classList.toggle('land');
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  @action
  run() {
    this.count = 0;
    const button = document.getElementById('run');
    console.log(button);
    button.setAttribute('disabled', true);
    console.log(button);
    const matrix = document.getElementById('islands').children;

    // reset
    for (let row of matrix) {
      for (let col of row.children) {
        col.classList.remove('visited');
      }
    }

    let n = this.args.rows;
    let m = this.args.cols;

    let dfs_speed = Math.floor(parseInt(this.timeout) / 22);
    const dfs = (row, col) => {
      if (row < 0 || col < 0 || row >= n || col >= m) return;
      let cell = matrix[row].children[col];
      if (cell.innerHTML == 'W') return;
      let classes = cell.classList;
      if (classes.contains('water') || classes.contains('visited')) return;

      // just mark visited land as water instead of using visited set
      matrix[row].children[col].classList.add('search');
      setTimeout(() => {
        matrix[row].children[col].classList.add('visited');
        dfs(row + 1, col);
        dfs(row, col - 1);
        dfs(row, col + 1);
        matrix[row].children[col].classList.remove('search');
        dfs(row - 1, col);
      }, dfs_speed);
    };

    let timeout = parseInt(this.timeout);

    for (let row = 0; row < n; row++) {
      for (let col = 0; col < m; col++) {
        let cell = matrix[row].children[col];
        setTimeout(() => {
          cell.classList.add('current');
          console.log('running...');
        }, timeout);
        timeout += parseInt(this.timeout);
        setTimeout(() => {
          if (cell.innerHTML == 'L') {
            dfs(row, col);
            if (!cell.classList.contains('visited')) {
              this.count++;
            }
          }
          cell.classList.remove('current');
        }, timeout);
        timeout += parseInt(this.timeout);
      }
    }

    setTimeout(
      () => document.getElementById('run').removeAttribute('disabled'),
      timeout
    );
  }

  // we can only use 'this' with an arrow function?
  reset = (timeout) => {
    console.log('change detected');
    timeout += timeout;
    while (timeout--) {
      clearTimeout(timeout);
    }
    this.count = 0;
    document.getElementById('run').removeAttribute('disabled');
  };

  willDestroy() {
    super.willDestroy(...arguments);
    console.log('leaving page');
    this.timeout += this.timeout;
    while (this.timeout--) {
      clearTimeout(this.timeout);
    }
  }
}
