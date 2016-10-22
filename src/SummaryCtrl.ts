/// <reference path="controllers.ts" />
/// <reference path="../typings/index.d.ts" />
/// <reference path="CategoryService.ts" />
/// <reference path="DbService.ts" />

namespace app {
    'use strict'

    interface ISummaryViewModel {
        [index: string]: {
            name?: string,
            icon: string,
            iconOutline: string,
            servings?: number,
            goalServings?: number,
        }
    }

    interface ITally {
        [categoryId: string]: {
            servings?: number
        }


    }
    class CategorySummary {
        /**
         *
         */
        constructor(public name: string, public servings: number, public goalServings: number) {


        }

     
    }

    class SummaryViewModel {
        public hasData: boolean = false;
        public tallies: Array<CategorySummary> = [];
    }


    class SummaryCtrl {
        static $inject = ['$scope', 'DbService', 'CategoryService'];
        public range = "Today";
        public categories: IFoodCategories;
        public results: IJournalEntry;
        public viewModel: ISummaryViewModel = {};
        /**
         *
         */
        constructor(public $scope: ng.IScope, public DbService: DbService,
                                public CategoryService: CategoryService) {
            this.categories = CategoryService.getAllCategories();
            $scope.$on("$ionicView.enter", () => { this.pickerChange("today"); });
        }


        public tallyServings(categoryEntries: IJournalEntry): ITally {

            let tally: ITally = {};

            for (let categoryId in categoryEntries) {
                tally[categoryId] = {}
                tally[categoryId] = { servings: 0 }

                categoryEntries[categoryId].forEach(element => {
                    tally[categoryId].servings += element.servings;
                });

            }

            return tally;

        }

        public getNumber(num: number): Array<any> {
            //debugger;
            if (num >= 0) {
                return new Array(num);
            }
            return new Array(0);
            
        }        

        //Method that updates the viewModel
        //Named because I had a dropdown in mind for the tab-summary page
        public pickerChange(range: string): void {

            this.results = this.DbService.getEntriesForToday();

            let tally: ITally = this.tallyServings(this.results);

            //Get all categories so as to build a complete view model, including 
            //categories that we dont' have an entry for            
            let categories = this.CategoryService.getAllCategories();

            //Assemble the view model            
            for (let categoryId in categories) {
                let _name = categories[categoryId].name;
                let _icon = categories[categoryId].icon;
                let _iconOutline = categories[categoryId].iconOutline;
                let _servings = tally[categoryId] ? tally[categoryId].servings : 0;
                let _goalServings = categories[categoryId].goalServings;
                let summary = 
                    {
                        name: _name,
                        servings: _servings,
                        icon: _icon,
                        iconOutline: _iconOutline,
                        goalServings: _goalServings
                    }
                
                this.viewModel[categoryId] = summary;

            }


        }
    }

    angular.module('starter.controllers')
        .controller('SummaryCtrl', SummaryCtrl);
}