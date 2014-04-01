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

                var point = new $window.obelisk.Point(100, 100);
                var pixelView = new $window.obelisk.PixelView(element[0], point);
                var dimension = new $window.obelisk.CubeDimension(10, 10, 10);
                var gray = $window.obelisk.ColorPattern.GRAY;
                var color = new $window.obelisk.CubeColor().getByHorizontalColor(gray);
                var cube = new $window.obelisk.Cube(dimension, color, true);
                pixelView.renderObject(cube);

            }
        }

    }]);

})(window.obeliskApp);