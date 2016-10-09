namespace app {
    'use strict'

    export class LocalStorageService {

        constructor(public $window: angular.IWindowService) { }

        
        public set(key: string, value): string {
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }

            this.$window.localStorage[key] = value;
            return value;
        }
        public get(key: string, defaultValue: string): string {
            return this.$window.localStorage[key] || defaultValue;
        }

        public remove(key: string): void {
            this.$window.localStorage[key] = null;
        }
        public setObject(key: string, value): void {
            this.$window.localStorage[key] = JSON.stringify(value);
        }
        public getObject(key: string): any {
            return JSON.parse(this.$window.localStorage[key] || '{}');
        }
    }

    angular
        .module('starter.services')
        .service('LocalStorageService', LocalStorageService)

}