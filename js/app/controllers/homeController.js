// Define all your controllers here in controller angular module
define(['angular', 'lodash'], function(angular, lodash) {
	var controller = angular.module('controllersModule', ['servicesModule', 'directivesModule']);

	controller.controller('stockListController', ['$scope', 'urlc', '$route', function($scope, urlc, $route) {
		console.log('stockListController');
        $scope.stockList = {};
    }]);

	controller.controller('stockDetailController', ['$scope', '$route', 'urlc', '$timeout', 'stock', function($scope, $route, urlc, $timeout, stock) {
		$scope.stockHistoricData = $route.current.locals.loadStockData.data;
		$scope.stockHistoricData = _.reverse(_.map($scope.stockHistoricData, function(stock) {
			return [_.toNumber(stock.split(',')[0]), _.toNumber(stock.split(',')[4])];
		}));

		$scope.stockFavoriteList = stock.getFavoriteList();
        
        require(['socket'], function(io) {
            var socketObj = io.connect(urlc.stock.getLiveData);
            
            socketObj.on('connect', function () {
        		socketObj.emit('sub', {state: true});
            });
            
            socketObj.on('data', function (data, callback) {
            	$timeout(function() {
            		callback(1);
            		$scope.livePrice = data.split(',')[4];
            	}, 1000);
            });

            socketObj.on('error', function (data) {
            	console.log('error');
            });
        });
    }]);

	controller.loadStockData = function($q, stock) {
	    var defer = $q.defer();
	    var params = {
	    	"interval": "2"
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