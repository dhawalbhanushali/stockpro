// Define all your controllers here in controller angular module
define(['angular'], function(angular) {
	var controller = angular.module('controllersModule', ['servicesModule']);

	controller.controller('stockListController', ['$scope', 'urlc', '$route', function($scope, urlc, $route) {
		console.log('stockListController');
        $scope.stockList = {};
    }]);

	controller.controller('stockDetailController', ['$scope', '$route', function($scope, $route, hrefc) {
        $scope.stockHistoricData = $route.current.locals.loadStockData.data;
        console.log($scope.stockHistoricData);
    }]);

	controller.loadStockData = function($q, stock) {
	    var defer = $q.defer();
	    var params = {
	    	"interval": "1"
	    }
	    stock.getHistoricalData(params).then(function(result) {
	        if (result.status == 200 && result.statusText == "OK") {
	            defer.resolve(result);
	        } else {
	            defer.resolve([]);
	        }
	    });
	    return defer.promise;
	}

	controller.loadStockData.$inject = ['$q','stock'];

	return controller;
});