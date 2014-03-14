var spinningForLifeControllers = angular.module('spinningForLifeControllers', []);

spinningForLifeControllers.controller('SpinningCtrl', function ($scope, $interval, $filter) {

    // Text properties for main window.
    const textWidth = [12, 6, 4, 3, 2];
    $scope.currentTextWidthIndex = 0;
    $scope.columnClass = "col-lg-12 text-center";

    // Configuration, with default values.
    $scope.config = {pricePrHour: 600, screenRowCount: 7, textHeadingSize: 'h1'};

    // The cyclists.
    $scope.cyclists = [];

    $scope.addCyclist = function () {
        $scope.cyclists.push({name: '', rideFor: 'NN', donation: '', timeStarted: '', timeLeft: '',
            textClass: $scope.config.textHeadingSize, error: '', hasError: false});
    };

    $scope.removeCyclist = function (cyclist) {
        var index = this.cyclists.indexOf(cyclist);
        this.cyclists.splice(index, 1);
    };

    $scope.startCyclist = function (cyclist) {

        cyclist.error = '';
        if (cyclist.rideFor == '') {
            cyclist.error += 'Donor må fylles ut! ';
        }
        if (cyclist.donation == '' || isNaN(cyclist.donation)) {
            cyclist.error += 'Beløp må fylles ut!';
        }
        cyclist.hasError = (cyclist.error != '');
        if (cyclist.hasError) {
            return;
        }

        // Compute time to ride.
        cyclist.timeStarted = new Date();
        var secondsToRide = cyclist.donation / $scope.pricePrSecond();

        // Compute visual grid.
        var startedCyclistsCount = ($filter('filter')($scope.cyclists, {timeStarted: '!' + ''})).length;
        if (startedCyclistsCount > 1 &&
            (startedCyclistsCount - 1) % $scope.config.screenRowCount == 0 &&
            $scope.currentTextWidthIndex < textWidth.length - 1) {
            $scope.currentTextWidthIndex++;
            $scope.columnClass = "col-lg-" + textWidth[this.currentTextWidthIndex] + " text-center";
        }

        // Add update of time left to cycle.
        var update = $interval(function () {
            var secondsSinceStarted = parseInt((new Date() - cyclist.timeStarted) / 1000);
            var secondsLeftOfRide = parseInt(secondsToRide - secondsSinceStarted);
            if (secondsLeftOfRide > 0) {
                cyclist.timeLeft = secondsLeftOfRide;
            } else {
                cyclist.timeLeft = 0;
                cyclist.textClass = "h4 cyclistFinished";
                $interval.cancel(update);
            }
        }, 1000);
    };

    $scope.pricePrSecond = function () {
        return $scope.config.pricePrHour / (60 * 60);
    };

    window.onbeforeunload = function (event) {
        var message = 'Ønsker du å avslutte?';
        if (typeof event == 'undefined') {
            event = window.event;
        }
        if (event) {
            event.returnValue = message;
        }
        return message;
    }
});