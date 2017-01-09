// Define all your filters here in filters angular module
define(['angular'], function function_name(angular) {
    var constants = angular.module('constantsModule', ['servicesModule']);
    var domain = 'http://kaboom.rksv.net/api/';
    constants.constant({
        'urlc': {
            'stock': {
                'getHistoricalData': domain + 'historical',
            }
        }
    });

    return constants;
});