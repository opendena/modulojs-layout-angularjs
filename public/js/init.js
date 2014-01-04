
angular.module('demo').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'views/index.html'
        }).
        when('/about', {
            templateUrl: 'views/about.html'
        }).
        when('/contact', {
            templateUrl: 'views/contact.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]); 


angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash == "#_=_") window.location.hash = "";

    //Then init the app
    angular.bootstrap(document, ['demo']);
});
