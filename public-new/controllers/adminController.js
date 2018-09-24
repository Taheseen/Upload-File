(function () {

  "use strict";

  var App = angular.module("App.controllers", ['ngFileUpload']);

  App.controller('adminController', ['$scope', 'Upload', '$http', '$timeout', function ($scope, Upload, $http, $timeout) {
    console.log("Hello World from controller");


    var refresh = function () {
      $http.get('/contactlist').success(function (response) {
        console.log("I got the data I requested");
        $scope.contactlist = response;
        $scope.contact = "";
      });
    };

    refresh();

    $scope.addContact = function () {
      console.log("Add contact working");
      console.log($scope.contact);
      $http.post('/contactlist', $scope.contact).success(function (response) {
        console.log(response);
        refresh();
      });
    };

    $scope.remove = function (id) {
      console.log(id);
      $http.delete('/contactlist/' + id).success(function (response) {
        refresh();
      });
    };

    $scope.edit = function (id) {
      console.log(id);
      $http.get('/contactlist/' + id).success(function (response) {
        $scope.contact = response;
      });
    };

    $scope.update = function () {
      console.log($scope.contact._id);
      $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function (response) {
        refresh();
      })
    };

    $scope.deselect = function () {
      $scope.contact = "";
    }

    $scope.uploadFile = function (file) {      
// http://jsfiddle.net/danialfarid/maqbzv15/1118/

      console.log('file',file);
      file.upload = Upload.upload({
        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
        data: {
          username: $scope.username,
          file: file
        },
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
          console.log(file.result,'file.result');
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    };

  }]);
}());