var theUrl = 'http://10.2.12.51:3000/';

//https://educatedevelopunderstand.herokuapp.com/
//http://10.2.12.51:3000/

angular.module('eduApp.services', [])

.service('studentService', function ($http) {
  return {
    getStudents: function () {
      return $http.get(theUrl + 'students');
    },
    getStudentActivities: function (student) {
      return $http.get(theUrl + 'activities');
    }
  };

})

.service('authService', function ($http, $window) {

  var user = {};

  var config = {
      headers: {
        'Accept': 'application/json'
      }
    };

    return {
      login: function(user) {
        return $http.post(theUrl + 'auth/login', user, config);
      },
      logout: function(user) {
        user = null;
        $window.localStorage.clear();
      },
      register: function(user) {
        return $http.post(theUrl + 'auth/register', user, config);
      },
      setUserInfo: function(userData) {
        $window.localStorage.setItem('user', JSON.stringify(userData.data.data.user));
        $window.localStorage.setItem('token', JSON.stringify(userData.data.data.token));
      },
      getUserInfo: function(userData) {
        return $window.localStorage.getItem('user');
      },
    };
})

.service('teacherService', function ($http) {
  return {
    addActivity: function (activity) {
      console.log('activity: ', activity);
      return $http.post(theUrl + 'activities', activity);
    },
    addClass: function (info) {
      return $http.post(theUrl + 'classes', info);
    },
    createStudent: function (student) {
      console.log('hit addStudent service');

      return $http.post(theUrl + 'students', student);
    },
  };
})

.service('authInterceptor', function ($window) {
  return {
      request: function(config) {
        // check for token in headers
        // config.headers['X-requested-with'] = XMLHttpRequest;
        var token = $window.localStorage.getItem('token');
        if(token) {
          config.headers.Authorization = "Bearer " + token;
          // return $q.resolve(config);
        }
        return config;
      }
    };
  });