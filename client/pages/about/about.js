angular
  .module('metermate.about', [])
  .controller('AboutCtrl', function($scope) {
    $scope.engineers = [
      {
        name: "Sandy Tran",
        img:"",
        description: "Web Developer",
        github:"https://github.com/justsandytran",
        linkedIn:"https://www.linkedin.com/in/sandy-tran-253a78b5?trk=hp-identity-photo"

      },
      {
        name: "Sam Kim",
        img:"",
        description: "Web Developer",
        github: "https://github.com/samkim28",
        linkedIn: "https://www.linkedin.com/in/samkim28"
      },
      {
        name: "Christian Borja",
        img:"",
        description: "Scrum Master",
        github:"https://github.com/cborjah",
        linkedIn:"www.linkedin.com/in/christianborja"
      },
      {
        name: "Sam Chi",
        img:"",
        description: "Product Owner",
        github:"https://github.com/samsjchi",
        linkedIn:"https://www.linkedin.com/in/samuelsjchi"
      }
    ]


  });
