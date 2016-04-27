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

  var config = {
      headers: {
        'Accept': 'application/json'
      }
    };

    return {
      login: function(user) {
        return $http.post('https://educatedevelopunderstand.herokuapp.com/auth/login', user, config);
      },
      logout: function(user) {
        user = null;
        $window.localStorage.clear();
      },
      register: function(user) {
        return $http.post('https://educatedevelopunderstand.herokuapp.com/auth/register', user, config);
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
      return $http.post('https://educatedevelopunderstand.herokuapp.com/activity', activity);
    },
    addClass: function (info) {
      return $http.post('https://educatedevelopunderstand.herokuapp.com/classes', info);
    },
    addStudent: function (student) {
      return $http.post('https://educatedevelopunderstand.herokuapp.com/student', student);
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
