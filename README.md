festapp-server
==============

Run the project:

`node server`

Supported URLs:

```
Dynamic data:
http://localhost:8080/api/artists
http://localhost:8080/api/news
http://localhost:8080/api/general
http://localhost:8080/api/program
http://localhost:8080/api/faq

Static data:
http://localhost:8080/api/general
http://localhost:8080/api/services
http://localhost:8080/api/arrival
http://localhost:8080/public/arrival.html

http://localhost:8080/public/* // band images for example
```

### Getting localised data

Append `lang=<lang>` to the request, f.ex. `/api/v1/artists?lang=fi`

### Localisation API
* `GET /api/v1/localisation/:key` (`key` is of format <fieldname>-<value>-<lang>)
* `POST /api/v1/localisation/` (Accepts JSON in the form `{ 'key' : <key>, 'val' : <value>}`)

