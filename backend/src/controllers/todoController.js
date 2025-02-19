const Todo = require('../models/Todo');

exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({
            createdAt: -1
        });
        res.json(todos);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.createTodo = async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title
        });
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({
            message: 'Todo not found'
        });

        if (req.body.title !== undefined) {
            todo.title = req.body.title;
        }
        if (req.body.completed !== undefined) {
            todo.completed = req.body.completed;
        }

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({
            message: 'Todo not found'
        });

        await todo.deleteOne();
        res.json({
            message: 'Todo deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};