var APP = APP || {};

(function () {
    'use strict';

    APP.TodoView = Backbone.View.extend({

        tagName: 'li',

        template: _.template($('#item-template').html()),

        events: {
            'dblclick label': 'edit',
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'visible', this.toggleVisible);
        },

        render: function () {
            
        },
        
        toggleVisible: function () {
            
        }


    });


})();

