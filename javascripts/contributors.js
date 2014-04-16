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

  var users = {};

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
      console.log(e);
      var element =  $('<a>').attr("href", e.html_url).html(e.login);

      if (!users[e.login]) {
        users[e.login] = $.ajax(e.url);
      }

      users[e.login].then(function (res) {
        var name = res.name ? res.name + " (" + res.login + ")" : res.login;
        element.html(name);
      });

      return element;
    }
  }


})(document);
