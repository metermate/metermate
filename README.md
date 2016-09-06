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

```
* First, install the npm dependencies
  $ npm install
```
```
* Second, install the bower dependencies
  $ bower install
```
```
* Turn on your nodemon,
  $ nodemon server/server.js
```
```
* Visit https://localhost:1337/ on your web browser
```


# Front-End
Metermate's client side is built using AngularJS, Angular UI Router, Bootstrap, and FontAwesome

```
client

├── app
│   ├── home
|   |   ├── homeController.js
|   |   |
|   |   └── homeView.html
|   |
│   ├── map
|   |   ├── mapController.js
|   |   ├── mapFactories.js
|   |   └── mapView.html
|   |
|   └──  app.js
|  
├── pages
|   |
│   ├── home
|   |   ├── home.js
|   |   └── home.html
|   |
│   └── map
|       ├── map.js
|       └── map.html  
│   
|── assets
│   ├── css
|   |
|   |── fonts
|   |
│   ├── img
|   |
|   └── js
│  
└── index.html
```


# Back-End
Metermate's server is built using Express, Node, Request, CORS, Body parser, and mySQL as our database.
```
server
├── controllers
│   └── meterController.js
|   |
│   └── styles
│       └── styles.css
|  
├── helpers
│   └── dbHelpers.js
│   
├── db.js
│  
└── server.html
```

# REST/CRUD outline

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

# Metermate Team

* [Sam Chi - Product Owner](https://www.github.com/samsjchi)
* [Christian Borja - Scrum Master](https://www.github.com/cborjah)
* [Sam Kim - Web Developer](https://github.com/samkim28)
* [Sandy Tran - Web Developer](https://github.com/justsandytran)
