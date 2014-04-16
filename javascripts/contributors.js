(function (document) {
  'use strict';

  _([
    'festapp-android',
    'festapp-ios',
    'festapp-wp',
    'festapp-server'])
    .each(function(project){
      $.ajax(contributorUrl(project)).then(function (res) {
        $('#' + project).html(processContributorData(res));
      });
    });

  var usersPromise = $.ajax('contributors.json');

  function contributorUrl(projectName) {
    return 'https://api.github.com/repos/futurice/'+projectName+'/contributors';
  }

  function processContributorData(contributorList){
    return _(contributorList)
      .shuffle() // no-one is more important!
      .map(function (e) {
        return $('<li>').append(userLink(e));
      })
      .value();

    function userLink(e) {
      var element = $('<a>').attr('href', e.html_url).html(e.login);

      usersPromise.then(function (users) {
        var user = _.find(users, function (u) {
          return u.login === e.login;
        });

        if (user) {
          var name = user.name ? user.name + " (" + user.login + ")" : user.login;
          element.html(name);
        }
      });

      return element;
    }
  }


})(document);
