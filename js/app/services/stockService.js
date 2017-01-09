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
            },

            getFavoriteList: function() {
                return [
                    {
                        exec: 'BSE',
                        symbol: 'ICICIBANK',
                        price: 390.23,
                        change: '+2.34'
                    },
                    {
                        exec: 'BSE',
                        symbol: 'ICICIBANK',
                        price: 390.23,
                        change: '+2.34'
                    },
                    {
                        exec: 'BSE',
                        symbol: 'ININ',
                        price: 390.23,
                        change: '+2.34'
                    },
                    {
                        exec: 'NFO',
                        symbol: 'ALPHABET',
                        price: 390.23,
                        change: '+2.34'
                    },
                    {
                        exec: 'BSE',
                        symbol: 'UPSTOX',
                        price: 390.23,
                        change: '+2.34'
                    },
                    {
                        exec: 'BSE',
                        symbol: 'IDBIBANK',
                        price: 302.23,
                        change: '+12.34'
                    },
                    {
                        exec: 'NSE',
                        symbol: 'ICICIBANK',
                        price: 394.23,
                        change: '-2.34'
                    },
                    {
                        exec: 'NFO',
                        symbol: 'CIKO',
                        price: 39.23,
                        change: '-22.34'
                    },
                    {
                        exec: 'BSE',
                        symbol: 'DELL',
                        price: 39.23,
                        change: '+4.34'
                    },,
                    {
                        exec: 'CHO',
                        symbol: 'KO',
                        price: 9.23,
                        change: '-0.34'
                    },
                    {
                        exec: 'BSE',
                        symbol: 'DLL',
                        price: 121.23,
                        change: '+4.34'
                    },
                    {
                        exec: 'BSE',
                        symbol: 'LENOVO',
                        price: 12.23,
                        change: '+12.34'
                    },
                    {
                        exec: 'NSE',
                        symbol: 'ICICIBANK',
                        price: 394.23,
                        change: '-2.34'
                    }
                ]
            }
        }
    }]);

    services.factory('webSocket',['$http', 'urlc', function($http, urlc) {
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