angular.module('eduApp.services', [])

.service('studentService', function ($http) {
  return {
    getStudents: function () {
      return $http.get('https://educatedevelopunderstand.herokuapp.com/students');
    },
    getStudentActivities: function (student) {
      return $http.get('https://educatedevelopunderstand.herokuapp.com/activities');
    }
  };

})

.service('authService', function ($http, $window) {
  var user = {};
    return {
      login: function(user) {
        return $http.post('/auth/login', user);
      },
      logout: function(user) {
        user = null;
        $window.localStorage.clear();
      },
      register: function(user) {
        return $http.post('/auth/register', user);
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
