'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
    value('version', '0.1');

angular.module('myApp.services').
    service('database', function($cookies) {
    $cookies.database = $cookies.database || {"actors": [], "cases": []};
    
    return {"actors":[{"name":"actor1","inherits":[]},{"name":"actor2","inherits":[]},{"name":"actor3","inherits":[{"name":"actor1","inherits":[]}]}],"cases":[{"name":"case1","actors":[{"name":"actor2","inherits":[]},{"name":"actor3","inherits":[{"name":"actor1","inherits":[]}]}],"extend":[],"includes":[],"triggers":[],"preconditions":[],"postconditions":[],"successes":[],"alternatives":[]},{"name":"case2","actors":[{"name":"actor2","inherits":[]}],"extend":[],"includes":[{"name":"case1","actors":[{"name":"actor2","inherits":[]},{"name":"actor3","inherits":[{"name":"actor1","inherits":[]}]}],"extend":[],"includes":[],"triggers":[],"preconditions":[],"postconditions":[],"successes":[],"alternatives":[]}],"triggers":[],"preconditions":[],"postconditions":[],"successes":[],"alternatives":[]},{"name":"case3","actors":[{"name":"actor2","inherits":[]}],"extend":[{"name":"case1","actors":[{"name":"actor2","inherits":[]},{"name":"actor3","inherits":[{"name":"actor1","inherits":[]}]}],"extend":[],"includes":[],"triggers":[],"preconditions":[],"postconditions":[],"successes":[],"alternatives":[]}],"includes":[],"triggers":[],"preconditions":[],"postconditions":[],"successes":[],"alternatives":[]},{"name":"case4","actors":[{"name":"actor1","inherits":[]}],"extend":[{"name":"case1","actors":[{"name":"actor2","inherits":[]},{"name":"actor3","inherits":[{"name":"actor1","inherits":[]}]}],"extend":[],"includes":[],"triggers":[],"preconditions":[],"postconditions":[],"successes":[],"alternatives":[]}],"includes":[],"triggers":[],"preconditions":[],"postconditions":[],"successes":[],"alternatives":[]}]};
});

angular.module('myApp.services').
    factory('Case', function() {
    return function(name, actors, extend, includes, triggers, preconditions,
        postconditions, successes, alternatives) {
        var me = this;

        me.name = name || "noname";
        me.actors = actors || [];
        me.extend = extend || [];
        me.includes = includes || [];
        me.triggers = triggers || [];
        me.preconditions = preconditions || [];
        me.postconditions = postconditions || [];
        me.successes = successes || [];
        me.alternatives = alternatives || [];
    };
});

angular.module('myApp.services').
    factory('Actor', function() {
    return function(name, inherits) {
        var me = this;

        me.name = name || "noname";
        me.inherits = inherits || [];
    };
});

angular.module('myApp.services').
    service('cases', function(database, Case, actors) {
    return database.cases;
});

angular.module('myApp.services').
    service('actors', function(database, Actor) {
    return database.actors;

});
