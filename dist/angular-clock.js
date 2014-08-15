/*
	angular-clock v0.0.1-alpha.1
	https://github.com/williamboman/angular-clock

	(c) 2014 William Boman <william@redwill.se> (http://william.redwill.se)
*/

(function (angular, moment) {
  'use strict';

  angular.module('wb.angularClock.constants', [])

    .constant('moment', moment);
})(window.angular, window.moment);

(function (angular) {
  'use strict';

  angular.module('wb.angularClock.services', [])

    .provider('angularClock', function () {
      var format, locale;
      format = 'DD.MM.YYYY HH:mm:ss';
      locale = 'en';

      this.setFormat = function (newFormat) {
        format = newFormat;
      };
      this.setLocale = function (newLocale) {
        locale = newLocale;
      };

      this.$get = function () {
        return {
          getFormat: function () {
            return format;
          },
          getLocale: function () {
            return locale;
          }
        };
      };
    });
})(window.angular);

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

(function (angular) {
  'use strict';

  angular.module('wb.angularClock', [
    'wb.angularClock.constants',
    'wb.angularClock.services',
    'wb.angularClock.directives'
  ]);
})(window.angular);
