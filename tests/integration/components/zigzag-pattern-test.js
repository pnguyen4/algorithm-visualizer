import { module, test } from 'qunit';
import { setupRenderingTest } from 'algorithm-visualizer/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | zigzag-pattern', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ZigzagPattern />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <ZigzagPattern>
        template block text
      </ZigzagPattern>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
