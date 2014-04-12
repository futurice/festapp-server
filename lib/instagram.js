var config = {
  clientId: '',
  clientSecret: '',
  hashTag: 'ruisrock2014' 
}

var getIg = function(){
  var ig = require('instagram-node').instagram();
  ig.use({ client_id: config.clientId,
           client_secret: config.clientSecret});
  return ig;
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

var parseIgMedia = function(medias){
  var data = [];
  medias.forEach(function(media){
    data.push(parseIgMediaObject(media));
  });
  return data;
}

module.exports = {
  tagMedia: function(req, res) {
    try{
      getIg().tag_media_recent(config.hashTag, function(err, medias, pagination, limit) {
        if(err) throw new Error("Virhe");
        res.send(JSON.stringify({status: 200, media: parseIgMedia(medias)}));
      });
    }catch(err){
      res.send(500, JSON.stringify({status: 500, error: err.message}));
    }
    
  }
}