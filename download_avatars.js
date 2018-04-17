var request = require('request');
var fs = require('fs');
var myAuth = require('./secrets.js');


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + myAuth.token
    }
  };
  request(options, function(err, res, body) {
    body = JSON.parse(body);
    var output = '';
    var path = ''
    for ( var key in body) {
      output = (body[key].avatar_url);
      path = ('avatars/' + body[key].login + '.jpg');
      // send path and login name, not using array.
      cb(output, path);
    }
  });
}

function downloadImageByURL(url, filePath) {
  // get and write (file is named as filePath here.)
  request.get(url).pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", downloadImageByURL);

console.log('Saved images!');