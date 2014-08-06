app.controller('Controller', function Controller($scope, $http, $timeout) {
  $scope.imageList = [];

  $scope.add = function(){
    $scope.imageList.push({name: new Date().getTime()});
    $timeout(function(){
      $(":file").filestyle();
    },1, true);
  }

  $scope.clean = function(){
    $scope.imageList = [];
  }

});
