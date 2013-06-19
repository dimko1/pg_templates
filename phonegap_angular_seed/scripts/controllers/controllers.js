//login example
function FirstCtrl($scope, $location,$navigate, userService) {
	console.log('First Controller called');
    $scope.message = 'Hello, Login Module!';
    $scope.loggedIn = userService.isLogged;


    $scope.logMeInClicked = function()
    {
    	console.log('Log me in clicked');
    	userService.isLogged = !userService.isLogged;
        $scope.loggedIn = userService.isLogged;
        $navigate.go('/main');
    }
};

//log-out example
function MainController($scope,$location,$navigate,userService){
	console.log('Second Controller called');
	$scope.message = 'Hello, Second Controller';


    $scope.logMeOutClicked = function()
    {
         userService.isLogged = false;
         $navigate.go('/login');
    }
};

//controller which is using url to get id's and can be used to retrieve informations
function SectionController($scope, $routeParams){
    console.log('Section Controller called. You clicked on = ', $routeParams.sectionId);
    $scope.message = 'Section Controller called. You clicked on = ' + $routeParams.sectionId;
};

//controller which is using service to retrieve the data
function ContactsController($scope, contactsService){
    console.log('Contacts Controller Called');
    $scope.contacts = contactsService.getContacts();
};
