/// <reference path="controllers.ts" />
/// <reference path="DbService.ts" />
/// <reference path="../typings/index.d.ts" />
/// <reference path="CategoryService.ts" />

namespace app {
    class EntryDetailCtrl {
        private _db: DbService;
        private categoryId;
        private categoryInfo: ICategoryItem;
        public entryName: string;
        static $inject = ['$stateParams', 'DbService', 'CategoryService', '$ionicNavBarDelegate', '$ionicPopup', '$state'];
        /**
         *
         */
        constructor(public $stateParams: angular.ui.IStateParamsService, public DbService: DbService, public categoryService: CategoryService, public $ionicNavBarDelegate, public $ionicPopup: ionic.popup.IonicPopupService, public $state: ng.ui.IStateService) {
            this._db = DbService;

            this.categoryId = $stateParams["categoryId"];

            this.categoryInfo = categoryService.categoryLookup(this.categoryId);

            //Set the title of the view
            this.entryName = this.categoryInfo.name;



        }
        public showPopup() {
            var alertPopup = this.$ionicPopup.alert({
                title: 'Saved',
                template: 'Saved!'
            });

            alertPopup.then((res) => {
                this.$state.go('tab.home');
            });
        }

        private servings: number = 0;

        private searchItem: string = "";

        public decrease() {
            if (this.servings > 0) {
                this.servings -= 1
            }
        }
        public increase() {
            this.servings += 1;
        }


        public save(searchItem: string, categoryId: string, servings: number) {
            var date: Date = new Date();

            var journalEntry: IJournalEntryDetail = {
                time: date.toTimeString(),
                goodBadCategory: this.categoryInfo.goodBadCategory,
                foodDetail: this.searchItem,
                servings: this.servings
            };

            this._db.addEntry(journalEntry, categoryId);
            this.searchItem = "";
            this.servings = 0;

            this.showPopup();
        }

    }

    angular.module('starter.controllers')
        .controller('EntryDetailCtrl', EntryDetailCtrl);
}