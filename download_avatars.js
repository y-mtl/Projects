var request = require('request');
var myAuth = require('./secrets.js');
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + myAuth.token
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
//Node-style callback functions expect their first argument to be a placeholder for any errors that may have occurred,
//and the subsequent argument(s) are results being passed to the callback.
console.log('Welcome to the GitHub Avatar Downloader!');