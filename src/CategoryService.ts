/// <reference path="services.ts" />

namespace app {
    export interface IFoodCategories {
        [catgoryId: string]: ICategoryItem
    }
    export interface ICategoryItem {

        photo: string,
        goodBadCategory: string,
        name: string,
        description: string,
        goalServings: number
    }
    export class CategoryService {

        public categories: IFoodCategories = {


            "leafy-greens": {
                photo: "lettuce.jpg",
                goodBadCategory: "good",
                name: "Leafy Greens",
                description: "Romaine, iceberg lettuce, kale, etc.",
                goalServings: 3
            },

            "beans-legumes": {
                photo: "beans-legumes.jpg",
                goodBadCategory: "good",
                name: "Beans and Legumes",
                description: "Black beans, kidney beans, lentils, etc.",
                goalServings: 3
            },

            "berries-cherries": {
                photo: "berries.jpg",
                goodBadCategory: "good",
                name: "Berries and Cherries",
                description: "Blackberries, blueberries, cherries, etc.",
                goalServings: 3
            },

            "fruits": {
                photo: "fruits.jpg",
                goodBadCategory: "good",
                name: "Fruit",
                description: "Bananas, mangos, apples, pineapple, etc.",
                goalServings: 3
            },

            "vegetables": {
                photo: "vegetables.jpg",
                goodBadCategory: "good",
                name: "Vegetables",
                description: "Tomatoes, zucchini, carrots, etc.",
                goalServings: 3
            },

            "nuts-seeds": {
                photo: "nuts-seeds.jpg",
                goodBadCategory: "good",
                name: "Nuts and Seeds",
                description: "Unsalted walnuts, cashews, pumpkin seeds, etc.",
                goalServings: 3
            }, 
            "whole-grains": {
                photo: "whole-grains.jpg",
                goodBadCategory: "good",
                name: "Whole Grains",
                description: "Whole wheat bread, oatmeal, quinoa, etc.",
                goalServings: 3
            }
        }

        
        
        public getAllCategories(): IFoodCategories {
            return this.categories;
        }

        public categoryLookup(categoryId: string): ICategoryItem {
            return this.categories[categoryId];
        }
    }

    angular.module("starter.services")
        .service('CategoryService', CategoryService)
}