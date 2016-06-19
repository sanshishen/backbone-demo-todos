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
        urlRoot: '/todos/todo',
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
        url: '/todos/todos',
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
            'click .toggle': 'toggleDone',
            'dblclick .view': 'edit',
            'keypress .edit': 'updateOnEnter',
            'click a.destroy': 'clear',
            'blur .edit': 'close'
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('done', this.model.get('done'));
            this.input = this.$('.edit');
            return this;
        },
        toggleDone: function() {
            this.model.toggle();
        },
        edit: function() {
            this.$el.addClass('editing');
            this.input.focus();
        },
        close: function() {
            var value = this.input.val();
            this.model.save({title: value});
            this.$el.toggleClass('editing');
        },
        updateOnEnter: function(e) {
            if (e.keyCode == 13) this.close();
        },
        clear: function() {
            this.model.destroy();
        }
    });

    var AppView = Backbone.View.extend({
        el: $('#todoapp'),
        statsTemplate: _.template($('#stats-template').html()),
        events: {
            'keypress #new-todo': 'createOnEnter',
            'click #clear-completed': 'clearCompleted',
            'click #toggle-all': 'toggleAllComplete'
        },
        initialize: function() {
            this.input = this.$('#new-todo');
            this.allCheckbox = this.$('#toggle-all')[0];
            this.footer = this.$('footer');
            this.main = $('#main');
            this.list = $('#todo-list');

            this.listenTo(Todos, 'add', this.addOne);
            this.listenTo(Todos, 'reset', this.addAll)
            this.listenTo(Todos, 'all', this.render);

            Todos.fetch();
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
            Todos.create({title: this.input.val()});
            this.input.val('');
        },
        addOne: function(model) {
            var view = new TodoView({model: model});
            this.list.append(view.render().el);
        },
        addAll: function() {
            Todos.each(this.addOne, this);
        },
        clearCompleted: function() {
            _.invoke(Todos.done(), 'destroy');
            return false;
        },
        toggleAllComplete: function() {
            var done = this.allCheckbox.checked;
            Todos.each(function(todo) {
                todo.save({'done': done});
            });
        }
    });

    var app = new AppView;
});