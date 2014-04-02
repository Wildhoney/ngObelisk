(function startObeliskDirective($app) {

    /**
     * @directive Obelisk
     */
    $app.directive('obelisk', ['$window', 'obelisk', function obeliskController($window, obelisk) {

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

                var object = pixelView.renderObject(cube);
                object.setX(20);
                console.log(object);

            }
        }

    }]);

})(window.obeliskApp);