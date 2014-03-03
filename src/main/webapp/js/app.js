var spinningForLifeApp = angular.module('spinningForLifeApp',
    ['ngRoute', 'spinningForLifeControllers', 'spinningForLifeServices']);

spinningForLifeApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/start', {
                templateUrl: 'start.html',
                controller: 'StartCtrl'
            }).
            when('/spinning', {
                templateUrl: 'spinning.html',
                controller: 'SpinningCtrl'
            }).
            when('/cyclists', {
                templateUrl: 'cyclists.html',
                controller: 'CyclistsCtrl'
            }).
            otherwise({
                redirectTo: '/start'
            });
    }]);