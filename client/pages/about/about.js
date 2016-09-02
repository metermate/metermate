angular
  .module('metermate.about', [])
  .controller('AboutCtrl', function($scope) {
    $scope.engineers = [
      {
        name: "Sandy Tran",
        img:"",
        description: "Likes dogs",
        github:"https://github.com/justsandytran",
        linkedIn:"https://www.linkedin.com/in/sandy-tran-253a78b5?trk=hp-identity-photo"
      },
      {
        name: "Sam Kim",
        img:"",
        description: "Likes coffee",
        github:"https://github.com/samkim28",
        linkedIn:""
      },
      {
        name: "Christian Borja",
        img:"",
        description: "Likes beer",
        github:"https://github.com/cborjah",
        linkedIn:""
      },
      {
        name: "Sam Chi",
        img:"",
        description: "Likes photography",
        github:"https://github.com/samsjchi",
        linkedIn:""
      }
    ]


  });
