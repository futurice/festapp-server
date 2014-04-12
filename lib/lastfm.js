var LastFmNode = require('lastfm').LastFmNode;
var lastfm = new LastFmNode({
  api_key: '',
  secret: ''
});
var request = require('request');

var dummy = {
	"id": "",
        "name": "",
        "picture": "",
        "quote": "",
        "content": "",
        "featured": "",
        "status": "",
        "stage": "",
        "day": "",
        "time_start": "",
        "time_stop": "",
        "founded": "",
        "genre": "",
        "members": [],
        "albums": [],
        "highlights": "",
        "youtube": "",
        "spotify": "",
        "contact_info": "",
        "press_image": "",
        "credits": "",
        "place": ""
}

function bind(json, uri) {
	var artist = dummy
	artist.name = json.artist.name
	artist.picture = json.artist.image[4]['#text']
	artist.content = json.artist.bio.summary
	artist.genre = json.artist.tags.tag[0].name
	artist.spotify = uri

	return artist
}





function search(artist) {
	var request = lastfm.request("artist.getInfo", {
	artist: artist, 
	handlers: { success: function(data) { 
		//console.log(data.artist);
		request = data;
		get_spotify_uri(data, bind);
	},
    error: function(error) { 
    	console.log("Error: " + error.message);
    }
    }});
}







function get_lastfm_formed(artist) {
	var response = null
	var DOMParser = require('xmldom').DOMParser;

	request('http://www.last.fm/music/Chic', function (error, response, body) {
  	if (!error && response.statusCode == 200) {
 
    	response = body
    	var doc = new DOMParser().parseFromString(response)
 
 
  	}
	})

}





function get_spotify_uri(artistjson) {
	
	var uri = ''
	request('http://ws.spotify.com/search/1/artist.json?q=artist:'+artistjson, function (error, response, body) {
  	if (!error && response.statusCode == 200) {
    	response = body
    	uri = JSON.parse(body).artists[0].href
    	artist_name = JSON.parse(body).artists[0].name
    	//console.log(uri)
    	request('http://ws.spotify.com/lookup/1/.json?uri='+uri, function (error, response, body) {
    		if (!error && response.statusCode == 200) {
    			//console.log(JSON.parse(body).artist.name == artist_name)
    			//console.log(uri)
    			bind(artistjson, uri)
    		} 
    		
    	});
  	}
	
});
	return uri
}


//exposed methods
module.exports = {

  search: function (artist) {
    return search(artist)
    //console.log(asd)
  }
};
