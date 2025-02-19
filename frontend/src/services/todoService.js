import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const todoService = {
    async getAllTodos() {
        const response = await api.get('/todos')
        return response.data
    },

    async createTodo(title) {
        const response = await api.post('/todos', {
            title
        })
        return response.data
    },

    async updateTodo(todo) {
        const response = await api.patch(`/todos/${todo._id}`, todo)
        return response.data
    },

    async deleteTodo(id) {
        await api.delete(`/todos/${id}`)
    }
}