import { module, test } from 'qunit';
import { setupTest } from 'algorithm-visualizer/tests/helpers';

module('Unit | Route | zigzag', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:zigzag');
    assert.ok(route);
  });
});
