var APP = APP || {};

(function () {
    'use strict';

    var AppView = Backbone.View.extend({

        // 기존의 HTML에 존재하는 애플리케이션의 el에 바인딩
        el: ".todoapp",

        statsTemplate: _.template($('#stats-template').html()),

        events: {
            'keypress .new-todo': 'createOnEnter',
            'click .clear-completed': 'clearCompleted',
            'click .toggle-all': 'toggleAllCompleted'
        },

        initialize: function () {
            this.allCheckbox = this.$('toggle-all')[0];

            this.$input = this.$('.new-todo');
            this.$footer = this.$('.footer');
            this.$main = this.$('.main');
            this.$list = this.$('.todo-list');

            this.listenTo(APP.todos, 'add', this.addOne);
            this.listenTo(APP.todos, 'reset', this.addAll);

            this.listenTo(APP.todos, 'change:completed', this.filterOne);
            this.listenTo(APP.todos, 'filter', this.filterAll);
            this.listenTo(APP.todos, 'all', this.render);

            APP.todos.fetch({reset: true});
        },

        render: function () {
            var completed = APP.todos.completed().length;
            var remaining = APP.todos.remaining().length;

            if (APP.todos.length) {
                this.$main.show();
                this.$footer.show();

                this.$footer.html(this.statsTemplate({
                    completed: completed,
                    remaining: remaining
                }));

                // this.$('.filters li a')
                //     .removeClass('selected')
                //     .filter('[href="#/' + (APP.TodoFilter || '') + '"]')
                //     .addClass('selected');
            } else {
                this.$main.hide();
                this.$footer.hide();
            }

            this.allCheckbox.checked = !remaining;
        },

        addOne: function (todo) {
            var view = new APP.TodoView({model: todo});
            this.$list.append(view.render().el);
        },

        addAll: function () {
            this.$list.html('');
            APP.todos.each(this.addOne, this);
        },

        filterOne: function (todo) {
            todo.trigger('visible');
        },

        filterAll: function () {
            APP.todos.each(this.filterOne, this);
        },

        newAttributes: function () {
            return {
                title: this.$input.val().trim(),
                order: APP.todos.nextOrder(),
                completed: false
            };
        },

        createOnEnter: function (e) {
            if (e.which === ENTER_KEY && this.$input.val().trim()) {
                APP.todos.create(this.newAttributes());
                this.$input.val('');
            }
        },

        clearCompleted: function () {
            _.invoke(APP.todos.completed(), 'destroy');
            return false;
        },

        toggleAllCompleted: function () {
            var completed = this.allCheckbox.checked;

            APP.todos.each(function (todo) {
                todo.save({completed: completed})
            });
        }
    });
})();
