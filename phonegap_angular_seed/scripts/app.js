'use strict:'

require.config({
	paths:{
		"angular":"vendor/angular.1.1.5",
		"angular-nav":"vendor/angular-nav",
		"controllers":"controllers/controllers",
		"services":"services/services"
	},
	shim:{
		"angular":{
			exports: "angular"
		},
		"angular-nav":{
			deps:["angular"]
		},
		"controllers":{
			deps:["angular","angular-nav"]
		},
		"services":{
			deps:["angular","angular-nav"]
		}
	}
});

define('app',['angular','angular-nav','controllers','services'], function(angular) {
	console.log('here, with all dependecies loaded');
    var app = angular.module('App', ['App.services','ajoslin.mobile-navigate'] );
    angular.element(document).ready(function () {
    	angular.bootstrap(document, ['App']);
  	});
    console.log('Loading angular through require.js');
    return app;
});

//configuring angular application
require(["app"], function(app){
app.config(function ($compileProvider){
    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})
.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/login', {
            controller: 'FirstCtrl',
            templateUrl: 'scripts/templates/login.html',
             access :{
                isProtected: false
            }
        })
        .when('/main', {
            controller: 'MainController',
            templateUrl: 'scripts/templates/main.html',
            access :{
                isProtected: true
            }
        })
        .when('/section/:sectionId', {
            controller: 'SectionController',
            templateUrl: 'scripts/templates/section.html',
            access :{
                isProtected: true
            }
        })
        .when('/contacts',{
            controller: 'ContactsController',
            templateUrl: 'scripts/templates/contacts.html',
            access :{
                isProtected: true
            }
        })
        .otherwise({ redirectTo: '/login' });
})
//this is where we are checking user information. it can be role or just request to be authorised
.run(['$rootScope', '$location', 'userService', function(root, location,userService) {
root.$on('$routeChangeStart', function(scope, next, current) {     

    //console.log('user is logged in = ' + userService.isLogged);
    console.log('access is protected =' + next.access.isProtected);
    if (next.access.isProtected && !userService.isLogged )
        location.path('/login');
    console.log('Route changed');
    });
}])
.controller('MainCtrl', function($scope, $navigate) {
  $scope.$navigate = $navigate;
})
.directive('ngTap', function() {
  var isTouchDevice = !!("ontouchstart" in window);
  console.log('Tap');
  return function(scope, elm, attrs) {
    if (isTouchDevice) {
      var tapping = false;
      elm.bind('touchstart', function() { tapping = true; });
      elm.bind('touchmove', function() { tapping = false; });
      elm.bind('touchend', function() { 
        tapping && scope.$apply(attrs.ngTap);
      });
    } else {
      elm.bind('click', function() {
        scope.$apply(attrs.ngTap);
      });
    }
  };});


});





/*console.log('Starting angular modules');

var app = {
	initialize:function(){
		this.bindEvents();
	},

	bindEvents:function(){
		//document.addEventListener('deviceready', this.onDeviceReady, true);
		this.onDeviceReady();
	},

	onDeviceReady:function(){
		console.log('On device ready function called');
		angular.element(document).ready(function(){
			angular.bootstrap(document);
		});
	},
};*/