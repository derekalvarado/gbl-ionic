/// <reference path="controllers.ts" />
/// <reference path="../typings/index.d.ts" />

namespace app {

    /**
     * InfoCtrl
     */
    class InfoCtrl {
        static $inject = ['$scope'];
        constructor(public $scope: ng.IScope) {

        }

        public info = "The goal is to focus on making sure you get enough of the healthy things, and worry about restricting the bad things later."
    }

    angular.module('starter.controllers')
        .controller('InfoCtrl', InfoCtrl);

}
