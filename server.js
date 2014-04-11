var express = require('express');
var http = require('http');
var url = require('url');

var middleware = function(req, res) {
  var pathname = url.parse(req.url).pathname;
  res.type('application/json; charset=utf-8').sendfile('data'+pathname+'.json');
};

var instagram = function(req, res) {
  var ig = require('instagram-node').instagram();
  ig.use({ client_id: '',
           client_secret: ''});
  ig.tag_media_recent('ruisrock', function(err, medias, pagination, limit) {
    res.send(JSON.stringify(parseIgMedia(medias)));
  });
}

var parseIgMedia = function(medias){
  var data = [];
  medias.forEach(function(media){
    data.push(parseIgMediaObject(media));
  });
  return data;
}

var parseIgMediaObject = function(media){
  return {
    link: media.link,
    title: (media.caption==null)?"":media.caption.text,
    thumbnail: media.images.thumbnail.url,
    small_image: media.images.low_resolution.url,
    image: media.images.standard_resolution.url,
    likes: media.likes.count,
    tags: media.tags
  }
}

var app = express()
  .use('/api/instagram', instagram)
  .use('/api', middleware)
  .use('/public', express.static(__dirname + '/public'));

var port = Number(process.env.PORT || 8080);
http.createServer(app).listen(port);
console.log('Running at port '+port);
