/// <reference path="constants.ts" />
/// <reference path="services.ts" />

namespace app {
    export class Constants {

        public getMgUrl(): string { 
            //return 'https://api:key-32746a539bb7e8711598b71eecf1ef57@api.mailgun.net/v3/sandbox07bb9fac39fd4e33a5c26bafd9c17180.mailgun.org/messages'
            //log
            //return 'https://api:key-32746a539bb7e8711598b71eecf1ef57@api.mailgun.net/v3/sandbox07bb9fac39fd4e33a5c26bafd9c17180.mailgun.org/log'
            return 'https://api.mailgun.net/v3/sandbox07bb9fac39fd4e33a5c26bafd9c17180.mailgun.org/messages'
        }
    }

    angular.module('starter.services')
        .service('Constants', Constants);
}


