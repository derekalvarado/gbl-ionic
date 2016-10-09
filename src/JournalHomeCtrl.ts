/// <reference path="controllers.ts" />
/// <reference path="../typings/index.d.ts" />
/// <reference path="CategoryService.ts" />




namespace app {
    class JournalHomeCtrl {
        static $inject = ['CategoryService'];
        /**
         *
         */
        constructor(public CategoryService: CategoryService) {
            this.categories = CategoryService.getAllCategories();            
        }


        public categories: IFoodCategories;
        

        public Save(): void {

        }
    }

    angular.module('starter.controllers')
        .controller('JournalHomeCtrl', JournalHomeCtrl);
}