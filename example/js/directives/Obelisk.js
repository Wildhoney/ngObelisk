(function startObeliskDirective($app) {

    /**
     * @directive Obelisk
     */
    $app.directive('obelisk', ['$window', '$timeout', 'obelisk', function obeliskController($window, $timeout, obelisk) {

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
                 * @method createCube
                 * @return {Object}
                 */
                $scope.createCube = function createCube(element) {

                    var point       = new obelisk.Point(250, 150),
                        pixelView   = new obelisk.PixelView(element, point),
                        dimension   = new obelisk.CubeDimension(10, 10, 10),
                        gray        = obelisk.ColorPattern.GRAY,
                        color       = new obelisk.CubeColor().getByHorizontalColor(gray),
                        p3d         = new obelisk.Point3D(140, 40, 40);

                    return pixelView.renderObject(new obelisk.Cube(dimension, color, true), p3d);

                };

            },

            /**
             * @method link
             * @param scope {Object}
             * @param element {Object}
             * @return {void}
             */
            link: function link(scope, element) {

                var index = 20;

                var cube = scope.createCube(element[0]);

                $timeout(function timeout() {

                    cube.setX(100);
                    cube.setY(100);
                    cube.setPosition(new obelisk.Point3D(index, 40, 40));

                }, 25);

            }
        }

    }]);

})(window.obeliskApp);