import { module, test } from 'qunit';
import { setupRenderingTest } from 'algorithm-visualizer/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | island-grid', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<IslandGrid @rows={{1}} @cols={{1}}/>`);

    assert
      .dom(this.element)
      .hasText('Run 0 Click a cell to toggle between land and water. W');
  });
});
