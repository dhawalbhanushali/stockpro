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
                        change: '+2.14',
                        profit: true
                    },
                    {
                        exec: 'BSE',
                        symbol: 'ICICIBANK',
                        price: 390.23,
                        change: '+1.34',
                        profit: true
                    },
                    {
                        exec: 'BSE',
                        symbol: 'ININ',
                        price: 390.23,
                        change: '-1.4',
                        profit: false
                    },
                    {
                        exec: 'NFO',
                        symbol: 'ALPHABET',
                        price: 390.23,
                        change: '+2.34',
                        profit: true
                    },
                    {
                        exec: 'BSE',
                        symbol: 'UPSTOX',
                        price: 390.23,
                        change: '+0.23',
                        profit: true
                    },
                    {
                        exec: 'BSE',
                        symbol: 'IDBIBANK',
                        price: 302.23,
                        change: '+12.34',
                        profit: true
                    },
                    {
                        exec: 'NSE',
                        symbol: 'ICICIBANK',
                        price: 394.23,
                        change: '-2.34',
                        profit: false
                    },
                    {
                        exec: 'NFO',
                        symbol: 'CIKO',
                        price: 39.23,
                        change: '-22.34',
                        profit: false
                    },
                    {
                        exec: 'BSE',
                        symbol: 'DELL',
                        price: 39.23,
                        change: '+4.34',
                        profit: true
                    },
                    {
                        exec: 'CHO',
                        symbol: 'KO',
                        price: 9.23,
                        change: '-0.34',
                        profit: false
                    },
                    {
                        exec: 'BSE',
                        symbol: 'DLL',
                        price: 121.23,
                        change: '+4.34',
                        profit: true
                    },
                    {
                        exec: 'BSE',
                        symbol: 'LENOVO',
                        price: 12.23,
                        change: '+12.34',
                        profit: true
                    },
                    {
                        exec: 'NSE',
                        symbol: 'ICICIBANK',
                        price: 394.23,
                        change: '-2.34',
                        profit: false
                    }
                ]
            }
        }
    }]);

    return services;
});