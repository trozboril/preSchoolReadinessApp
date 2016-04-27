angular.module('eduApp.controllers', [])

.controller('LoginController', function ($scope, $rootScope, $location, authService) {
  $scope.login = function() {
    console.log('LOGIN CONTROLLER HIT');
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

.controller('RegisterController', function ($rootScope, $scope, $location, authService) {
    $scope.user = {};
    $scope.register = function() {
      console.log('user: ', $scope.user);
      console.log('HIT REGISTER CONTROLLER');
      authService.register($scope.user)
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

    $scope.addStudent = function () {
      console.log('hit student');
    };

    $scope.addClass = function () {
      console.log('hit class');
    };
})



.controller ('AddController', function ($scope, teacherService) {
  $scope.student = {};
  $scope.activity = {};
  $scope.group = {};
  $scope.addStudent = function () {
      console.log('hit student');
      teacherService.addStudent($scope.student);
  };
  $scope.addActivity = function () {
    console.log('hit addActivity FNCTN');
    teacherService.addActivity($scope.activity);
  };
  $scope.addClass = function () {
    console.log('hit addClass FNCTN');
    teacherService.addClass($scope.group);
  };
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
});
