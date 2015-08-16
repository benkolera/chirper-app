import DS from 'ember-data';
import Ember from 'ember';

var User = DS.Model.extend({
    username: DS.attr('string'),
    aboutMe: DS.attr('string'),
    joinedAt: DS.attr('date'),
    chirps: DS.hasMany('chirp', { async: true }),
    numberOfChirps: Ember.computed('chirps', function() {
        return this.get('chirps').get('length');
    }),
    followees: DS.hasMany(
        'user',
        {
            async: true,
            inverse: "followers"
        }
    ) ,
    numberOfFollowing: Ember.computed('followees', function() {
        return this.get('followees').get('length');
    }),
    followers: DS.hasMany(
        'user',
        {
            async: true,
            inverse: "followees"
        }
    ),
    numberOfFollowers: Ember.computed('followers', function() {
        return this.get('followers').get('length');
    })
});

User.reopenClass({
    FIXTURES: [
        { 
            id: 1, 
            username: 'benkolera', // Put your username here
            aboutMe: 'I like making stuff.',
            joinedAt: new Date('2015-06-08T09:30:26'),
            chirps: [1, 2, 3],
            followers: [1],
            followees: [1]
        }
    ]
});

export default User;
