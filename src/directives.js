(function (angular) {
  'use strict';

  angular.module('wb.angularClock.directives', [])

    .directive('liveTime', ['moment', 'angularClock',
      function (moment, angularClock) {
        var _format = angularClock.getFormat(),
            _locale = angularClock.getLocale();

        return {
          scope: true,
          restrict: 'A',
          link: function (scope, element, attrs) {
            _tick();

            scope.ticker = setInterval(_tick, 1000);

            function _tick() {
              element.text(moment().locale(attrs.timeLocale || _locale).format(attrs.timeFormat || _format));
            }
          }
        };
      }
    ]);
})(window.angular);
