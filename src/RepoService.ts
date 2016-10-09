

namespace app 
{
    class RepoService
    {
        private _db: DbService;
        /**
         *
         */
        static $inject = ['DbService', '$window']
        constructor(DbService: DbService, public $window: ng.IWindowService) {
            this._db = DbService;
            
        }

        // public SaveEntry(foodItem: IJournalEntry ) 
        // {
        //     this._db.Save(foodItem);
        // }
    }

    angular.module("starter.services")
        .service('RepoService', RepoService);
}