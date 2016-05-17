// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: '/assets/partials/home.html',
            controller: 'MainController'
        })

        .when('/ng', {
            templateUrl: '/assets/partials/createGroup.html',
            controller: 'MainController'
        })
        .when('/group/:id', {
            templateUrl: '/assets/partials/group.html',
            controller: 'GroupController'
        })
        .when('/p/:id', {
            templateUrl: '/assets/partials/post.html',
            controller: 'PostController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);