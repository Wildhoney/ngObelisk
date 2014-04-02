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
    app.service('obelisk', ['$window', '$timeout', function obeliskService($window, $timeout) {

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
         * @property timeout
         * @type {null}
         */
        service.timeout = null;

        /**
         * @property pixelView
         * @type {Object}
         */
        service.pixelView = {};

        /**
         * @method _prepareChanges
         * @return {void}
         * @private
         */
        service._prepareChanges = function _prepareChanges() {

            // Cancel the timeout if it exists already.
            $timeout.cancel(service.timeout);

            // Finally we can initialise the timeout.
            service.timeout = $timeout(service._commitChanges, 1);

        };

        /**
         * @method _commitChanges
         * @return {void}
         * @private
         */
        service._commitChanges = function _commitChanges() {

            // Clear the stage for the new frame.
            service.pixelView.clear();

            // Iterate over each object we have at the moment.
            for (var index = 0; index < service.objects.length; index++) {

                var object = service.objects[index].object;

                // Extract the dimensions for the object.
                var xAxis = object.dimension.xAxis,
                    yAxis = object.dimension.yAxis,
                    zAxis = object.dimension.zAxis;

                // We can therefore now define the dimensions.
                var dimension = new obelisk.CubeDimension(xAxis, yAxis, zAxis);

                var gray = obelisk.ColorPattern.GRAY;
                var color = new obelisk.CubeColor().getByHorizontalColor(gray);
                var cube = new obelisk.Cube(dimension, color, true);

                service.pixelView.renderObject(cube);

            }

        };

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
                service._prepareChanges();
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

                // Store the pixel view.
                service.pixelView = pixelViewPrototype;

                // Invoke the `PixelView` method and return the prototype.
                scope.__proto__.PixelView.apply(pixelViewPrototype, [element, point]);

                /**
                 * @method RenderObject
                 * @constructor
                 */
                function RenderObject() {

                    /**
                     * @method renderObject
                     * @param object {Object}
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