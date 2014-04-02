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
             * @method link
             * @param scope {Object}
             * @param element {Object}
             * @return {void}
             */
            link: function link(scope, element) {

                var point = new obelisk.Point(100, 100);
                var pixelView = new obelisk.PixelView(element[0], point);
                var dimension = new obelisk.CubeDimension(10, 10, 10);
                var gray = obelisk.ColorPattern.GRAY;
                var color = new obelisk.CubeColor().getByHorizontalColor(gray);
                var cube = new obelisk.Cube(dimension, color, true);

                var p3d = new obelisk.Point3D(140, 40, 40);

                var object = pixelView.renderObject(cube, p3d);

                var index = 20;

                $interval(function() {

                    index += 2;

                    if (index <= 100) {

                        var wineRed   = obelisk.ColorPattern.WINE_RED,
                            newColour = new obelisk.CubeColor().getByHorizontalColor(wineRed);

                        object.setX(index);
                        object.setColour(newColour);

                        var p3d = new obelisk.Point3D(index, 40, 40);
                        object.setPosition(p3d);


                    }

                }, 25);

            }
        }

    }]);

})(window.obeliskApp);