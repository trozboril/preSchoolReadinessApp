(function () {

  'use strict';

  /**
  1. login
  2. logout
  3. register
  4. set user info into localstorage
  5. get user info from localstorage
  **/

  angular.module('eduApp')
    .service('authService', authService);

  authService.$inject = ['$http', '$window'];

  function authService($http, $window) {
    var user = {};
    return {
      login: function(user) {
        return $http.post('/auth/login', user);
      },
      logout: function(user) {
        user = null;
        $window.localStorage.clear();
      },
      setUserInfo: function(userData) {
        $window.localStorage.setItem('user', JSON.stringify(userData.data.data.user));
        $window.localStorage.setItem('token', JSON.stringify(userData.data.data.token));
      },
      getUserInfo: function(userData) {
        return $window.localStorage.getItem('user');
      },
    };
  }

})();
