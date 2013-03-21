'use strict';

/* Filters */

angular.module('myApp.filters', []).
    filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).
                replace(/\%VERSION\%/mg, version);
        }
    }]);

angular.module('myApp.filters').
    filter('check', function() {
    return function(value) {
        return value ? '\u2714' : '';
    }
});
