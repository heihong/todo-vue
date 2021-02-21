<template>
  <section class="todoapp">
    <header class="hearder">
      <h1>Todos</h1>
      <input
        type="text"
        class="new-todo"
        placeholder="Ajouter une tache"
        v-model="newTodo"
        @keyup.enter="addTodo"
      />
    </header>
    <div class="main">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="allDone"
      />
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <li
          class="todo"
          v-for="(todo, index) in filterTodos"
          v-bind:key="index"
          :class="{ completed: todo.completed, editing: todo === editing }"
        >
          <div class="view">
            <input
              type="checkbox"
              :id="'todo' + index"
              v-model="todo.completed"
              class="toggle"
            />
            <label :for="'todo' + index" @dblclick="editTodo(todo)">{{
              todo.name
            }}</label>
            <button class="destroy" @click.prevent="deleteTodo(todo)"></button>
          </div>
          <input
            type="text"
            class="edit"
            v-model="todo.name"
            @keyup.enter="doneEdit"
            v-focus="todo === editing"
            @blur="doneEdit"
            @keyup.esc="cancelEdit"
          />
        </li>
      </ul>
    </div>
    <footer class="footer" v-show="hasTodos">
      <span class="todo-count"
        >{{ remaining }} <strong>tache à faire</strong></span
      >
      <ul class="filters">
        <li>
          <a
            href="#"
            :class="{ selected: filter === 'all' }"
            @click.prevent="filter = 'all'"
            >Toutes</a
          >
        </li>
        <li>
          <a
            href="#"
            :class="{ selected: filter === 'todos' }"
            @click.prevent="filter = 'todo'"
            >A faire</a
          >
        </li>
        <li>
          <a
            href="#"
            :class="{ selected: filter === 'done' }"
            @click.prevent="filter = 'done'"
            >Faites</a
          >
        </li>
      </ul>
      <button
        class="clear-completed"
        v-show="completed"
        @click.prevent="delecteCompleted()"
      >
        Supprimer les tâches finies
      </button>
    </footer>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
interface Itodo {
  name: string;
  completed: boolean;
}

@Component
export default class Todos extends Vue {
  @Prop({ default: () => [] }) public value!: any;

  todos: any = this.value;
  newTodo = "";
  filter = "all";
  editing: any = null;
  oldTodo: any = null;

  addTodo() {
    this.todos.push({
      completed: false,
      name: this.newTodo,
    });

    this.newTodo = "";
  }

  @Watch("value")
  onValueChanged(val: Itodo, oldVal: Itodo) {
    this.todos = val;
  }

  @Emit("input")
  deleteTodo(todo: Itodo) {
    this.todos = this.todos.filter((i: Itodo) => i !== todo);
    return this.todos;
  }

  @Emit("input")
  delecteCompleted() {
    this.todos = this.todos.filter((todo: Itodo) => todo.completed === false);
    return this.todos;
  }

  get remaining() {
    return this.todos.filter((todo: Itodo) => !todo.completed).length;
  }

  editTodo(todo: Itodo): void {
    this.editing = todo;
    this.oldTodo = todo.name;
  }

  doneEdit() {
    this.editing = null;
  }

  cancelEdit() {
    this.editing.name = this.oldTodo;
    this.doneEdit();
  }

  get completed() {
    return this.todos.filter((todo: Itodo) => todo.completed).length;
  }

  get hasTodos() {
    return this.todos.length > 0;
  }

  get filterTodos() {
    if (this.filter === "todo") {
      return this.todos.filter((todo: Itodo) => !todo.completed);
    } else if (this.filter === "done") {
      return this.todos.filter((todo: Itodo) => todo.completed);
    }
    return this.todos;
  }

  get allDone() {
    return this.remaining === 0;
  }

  set allDone(value) {
    this.todos.forEach((todo: Itodo) => {
      todo.completed = value;
    });
  }
}
</script>

<style src="./todos.css"></style>
