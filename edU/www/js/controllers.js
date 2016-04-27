angular.module('eduApp.controllers', [])

.controller('LoginController', function ($scope, $rootScope, $location, authService) {
  $scope.login = function() {
      authService.login($scope.user)
        .then(function(user) {
          authService.setUserInfo(user);
          $location.path('/');
          $rootScope.currentUser = authService.getUserInfo();
        })
        .catch(function(err) {
          // check status code, send appropriate message
          console.log(err);
        });
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
      student = data.data;
    });
  studentService.getStudentActivities()
    .then(function (data) {
      console.log('activitiesData', data);
      $scope.activities = data.data;
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
