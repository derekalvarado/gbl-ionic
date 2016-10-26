/// <reference path="controllers.ts" />
/// <reference path="../typings/index.d.ts" />
/// <reference path="ConstantsService.ts" />
/// <reference path="ApiKeyService.ts" />

namespace app {

    /**
     * InfoCtrl
     */
    class InfoCtrl {
        static $inject = ['$scope', '$ionicModal', '$ionicPopup', '$http', 'Constants', 'ApiKeyService'];

        public modal: ionic.modal.IonicModalController = <ionic.modal.IonicModalController>{};
        public name: string = "";
        public email: string = "";
        public message: string = "";
        public mgConnection: string = "";
        constructor(public $scope: ng.IScope, public $ionicModal: ionic.modal.IonicModalService,
            public $ionicPopup: ionic.popup.IonicPopupService, public $http: ng.IHttpService,
            public Constants: app.Constants, public ApiKeyService: app.ApiKeyService) {
            this.mgConnection = this.Constants.getMgUrl();
            $ionicModal.fromTemplateUrl('templates/feedbackModal.html', {
                scope: this.$scope,
                animation: 'slide-in-up'
            }).then((m) => {
                console.log('assigning modal');
                this.modal = m;
            });


            // Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                this.modal.remove();
            });
            // Execute action on hide modal
            $scope.$on('modal.hidden', function () {
                // Execute action
            });
            // Execute action on remove modal
            $scope.$on('modal.removed', function () {
                // Execute action
            });
        }

        public info = "The goal is to focus on making sure you get enough of the healthy things, and worry about restricting the bad things later."

        public openModal() {
            console.log("opening modal");
            this.modal.show();
        }

        public closeModal() {
            this.modal.hide();
        };

        private validateMailFields(): string {
            if (this.name.length == 0) {
                return '<p>Mising your full name.</p>'

            }
            if (this.email.split('').indexOf('@') == -1) {

                return '<p>Missing your email address.</p>';
            }
            if (this.message.length < 10) {
                
                
                return '<p>Message must be at least 10 characters long.</p>';
            }
            return '';

        }
        public sendEmail() {
            var validationError = this.validateMailFields();
            if (validationError) {
                this.$ionicPopup.alert({ title: "Missing info", template: validationError })
                return;
            }


            let mailFields = {
                from: this.name + " <" + this.email + ">",
                to: 'dmalvarado@gmail.com',
                text: this.message,
                subject: "GBL Journal Feedback",

            };

            let req = {
                method: 'POST',
                url: this.Constants.getMgUrl(),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    , 'Authorization': this.ApiKeyService.getMgAuth()

                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: mailFields
            };


            this.$http(req).then((d: ng.IHttpPromiseCallbackArg<any>) => {
                console.log(d);
                this.closeModal();
                this.$ionicPopup.alert({
                    title: 'Sent!',
                    template: '<p>Thanks for the feedback!</p>'
                })
            }, (e: ng.IHttpPromiseCallbackArg<any>) => {
                if (e.status == 400) {
                    this.$ionicPopup.alert({
                        title: 'Error',
                        template: "<p>Hmm, something went wrong. Double check all your inputs.</p>"
                    })
                } else {
                    this.$ionicPopup.alert({
                        title: 'Error',
                        template: "<p>Sorry, something went wrong. It's our fault :(</p>"
                    })
                }

                console.log(e);
            })
        }
    }

    angular.module('starter.controllers')
        .controller('InfoCtrl', InfoCtrl);

}
