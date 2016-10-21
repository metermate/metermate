# MeterMate
A map-based web application that helps you find parking in Santa Monica. Search for an available parking meter near your destination, park your car, and get on with your day.

![metermate-demo](https://cloud.githubusercontent.com/assets/17018339/19594129/9b196f88-9738-11e6-8910-f8bbf3c5eb2b.gif)

Check out the deployed application [here](http://metermate.herokuapp.com).

## Local Setup
Clone this repository and create a local copy on your desktop:
```
$ git clone https://github.com/metermate/metermate.git
```
Navigate to the directory and install server-side and client-side dependencies:
```
$ npm install
```
Run the app on your local server:
```
$ npm start
```
Open the app in your web browser by visiting https://localhost:1337.

## Application Structure
#### Front-End
MeterMate's client side is built using [AngularJS](https://angularjs.org), [Bootstrap](http://getbootstrap.com), and [jQuery](https://jquery.com).
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

#### Back-End
Under the hood, MeterMate is powered by [Express](https://expressjs.com), [Node.js](https://nodejs.org/en), and [MySQL](https://www.mysql.com).
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

## REST Outline
```
ENDPOINT                            METHOD               EXPECTED RESULT
──────────────────────────────── ──────────── ─────────────────────────────────────
/api/meters/locations           │    GET     │ {                                   │
                                │            │   "active": true,                   │
                                │            │   "area": "DOWNTOWN-CBD",           │
                                │            │   "latitude": 34.01633,             │
                                │            │   "longitude": -118.49191,          │
                                │            │   "meter_id": "BRO0516",            │
                                │            │   "street_address" : "500 BROADWAY" │
                                │            │ }                                   │
                                │            │                                     │
/api/meters/events              │    GET     │ {                                   │
                                │            │   "event_id": 65043622,             │
                                │            │   "event_time": "20161021T075336Z", │
                                │            │   "event_type": "SE",               │
                                │            │   "meter_id": "SM1311",             │
                                │            │   "ordinal": 63410499,              │
                                │            │   "session_id": 325052653           │
                                │            │ }                                   │
```

## API Documentation
* [Santa Monica Parking Data API](https://parking.api.smgov.net)
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)

## Contributors
* [Sam Chi - Product Lead / Front-End Developer](https://www.github.com/samsjchi)
* [Christian Borja - Back-End Developer](https://www.github.com/cborjah)
* [Sam Kim - Back-End Developer](https://github.com/samkim28)
* [Sandy Tran - Front-End Developer](https://github.com/justsandytran)
