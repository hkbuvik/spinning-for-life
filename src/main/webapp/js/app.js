var spinningForLifeApp = angular.module('spinningForLifeApp', ['ngRoute', 'spinningForLifeControllers']);

spinningForLifeApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/start', {
                templateUrl: 'start.html'
            }).
            when('/spinning', {
                templateUrl: 'spinning.html'
            }).
            otherwise({
                redirectTo: '/start'
            });
    }]);

spinningForLifeApp.filter('secondsToMin', function () {
    return function (input) {
        var hours = 0;
        var minutes = parseInt(input / 60);
        var seconds = input % 60;
        if (minutes > 59) {
            hours = parseInt(minutes / 60);
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

spinningForLifeApp.filter('sumByKey', function () {
    return function (data, key) {
        if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
            return 0;
        }

        var sum = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            sum += parseInt(data[i][key]) || 0;
        }

        return sum;
    };
});

spinningForLifeApp.filter('orderByKey', function () {
    return function (data, key) {
        if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
            return 0;
        }

        var result = [];
        for (var i = 0; i < data.length; i++) {
            var value = data[i][key];
            if (result.indexOf(value) == -1) {
                result.unshift(data[i]);
            }
        }

        return result;
    };
});