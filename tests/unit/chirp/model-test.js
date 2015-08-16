import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember'; 

moduleForModel('chirp', 'Unit | Model | chirp', {
    needs: ['model:user'] 
});

test('it exists', function(assert) {
  var model = this.subject();
  assert.ok(!!model);
});

test('user relationship', function() {
    var Chirp = this.store().modelFor('chirp');
    var relationship = Ember.get(Chirp, 'relationshipsByName').get('user');
    equal(relationship.key, 'user');
    equal(relationship.kind, 'belongsTo');
});
