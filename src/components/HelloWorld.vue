<template>
  <div>
    {{ todos }}
    <Todos v-model="todos" />
    <Todos v-model="todos" />
    <Todos />
    <button @click="addTodo">Ajouter une tache</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Todos from "./Todos.vue";

@Component({
  components: {
    Todos,
  },
})
export default class HelloWorld extends Vue {
  todos = [{ name: "Demo", completed: true }];

  addTodo() {
    this.todos.push({
      name: "Jean",
      completed: false,
    });
  }
}
</script>
