'use strict';
angular.module('epApp').controller('HCShow', function (helpCenterService, $stateParams) {
    var vm = this;

    var questionId = $stateParams.questionId;

    helpCenterService.getQuestion(questionId).then(function (res) {
        vm.question = res.data;
    }).catch(function (error) {
    })
});
