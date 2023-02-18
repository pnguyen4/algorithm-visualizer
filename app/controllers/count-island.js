import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class CountIslandController extends Controller {
  @tracked rows = 8;
  @tracked cols = 8;
}
