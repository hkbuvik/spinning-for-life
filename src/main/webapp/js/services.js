var spinningForLifeServices = angular.module('spinningForLifeServices', ['ngResource']);

spinningForLifeServices.factory('Cyclist', ['$resource',
    function ($resource) {
        return $resource('data/:cyclistId.json', {}, {
            query: {method: 'GET', params: {cyclistId: 'cyclists'}, isArray: true}
        });
    }]);