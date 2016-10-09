/// <reference path="../typings/index.d.ts" />
var app;
(function (app) {
    var RepoService = (function () {
        function RepoService(DbService, $window) {
            this.$window = $window;
            this._db = DbService;
        }
        /**
         *
         */
        RepoService.$inject = ['DbService', '$window'];
        return RepoService;
    }());
    angular.module("starter.services")
        .service('RepoService', RepoService);
})(app || (app = {}));
