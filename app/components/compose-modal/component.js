import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    focusOnTextarea: Ember.on('didInsertElement', function() {
        Ember.run.scheduleOnce('afterRender', () => {
            this.$().find('textarea').focus();
        });
    }),
    chirpText: '',

    remainingChars: Ember.computed('chirpText', function() {
        return 140 - this.get('chirpText').length;
    }),
    noCharsLeft: Ember.computed('remainingChars', function() {
        return (this.get('remainingChars') < 0);
    }),
    actions: {
        postChirp: function() {
            // Retrieve the value of {{textarea}}
            var text = this.get('chirpText');
            if (this.get('noCharsLeft')) {
                swal("Woops!", "You have too many characters in your chirp!", "error");
                return false;
            }
            var chirpData = {
                text: text,
                createdAt: new Date()
            };

            // Create the record
            var newChirp = this.get('store').createRecord('chirp', chirpData);

            // Save the record so that it shows up in the DOM
            return newChirp.save().then(() => {
                this.attrs.dismiss(); // Bubble up the action
            });
        }
    }
});
