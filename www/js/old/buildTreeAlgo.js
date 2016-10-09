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
    var GBLDB = (function () {
        function GBLDB(database) {
            this._root = undefined;
            this._flatDb = this.Shuffle(database);
            this.BuildDb(this._flatDb);
        }
        GBLDB.prototype.BuildDb = function (flatDb) {
            var _this = this;
            flatDb.forEach(function (element) {
                _this.Insert(element);
            });
        };
        GBLDB.prototype.Insert = function (data) {
            var node = new Node(data);
            if (!this._root) {
                this._root = node;
                return;
            }
            this.InsertHelper(this._root, node);
        };
        GBLDB.prototype.InsertHelper = function (root, newNode) {
            if (newNode.data.date >= root.data.date) {
                if (!root.left) {
                    root.left = newNode;
                    return;
                }
                else {
                    this.InsertHelper(root.left, newNode);
                }
            }
            else if (!root.right) {
                root.right = newNode;
                return;
            }
            else {
                this.InsertHelper(root.right, newNode);
            }
        };
        GBLDB.prototype.Shuffle = function (array) {
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
            return array;
        };
        return GBLDB;
    }());
})(app || (app = {}));
