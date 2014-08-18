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

            // Start the ticking exactly when the next second starts.
            // This is to sync the update of all liveTime elements throughout the DOM.
            setTimeout(function () {
              _tick();
              setInterval(_tick, 1000);
            }, 1000 - moment().format('SSS'));

            function _tick() {
              element.text(moment().locale(attrs.timeLocale || _locale).format(attrs.timeFormat || _format));
            }
          }
        };
      }
    ]);
})(window.angular);
