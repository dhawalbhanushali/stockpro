// Define all your filters here in filters angular module
define(['angular'], function function_name(angular) {
    var constants = angular.module('constantsModule', ['servicesModule']);
    var domain = 'http://kaboom.rksv.net/api/';
    var websocketDomain = 'http://kaboom.rksv.net/';
    constants.constant({
        'urlc': {
            'stock': {
                'getHistoricalData': domain + 'historical',
                'getLiveData': websocketDomain + 'watch'
            }
        }
    });

    return constants;
});