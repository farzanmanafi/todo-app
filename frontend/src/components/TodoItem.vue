<template>
  <div class="todo-item">
    <input type="checkbox" :checked="todo.completed" @change="toggleComplete" />
    <span :class="{ completed: todo.completed }">
      {{ todo.title }}
    </span>
    <button @click="deleteTodo" class="delete-btn">Delete</button>
  </div>
</template>

<script setup>
import { useTodoStore } from '../store/todoStore'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const todoStore = useTodoStore()

const toggleComplete = () => {
  todoStore.updateTodo({
    ...props.todo,
    completed: !props.todo.completed
  })
}

const deleteTodo = () => {
  todoStore.deleteTodo(props.todo._id)
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.completed {
  text-decoration: line-through;
  color: #6c757d;
}

.delete-btn {
  margin-left: auto;
  padding: 0.25rem 0.5rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
