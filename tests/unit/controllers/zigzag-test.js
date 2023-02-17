import { module, test } from 'qunit';
import { setupTest } from 'algorithm-visualizer/tests/helpers';

module('Unit | Controller | zigzag', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:zigzag');
    assert.ok(controller);
  });
});
