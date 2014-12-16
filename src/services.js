'use strict';

angular.module('wb.angularClock.services', [])

  .provider('angularClock', function () {
    var format, locale;

    // Default values
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
