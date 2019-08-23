<template>
   <section class="todoapp my-todo">
       <header class="header">
           <h1>Todos</h1>
           <input type="checkbox" v-model="allDone" class="toggle">

           <input type="text" class="new-todo" placeholder="Ajouter une tache" v-model="newTodo" @keyup.enter="addTodo">
       </header>
       <div class="main">
           <ul class="todo-list">
               <li class="todo" v-for="todo in filteredTodos" v-bind:class="{ completed: todo.status, editing: todo === editing }">
                   <div class="view">
                       <input type="checkbox" v-model="todo.status" class="toggle">
                       <label @dblclick="editTodo(todo)">{{ todo.name }}</label>
                       <button class="destroy" @click.prevent="deleteTodo(todo)"></button>
                   </div>
                   <input type="text" class="edit" v-model="todo.name" @keyup.enter="doneEdit" @blur="doneEdit" @keyup.esc="cancelEdit" v-focus="todo === editing">
               </li>
           </ul>
       </div>
       <footer class="footer" v-show="todos.length > 0">
           <span class="todo-count"><strong>{{ nbTodo }}</strong> tâches à faire</span>
           <ul class="filters">
               <li><a href="#" :class="{selected: filter === 'all'}" @click.prevent="filter = 'all'">Toutes les tâches</a></li>
               <li><a href="#" :class="{selected: filter === 'todo'}" @click.prevent="filter = 'todo'">Toutes les tâches à faire</a></li>
               <li><a href="#" :class="{selected: filter === 'done'}" @click.prevent="filter = 'done'">Toutes les tâches faites</a></li>
           </ul>
           <button class="clear-completed" v-show="doneTodos" @click.prevent="deleteCompleted">Supprimer les tâches finies</button>
       </footer>
   </section>

</template>

<script>
    import Vue from 'vue'

    export default {
        name: 'todos',
        props: {
          value: { type: Array, default: function () {
                  return [];
              }}
        },
        data: function () {
            return {
                todos: this.value,
                newTodo: '',
                filter: 'all',
                editing: null,
                oldTodo: ''
            }
        },
        computed: {
            allDone: {
                get: function () {
                    return this.nbTodo === 0
                },
                set: function (value) {

                    this.todos.forEach(function(todo) {

                        todo.status = value

                    });

                }
            },
          nbTodo: function () {

              return this.todos.filter(todo => !todo.status).length;

          },
          filteredTodos: function () {
              switch (this.filter) {
                  case 'all':
                      return this.todos;
                      break;
                  case 'todo':
                      return this.todos.filter(todo => !todo.status );
                      break;
                  case 'done':
                      return this.todos.filter(todo => todo.status );
                      break;
              }
          },
        doneTodos : function () {

                return this.todos.filter(todo => todo.status).length;

            }
        },
        methods: {

            //Methode d'ajout
            addTodo: function () {
                this.todos.push({
                    name: this.newTodo,
                    status: false
                });

                this.newTodo = '';
            },
            //Methode de suppression
            deleteTodo: function (id) {
                this.todos = this.todos.filter(todo => todo !== id);
                this.$emit('input',this.todos)
            },
            //Methode de suppression des taches effectuées
            deleteCompleted: function () {
                this.todos = this.todos.filter(todo => !todo.status );
            },
            editTodo: function (todo) {
                this.editing = todo;
                this.oldTodo = todo.name;
            },
            doneEdit: function () {
                this.editing = null;
            },
            cancelEdit: function () {
                this.editing.name = this.oldTodo;
                this.doneEdit();
            }
        },
        watch: {
          value(value) {
              this.todos = value
          }
        },
        directives: {
            focus: function (el, value) {
                if (value) {
                    Vue.nextTick(function () {
                       el.focus()
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>