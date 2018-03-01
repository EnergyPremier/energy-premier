'use strict';
angular.module('epApp').controller('HCIndex', function ($httpParamSerializer, helpCenterService) {
    var vm = this;
    vm.dataModel = {
        language: 'en' // 'en' needs to be replaced with the current language
    };

    vm.questionList = [];

    // Keeps queried questions in plain text format
    vm.plainText = [];

    // Get all question categories with 12 questions of each (initial results set)
    vm.getResults = function () {

        var query = $httpParamSerializer(vm.dataModel);

        helpCenterService.getCategories(query).then(function (response) {
            vm.categories = response.data.data

            if (Array.isArray(vm.categories)) {
                angular.forEach(vm.categories, function (value) {
                    vm.name = value.name;
                    var qs = query + '&category=' + value.id;

                    helpCenterService.getQuestions(qs, 12, 1).then(function (response) {
                        vm.questions = response.data.data;
                        var categoryName = value.name
                        if (value.questions_count > 0) {
                            vm.questionList.push({category_name: categoryName, questions: vm.questions});
                        }
                        vm.pagination = response.data.meta.pagination;
                    }).catch(function (error) {
                    });

                });
            }

        }).catch(function (error) {
        });
    }
    vm.getResults();

    vm.submitSearchForm = function () {
        vm.plainText = [];
        for (var key in vm.dataModel) {
            if (vm.dataModel[key] === '') {
                delete vm.dataModel[key];
            }
        }

        var qs = $httpParamSerializer(vm.dataModel);
        if (qs == '') return;

        helpCenterService.getQuestions(qs).then(function (response) {
            vm.searchedQuestions = response.data.data
            angular.forEach(vm.searchedQuestions, function (value) {
                var data = value.body;
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = data;
                vm.plainText.push(tempDiv.innerText || tempDiv.textContent);
            });
        }).catch(function (error) {
        });
    }

});
