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
.controller('ContentController', function($scope, Authorization, $ionicModal) {

  //$scope.userdetails = function(){
  //  $scope.input = Authorization.getAuthObject();
  //}

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

  $scope.clipSrc = 'img/test.MOV';

  $scope.playVideo = function(source) {
    console.log(this.userdetails);
    this.clipSrc = source;
    $scope.showModal('templates/popover.html');
  }

});
