import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return Ember.RSVP.hash({
            user: this.store.findRecord('user', 1),
            chirps: this.store.findAll('chirp')
        });
    },
    beforeModel: function() {
        if (!this.get('session.isAuthenticated')) {
            this.transitionTo('index');
        }
    }
});
