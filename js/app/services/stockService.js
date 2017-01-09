// Define all your services here in services angular module
define(['angular', 'constants'], function function_name(angular, constants) {
    var services = angular.module('servicesModule', ['constantsModule']);
    
    services.factory('stock',['$http', 'urlc', function($http, urlc) {
        return {
            getHistoricalData: function(params) {
                return $http({
                    url: urlc.stock.getHistoricalData,
                    params: params,
                    method: 'GET'
                });
            }
        }
    }]);

    return services;
});