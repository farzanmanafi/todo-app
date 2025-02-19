<template>
  <div class="todo-list">
    <TodoItem v-for="todo in todos" :key="todo._id" :todo="todo" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '../store/todoStore'
import TodoItem from './TodoItem.vue'

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)

onMounted(() => {
  todoStore.fetchTodos()
})
</script>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
