/* eslint-disable prettier/prettier */
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ZigzagController extends Controller {
  @tracked word = 'PAYPALISHIRING';
  @tracked rows = 1;

  get formstatus() {
    if (this.word.length == 0)
      return 'Please enter a string.';
    if (this.word.length > 30)
      return 'Demo limited to 30 characters.'
    if (isNaN(parseInt(this.rows)))
      return 'Please enter a valid number.'
    if (this.rows <= 0)
      return 'Row must be at least size 1.';
    if (this.rows > 7)
      return 'Demo limited to 7 rows.'
    if (this.rows > this.word.length)
      return 'Rows cannot be larger than input string.';
    return '';
  }
}
