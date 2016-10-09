var app;
(function (app) {
    angular.module('starter.services', [])
        .factory('Chats', function () {
        // Might use a resource here that returns a JSON array
        // Some fake testing data
        var chats = [{
                id: 0,
                name: 'Ben Sparrow',
                lastText: 'You on your way?',
                face: 'img/ben.png'
            }, {
                id: 1,
                name: 'Max Lynx',
                lastText: 'Hey, it\'s me',
                face: 'img/max.png'
            }, {
                id: 2,
                name: 'Adam Bradleyson',
                lastText: 'I should buy a boat',
                face: 'img/adam.jpg'
            }, {
                id: 3,
                name: 'Perry Governor',
                lastText: 'Look at my mukluks!',
                face: 'img/perry.png'
            }, {
                id: 4,
                name: 'Mike Harrington',
                lastText: 'This is wicked good ice cream.',
                face: 'img/mike.png'
            }];
        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    });
})(app || (app = {}));
/// <reference path="services.ts" />
var app;
(function (app) {
    var CategoryService = (function () {
        function CategoryService() {
            this.categories = {
                "leafy-greens": {
                    photo: "lettuce.jpg",
                    goodBadCategory: "good",
                    name: "Leafy Greens",
                    description: "Romaine, iceberg lettuce, kale, etc."
                }
            };
        }
        CategoryService.prototype.getAllCategories = function () { };
        CategoryService.prototype.categoryLookup = function (categoryId) {
            return this.categories[categoryId];
        };
        return CategoryService;
    }());
    app.CategoryService = CategoryService;
    angular.module("starter.services")
        .service('CategoryService', CategoryService);
})(app || (app = {}));
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
var app;
(function (app) {
    angular.module('starter.controllers', [])
        .controller('DashCtrl', function ($scope) { })
        .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })
        .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })
        .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
})(app || (app = {}));
/// <reference path="controllers.ts" />
var app;
(function (app) {
    var EntryDetailCtrl = (function () {
        /**
         *
         */
        function EntryDetailCtrl($stateParams, DbService, categoryService) {
            this.$stateParams = $stateParams;
            this.DbService = DbService;
            this.categoryService = categoryService;
            this.servings = 0;
            this.searchItem = "";
            this._db = DbService;
            this.categoryId = $stateParams["categoryId"];
            this.categoryInfo = categoryService.categoryLookup(this.categoryId);
        }
        EntryDetailCtrl.prototype.decrease = function () {
            if (this.servings > 0) {
                this.servings -= 1;
            }
        };
        EntryDetailCtrl.prototype.increase = function () {
            this.servings += 1;
        };
        EntryDetailCtrl.prototype.getDate = function () {
            var dateStr = "";
            var date = new Date();
            dateStr += date.getFullYear().toString();
            if (date.getMonth() + 1 < 10) {
                dateStr += "0" + (date.getMonth() + 1);
            }
            if (date.getDate() < 10) {
                dateStr += "0" + date.getDate().toString();
            }
            else {
                dateStr += date.getDate().toString();
            }
            return parseInt(dateStr);
        };
        EntryDetailCtrl.prototype.save = function (searchItem, categoryId, servings) {
            var date = new Date();
            var journalEntry = {
                time: date.toTimeString(),
                goodBadCategory: this.categoryInfo.goodBadCategory,
                categoryId: this.categoryId,
                foodDetail: this.searchItem,
                servings: this.servings
            };
            this._db.addEntry(this.getDate(), journalEntry);
            this.searchItem = "";
            this.servings = 0;
        };
        EntryDetailCtrl.$inject = ['$stateParams', 'DbService', 'CategoryService'];
        return EntryDetailCtrl;
    }());
    angular.module('starter.controllers')
        .controller('EntryDetailCtrl', EntryDetailCtrl);
})(app || (app = {}));
/// <reference path="controllers.ts" />
var app;
(function (app) {
    var JournalHomeCtrl = (function () {
        /**
         *
         */
        function JournalHomeCtrl($scope) {
            this.$scope = $scope;
            // public journalEntry: IJournalEntry = {
            //     time: "",
            //     goodBadCategory: "",
            //     foodCategory: "",
            //     foodDetail: "",
            //     servings: 0
            // }
            this.categories = [
                {
                    id: "leafy-greens",
                    photo: "lettuce.jpg",
                    name: "Leafy Greens",
                    description: "Romaine, iceberg lettuce, kale, etc."
                }
            ];
        }
        JournalHomeCtrl.prototype.Save = function () {
        };
        JournalHomeCtrl.$inject = ['$scope'];
        return JournalHomeCtrl;
    }());
    angular.module('starter.controllers')
        .controller('JournalHomeCtrl', JournalHomeCtrl);
})(app || (app = {}));
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
/// <reference path="controllers.ts" />
var app;
(function (app) {
    var SummaryCtrl = (function () {
        /**
         *
         */
        function SummaryCtrl($scope) {
            this.$scope = $scope;
        }
        SummaryCtrl.$inject = ['$scope'];
        return SummaryCtrl;
    }());
    angular.module('starter.controllers')
        .controller('SummaryCtrl', SummaryCtrl);
})(app || (app = {}));
var app;
(function (app) {
    // Ionic Starter App
    // angular.module is a global place for creating, registering and retrieving Angular modules
    // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
    // the 2nd parameter is an array of 'requires'
    // 'starter.services' is found in services.js
    // 'starter.controllers' is found in controllers.js
    angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
        .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window['StatusBar']) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
        .config(stateProvider);
    function stateProvider($stateProvider, $urlRouterProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
            .state('tab.home', {
            url: '/entry',
            views: {
                'tab-home': {
                    templateUrl: 'templates/tab-home.html',
                    controller: 'JournalHomeCtrl',
                    controllerAs: 'vm'
                }
            }
        })
    
            .state('tab.home-detail', {
            url: '/entry/:categoryId',
            views: {
                'tab-home': {
                    templateUrl: 'templates/entry-detail.html',
                    controller: "EntryDetailCtrl",
                    controllerAs: 'vm'
                }
            }
        })
            .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl',
                    controllerAs: 'vm'
                }
            }
        })
            .state('tab.summary', {
            url: '/summary',
            views: {
                'tab-summary': {
                    templateUrl: 'templates/tab-summary.html',
                    controller: 'SummaryCtrl',
                    controllerAs: 'vm'
                }
            }
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/entry');
    }
})(app || (app = {}));
