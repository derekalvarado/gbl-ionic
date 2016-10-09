var app;
(function (app) {
    var EntryDetailCtrl = (function () {
        /**
         *
         */
        function EntryDetailCtrl($stateParams, DbService, categoryService) {
            this.$stateParams = $stateParams;
            this.DbService = DbService;
            this.categoryService = categoryService;
            this.servings = 0;
            this.searchItem = "";
            this._db = DbService;
            this.categoryId = $stateParams["categoryId"];
            this.categoryInfo = categoryService.categoryLookup(this.categoryId);
        }
        EntryDetailCtrl.prototype.decrease = function () {
            if (this.servings > 0) {
                this.servings -= 1;
            }
        };
        EntryDetailCtrl.prototype.increase = function () {
            this.servings += 1;
        };
        EntryDetailCtrl.prototype.getDate = function () {
            var dateStr = "";
            var date = new Date();
            dateStr += date.getFullYear().toString();
            if (date.getMonth() + 1 < 10) {
                dateStr += "0" + (date.getMonth() + 1);
            }
            if (date.getDate() < 10) {
                dateStr += "0" + date.getDate().toString();
            }
            else {
                dateStr += date.getDate().toString();
            }
            return parseInt(dateStr);
        };
        EntryDetailCtrl.prototype.save = function (searchItem, categoryId, servings) {
            var date = new Date();
            var journalEntry = {
                time: date.toTimeString(),
                goodBadCategory: this.categoryInfo.goodBadCategory,
                categoryId: this.categoryId,
                foodDetail: this.searchItem,
                servings: this.servings
            };
            this._db.addEntry(this.getDate(), journalEntry);
            this.searchItem = "";
            this.servings = 0;
        };
        EntryDetailCtrl.$inject = ['$stateParams', 'DbService', 'CategoryService'];
        return EntryDetailCtrl;
    }());
    angular.module('starter.controllers')
        .controller('EntryDetailCtrl', EntryDetailCtrl);
})(app || (app = {}));
