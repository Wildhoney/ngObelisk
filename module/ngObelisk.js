/**
 * @module ngObelisk
 * @author Adam Timberlake
 * @link http://github.com/Wildhoney/ngObelisk
 */
(function startObelisk($angular) {

    // Bootstrap ngObelisk, my lovelies!
    var app = $angular.module('ngObelisk', []);

    /**
     * @service obelisk
     */
    app.service('obelisk', ['$window', function obeliskService($window) {

        /**
         * @property service
         * @type {Object}
         */
        var service = {};

        /**
         * @property objects
         * @type {Array}
         */
        service.objects = [];

        /**
         * @method Obelisk
         * @constructor
         */
        function Obelisk() {}

        // Extend the existing Obelisk module.
        Obelisk.prototype = $window.obelisk;

        return new Obelisk();

    }]);

})(window.angular);