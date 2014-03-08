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

spinningForLifeApp.filter('secondsToMin', function () {
    return function (input, scope) {
        var hours = 0;
        var minutes = parseInt(input / 60);
        var seconds = input % 60;
        if (minutes > 59) {
            hours = parseInt(minutes / 60)
            minutes = minutes - 60 * hours;
        }

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return hours + ":" + minutes + ":" + seconds;
    }
});