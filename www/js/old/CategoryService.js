/// <reference path="../typings/index.d.ts" />
var app;
(function (app) {
    var CategoryService = (function () {
        function CategoryService() {
            this.categories = {
                "leafy-greens": {
                    photo: "lettuce.jpg",
                    goodBadCategory: "good",
                    name: "Leafy Greens",
                    description: "Romaine, iceberg lettuce, kale, etc."
                }
            };
        }
        CategoryService.prototype.getAllCategories = function () { };
        CategoryService.prototype.categoryLookup = function (categoryId) {
            return this.categories[categoryId];
        };
        return CategoryService;
    }());
    app.CategoryService = CategoryService;
    angular.module("starter.services")
        .service('CategoryService', CategoryService);
})(app || (app = {}));
