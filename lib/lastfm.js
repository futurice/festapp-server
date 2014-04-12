var LastFmNode = require('lastfm').LastFmNode;
var lastfm = new LastFmNode({
  api_key: '991ee611288dfc219b270731cfb04672',
  secret: '316936431b5bc14b67c586f604e90ac7'
});
var request = require('request');

var responsebody = ' ';

var dummy = {
	'name': '',
	'picture': '',
  	'quote': '',
  	'content': '',
  	'featured': '',
  	'status': '',
  	'founded': '',
  	'genres': [],
  	'members': [],
  	'albums': [],
  	'highlights': [],
  	'youtube': '',
  	'spotify': '',
  	'contact_info': '',
  	'press_image': '',
  	'credits': '',
  	'place': ''
}

  

function bind(json, uri) {
	var artist = dummy
	var index;
	var genres = [];
	artist.name = json.artist.name
	artist.picture = json.artist.image[4]['#text']
	artist.content = json.artist.bio.summary

	//Here we parse genres so we only get names.
	for (index = 0; index < json.artist.tags.tag.length; ++index){
		genres[index] = json.artist.tags.tag[index].name;
	}

	artist.genres = genres;
	artist.spotify = uri
	artist.albums = json.albums;
	
	responsebody.type('application/json');
	responsebody.write(JSON.stringify(artist))
	responsebody.end();
}





function search(artist, res) {
	responsebody = res;
	var request = lastfm.request("artist.getInfo", {
	artist: artist, 
	handlers: { success: function(data) { 
		//console.log(data.artist);
		request = data;
		get_spotify_uri(data);
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
	
	request('http://ws.spotify.com/search/1/artist.json?q=artist:'+artistjson, function (error, response, body) {
  	  if (!error && response.statusCode == 200) {
    	    response = body
    	    var uri = JSON.parse(body).artists[0].href
    	    request('http://ws.spotify.com/lookup/1/.json?uri='+uri, function (error, response, body) {
    		if (!error && response.statusCode == 200) {
		    request('http://ws.spotify.com/lookup/1/.json?uri=' + uri + '&extras=album', function (error, response, body) {
			response = body;
			var albumsinfo = JSON.parse(body).artist.albums;
			var albums = [];
			var index;

			//Parse only albumname from data.
			for (index = 0; index < albumsinfo.length; ++index){
			    albums[index] = albumsinfo[index].album.name;
			}
			artistjson.albums = albums;
			bind(artistjson, uri)
		    });
    		} 
    		
    	    });
  	  }
	});
	
}


//exposed methods
module.exports = {

  search: function (artist, res) {
    return search(artist, res)
    //console.log(asd)
  }
};
