import {
    defineStore
} from 'pinia'
import {
    todoService
} from '../services/todoService'

export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: []
    }),

    actions: {
        async fetchTodos() {
            try {
                this.todos = await todoService.getAllTodos()
            } catch (error) {
                console.error('Error fetching todos:', error)
            }
        },

        async addTodo(title) {
            try {
                const newTodo = await todoService.createTodo(title)
                this.todos.unshift(newTodo)
            } catch (error) {
                console.error('Error adding todo:', error)
            }
        },

        async updateTodo(todo) {
            try {
                const updatedTodo = await todoService.updateTodo(todo)
                const index = this.todos.findIndex(t => t._id === todo._id)
                if (index !== -1) {
                    this.todos[index] = updatedTodo
                }
            } catch (error) {
                console.error('Error updating todo:', error)
            }
        },

        async deleteTodo(id) {
            try {
                await todoService.deleteTodo(id)
                this.todos = this.todos.filter(todo => todo._id !== id)
            } catch (error) {
                console.error('Error deleting todo:', error)
            }
        }
    }
})