'use strict';
angular
    .module('epApp', [
        'ngAnimate',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router',
    ])

    .config(function ($routeProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise("/help");

        $stateProvider
            .state('main-layout', {
                templateUrl: 'views/main-layout.html',
                controller: 'MainCtrl as main'
            })
            .state('main-layout.hc-index', {
                url: '/help',
                templateUrl: 'views/help-center/index.html',
                controller: 'HCIndex as hc_index'
            })
            .state('main-layout.hc-show', {
                url: '/help/:questionId',
                templateUrl: 'views/help-center/show.html',
                controller: 'HCShow as hc_show'
            });

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');

    });