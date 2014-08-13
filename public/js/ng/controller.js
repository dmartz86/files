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

  $scope.list = function(){
    $scope.serverImagesList = [];
    $http.get('/files').
    success(function(data, status, headers, config) {
      $scope.serverImagesList = data;
    }).
    error(function(data, status, headers, config) {
      console.log(data)
    });
  }

  $scope.getName = function(longName){
    var nameSplited = longName.split("/");
    return nameSplited[nameSplited.length -1 ];
  }

});
