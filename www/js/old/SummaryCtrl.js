var app;
(function (app) {
    var SummaryCtrl = (function () {
        /**
         *
         */
        function SummaryCtrl($scope) {
            this.$scope = $scope;
        }
        SummaryCtrl.$inject = ['$scope'];
        return SummaryCtrl;
    }());
    angular.module('starter.controllers')
        .controller('SummaryCtrl', SummaryCtrl);
})(app || (app = {}));
