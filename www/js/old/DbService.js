var app;
(function (app) {
    var Node = (function () {
        function Node(data) {
            this.right = undefined;
            this.left = undefined;
            this.data = data;
        }
        return Node;
    }());
    var DbService = (function () {
        function DbService(lss, $window) {
            this.$window = $window;
            this._indexRoot = undefined;
            this._key = "GBLDB";
            this._lss = lss;
            this._flatDb = this._lss.getObject(this._key);
            this.shuffle(this._flatDb);
            this.BuildIndex(this._flatDb);
        }
        DbService.prototype.BuildIndex = function (flatDb) {
            var _this = this;
            flatDb.forEach(function (element) {
                _this.indexInsert(element);
            });
        };
        // public Save(foodItem: IJournalEntry): string {
        //     if (typeof foodItem === 'object') {
        //         this.$window.localStorage[this._key] = JSON.stringify(foodItem);    
        //     }
        // }
        DbService.prototype.addEntry = function (date, entry) {
            var node = this.searchIndex(date);
            if (!node) {
                var data = {
                    date: date,
                    entries: []
                };
                data.entries.push(entry);
                this._flatDb.push(data);
                this.indexInsert(this._flatDb[this._flatDb.length - 1]);
                this._lss.setObject('gbldb', this._flatDb);
            }
            else {
                console.log("Found a node with that date");
                node.data.entries.push(entry);
                this._lss.setObject('gbldb', this._flatDb);
            }
        };
        DbService.prototype.indexInsert = function (data) {
            var node = new Node(data);
            if (!this._indexRoot) {
                this._indexRoot = node;
                return;
            }
            this.insertHelper(this._indexRoot, node);
        };
        DbService.prototype.insertHelper = function (root, newNode) {
            if (newNode.data.date >= root.data.date) {
                if (!root.right) {
                    root.right = newNode;
                    return;
                }
                else {
                    this.insertHelper(root.right, newNode);
                }
            }
            else if (!root.left) {
                root.left = newNode;
                return;
            }
            else {
                this.insertHelper(root.left, newNode);
            }
        };
        DbService.prototype.searchIndex = function (date) {
            return this.findHelper(this._indexRoot, date);
        };
        DbService.prototype.findHelper = function (root, date) {
            if (root == undefined) {
                return null;
            }
            if (root.data.date == date) {
                return root;
            }
            else if (root.data.date < date) {
                this.findHelper(root.right, date);
            }
            else {
                this.findHelper(root.left, date);
            }
        };
        DbService.prototype.shuffle = function (array) {
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
        };
        DbService.$inject = ['LocalStorageService', '$window'];
        return DbService;
    }());
    app.DbService = DbService;
    angular.module('starter.services')
        .service('DbService', DbService);
})(app || (app = {}));
