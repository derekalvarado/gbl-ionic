/// <reference path="LocalStorageService.ts" />

namespace app {
    export interface IJournal {
        [date: string]: IJournalEntry;
    }

    export interface IJournalEntry {
        [categoryId: string]: Array<IJournalEntryDetail>;
    }

    export interface IJournalEntryDetail {
        time: string,
        goodBadCategory: string,
        foodDetail: string,
        servings: number
    }


    class Node {
        public data: IJournal;
        constructor(data: IJournal) {
            this.data = data;
        }

        public right = undefined;

        public left = undefined;
    }


    export class DbService {
        private _indexRoot: Node = undefined;
        private _lss: LocalStorageService;
        private DBNAME: string = "GBLDB";
        private _flatDb: IJournal;
        static $inject = ['LocalStorageService', '$window'];

        constructor(lss: LocalStorageService, public $window: ng.IWindowService) {
            this._lss = lss;
            this._flatDb = this._lss.getObject(this.DBNAME);

            // this.shuffle(this._flatDb);
            // this.BuildIndex(this._flatDb);
        }

        // private BuildIndex(flatDb: Array<IJournal>) {

        //     flatDb.forEach(element => {
        //         this.indexInsert(element)
        //     });
        // }


        // public Save(foodItem: IJournalEntry): string {

        //     if (typeof foodItem === 'object') {
        //         this.$window.localStorage[this._key] = JSON.stringify(foodItem);    
        //     }
        // }

        static getDate(): string {
            var dateStr: string = "";
            var date: Date = new Date();

            dateStr += date.getFullYear().toString();

            if (date.getMonth() + 1 < 10) {
                dateStr += "0" + (date.getMonth() + 1).toString();
            } else {
                dateStr += (date.getMonth() + 1).toString();
            }

            

            if (date.getDate() < 10) {
                dateStr += "0" + date.getDate().toString();
            } else {
                dateStr += date.getDate().toString();
            }

            return dateStr;

        }


        public getEntriesForToday(): IJournalEntry {
            var date = DbService.getDate();
            return this._flatDb[date] || {};
        }


        public addEntry(entryDetail: IJournalEntryDetail, categoryId: string) {
            var date = DbService.getDate();

            var dateExists = this._flatDb[date];            
            

            if (!dateExists) {
                this._flatDb[date] = {};                
            }

            if (!this._flatDb[date][categoryId]) {
                this._flatDb[date][categoryId] = [];
            }

            this._flatDb[date][categoryId].push(entryDetail);            
            this._lss.setObject(this.DBNAME, this._flatDb);

        }



        // public indexInsert(data: IJournal): void {
        //     var node = new Node(data);

        //     if (!this._indexRoot) {
        //         this._indexRoot = node;
        //         return;
        //     }
        //     this.insertHelper(this._indexRoot, node);

        // }

        // private insertHelper(root: Node, newNode: Node): void {

        //     if (newNode.data.date >= root.data.date) {
        //         if (!root.right) {
        //             root.right = newNode;
        //             return;
        //         } else {
        //             this.insertHelper(root.right, newNode);
        //         }

        //     } else if (!root.left) {
        //         root.left = newNode;
        //         return;

        //     } else {
        //         this.insertHelper(root.left, newNode);
        //     }
        // }


        // public searchIndex(date: number): Node {
        //     return this.findHelper(this._indexRoot, date)
        // }



        // private findHelper(root: Node, date: number) {
        //     if (root == undefined) {
        //         return null;
        //     }
        //     if (root.data.date == date) {
        //         return root;
        //     }
        //     else if (root.data.date < date) {
        //         this.findHelper(root.right, date);
        //     }
        //     else {
        //         this.findHelper(root.left, date);
        //     }
        // }



        private shuffle(array: Array<IJournal>): void {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
        }
    }



    angular.module('starter.services')
        .service('DbService', DbService);
}
