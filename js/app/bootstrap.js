// Create angular module and inject controller/directives/filters/services modules in it.
// we can use the init() function to bootstrap our document with app.
define(
    ['angular', 'angular-route', 'homeController', 'stockService', 'constants'],
    function(angular, angularRoute, homeController, stockService, constants) {
        var app = angular.module('app', ['ngRoute', 'controllersModule', 'servicesModule', 'constantsModule']);
        
        app.init = function() {
            setTimeout(function() {
                angular.bootstrap(document, ['app']);
            }, 0)

        }

        app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $httpProvider.defaults.headers.post['Accept'] = 'application/json;odata=verbose';
            $httpProvider.defaults.transformRequest = function(data) {
                if (data === undefined) {
                    return data;
                }
                return $.param(data);
            };

            $httpProvider.interceptors.push(['$q',  function($q) {
                return {
                    'responseError': function(response) {
                        if (response.status == 401) {
                            // App loading completed & Session Timeout
                        }
                        if (response.status == 500) {
                            // Internal Server Error
                        }
                        // Always reject (or resolve) the deferred you're given
                        return $q.reject(response);
                    }
                };
            }]);

            $routeProvider
                .when('/', {
                    templateUrl: '../templates/userLanding.html' // find html template in settings view(index.php)
                })
                .when('/stockList', {
                    templateUrl: '../templates/app/stock_list.html',
                    controller: 'stockListController'
                })
                .when('/stockList/:id', {
                    templateUrl: '../templates/app/stock_detail.html',
                    controller: 'stockDetailController',
                    resolve: {
                        loadStockData: homeController.loadStockData
                    }
                })
                .otherwise({
                    redirectTo: '/'
                });
        }]);

        return app;
    }
);