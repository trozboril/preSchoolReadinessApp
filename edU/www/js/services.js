var theUrl = 'https://educatedevelopunderstand.herokuapp.com/';

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
      return $http.post(theUrl + 'activity', activity);
    },
    addClass: function (info) {
      return $http.post(theUrl + 'classes', info);
    },
    addStudent: function (student) {
      return $http.post(theUrl + 'student', student);
    }
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
