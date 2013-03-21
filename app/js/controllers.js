'use strict';

/* Controllers */


function OverviewCtrl(database, cases, actors) {
    var me = this;

    me.database = database;
    me.cases = cases;
    me.actors = actors;

    me.image = function() {
        var string = '';

        for (var i in actors) {
            string += '[' + actors[i].name + '],';
        }

        for (var i in cases) {
            string += '(' + cases[i].name + '),';
        }

        for (var i in cases) {
            for (var j in cases[i].actors) {
                string += '[' + cases[i].actors[j].name + ']-(' + cases[i].name + '),';
            }
        }

        for (var i in actors) {
            for (var j in actors[i].inherits) {
                string += '[' + actors[i].name + ']^[' + actors[i].inherits[j].name + '],';
            }
        }

        for (var i in cases) {
            for (var j in cases[i].extend) {
                string += '(' + cases[i].extend[j].name + ')<(' + cases[i].name + '),';
            }
        }

        for (var i in cases) {
            for (var j in cases[i].includes) {
                string += '(' + cases[i].name + ')>(' + cases[i].includes[j].name + '),';
            }
        }

        return 'http://yuml.me/diagram/plain;/usecase/' + string;
    };

    me.cellCaseToActor = function(usecase, actor) {
        return usecase.actors.indexOf(actor) !== -1;
    };

    me.cellActorToActor = function(a, b) {
        return b.inherits.indexOf(a) !== -1;
    };
    
    me.cellCaseToCase = function (a, b) {
        var type = 0;
        
        if (b.extend.indexOf(a) !== -1) {
            type = 1;
        }
        else if (b.includes.indexOf(a) !== -1) {
            type = 2;
        }
        
        var types = ['', 'E', 'I'];
        
        return types[type];
    };

    me.toggleCaseToCase = function(a, b) {
        var type = me.cellCaseToCase(a, b);

        switch (type) {
            case '':
                b.extend.push(a);
                break;
            case 'E':
                var index = b.extend.indexOf(a);
                b.extend.splice(index, 1);
                b.includes.push(a);
                break;
            case 'I':
                var index = b.includes.indexOf(a);
                b.includes.splice(index, 1);
                break;
        }
    };

    me.toggleActorToActor = function(a, b) {
        var index = b.inherits.indexOf(a);

        if (index === -1) {
            b.inherits.push(a);
        }
        else {
            b.inherits.splice(index, 1);
        }
    };

    me.toggleActorToCase = function(usecase, actor) {
        var index = usecase.actors.indexOf(actor);

        if (index === -1) {
            usecase.actors.push(actor);
        }
        else {
            usecase.actors.splice(index, 1);
        }
    };
}

function CaseCtrl(cases, actors, Case) {
    var me = this;

    me.value = null;
    me.index = -1;
    me.actors = actors;

    me.create = function() {
        var value = new Case();

        me.index = -1;
        me.value = value;
    };

    me.edit = function(index) {
        me.index = index;
        me.value = cases[index];
    }

    me.save = function() {
        if (me.index === -1) {
            cases.push(me.value);
        }
    };

}

function ActorCtrl(cases, actors, Actor) {
    var me = this;

    me.value = null;
    me.index = -1;
    me.actors = actors;

    me.create = function() {
        var value = new Actor();

        me.index = -1;
        me.value = value;
    };

    me.edit = function(index) {
        me.index = index;
        me.value = actors[index];
    }

    me.save = function() {
        if (me.index === -1) {
            actors.push(me.value);
        }
    };
}

