var APP = APP || {};

(function () {
    'use strict';

    var Todo = Backbone.Model.extend({
        defaults: {
            title: '',
            completed: false
        },

        toggle: function () {
            this.save({
                completed: !this.get('completed')
            });
        }
    });

    APP.Todo = Todo;
})();
