/**
 * @module ngObelisk
 * @author Adam Timberlake
 * @link http://github.com/Wildhoney/ngObelisk
 */
(function startObelisk($angular) {

    "use strict";

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

                var object = service.objects[index].object,
                    p3d    = service.objects[index].p3d;

                // Extract the dimensions for the object.
                var xAxis = object.dimension.xAxis,
                    yAxis = object.dimension.yAxis,
                    zAxis = object.dimension.zAxis;

                // We can therefore now define the dimensions.
                var dimension = new obelisk.CubeDimension(xAxis, yAxis, zAxis);

                // Determine the type of the object, such as cube, pyramid, et cetera...
                var objectType = object.toString().replace(/[^a-z]+/ig, '');

                if (typeof obelisk[objectType] === 'undefined') {

                    // Assert that we have the object type.
                    throw "ngObelisk: unable to find object of type '" + objectType + "'.";

                }

                // Finally we need to create the same object that we're dealing with, and render it!
                service.pixelView.renderObject(new obelisk[objectType](dimension, object.color, object.border), p3d);

            }

        };

        /**
         * @method ObeliskObject
         * @param object {Object}
         * @param p3d {Point3D|Object}
         * @constructor
         */
        function ObeliskObject(object, p3d) {

            // Store the information for the object.
            this.object = object;
            this.p3d    = p3d;

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
             * @property p3d
             * @type {Point3D|Object}
             */
            p3d: {},

            /**
             * @method setPosition
             * @param position {Object}
             * @return {void}
             */
            setPosition: function setPosition(position) {
                service._prepareChanges();
                this.p3d = position;
            },

            /**
             * @method setColour
             * @param colour {Object}
             * @return {void}
             */
            setColour: function setColour(colour) {
                service._prepareChanges();
                this.object.color = colour;
            },

            /**
             * @method setX
             * @param value {Number}
             * @return {void}
             */
            setX: function setX(value) {
                service._prepareChanges();
                this.object.dimension.xAxis = value;
            },

            /**
             * @method setY
             * @param value {Number}
             * @return {void}
             */
            setY: function setY(value) {
                service._prepareChanges();
                this.object.dimension.yAxis = value;
            },

            /**
             * @method setZ
             * @param value {Number}
             * @return {void}
             */
            setZ: function setZ(value) {
                service._prepareChanges();
                this.object.dimension.zAxis = value;
            }

        };

        /**
         * @method Obelisk
         * @constructor
         */
        function Obelisk() {

            var scope = this;

            this.sanityCheck = function sanityCheck() {

                var properties = ['dimension', 'color'];

                /**
                 * @method findObjects
                 * @param currentObject {Object}
                 * @returns {Boolean}
                 */
                var findObjects = function findObjects(currentObject) {
                    return property === currentObject.object[propertyName];
                };

                // Iterate over each object.
                for (var objectIndex = 0; objectIndex < service.objects.length; objectIndex++) {

                    var object = service.objects[objectIndex].object;

                    // Iterate over each property that we're interested in.
                    for (var propertyIndex = 0; propertyIndex < properties.length; propertyIndex++) {

                        // Find the property on this object.
                        var propertyName = properties[propertyIndex],
                            property = object[propertyName];

                        // Find objects that have this property.
                        var foundObjects = service.objects.filter(findObjects);

                        // If there's more than one then we've found a duplicate.
                        if (foundObjects.length > 1) {

                            // Throw an exception to notify of a sanity check failure.
                            throw "ngObelisk: " + foundObjects.length + " objects have the same '" + propertyName + "' reference.";

                        }

                    }

                }

            };

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
                     * @param p3d {Point3D}
                     * @return {Object}
                     */
                    this.renderObject = function renderObject(object, p3d) {

                        // Render the object using the native Obelisk method.
                        pixelViewPrototype.renderObject(object, p3d);

                        // Instantiate a new `ObeliskObject` for manipulating the object.
                        var model = new ObeliskObject(object, p3d);

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