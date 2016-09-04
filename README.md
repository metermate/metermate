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

├── components
│   ├── images
|   |   ├── m1.png
|   |   ├── m2.png
|   |   ├── m3.png
|   |   ├── m4.png
|   |   └── m5.png
|   |
│   └── styles
│       └── styles.css
|  
├── pages
│   ├── auth
|   |   ├── about.js
|   |   └── about.html
|   |
|   |
│   ├── home
|   |   ├── home.js
|   |   └── home.html
|   |
│   └── map
|       ├── map.js
|       └── map.html  
│   
├── app.js
│  
└── index.html
```


# Back-End
Metermate's server is built using Express, Node, Request, CORS, Body parser, and mySQL as our database.
```
server

├── server
    └── server.js
```

# REST/CRUD outline

```
ENDPOINT                                         METHOD         EXPECTED                               RESPONSE
──────────────────────────────────────────────   ─────────────  ────────────────────────────────────   
/api/meter-events                              │ POST         │ {                                    │if successful                  
                                               │              │  'example': 'example',               │   
                                               │              │  'example': 'example'                │
                                               │              │ }                                    │
/api/get-meter-data                            │ POST         │ {                                    │if successful
                                               │              │  'example': 'example',               │
                                               │              │  'example': 'example'                │
                                               │              │ }                                    │
```

# Metermate Team

* [Sam Chi - Product Owner](https://www.github.com/samsjchi)
* [Christian Borja - Scrum Master](https://www.github.com/cborjah)
* [Sam Kim - Web Developer](https://github.com/samkim28)
* [Sandy Tran - Web Developer](https://github.com/justsandytran)
