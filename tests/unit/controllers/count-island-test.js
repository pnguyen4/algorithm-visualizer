import { module, test } from 'qunit';
import { setupTest } from 'algorithm-visualizer/tests/helpers';

module('Unit | Controller | count-island', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:count-island');
    assert.ok(controller);
  });
});
