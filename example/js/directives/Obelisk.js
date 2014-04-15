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
                 * @property framesPerSecond
                 * @type {Number}
                 */
                $scope.framesPerSecond = 0;

                // Once the FPS has been calculated for the previous rendered frame.
                $scope.$on('obelisk/fps', function fpsCalculated(event, value) {
                    $scope.framesPerSecond = value;
                });

                /**
                 * @method createCube
                 * @return {Object}
                 */
                $scope.createCube = function createCube() {

                    var dimension = new obelisk.CubeDimension(20, 20, 50),
                        gray      = obelisk.ColorPattern.GRAY,
                        color     = new obelisk.CubeColor().getByHorizontalColor(gray),
                        p3d       = new obelisk.Point3D(140, 40, 40);

                    return $scope.pixelView.renderObject(new obelisk.Cube(dimension, color, true), p3d);

                };

                /**
                 * @method createPyramid
                 * @return {Object}
                 */
                $scope.createPyramid = function createPyramid() {

                    var dimension = new obelisk.PyramidDimension(20),
                        color     = new obelisk.PyramidColor().getByRightColor(obelisk.ColorPattern.GRASS_GREEN),
                        p3d       = new obelisk.Point3D(140, 40, 90);

                    return $scope.pixelView.renderObject(new obelisk.Pyramid(dimension, color, true), p3d);

                };

                /**
                 * @method createBrick
                 * @return {Object}
                 */
                $scope.createBrick = function createBrick() {

                    var dimension = new obelisk.BrickDimension(100, 100),
                        color     = new obelisk.SideColor().getByInnerColor(obelisk.ColorPattern.GRAY),
                        p3d       = new obelisk.Point3D(130, 40, 90);

                    return $scope.pixelView.renderObject(new obelisk.Brick(dimension, color), p3d);

                };

                /**
                 * @method createSideX
                 * @return {Object}
                 */
                $scope.createSideX = function createSideX() {

                    var colour    = new obelisk.SideColor().getByInnerColor(obelisk.ColorPattern.GRAY),
                        dimension = new obelisk.SideXDimension(100, 10),
                        p3d       = new obelisk.Point3D(130, 40, 90);

                    return $scope.pixelView.renderObject(new obelisk.SideX(dimension, colour), p3d);
                    
                };

                /**
                 * @method createSideY
                 * @return {Object}
                 */
                $scope.createSideY = function createSideY() {
                    
                    var colour    = new obelisk.SideColor().getByInnerColor(obelisk.ColorPattern.GRAY),
                        dimension = new obelisk.SideYDimension(100, 10),
                        p3d       = new obelisk.Point3D(130, 40, 90);
                    
                    return $scope.pixelView.renderObject(new obelisk.SideY(dimension, colour), p3d);
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

                var size    = 40,
                    sideX   = scope.createSideX(),
                    sideY   = scope.createSideY(),
                    brick   = scope.createBrick(),
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

                    brick.setX(100 + size);
                    brick.setY(100 + size);

                    sideX.setX(100 + size);
                    sideY.setY(100 + size);

                    pyramid.setX(size);
                    pyramid.setY(size);
                    pyramid.setY(size);

                }, 100);

            }
        }

    }]);

})(window.obeliskApp);