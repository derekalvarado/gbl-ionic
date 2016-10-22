/// <reference path="services.ts" />

namespace app {
    export interface IFoodCategories {
        [catgoryId: string]: ICategoryItem
    }
    export interface ICategoryItem {

        photo: string,
        icon: string,
        iconOutline: string,
        goodBadCategory: string,
        name: string,
        description: string,
        goalServings: number
    }
    export class CategoryService {

        public categories: IFoodCategories = {


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