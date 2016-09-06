# Developer Documentation
* [Node](https://nodejs.org/en/)
* [AngularJS](https://angularjs.org/)
* [Angular UI Router](https://angular-ui.github.io/ui-router/site/#/api/ui.router)
* [Express](https://expressjs.com/)
* [Request](https://www.npmjs.com/package/request)
* [Body Parser](https://www.npmjs.com/package/body-parser)
* [CORS](https://www.npmjs.com/package/cors)
* [mySQL](https://dev.mysql.com/doc/)
* [Bootstrap](http://getbootstrap.com/)
* [FontAwesome](http://fontawesome.io/)

# Environment Setup
1. Install server-side dependencies:
```
$ npm install
```

2. Install client-side dependencies:
```
$ bower install
```

3. Run the app on a local server:
```
$ node server/server.js
```

4. Visit https://localhost:1337/ on your web browser


# Front-End
Metermate's client side is built using AngularJS, Angular UI Router, Bootstrap, and FontAwesome.

```
client

├── app
│   ├── home
|   |   ├── homeController.js
|   |   └── homeView.html
|   |
│   ├── map
|   |   ├── mapController.js
|   |   ├── mapFactories.js
|   |   └── mapView.html
|   |
|   └── app.js
|  
├── assets
│   ├── css
|   |── fonts
│   ├── img
|   └── js
│  
└── index.html
```


# Back-End
Metermate's server is built using Express, Node, and MySQL as our database.
```
server
├── controllers
│   └── metersController.js
|  
├── helpers
│   └── dbHelpers.js
|  
├── models
│   └── metersModel.js
|  
├── routes
│   └── routes.js
│
├── db.js
│
└── server.js
```

# REST/CRUD outline

```
ENDPOINT                                         METHOD         EXPECTED                               RESPONSE
──────────────────────────────────────────────   ─────────────  ────────────────────────────────────   
/api/meters/locations                           │ GET          │ {                                  │if successful                                                    
                                                │              │  'active': true,                   │   
                                                │              │  'area': 'DOWNTOWN-CBD',           |
                                                |              |  'latitude': 34.01633,             |
                                                |              |  'longitude': -118.49191,          |
                                                |              |  'meter_id': 'BRO0516',            |
                                                |              |  'street_address' : '500 BROADWAY' |
                                                |              │                                    |
                                                │              │ }                                  │
/api/meters/events                              │ GET          │ {                                  │if successful
                                                │              │  'example': 'example',             │
                                                │              │  'example': 'example'              │
                                                │              │ }                                  │
```



   "meter_id": "BRO0516",
   "street_address": "500 BROADWAY"
 }

# API Documentation

* [Santa Monica Parking Meter API](https://parking.api.smgov.net/)


* [Google Maps API](https://developers.google.com/maps/)



# Metermate Team

* [Sam Chi - Product Owner](https://www.github.com/samsjchi)
* [Christian Borja - Scrum Master](https://www.github.com/cborjah)
* [Sam Kim - Dev Team](https://github.com/samkim28)
* [Sandy Tran - Dev Team](https://github.com/justsandytran)
