var spinningForLifeControllers = angular.module('spinningForLifeControllers', []);

spinningForLifeControllers.controller('StartCtrl', function ($scope) {
});

spinningForLifeControllers.controller('SpinningCtrl', function ($scope, $interval) {

    const millisPrSecond = 1000;

    $scope.pricePrHour = 200;
    $scope.cyclists = [];
    $scope.finishedCyclists = [];

    $scope.startCyclist = function (cyclist) {

        // Compute and set visual grid.
        var newColumClass = "col-lg-" + parseInt(12 / $scope.cyclists.length);
        console.log("New colum class name is: " + newColumClass);
        var activeCyclistElements = $('[name="active_cyclist"]');
        activeCyclistElements.attr('class', newColumClass);

        // Compute time to ride.
        cyclist.timeStarted = new Date();
        var secondsToRide = cyclist.donation / $scope.pricePrSecond();
        console.log("Cyclist " + cyclist.name + " shall ride " + secondsToRide + " s");

        // Add update of time left to cycle.
        var update = $interval(function () {
            var secondsSinceStarted = parseInt((new Date() - cyclist.timeStarted) / millisPrSecond);
            console.log("Cyclist " + cyclist.name + " started " + secondsSinceStarted + " s ago");
            var secondsLeftOfRide = parseInt(secondsToRide - secondsSinceStarted);
            console.log("Cyclist " + cyclist.name + " has " + secondsLeftOfRide + " left");
            if (secondsLeftOfRide > 0) {
                cyclist.timeLeft = secondsLeftOfRide;
            } else {
                $scope.finishedCyclists.push(cyclist);
                $scope.removeCyclist(cyclist);
                $interval.cancel(update);
            }
        }, 1000);
    };

    $scope.pricePrSecond = function () {
        return $scope.pricePrHour / (60 * 60);
    }

    $scope.addCyclist = function () {
        $scope.cyclists.push({name: '', rideFor: '', donation: '', timeStarted: '', timeLeft: ''});
    };

    $scope.removeCyclist = function (cyclist) {
        var index = this.cyclists.indexOf(cyclist);
        this.cyclists.splice(index, 1);
    }

});