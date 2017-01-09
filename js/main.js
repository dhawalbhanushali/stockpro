// For more information on different options passed to
// require.config visit http://requirejs.org/docs/api.html#config
require.config({
    //Remember: only use shim config for non-AMD scripts,
    //scripts that do not already call define(). The shim
    //config will not work correctly if used on AMD scripts,
    //in particular, the exports and init config will not
    //be triggered, and the deps config will be confusing
    //for those cases.
    shim: { //http://requirejs.org/docs/api.html#config-shim
        'app': {
            deps: ['angular'],
        },
        'angular': {
            exports: 'angular',
            deps: ['jquery'],
        },
        'angular-route': {
            deps: ['angular'],
        },
        'bootstrap': {
            deps: ['jquery'],
        }
    },
    paths: { // ,http://requirejs.org/docs/api.html#pathsfallbacks
        'angular': '../../node_modules/angular/angular',
        'angular-route': '../../node_modules/angular-route/angular-route.min',
        'jquery': '../../node_modules/jquery/dist/jquery.min',
        'bootstrap': '../../node_modules/bootstrap/dist/js/bootstrap.min',

        'app': 'bootstrap',
        'constants': 'constants',

        'homeController': 'controllers/homeController',
        'stockService': 'services/stockService'
    },
    baseUrl: '../js/' + module_id + '/',
    waitSeconds: 0,
});

require(['app'],
    function(app) {
        app.init();
        require(
            ['bootstrap'], function() {}
        );
    }
);