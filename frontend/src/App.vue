<template>
  <div class="app-container">
    <h1>Todo List</h1>
    <TodoForm />
    <TodoList />
  </div>
</template>

<script setup>
import TodoList from './components/TodoList.vue'
import TodoForm from './components/TodoForm.vue'
</script>

<style>
.app-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  color: #2c3e50;
}
</style>
