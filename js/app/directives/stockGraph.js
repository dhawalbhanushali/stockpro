// Define all your directives here in directives angular module
define(['angular'], function function_name(angular) {

    var directives = angular.module('directivesModule', ['servicesModule', 'constantsModule']);
    /**
    * Modal Controller
    */
    
    directives.directive('stockGraph',['urlc', function(urlc) {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                history: '=',
                price: '='
            },
            templateUrl: "../../templates/app/stock_graph.html",
            controller: ['$scope', '$element', '$attrs',function($scope, $element, $attrs) {
                $scope.formName = 'actionForm';
            }],
            link: function($scope, iElm, iAttrs, parentCtrl) {
                require(['highstock', 'highchartsExporting'], function() {
                    // Create the chart
                    var chart = Highcharts.stockChart('stockGraph', {
                        rangeSelector: {
                            selected: 1
                        },

                        title: {
                            text: 'CAKE',
                            align: 'left'
                        },

                        series: [{
                            name: 'CAKE',
                            data: $scope.history,
                            type: 'area',
                            threshold: null,
                            tooltip: {
                                valueDecimals: 2
                            },
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            }
                        }]
                    });

                    $scope.$watch('price', function(newVal, oldVal) {
                        if(oldVal != newVal) {
                            chart.setTitle({ text: 'CAKE: ' + newVal }, null, false);
                        }
                    });
                });
            }
        };
    }]);

    return directives;
});




