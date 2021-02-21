<template>
    <section  class="todoapp">
        <header  class="hearder">
            <h1>Todos</h1>
            <input type="text" class="new-todo" placeholder="Ajouter une tache" v-model="newTodo" @keyup.enter="addTodo">
        </header>
        <div class="main">
            <ul class="todo-list">
                <li class="todo" v-for="(todo, index) in filterTodos" v-bind:key="index" :class="{completed:todo.completed}">
                    <div class="view">
                        <input type="checkbox" :id="'todo'+index" v-model="todo.completed" class="toggle">
                        <label :for="'todo'+index">{{todo.name}}</label>
                    </div>
                </li>
            </ul>
        </div>
        <footer class="footer">
            <span class="todo-count">{{remaining}} <strong>tache à faire</strong></span>
            <ul class="filters">
                <li><a href="#"  :class="{selected: filter ==='all'}" @click.prevent="filter='all'">Toutes</a></li>
               <li><a href="#" :class="{selected: filter ==='todos'}"  @click.prevent="filter='todo'">A faire</a></li>
              <li><a href="#" :class="{selected: filter ==='done'}" @click.prevent="filter='done'">Faites</a></li>
            </ul>
        </footer>
    </section>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Todos extends Vue {
    allDone = false;
    todos = [{
        name:'Tache de test',
        completed: false
    }];
    newTodo= '';
    filter = 'all';

    addTodo(){
        this.todos.push({
            completed: false,
            name: this.newTodo
        });

        this.newTodo = '';
    }

    get remaining() {
        return this.todos.filter(todo=>!todo.completed).length 
    }

    get filterTodos() {
        if(this.filter === 'todo'){
            return this.todos.filter(todo => !todo.completed)
        }
        else if(this.filter === 'done'){
            return this.todos.filter(todo => todo.completed)
        }
        return this.todos
    }

}
</script>

<style src="./todos.css"></style>