<template>
  <form @submit.prevent="handleSubmit" class="todo-form">
    <input
      v-model="title"
      type="text"
      placeholder="Add a new todo..."
      required
    />
    <button type="submit">Add</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../store/todoStore'

const todoStore = useTodoStore()
const title = ref('')

const handleSubmit = async () => {
  if (title.value.trim()) {
    await todoStore.addTodo(title.value)
    title.value = ''
  }
}
</script>

<style scoped>
.todo-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
</style>
