angular.module('eduApp.controllers', [])

.controller('LoginController', function ($scope) {
  
  $scope.adminLogin = function () {
    
  };
  $scope.teacherLogin = function () {

  };
  $scope.guardianLogin = function () {

  };
})

.controller ('TeacherController', function ($scope) {

})

.controller('AdminController', function ($scope) {

})

.controller('GuardianController', function ($scope, studentService) {
  studentService.getStudents()
    .then(function (data) {
      console.log(data.data);
      $scope.students = data.data;
    });
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
