angular.module('eduApp.services', [])

.service('studentService', function($http) {
  return {
    getStudents: function () {
      return $http.get('https://educatedevelopunderstand.herokuapp.com/students');
    },
    getStudentActivities: function (student) {
      return $http.get('https://educatedevelopunderstand.herokuapp.com/activities');
    }
  };

});
