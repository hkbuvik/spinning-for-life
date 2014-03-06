var spinningForLifeControllers = angular.module('spinningForLifeControllers', []);

spinningForLifeControllers.controller('StartCtrl', function ($scope) {
});

spinningForLifeControllers.controller('SpinningCtrl',function ($scope, $interval, $filter) {

    var pricePrSecond = 3 / 60;
    var millisPrSecond = 1000;

    $scope.cyclists = [];
    $scope.finishedCyclists = [];

    $scope.startCyclist = function (cyclist) {
        cyclist.timeStarted = new Date();
        var update = $interval(function () {
            var secondsToRide = cyclist.donation / pricePrSecond;
            var secondsSinceStarted = (new Date() - cyclist.timeStarted) / millisPrSecond;
            var secondsLeftOfRide = $filter('number')(secondsToRide - secondsSinceStarted, 0);
            if (secondsLeftOfRide > 0) {
                cyclist.timeLeft = secondsLeftOfRide;
            } else {
                $scope.finishedCyclists.push(cyclist);
                $scope.removeCyclist(cyclist);
                $interval.cancel(update);
            }
        }, 1000);
    };

    $scope.addCyclist = function () {
        $scope.cyclists.push({name: '', rideFor: '', donation: '', timeStarted: '', timeLeft: ''});
    };

    $scope.removeCyclist = function (cyclist) {
        var index = this.cyclists.indexOf(cyclist);
        this.cyclists.splice(index, 1);
    }

});