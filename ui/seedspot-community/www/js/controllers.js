angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, Authorization, $ionicPopup, $state) {
    $scope.data = {};

    $scope.input = Authorization;
    $scope.setUserName=function(val){
         recipeService.selectedRecipe=val;
        //and your redirection stuff goes here.
     };

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            Authorization.setAuthObject($scope.data);
            $state.go('community');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})
.controller('ContentController', function($scope, Authorization, $ionicModal, $http) {


  $scope.userdetails = Authorization.getAuthObject();

  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope,
      animation: 'slide-in-up'
      }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };

  $scope.clipSrc = '';

  $scope.courseContent = function() {
    $http({
      method: 'GET',
      url: 'http://127.0.0.1:5000/course_content?username='+$scope.userdetails.username
    }).then(function successCallback(response) {
        var obj1 = response.data.data.files;
        var i, j;
        var result = '';
        var count = 1;
        for(i = 0; i < obj1.length; i++) {
          var obj2 = obj1[i];
          var files = '';
          var folder = obj2[0].split('/')[2];

          for(j = 0; j < obj2.length; j++) {

            if(obj2[j].split('/')[3].split('.')[1] == 'mp4') {
              console.log(obj2[j].split('/')[3]);
              console.log(count);
              document.getElementById('button'+count).innerHTML = obj2[j].split('/')[3];
              count = count+1;
            }
          }
        }

        //document.getElementById('clickedContent').innerHTML = (result);
        //angular.element(document.getElementById('clickedContent')).append(result);
        document.getElementById('clickedContent').style.visibility = 'visible';
      }, function errorCallback(response) {
        console.log('Oh god!');
      });
  };

  $scope.showContent = function (link) {
    $http({
      method: 'GET',
      url: 'http://127.0.0.1:5000/get_file?filepath='+link
    }).then(function successCallback(response) {
      var path = response.data.data.filepath.file_path;
      $scope.playVideo(path);
      }, function errorCallback(response) {
        console.log('Oh god!');
      });
  }

  $scope.playVideo = function(source) {
    $scope.clipSrc = source;
    $scope.showModal('templates/popover.html');
  }

});
