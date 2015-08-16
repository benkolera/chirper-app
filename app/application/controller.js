import Ember from 'ember';

export default Ember.Controller.extend({
    appName: "chirper",
    showingComposeModal: false,

    actions: {
        toggleComposeModal: function() {
            // Toggle boolean value
            this.set('showingComposeModal', !this.get('showingComposeModal'));
        }
    }
});
