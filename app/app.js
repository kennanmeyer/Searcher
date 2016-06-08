
// Declare app level module which depends on views, and components
angular.module('DrexelSearcher', [
  'DrexelSearcher.controllers',
  'DrexelSearcher.services',
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when("/classes", {templateUrl: "views/classes.html", controller: "classesController"}).
  when("/classes/:crn", {templateUrl: "views/class_details.html", controller: "class_detailsController"}).
  when("/profile", {templateUrl: "views/profile.html", controller: "profileController"}).
  when("/", {templateUrl: "views/cover.html"}).

  otherwise({redirectTo: '/'});
}]);
