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
         * @method ObeliskObject
         * @param object {Object}
         * @constructor
         */
        function ObeliskObject(object) {

            // Store the information for the object.
            this.object = object;

        }

        /**
         * @property prototype
         * @type {Object}
         */
        ObeliskObject.prototype = {

            /**
             * @property object
             * @type {Object}
             */
            object: {},

            /**
             * @method setX
             * @param value {Number}
             * @return {void}
             */
            setX: function setX(value) {
                this.object.dimension.xAxis = value;
            }

        };

        /**
         * @method Obelisk
         * @constructor
         */
        function Obelisk() {

            var scope = this;

            /**
             * @method PixelView
             * @param element {Object}
             * @param point {Point}
             * @return {Object}
             */
            this.PixelView = function PixelView(element, point) {

                // Find the prototype for the `PixelView`.
                var pixelViewPrototype = scope.__proto__.PixelView.prototype;

                // Invoke the `PixelView` method and return the prototype.
                scope.__proto__.PixelView.apply(pixelViewPrototype, [element, point]);

                /**
                 * @method RenderObject
                 * @constructor
                 */
                function RenderObject() {

                    /**
                     * @method renderObject
                     * @return {Object}
                     */
                    this.renderObject = function renderObject(object) {

                        // Render the object using the native Obelisk method.
                        pixelViewPrototype.renderObject(object);

                        // Instantiate a new `ObeliskObject` for manipulating the object.
                        var model = new ObeliskObject(object);

                        // Push the model into the array of objects.
                        service.objects.push(model);

                        // Return the model.
                        return model;

                    }

                }

                return new RenderObject();

            }

        }

        // Extend the existing Obelisk module.
        Obelisk.prototype = $window.obelisk;

        return new Obelisk();

    }]);

})(window.angular);