var spinningForLifeControllers = angular.module('spinningForLifeControllers', []);

spinningForLifeControllers.controller('StartCtrl', ['$scope', 'Cyclist', function ($scope, Cyclist) {
    $scope.cyclists = Cyclist.query();
}]);
spinningForLifeControllers.controller('CyclistsCtrl', ['$scope', 'Cyclist', function ($scope, Cyclist) {
    $scope.cyclists = Cyclist.query();
}]);

spinningForLifeControllers.controller('SpinningCtrl', ['$scope', 'Cyclist', function ($scope, Cyclist) {
    $scope.cyclists = Cyclist.query();
    $scope.activeCyclists = null;
}]);