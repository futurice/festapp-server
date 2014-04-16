#!/usr/bin/env node
'use strict';

var PROJECTS = [
    'festapp-ios',
    'festapp-android',
    'festapp-wp',
    'festapp-server',
];

var OUTPUTFILE="contributors.json";
var EXTRA_CONTRIBUTORS = [
    {
        login: "repomies",
        url: "https://api.github.com/users/repomies",
    },
];

var _ = require('lodash');
var when = require('when');
var whennode = require('when/node');
var request = require('request');

var fs = require('fs');

request = whennode.lift(request);

function contributorsUrl(projectName) {
  return 'https://api.github.com/repos/futurice/'+projectName+'/contributors';
}

function requestJSON(url) {
    return request({
        url: url,
        headers: {
            'User-Agent': 'futurice festapp-server cacher',
        },
    })
    .then(function (params) {
        var res = params[0];

        if (res.statusCode !== 200) {
            throw new Error(res.body);
        }

        if (!res.headers["content-type"].match(/^application\/json/)) {
            throw new Error("response is not a json: " + res.headers["content-type"])
        }

        return JSON.parse(res.body);
    });
}

function getLogin(user) {
    return user.login;
}

when.all(PROJECTS.map(function (project) {
    return requestJSON(contributorsUrl(project));
}))
.then(function (lists) {
    var contributors = _(lists.concat([EXTRA_CONTRIBUTORS]))
        .flatten(true)
        .sortBy(getLogin)
        .uniq(true, getLogin)
        .value();

    return when.all(contributors.map(function (c) {
        return requestJSON(c.url);
    }));
})
.then(function (contributors) {
    console.log(contributors);

    fs.writeFileSync(OUTPUTFILE, JSON.stringify(contributors, null, 2));
})
.catch(function (err) {
    console.dir(err);
});
