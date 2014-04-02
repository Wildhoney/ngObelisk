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
             * @method link
             * @param scope {Object}
             * @param element {Object}
             * @return {void}
             */
            link: function link(scope, element) {

                var point = new obelisk.Point(100, 100);
                var pixelView = new obelisk.PixelView(element[0], point);
                var dimension1 = new obelisk.CubeDimension(10, 10, 10);
                var dimension2 = new obelisk.CubeDimension(10, 10, 10);
                var gray = obelisk.ColorPattern.GRAY;
                var color = new obelisk.CubeColor().getByHorizontalColor(gray);

                var p3d = new obelisk.Point3D(140, 40, 40);
                var firstObject = pixelView.renderObject(new obelisk.Cube(dimension1, color, true), p3d);
                var secondObject = pixelView.renderObject(new obelisk.Cube(dimension2, color, true), p3d);

                var index = 20;

                $timeout(function timeout() {

                    firstObject.setX(100);
                    firstObject.setY(100);
                    firstObject.setPosition(new obelisk.Point3D(index, 40, 40));
                    secondObject.setX(50);
                    secondObject.setY(50);
                    secondObject.setPosition(new obelisk.Point3D(index, 40, 40));

                }, 25);

            }
        }

    }]);

})(window.obeliskApp);