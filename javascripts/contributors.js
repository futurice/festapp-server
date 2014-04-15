(function (document) {
  'use strict';

  _([
    'festapp-android',
    'festapp-ios',
    'festapp-wp',
    'festapp-server'])
    .each(function(project){
      sendRequest(contributorUrl(project), function (req){
        document.getElementById(project).innerHTML = processContributorData(req);
      });
    });

  function contributorUrl(projectName) {
    return 'https://api.github.com/repos/futurice/'+projectName+'/contributors';
  }

  function processContributorData(req){
    var contributorList = JSON.parse(req.responseText);
    return _(contributorList).map(templateUser).reduce(listify, "");

    function listify(output, item) {
      return output + "<li>" + item + "</li>\n";
    }

    function templateUser(e) {
      return '<a href="' + e.html_url + '">' + e.login + '</a>';
    }
  }

  function createXMLHTTPObject() {
    var XMLHttpFactories = [
        function () {return new XMLHttpRequest()},
        function () {return new ActiveXObject("Msxml2.XMLHTTP")},
        function () {return new ActiveXObject("Msxml3.XMLHTTP")},
        function () {return new ActiveXObject("Microsoft.XMLHTTP")}
    ];
      var xmlhttp = false;
      for (var i=0;i<XMLHttpFactories.length;i++) {
          try {
              xmlhttp = XMLHttpFactories[i]();
          }
          catch (e) {
              continue;
          }
          break;
      }
      return xmlhttp;
  }

  function sendRequest(url,callback,postData) {
      var req = createXMLHTTPObject();
      if (!req) return;
      var method = (postData) ? "POST" : "GET";
      req.open(method,url,true);
      if (postData)
          req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
      req.onreadystatechange = function () {
          if (req.readyState != 4) return;
          if (req.status != 200 && req.status != 304) {
              return;
          }
          callback(req);
      };
      if (req.readyState == 4) return;
      req.send(postData);
  }

})(document);