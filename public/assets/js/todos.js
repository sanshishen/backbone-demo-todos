/**
 * backbone todos demo
 * @author  sanshishen
 * @email   sanshishen@qq.com
 * @date    2016-05-17 18:25:45
 * @version 1.0.0
 */
'use strict';
$(function() {
    var Todo = Backbone.Model.extend({
        defaults: function() {
            return {
                title: 'empty todo...',
                order: Todos.nextOrder(),
                done: false
            }
        },
        toggle: function() {
            this.save({done: !this.get('done')});
        }
    });

    var TodoList = Backbone.Collection.extend({
        model: Todo,
        // 保存所有的todo项到"todos-backbone"命名空间下
        localStorage: new Backbone.LocalStorage("todos-backbone"),
        done: function() {
            return this.where({done: true});
        },
        remaining: function() {
            return this.where({done: false});
        },
        nextOrder: function() {
            if (!this.length) return 1;
            return this.last().get('order') + 1;
        },
        comparator: 'order'
    });

    var Todos = new TodoList;

    var TodoView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#item-template').html()),
        events: {

        },
        initialize: function() {

        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        toggleDone: function() {},
        edit: function() {},
        close: function() {},
        updateOnEnter: function() {},
        clear: function() {}
    });

    var AppView = Backbone.View.extend({
        el: $('#todoapp'),
        statsTemplate: _.template($('#stats-template').html()),
        events: {
            'keypress #new-todo': 'createOnEnter'
        },
        initialize: function() {
            this.input = this.$('#new-todo');
            this.allCheckbox = this.$('#toggle-all')[0];
            this.footer = this.$('#footer');
            this.main = $('#main');

            //Todos.fetch();
        },
        render: function() {
            var done = Todos.done().length,
                remaining = Todos.remaining().length;
            if (Todos.length) {
                this.main.show();
                this.footer.show();
                this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
            } else {
                this.main.hide();
                this.footer.hide();
            }
            this.allCheckbox.checked = !remaining;
        },
        createOnEnter: function(e) {
            if (e.keyCode != 13) return;
            if (!this.input.val()) return;

            
        }
    })
});