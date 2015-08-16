import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
    authenticator: 'simple-auth-authenticator:oauth2-password-grant',
    running: false,
    actions: {
        login: function() {
            var username = this.get('username');
            var password = this.get('password');
            this.set('running',true);
            this.get('session').authenticate(this.authenticator, {
                identification: username,
                password: password
            }).then(() => {
                this.transitionToRoute('home');
            }, () => {
                this.set('errorMessage', 'Wrong username or password!');
            }).finally(() => {
                this.set('running',false);
            });
        },
        signup: function () {
            var userData = {
                username: this.get('username'),
                password: this.get('password')
            };

            this.set('running',true);
            Ember.$.ajax({
                type: 'POST',
                url: config.apiURL + '/signup',
                dataType: 'json',
                data: userData
            }).done(() => {
                console.log("Created!");
                this.send('login');
            }).fail(() => {
                this.set('errorMessage', "Couldn't sign up!");
            }).finally(() => {
                this.set('running',false);
            });
        }
    },
    valuesChanged: Ember.observer('username', 'password', function() {
        this.set('errorMessage', false);
    })
});
