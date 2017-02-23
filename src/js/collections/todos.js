var APP = APP || {};

(function () {
    'use strict';

    var TodoList = Backbone.Collection.extend({
        model: APP.Todo,

        localStorage: new Backbone.LocalStorage('todos-backbone'),

        completed: function () {
            return this.where({completed: true});
        },

        remaining: function () {
            return this.where({completed: false});
        },

        nextOrder: function () {
            return this.length ? this.last().get('order') + 1 : 1;
        },

        comparator: 'order'
    });

    APP.todos = new TodoList();

})();
