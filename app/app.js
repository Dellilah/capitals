var app = angular.module("capitalsApp", ['google-maps', 'ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
	.when('/',
		{
			controller: 'CapitalsController',
			templateUrl: './app/partials/capitals.html'
		})
	.when('/maps/:capital',
	{
		controller: 'MapsController',
		templateUrl: './app/partials/capital_map.html'
	})
	.otherwise({redirectTo: '/'});
});

// source of unique filter: https://github.com/angular-ui/angular-ui-OLDREPO/blob/master/modules/filters/unique/unique.js
app.filter('unique', function () {
	return function (items, filterOn) {

	if (filterOn === false) {
		return items;
	}

	if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
		var hashCheck = {}, newItems = [];

		var extractValueToCompare = function (item) {
			if (angular.isObject(item) && angular.isString(filterOn)) {
				return item[filterOn];
			} else {
				return item;
			}
		};

		angular.forEach(items, function (item) {
			var valueToCheck, isDuplicate = false;

			for (var i = 0; i < newItems.length; i++) {
				if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
					isDuplicate = true;
					break;
				}
			}
			if (!isDuplicate) {
				newItems.push(item);
			}
		});
		items = newItems;
	}
	return items;
	};
});

app.filter('myFilter', function () {
  return function (items, term, region, subregion, currency, language) {
    var filtered = [];
	items = (currency && currency !== '') ? items.filter(function(v){ return v['currencies'].indexOf(currency.field) > -1; }) : items;
	items = (language && language !== '') ? items.filter(function(v){ return v['languages'].indexOf(language.field) > -1; }) : items;
	items = ( region && region !== "") ? items.filter(function(v){ return v['region'] === region.region; }) : items;
    items = ( subregion && subregion !== "")? items.filter(function(v){ return v['subregion'] === subregion.subregion; }) : items;
    if( !term || term.trim() === ""){
          filtered = items;
    }
    else{
		for (var i = 0; i < items.length; i++) {
			term = term.trim().toLowerCase();
			var item = items[i];
			if (item.capital.toLowerCase().indexOf(term) > -1 || item.name.toLowerCase().indexOf(term) > -1) {
				filtered.push(item);
			}
		}
	}
    return filtered;
  };

  
});

app.filter('flatten' , function(){
  return function(items, field){
	var flatten = [];
	var temp;
	for (var i = items.length - 1; i >= 0; i--) {
		for (var j = items[i][field].length - 1; j >= 0; j--) {
			flatten.push({ field: items[i][field][j]});
		}
	}
	return flatten;
  };
});