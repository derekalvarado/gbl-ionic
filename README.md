# gbl-ionic
Green Body Love Journal App

This is an ionic app written in typescript. ionicframework.com

To get this thing working you'll need tsc, typings, ionic, cordova, and gulp. 

Workflow is multiple terminal windows:
-One running ionic serve
-One running 'gulp watch'

Initial error will result from InfoCtrl lacking ApiKeyService. I deliberately left ApiKeyService out of source control. You'll have to create a new file that looks like this: 
```javascript
//ApiKeyService.ts

/// <reference path="constants.ts" />
/// <reference path="services.ts" />

namespace app {
    export class ApiKeyService {
        public getMgAuth(): string {
            return 'Basic <base64 encoded user:password for mailgun>'
            //e.g. return 'Basic YmtleS0zDJHjhdDJjNmE1MzliYjdlODcxMTU5OGI3MWVxZWY1Nw=='
        }
    }

    angular.module('starter.services')
        .service('ApiKeyService', ApiKeyService);
}
```

... and reference it in the InfoCtrl.ts file.