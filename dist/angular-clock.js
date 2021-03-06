/*
 * angular-clock v0.0.1-alpha.2
 * https://github.com/williamboman/angular-clock
 * 
 * (c) 2014 William Boman <william@redwill.se> (http://william.redwill.se)
*/

;(function (window, angular) {
  'use strict';

	angular.module('wb.angularClock', [
	  'wb.angularClock.constants',
	  'wb.angularClock.services',
	  'wb.angularClock.directives'
	]);
	
	angular.module('wb.angularClock.constants', [])
	
	  .constant('moment', window.moment);
	
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
	
}(window, window.angular));
