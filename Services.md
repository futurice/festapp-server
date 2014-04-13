Service integrations
====================

This is the documentation for all of the 3rd party services that are integrated and easily accessible with internal APIs.

We currently have some integrations to the following services:


* Twitter
* Instagram
* Flickr
* IMDb
* "Rotten Tomatoes"
* "OpenWeatherMap":http://openweathermap.org/

Base URL is `/api/v1/`.

### Get artists
`GET /twitter/search/hackathon`

**Response**
```json
[
  {
    "picture": "public/BadFinance.jpg",
    "quote": "”Having fun! Everyone altogether, let's rock!”",
    "content": "<p>\r\nBAD finance was formed in the early 2011 by three guys, Sakari, Antti and Jari, all working at Futurice Tampere. The band started reheasing at Jari's student dorm in Hervanta but after Futurice office moved into bigger premises the boys got their own band room.</p>\r\n",
    "featured": false,
    "status": "show",
    "founded": 2012,
    "genre": ["Love Metal"],
    "highlights": ["Bad Finance rocked the place at Futurice Christmas Party 2012."],
    "youtube": "https://www.youtube.com/watch?v=xRKzk0tKchE",
    "spotify": "",
    "contact_info": "Generic contact info, ie. email and phone number",
    "press_image": "public/BadFinance.jpg",
    "credits": "Photo: Futurice Oy",
    "place": 0,
    "_id": "53486eaaead3150200ca7919",
    "albums": ["First Album (2012)", "Second Album (2013)", "Third Album (2014)"],
    "members": ["Mike Arvela", "Sakari Hyöty", "Antti Mattila"],
    "name": "Bad Finance"
  }
]
```

### Instagram API
Need environment variables for configuration

```
IGCLIENTID = Instagram Client Id
IGCLIENTSECRET = Instagram Client Secret
IGHASHTAG = Instagram hashtag used for search
IGUSERID = Instagram userid used for search
```

* `GET /api/instagram/tag`
* `GET /api/instagram/user`

