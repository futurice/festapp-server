festapp-server
==============

[![Build Status](https://travis-ci.org/futurice/festapp-server.svg?branch=travis)](https://travis-ci.org/futurice/festapp-server)

Run the project:

`node server`

Supported URLs:

```
Dynamic data examples:
GET http://localhost/api/v1/Artists/count
GET http://localhost/api/v1/Artists
PUT http://localhost/api/v1/Artists
POST http://localhost/api/v1/Artists
DELETE http://localhost/api/v1/Artists
 
GET http://localhost/api/v1/Artists/:id
PUT http://localhost/api/v1/Artists/:id
POST http://localhost/api/v1/Artists/:id
DELETE http://localhost/api/v1/Artists/:id
 
GET http://localhost/api/v1/Artists?name=~regex
GET http://localhost/api/v1/Artists?name=value
GET http://localhost/api/v1/Artists?name=>value
GET http://localhost/api/v1/Artists?name=>=value
GET http://localhost/api/v1/Artists?name=<value
GET http://localhost/api/v1/Artists?name=<=value
GET http://localhost/api/v1/Artists?name=!=value
GET http://localhost/api/v1/Artists?select=name
 
GET http://localhost/api/v1/Artists?sort=name
GET http://localhost/api/v1/Artists?sort=-name
GET http://localhost/api/v1/Artists?skip=10&limit=10

Static data:
http://localhost:8080/public/arrival.html
```

### Getting localised data

Append `lang=<lang>` to the request, f.ex. `/api/v1/artists?lang=fi`

### Localisation API
* `GET /api/v1/localisation/:key` (`key` is of format <fieldname>-<value>-<lang>)
* `POST /api/v1/localisation/` (Accepts JSON in the form `{ 'key' : <key>, 'val' : <value>}`)

### Instagram API
* `GET /api/instagram/tag`
* `GET /api/instagram/user`
