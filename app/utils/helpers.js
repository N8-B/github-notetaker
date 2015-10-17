var axios = require('axios');

function getRepos(username) {
  return axios.get('https://api.github.com/users/' + username + '/repos');
}

function getUserInfo(username) {
  return axios.get('https://api.github.com/users/' + username);
}

var helpers = {
  getGithubInfo: function(username) {
    return axios.all([getRepos(username), getUserInfo(username)])
      .then(function(array) {
        return {
          repos: array[0].data,
          bio: array[1].data
        }
      });
  }
};

module.exports = helpers;
