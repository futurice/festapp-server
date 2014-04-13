var cache = require('memory-cache');

var config = {
  clientId: process.env.IGCLIENTID || '',
  clientSecret: process.env.IGCLIENTSECRET || '',
  hashTag: process.env.IGHASHTAG || 'ruisrock2014',
  userId: process.env.IGUSERID || '561622534' 
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
    user: media.user.username,
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

var mediaToJson = function(medias){
  return JSON.stringify({media: parseIgMedia(medias)})
}

var sendResponse = function(response, data){
  response.type('application/json; charset=utf-8').end(data);
}

var sendError = function(response){
  response.send(500);
}

module.exports = {
  userMedia: function(req, res){
    var cached = cache.get('userMedia');

    if(cached){
      sendResponse(res, cached);
      return;
    }
    try{
      getIg().user_media_recent(config.userId, function(err, medias, pagination, limit) {
        if(err)sendError();
        else {
          var cached = mediaToJson(medias);
          cache.put('userMedia',cached,300*1000);
          sendResponse(res, cached);
        }
      });
    }catch(err){
        sendError();
    }
    
  },
  tagMedia: function(req, res) {
    var cached = cache.get('tagMedia');

    if(cached){
      sendResponse(res, cached);
      return;
    }
    try{
      getIg().tag_media_recent(config.hashTag, function(err, medias, pagination, limit) {
        if(err)sendError();
        else {
          var cached = mediaToJson(medias);
          cache.put('tagMedia',cached,300*1000);
          sendResponse(res, cached);
        }
      });
    }catch(err){
        sendError();
    }
  }
}
