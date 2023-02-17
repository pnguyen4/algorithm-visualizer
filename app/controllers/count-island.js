import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CountIslandController extends Controller {
  @tracked rows = 8;
  @tracked cols = 8;
  @tracked count = 0;
  @tracked timeout = 200;

  get matrix() {
    if (this.rows < 1 || this.cols < 1) return [[]];

    let matrix = Array(parseInt(this.rows))
      .fill(0)
      .map(() => Array(parseInt(this.cols)).fill('W'));

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
  async run() {
    this.count = 0;
    document.getElementById('run').setAttribute('disabled', true);
    const matrix = document.getElementById('islands').children;

    // reset
    for (let row of matrix) {
      for (let col of row.children) {
        col.classList.remove('visited');
      }
    }

    let n = this.rows;
    let m = this.cols;

    const dfs = async (row, col) => {
      if (row < 0 || col < 0 || row >= n || col >= m) return;
      let cell = matrix[row].children[col];
      if (cell.innerHTML == 'W') return;
      let classes = cell.classList;
      if (classes.contains('water') || classes.contains('visited')) return;

      // just mark visited land as water instead of using visited set
      matrix[row].children[col].classList.add('search');
      await this.sleep(this.timeout / 128);
      matrix[row].children[col].classList.add('visited');
      await this.sleep(this.timeout / 128);
      matrix[row].children[col].classList.remove('search');
      dfs(row - 1, col);
      dfs(row + 1, col);
      dfs(row, col - 1);
      dfs(row, col + 1);
    };

    for (let row = 0; row < n; row++) {
      for (let col = 0; col < m; col++) {
        await this.sleep(this.timeout);
        let cell = matrix[row].children[col];
        cell.classList.add('current');
        await this.sleep(this.timeout);
        if (cell.innerHTML == 'L') {
          dfs(row, col);
          if (!cell.classList.contains('visited')) {
            this.count++;
          }
        }
        //await this.sleep(this.timeout);
        cell.classList.remove('current');
      }
    }

    await this.sleep(this.timeout);
    document.getElementById('run').removeAttribute('disabled');
  }
}
