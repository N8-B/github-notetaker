var React = require('react');
var Router = require('react-router');
var UserProfile = require('../components/github/UserProfile');
var Repos = require('../components/github/Repos');
var Notes = require('../components/notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var helpers = require('../utils/helpers');

var Profile = React.createClass({
  mixins: [Router.State, ReactFireMixin],

  getInitialState: function() {
    return {
      notes: [],
      bio: {},
      repos: []
    };
  },
  init: function () {
    // Go 1 level deep in db object selecting the username endpoint based on the url params
    var childRef = this.ref.child(this.getParams().username);
    // bindAsArray from Firebase mixin. First arg is Firebase db
    // Second arg is the prop on the state which we want to bind the db to.
    // When Firebase endpoint changes, our local state is updated
    this.bindAsArray(childRef, 'notes');

    helpers.getGithubInfo(this.getParams().username)
      .then(function (dataObj) {
        this.setState({
          bio: dataObj.bio,
          repos: dataObj.repos
        });
      }.bind(this));
  },
  // AJAX calls and Firebase setup goes in this lifecycle event
  componentDidMount: function() {
    // Reference for Firebase database. Returns an object of db
    this.ref = new Firebase('https://a-github-note-taker.firebaseio.com');
    this.init();
  },
  // Unbind lsiteners on notes state from db when component unmounts
  componentWillUnmount: function() {
    this.unbind('notes');
  },

  componentWillReceiveProps: function(nextProps) {
    this.unbind('notes');
    this.init();
  },

  handleAddNote: function (newNote) {
    this.ref.child(this.getParams().username).set(this.state.notes.concat([newNote]));
  },

  render: function () {
    var username = this.getParams().username;

    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={username} bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <Repos username={username} repos={this.state.repos}/>
        </div>
        <div className="col-md-4">
          <Notes
            username={username}
            notes={this.state.notes}
            addNote={this.handleAddNote} />
        </div>
      </div>
    );
  }
});

module.exports = Profile;
