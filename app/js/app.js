'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'ngCookies'
]).
    config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/overview', {
            templateUrl: 'partials/overview.html',
            controller: function($scope, database, cases, actors) {
                $scope.overview = new OverviewCtrl(database, cases, actors);
            }
        });

        $routeProvider.when('/case/create', {
            templateUrl: 'partials/case.html',
            controller: function($scope, cases, actors, Case) {
                $scope.form = new CaseCtrl(cases, actors, Case);
                
                $scope.form.create();
            }
        });

        $routeProvider.when('/case/edit/:caseId', {
            templateUrl: 'partials/case.html',
            controller: function($scope, $routeParams, cases, actors, Case) {
                $scope.form = new CaseCtrl(cases, actors, Case);
                
                var index = $routeParams.caseId;
                
                $scope.form.edit(index);
            }
        });

        $routeProvider.when('/actor/create', {
            templateUrl: 'partials/actor.html',
            controller: function($scope, cases, actors, Actor) {
                $scope.form = new ActorCtrl(cases, actors, Actor);
                
                $scope.form.create();
            }
        });

        $routeProvider.when('/actor/edit/:actorId', {
            templateUrl: 'partials/actor.html',
            controller: function($scope, $routeParams, cases, actors, Actor) {
                $scope.form = new ActorCtrl(cases, actors, Actor);
                
                var index = $routeParams.actorId;
                
                $scope.form.edit(index);
            }
        });

        $routeProvider.otherwise({
            redirectTo: '/overview'
        });
    }
]);
