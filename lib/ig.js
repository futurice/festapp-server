var instagram = function(req, res) {
  var ig = require('instagram-node').instagram();
  ig.use({ client_id: '',
         client_secret: ''});
  ig.tag_media_recent('ruisrock', function(err, medias, pagination, limit) {
    //res.send(JSON.stringify(medias));
    var data = [];
    medias.forEach(function(media){
      var obj = {};
      obj.link = media.link;
      obj.title = (media.caption==null)?"":media.caption.text;
      obj.thumbnail = media.images.thumbnail.url;
      obj.small_image = media.images.low_resolution.url;
      obj.image = media.images.standard_resolution.url;
      obj.likes = media.likes.count;
      obj.tags = media.tags;
      data.push(obj);
    });
    res.send(JSON.stringify(data));
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
  var obj = {};
  obj.link = media.link;
  obj.title = (media.caption==null)?"":media.caption.text;
  obj.thumbnail = media.images.thumbnail.url;
  obj.small_image = media.images.low_resolution.url;
  obj.image = media.images.standard_resolution.url;
  obj.likes = media.likes.count;
  obj.tags = media.tags;
  return obj;
}

