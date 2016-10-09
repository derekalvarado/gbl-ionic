var app;
(function (app) {
    'use strict';
    var LocalStorageService = (function () {
        function LocalStorageService($window) {
            this.$window = $window;
        }
        LocalStorageService.prototype.set = function (key, value) {
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            this.$window.localStorage[key] = value;
            return value;
        };
        LocalStorageService.prototype.get = function (key, defaultValue) {
            return this.$window.localStorage[key] || defaultValue;
        };
        LocalStorageService.prototype.remove = function (key) {
            this.$window.localStorage[key] = null;
        };
        LocalStorageService.prototype.setObject = function (key, value) {
            this.$window.localStorage[key] = JSON.stringify(value);
        };
        LocalStorageService.prototype.getObject = function (key) {
            return JSON.parse(this.$window.localStorage[key] || '[]');
        };
        return LocalStorageService;
    }());
    app.LocalStorageService = LocalStorageService;
    angular
        .module('starter.services')
        .service('LocalStorageService', LocalStorageService);
})(app || (app = {}));
