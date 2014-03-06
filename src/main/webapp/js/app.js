var spinningForLifeApp = angular.module('spinningForLifeApp', ['ngRoute', 'spinningForLifeControllers']);

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
            otherwise({
                redirectTo: '/start'
            });
    }]);