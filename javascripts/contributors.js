(function (document) {
  'use strict';

  var hardcodedContributors = {
    'festapp-ios': [
      {login: 'jkaki', html_url: 'https://github.com/jkaki', hardcodedName: 'Janne Käki'}
    ]
  };

  _([
    'festapp-android',
    'festapp-ios',
    'festapp-wp',
    'festapp-server'])
    .each(function(project){
      $.ajax(contributorUrl(project)).then(function (res) {
        $('#' + project).html(processContributorData(res, project));
      });
    });

  var usersPromise = $.ajax('contributors.json');

  function contributorUrl(projectName) {
    return 'https://api.github.com/repos/futurice/'+projectName+'/contributors';
  }

  function processContributorData(contributorList, project){
    return _(contributorList)
      .shuffle() // no-one is more important!
      .union(hardcodedContributors[project])
      .uniq(false, 'login')
      .map(function (e) {
        return $('<li>').append(userLink(e));
      })
      .value();

    function displayName(user) {
      return user.name ? user.name + " (" + user.login + ")" : user.login;
    }

    function userLink(e) {
      if (!e.name) {
        e.name = e.hardcodedName;
      }
      var element = $('<a>').attr('href', e.html_url).html(displayName(e));

      usersPromise.then(function (users) {
        var user = _.find(users, function (u) {
          return u.login === e.login;
        });

        if (user) {
          var name = displayName(user);
          element.html(name);
        }
      });

      return element;
    }
  }


})(document);
