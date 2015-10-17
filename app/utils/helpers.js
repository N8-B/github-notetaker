import axios from 'axios';

function getRepos(username) {
  return axios.get(`https://api.github.com/users/${username}/repos`);
}

function getUserInfo(username) {
  return axios.get(`https://api.github.com/users/${username}`);
}

const helpers = {
  getGithubInfo(username) {
    return axios.all([getRepos(username), getUserInfo(username)])
      .then((array) => {
        return {
          repos: array[0].data,
          bio: array[1].data
        }
      });
  }
};

export default helpers;
