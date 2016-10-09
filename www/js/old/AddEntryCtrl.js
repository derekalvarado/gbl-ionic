
var app;
(function (app) {
    var JournalHomeCtrl = (function () {
        /**
         *
         */
        function JournalHomeCtrl($scope) {
            this.$scope = $scope;
            this.journalEntry = {
                time: "",
                goodBadCategory: "",
                foodCategory: "",
                foodDetail: "",
                servings: 0
            };
            this.categories = [
                {
                    id: "leafy-greens",
                    photo: "lettuce.jpg",
                    name: "Leafy Greens",
                    description: "Romaine, iceberg lettuce, kale, etc."
                }
            ];
        }
        JournalHomeCtrl.prototype.Save = function () {
        };
        JournalHomeCtrl.$inject = ['$scope'];
        return JournalHomeCtrl;
    }());
    angular.module('starter.controllers')
        .controller('JournalHomeCtrl', JournalHomeCtrl);
})(app || (app = {}));
