(function startObeliskDirective($app) {

    /**
     * @directive Obelisk
     */
    $app.directive('obelisk', ['$window', '$interval', 'obelisk', function obeliskController($window, $interval, obelisk) {

        return {

            /**
             * @property restrict
             * @type {String}
             */
            restrict: 'EA',

            /**
             * @method controller
             * @param $scope {Object}
             * @return {void
             * }
             */
            controller: function controller($scope) {

                /**
                 * @property pixelView
                 * @type {Object}
                 */
                $scope.pixelView = null;

                /**
                 * @method createCube
                 * @return {Object}
                 */
                $scope.createCube = function createCube() {

                    var dimension   = new obelisk.CubeDimension(20, 20, 50),
                        gray        = obelisk.ColorPattern.GRAY,
                        color       = new obelisk.CubeColor().getByHorizontalColor(gray),
                        p3d         = new obelisk.Point3D(140, 40, 40);

                    return $scope.pixelView.renderObject(new obelisk.Cube(dimension, color, true), p3d);

                };

                /**
                 * @method createPyramid
                 * @return {Object}
                 */
                $scope.createPyramid = function createPyramid() {

                    var dimension   = new obelisk.PyramidDimension(20),
                        color       = new obelisk.PyramidColor().getByRightColor(obelisk.ColorPattern.GRASS_GREEN),
                        p3d         = new obelisk.Point3D(140, 40, 90);

                    return $scope.pixelView.renderObject(new obelisk.Pyramid(dimension, color, true), p3d);

                };

            },

            /**
             * @method link
             * @param scope {Object}
             * @param element {Object}
             * @return {void}
             */
            link: function link(scope, element) {

                // Initialise the pixel view using the CANVAS element.
                scope.pixelView = new obelisk.PixelView(element[0], new obelisk.Point(250, 150));

                var size    = 40;
                    cube    = scope.createCube(),
                    pyramid = scope.createPyramid();

                var interval = $interval(function timeout() {

                    size += 10;

                    if (size === 100) {
                        $interval.cancel(interval);
                        return;
                    }

                    cube.setX(size);
                    cube.setY(size);

                    pyramid.setX(size);
                    pyramid.setY(size);

                }, 100);

            }
        }

    }]);

})(window.obeliskApp);