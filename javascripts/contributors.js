$(function () {
  'use strict';

  _([
    'festapp-android',
    'festapp-ios',
    'festapp-wp',
    'festapp-server'])
    .each(function(project){
      var element = $('#' + project);
      var existing = $('li a', element).map(function (idx, li) {
        li = $(li);
        var login = li.text();
        return {
          login: login,
        };
      }).toArray();

      $.ajax(contributorUrl(project))
      .then(function (res, textStatus) {
        element.html(processContributorData(res.concat(existing)));
      })
      .fail(function () {
        element.html(processContributorData(existing));
      })
    });

  var usersPromise = $.ajax('contributors.json');

  function contributorUrl(projectName) {
    return 'https://api.github.com/repos/futurice/' + projectName + '/contributors';
  }

  function processContributorData(contributorList) {
    return _(contributorList)
      .sortBy(function(e){
        return e.login.toLowerCase();
      })
      .uniq(true, 'login')
      .map(function (e) {
        return $('<li>').append(userLink(e));
      })
      .value();

    function displayName(user) {
      return user.name ? user.name + " (" + user.login + ")" : user.login;
    }

    function userLink(e) {
      var html_url = e.html_url || 'https://github.com/' + e.login;
      var element = $('<a>').attr('href', html_url).html(displayName(e));

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
});
