'use strict';
angular.module('epApp').factory('helpCenterService', function($http) {
	var helpCenter = {};

	var api_base_url_v1 = 'https://energypremier.com/api/v1/';

	helpCenter.getCategories = function(query, limit, page) {
		return $http.get(api_base_url_v1 + 'question-categories?' + query + (limit ? '&limit=' + limit : '') + (page ? '&page=' + page : ''), {
			headers: {
				"Accept": "application/json"
			}
		});
	}

	helpCenter.getQuestion = function(id) {
		return $http.get(api_base_url_v1 + 'questions/' + id, {
			headers: {
				"Accept": "application/json"
			}
		});
	}

	helpCenter.getQuestions = function(query, limit, page) {
		return $http.get(api_base_url_v1 + 'questions?' + query + (limit ? '&limit=' + limit : '') + (page ? '&page=' + page : ''), {
			headers: {
				"Accept": "application/json"
			}
		});
	}

	return helpCenter;
});
