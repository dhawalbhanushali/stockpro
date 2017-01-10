// Define all your controllers here in controller angular module
define(['angular', 'lodash', 'socket'], function(angular, lodash, socket) {
	var controller = angular.module('controllersModule', ['servicesModule', 'directivesModule']);

	controller.controller('stockListController', ['$scope', 'urlc', '$route', function($scope, urlc, $route) {
		console.log('stockListController');
        $scope.stockList = {};
    }]);

	controller.controller('stockDetailController', ['$scope', '$route', 'urlc', '$timeout', 'stock', function($scope, $route, urlc, $timeout, stock) {
		$scope.showLiveFeed = false;
		$scope.livePrice = '';
		$scope.liveStock = {};
		$scope.liveRangeSelector = {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 2,
                type: 'minute',
                text: '2M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },
		$scope.stockHistoricData = $route.current.locals.loadStockData.data;
		$scope.stockHistoricData = _.reverse(_.map($scope.stockHistoricData, function(stock) {
			return [_.toNumber(stock.split(',')[0]), _.toNumber(stock.split(',')[4])];
		}));

		$scope.stockFavoriteList = stock.getFavoriteList();
        
        $scope.liveStockFeed = function() {
        	if (!$scope.showLiveFeed) {
	        	$scope.showLiveFeed = !$scope.showLiveFeed;

	    	    // Socket Establishment
	    	    $scope.socketObj = $scope.socketObj || socket.connect(urlc.stock.getLiveData);
	    	    
    			$scope.socketObj.emit('sub', {state: true});
	    	    
	    	    $scope.socketObj.on('data', function (data, callback) {
	    	    	$timeout(function() {
	    	    		callback(1);
	    	    		var liveStock = data.split(',');

	    	    		$scope.liveStock['timeStamp'] = _.toNumber(liveStock[0]);
	    	    		$scope.liveStock['dayHigh'] = _.toNumber(liveStock[2]);
	    	    		$scope.liveStock['dayLow'] = _.toNumber(liveStock[3]);
	    	    		$scope.liveStock['open'] = _.toNumber(liveStock[1]);
	    	    		$scope.liveStock['close'] = _.toNumber(liveStock[4]);
	    	    		$scope.liveStock['volume'] = _.toNumber(liveStock[5]);

	    	    		$scope.livePrice = $scope.liveStock['close'];
	    	    	}, 1000);
	    	    });
	    	} else {
	    		$scope.showLiveFeed = !$scope.showLiveFeed;
	    		$scope.socketObj.emit('unsub', {state: false});
	    	}
        }
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