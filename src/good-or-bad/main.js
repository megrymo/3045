var fs = require('fs');
// routeProvider
function config($routeProvider) {
  $routeProvider.
    when('/good', {
      template: fs.readFileSync('./build/good-or-bad/static/good.html', 'utf8'),
      data: 'good'
    }).
    when('/bad', {
      template: fs.readFileSync('./build/good-or-bad/static/bad.html', 'utf8'),
      data: 'bad'
    }).
    otherwise({
      redirectTo: '/good'
    });
}
angular.module('qualityApp', ['ngResource', 'ngRoute', 'ngAnimate']).config(config);

// navCtrl
(function invoke() {
  "use strict";
  function NavCtrl($document, $route, $routeParams, $scope, $location) {
    this.loading = true;
    this.route = $route;
    this.active = $location.path().replace('/', '');

    $scope.$on('$stateChangeSuccess', function(event){
      this.active = $location.path().replace('/', '');
      if(!$scope.$$phase) {
        $scope.$apply();
      }
    });
  };
  angular.module('qualityApp')
      .controller('navCtrl', NavCtrl);
}());

angular.element(document).ready(function() {
  angular.bootstrap(document, ['qualityApp']);
});
