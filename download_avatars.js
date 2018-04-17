var request = require('request');
var fs = require('fs');
var myAuth = require('./secrets.js');
var owner = process.argv[2];
var repo = process.argv[3];

if (!owner || !repo) {
  console.log('Please specify reposit owner and reposit name!\n e.g.: node download_avatars.js repoOwner repoName');
} else {
  function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
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
        cb(output, path);
      }
    });
  }

  function downloadImageByURL(url, filePath) {

    request.get(url).pipe(fs.createWriteStream(filePath));
  }

  getRepoContributors(owner, repo, downloadImageByURL);
  console.log('Saved images!');
}