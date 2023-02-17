import { module, test } from 'qunit';
import { setupTest } from 'algorithm-visualizer/tests/helpers';

module('Unit | Route | count-island', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:count-island');
    assert.ok(route);
  });
});
