var bugzilla = require('../lib/bugzilla');
var debug = require('debug')('autolander:route:pull_request');
var github = require('../lib/github');
var validator = require('../lib/github/validator');
var thunkify = require('thunkify');

module.exports = function(runtime) {
  return function * (detail) {

    if (!detail.repo || !detail.owner || !detail.number) {
      debug('Missing pull request info.');
      return;
    }

    var pullRequest = thunkify(runtime.githubApi.pullRequests.get.bind(runtime.githubApi.pullRequests));
    var pull = yield pullRequest({
      user: detail.owner,
      repo: detail.repo,
      number: detail.number,
      token: runtime.config.githubConfig.token
    });
    debug(pull);

    if (!pull) {
      debug('Invalid or missing pull request data');
      return;
    }

    // We don't need to do anything on closed PRs.
    if (pull.state !== 'open') {
      debug('pull request is not open', pull.state);
      this.status = 200;
      return;
    }

    // Validate that we have a bug number formatted to: "Bug xxxx - "
    // For now allow preceding characters to allow for reverts.
    var bugId = yield validator.pullRequestHasBug(runtime, pull);
    if (!bugId) {
      return;
    }

    yield bugzilla.attachPullRequest(runtime, bugId, pull);
    yield runtime.pulseApi.subscribe(runtime, bugId);

    // Everything was ok.
    this.status = 200;
  };
};
