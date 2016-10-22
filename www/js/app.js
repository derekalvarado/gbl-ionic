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
                    icon: "kale_color.svg",
                    iconOutline: "kale_outline.svg",
                    goodBadCategory: "good",
                    name: "Leafy Greens",
                    description: "Romaine, spinach, kale, etc.",
                    goalServings: 3
                },
                "beans-legumes": {
                    photo: "beans-legumes.jpg",
                    icon: "beans_color.svg",
                    iconOutline: "beans_outline.svg",
                    goodBadCategory: "good",
                    name: "Beans and Legumes",
                    description: "Black beans, kidney beans, lentils, etc.",
                    goalServings: 3
                },
                "berries-cherries": {
                    photo: "berries.jpg",
                    icon: "berry_color.svg",
                    iconOutline: "berry_outline.svg",
                    goodBadCategory: "good",
                    name: "Berries and Cherries",
                    description: "Blackberries, blueberries, cherries, etc.",
                    goalServings: 3
                },
                "fruits": {
                    photo: "fruits.jpg",
                    icon: "apple_color.svg",
                    iconOutline: "apple_outline.svg",
                    goodBadCategory: "good",
                    name: "Fruit",
                    description: "Bananas, mangos, apples, pineapple, etc.",
                    goalServings: 3
                },
                "vegetables": {
                    photo: "vegetables.jpg",
                    icon: "carrots_color.svg",
                    iconOutline: "carrots_outline.svg",
                    goodBadCategory: "good",
                    name: "Vegetables",
                    description: "Tomatoes, zucchini, carrots, etc.",
                    goalServings: 3
                },
                "nuts-seeds": {
                    photo: "nuts-seeds.jpg",
                    icon: "nuts_color.svg",
                    iconOutline: "nuts_outline.svg",
                    goodBadCategory: "good",
                    name: "Nuts and Seeds",
                    description: "Unsalted walnuts, cashews, pumpkin seeds, etc.",
                    goalServings: 3
                },
                "whole-grains": {
                    photo: "whole_grains.jpg",
                    icon: "wheat_color.svg",
                    iconOutline: "wheat_outline.svg",
                    goodBadCategory: "good",
                    name: "Whole Grains",
                    description: "Whole wheat bread, oatmeal, quinoa, etc.",
                    goalServings: 3
                }
            };
        }
        CategoryService.prototype.getAllCategories = function () {
            return this.categories;
        };
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
            return JSON.parse(this.$window.localStorage[key] || '{}');
        };
        return LocalStorageService;
    }());
    app.LocalStorageService = LocalStorageService;
    angular
        .module('starter.services')
        .service('LocalStorageService', LocalStorageService);
})(app || (app = {}));
/// <reference path="LocalStorageService.ts" />
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
            this.DBNAME = "GBLDB";
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
        DbService.getDate = function () {
            var dateStr = "";
            var date = new Date();
            dateStr += date.getFullYear().toString();
            if (date.getMonth() + 1 < 10) {
                dateStr += "0" + (date.getMonth() + 1).toString();
            }
            else {
                dateStr += (date.getMonth() + 1).toString();
            }
            if (date.getDate() < 10) {
                dateStr += "0" + date.getDate().toString();
            }
            else {
                dateStr += date.getDate().toString();
            }
            return dateStr;
        };
        DbService.prototype.getEntriesForToday = function () {
            var date = DbService.getDate();
            return this._flatDb[date] || {};
        };
        DbService.prototype.addEntry = function (entryDetail, categoryId) {
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
        };
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
/// <reference path="DbService.ts" />
/// <reference path="../typings/index.d.ts" />
/// <reference path="CategoryService.ts" />
var app;
(function (app) {
    var EntryDetailCtrl = (function () {
        /**
         *
         */
        function EntryDetailCtrl($stateParams, DbService, categoryService, $ionicNavBarDelegate, $ionicPopup, $state) {
            this.$stateParams = $stateParams;
            this.DbService = DbService;
            this.categoryService = categoryService;
            this.$ionicNavBarDelegate = $ionicNavBarDelegate;
            this.$ionicPopup = $ionicPopup;
            this.$state = $state;
            this.servings = 0;
            this.searchItem = "";
            this._db = DbService;
            this.categoryId = $stateParams["categoryId"];
            this.categoryInfo = categoryService.categoryLookup(this.categoryId);
            //Set the title of the view
            this.entryName = this.categoryInfo.name;
        }
        EntryDetailCtrl.prototype.showPopup = function () {
            var _this = this;
            var alertPopup = this.$ionicPopup.alert({
                title: 'Saved',
                template: 'Saved!'
            });
            alertPopup.then(function (res) {
                _this.$state.go('tab.home');
            });
        };
        EntryDetailCtrl.prototype.decrease = function () {
            if (this.servings > 0) {
                this.servings -= 1;
            }
        };
        EntryDetailCtrl.prototype.increase = function () {
            this.servings += 1;
        };
        EntryDetailCtrl.prototype.save = function (searchItem, categoryId, servings) {
            var date = new Date();
            var journalEntry = {
                time: date.toTimeString(),
                goodBadCategory: this.categoryInfo.goodBadCategory,
                foodDetail: this.searchItem,
                servings: this.servings
            };
            this._db.addEntry(journalEntry, categoryId);
            this.searchItem = "";
            this.servings = 0;
            this.showPopup();
        };
        EntryDetailCtrl.$inject = ['$stateParams', 'DbService', 'CategoryService', '$ionicNavBarDelegate', '$ionicPopup', '$state'];
        return EntryDetailCtrl;
    }());
    angular.module('starter.controllers')
        .controller('EntryDetailCtrl', EntryDetailCtrl);
})(app || (app = {}));
/// <reference path="controllers.ts" />
/// <reference path="../typings/index.d.ts" />
var app;
(function (app) {
    /**
     * InfoCtrl
     */
    var InfoCtrl = (function () {
        function InfoCtrl($scope) {
            this.$scope = $scope;
            this.info = "The goal is to focus on making sure you get enough of the healthy things, and worry about restricting the bad things later.";
        }
        InfoCtrl.$inject = ['$scope'];
        return InfoCtrl;
    }());
    angular.module('starter.controllers')
        .controller('InfoCtrl', InfoCtrl);
})(app || (app = {}));
/// <reference path="controllers.ts" />
/// <reference path="../typings/index.d.ts" />
/// <reference path="CategoryService.ts" />
var app;
(function (app) {
    var JournalHomeCtrl = (function () {
        /**
         *
         */
        function JournalHomeCtrl(CategoryService) {
            this.CategoryService = CategoryService;
            this.categories = CategoryService.getAllCategories();
        }
        JournalHomeCtrl.prototype.Save = function () {
        };
        JournalHomeCtrl.$inject = ['CategoryService'];
        return JournalHomeCtrl;
    }());
    angular.module('starter.controllers')
        .controller('JournalHomeCtrl', JournalHomeCtrl);
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
/// <reference path="../typings/index.d.ts" />
/// <reference path="CategoryService.ts" />
/// <reference path="DbService.ts" />
var app;
(function (app) {
    'use strict';
    var CategorySummary = (function () {
        /**
         *
         */
        function CategorySummary(name, servings, goalServings) {
            this.name = name;
            this.servings = servings;
            this.goalServings = goalServings;
        }
        return CategorySummary;
    }());
    var SummaryViewModel = (function () {
        function SummaryViewModel() {
            this.hasData = false;
            this.tallies = [];
        }
        return SummaryViewModel;
    }());
    var SummaryCtrl = (function () {
        /**
         *
         */
        function SummaryCtrl($scope, DbService, CategoryService) {
            var _this = this;
            this.$scope = $scope;
            this.DbService = DbService;
            this.CategoryService = CategoryService;
            this.range = "Today";
            this.viewModel = {};
            this.categories = CategoryService.getAllCategories();
            $scope.$on("$ionicView.enter", function () { _this.pickerChange("today"); });
        }
        SummaryCtrl.prototype.tallyServings = function (categoryEntries) {
            var tally = {};
            var _loop_1 = function(categoryId) {
                tally[categoryId] = {};
                tally[categoryId] = { servings: 0 };
                categoryEntries[categoryId].forEach(function (element) {
                    tally[categoryId].servings += element.servings;
                });
            };
            for (var categoryId in categoryEntries) {
                _loop_1(categoryId);
            }
            return tally;
        };
        SummaryCtrl.prototype.getNumber = function (num) {
            //debugger;
            if (num >= 0) {
                return new Array(num);
            }
            return new Array(0);
        };
        //Method that updates the viewModel
        //Named because I had a dropdown in mind for the tab-summary page
        SummaryCtrl.prototype.pickerChange = function (range) {
            this.results = this.DbService.getEntriesForToday();
            var tally = this.tallyServings(this.results);
            //Get all categories so as to build a complete view model, including 
            //categories that we dont' have an entry for            
            var categories = this.CategoryService.getAllCategories();
            //Assemble the view model            
            for (var categoryId in categories) {
                var _name = categories[categoryId].name;
                var _icon = categories[categoryId].icon;
                var _iconOutline = categories[categoryId].iconOutline;
                var _servings = tally[categoryId] ? tally[categoryId].servings : 0;
                var _goalServings = categories[categoryId].goalServings;
                var summary = {
                    name: _name,
                    servings: _servings,
                    icon: _icon,
                    iconOutline: _iconOutline,
                    goalServings: _goalServings
                };
                this.viewModel[categoryId] = summary;
            }
        };
        SummaryCtrl.$inject = ['$scope', 'DbService', 'CategoryService'];
        return SummaryCtrl;
    }());
    angular.module('starter.controllers')
        .controller('SummaryCtrl', SummaryCtrl);
})(app || (app = {}));
/// <reference path="../typings/index.d.ts" />
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
        .config(stateProvider)
        .directive('gblChart', gblChart);
    function gblChart() {
        function link(scope, element, attrs, controller, transcludeFn) {
            scope.$watch(attrs.chartRange, function (value) {
                console.log("value changed");
            });
        }
        return {
            link: link,
            range: "=",
            restrict: 'AE',
            templateUrl: 'templates/chart.html'
        };
    }
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
            url: '/home',
            views: {
                'tab-home': {
                    templateUrl: 'templates/tab-home.html',
                    controller: 'JournalHomeCtrl',
                    controllerAs: 'vm'
                }
            }
        })
            .state('tab.entry-detail', {
            url: '/home/:categoryId',
            views: {
                'tab-home': {
                    templateUrl: 'templates/entry-detail.html',
                    controller: "EntryDetailCtrl",
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
        })
            .state('tab.info', {
            url: '/info',
            views: {
                'tab-info': {
                    templateUrl: 'templates/tab-info.html',
                    controller: 'InfoCtrl',
                    controllerAs: 'vm'
                }
            }
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/home');
    }
})(app || (app = {}));
