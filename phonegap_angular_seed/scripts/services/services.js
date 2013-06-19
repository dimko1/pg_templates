var appModule = angular.module('App.services',[]);
//example of simple service
appModule.factory('utilityService', function(){
	var utilityService = {};

	utilityService.callMe = function()
	{
		alert('this is alert from utility method');
	}
	return utilityService;
});

//example of injecting one service into another
//also example of saving info about the user.
appModule.factory('userService', ['utilityService',function(uService){
	var userService = {
		isLogged:false,
		username:''
	};

	userService.coolFunction = function()
	{
		alert('Cool function called');
		uService.callMe();
	}

	return userService;
}]);

//example of receiveing values.
appModule.factory('contactsService', function(){
	var contacts = {};

	var container = ['John Doe', 'Joanna Doe', 'Bill Gates'];
	
	contacts.getContacts = function(){
		console.log('receiving contacts');
		return container;
	}

	return contacts;
});
