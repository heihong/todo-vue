<template>
    <section  class="todoapp">
        <header  class="hearder">
            <h1>Todos</h1>
            <input type="text" class="new-todo" placeholder="Ajouter une tache" v-model="newTodo" @keyup.enter="addTodo">
        </header>
        <div class="main">
            <ul class="todo-list">
                <li class="todo" v-for="(todo, index) in todos" v-bind:key="index" :class="{completed:todo.completed}">
                    <div class="view">
                        <input type="checkbox" v-bind:id="'todo'+index" v-model="todo.completed" class="toggle">
                        <label v-bind:for="'todo'+index">{{todo.name}}</label>
                    </div>
                </li>
            </ul>
        </div>
        <footer class="footer">
            <span class="todo-count">{{remaining}} <strong>tache à faire</strong></span>
        </footer>
    </section>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Todos extends Vue {
    todos = [{
        name:'Tache de test',
        completed: false
    }];
    newTodo= '';

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

}
</script>

<style src="./todos.css"></style>