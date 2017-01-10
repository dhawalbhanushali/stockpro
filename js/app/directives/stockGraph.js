// Define all your directives here in directives angular module
define(['angular'], function function_name(angular) {

    var directives = angular.module('directivesModule', ['servicesModule', 'constantsModule']);
    
    directives.directive('stockGraph',['urlc', function(urlc) {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                history: '=',
                price: '=',
                type: '@',
                name: '@',
                graphId: '@',
                liveStock: '=',
                rangeSelector: '='
            },
            templateUrl: "../../templates/app/stock_graph.html",
            controller: ['$scope', '$element', '$attrs',function($scope, $element, $attrs) {
                $scope.formName = 'actionForm';
            }],
            link: function($scope, iElm, iAttrs, parentCtrl) {
                require(['highstock', 'highchartsExporting'], function() {
                    // Create the chart
                    var chart = Highcharts.stockChart($scope.graphId, {
                        rangeSelector: $scope.rangeSelector ? $scope.rangeSelector : {
                            selected: 1
                        },

                        title: {
                            text: $scope.name,
                            align: 'left'
                        },

                        series: [{
                            name: $scope.name,
                            data: $scope.history ? $scope.history : [],
                            type: $scope.type,
                            tooltip: {
                                valueDecimals: 2
                            }
                        }]
                    });

                    $scope.$watch('price', function(newVal, oldVal) {
                        if(oldVal != newVal) {
                            chart.setTitle({ text: 'CAKE: ' + newVal }, null, false);
                        }
                    });

                    $scope.$watch('liveStock', function(newVal, oldVal) {
                        if(oldVal != newVal) {
                            chart.series[0].addPoint([newVal['timeStamp'], newVal['close']]);
                        }
                    }, true);
                });
            }
        };
    }]);

    return directives;
});




