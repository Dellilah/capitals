app.controller('CapitalsController', function ($scope, $http, capitalsService) {

	init();

	var languages = capitalsService.getLanguages();

	function init() {
		$scope.countries = [];
		$scope.method = 'GET';
		$scope.url = 'http://restcountries.eu/rest/v1/';
		$http({method: $scope.method, url: $scope.url}).
			success(function(data, status) {
				$scope.status = status;
				$scope.countries = data;
				for (var i = $scope.countries.length - 1; i >= 0; i--) {
					for (var j = $scope.countries[i].languages.length - 1; j >= 0; j--) {
						if(languages[$scope.countries[i].languages[j]]){
							$scope.countries[i].languages[j] = languages[$scope.countries[i].languages[j]];
						}
					}
				}
			}).
			error(function(data, status) {
				$scope.data = data || "Request failed";
				$scope.status = status;
			});
	}
});

app.controller('MapsController', function ($scope, $http, $routeParams, capitalsService ) {

	$scope.capital = {};

	var languages = capitalsService.getLanguages();

	init();

    function init() {
        var capital = $routeParams.capital.trim();
        if (capital !== '') {
            $scope.method = 'GET';
			$scope.url = 'http://restcountries.eu/rest/v1/capital/'+capital;
			$http({method: $scope.method, url: $scope.url}).
				success(function(data, status) {
					$scope.status = status;
					$scope.capital = data.shift();
					for (var j = $scope.capital.languages.length - 1; j >= 0; j--) {
						if(languages[$scope.capital.languages[j]]){
							$scope.capital.languages[j] = languages[$scope.capital.languages[j]];
						}
					}
					setMap();
				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
					$scope.status = status;
				});
        }
    }

    function setMap() {
		$scope.map = {
			center: {
				latitude: 0,
				longitude: 0
			},
		zoom: 10
		};

		$scope.markers = [];
		$scope.markers.push({
				latitude: $scope.capital.latlng[0],
				longitude: $scope.capital.latlng[1]
		});
	}
});