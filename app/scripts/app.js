'use strict';

angular
    .module('angularjsAuthTutorialApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'dfUserManagement'
    ])
    .constant('DSP_URL', /* ENTER_YOUR_DSP_URL */)
    .constant('DSP_API_KEY', /* ENTER_YOUR_APP_NAME */)
    .config(['$httpProvider', 'DSP_API_KEY', function ($httpProvider, DSP_API_KEY) {

        // Set default headers for http requests
        $httpProvider.defaults.headers.common["X-DreamFactory-Application-Name"] = DSP_API_KEY;

    }])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/logout', {
                templateUrl: 'views/logout.html',
                controller: 'LogoutCtrl'
            })
            .when('/user-info', {
                templateUrl: 'views/user-info.html',
                controller: 'UserInfoCtrl',
                resolve: {

                    getUserData: ['$location', 'UserDataService', function($location, UserDataService) {

                        if (!UserDataService.getCurrentUser()) {

                            $location.url('/login');
                        }else {

                            return UserDataService.getCurrentUser();
                        }
                    }]
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    });
