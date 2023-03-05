const { models: { Todo } } = require('../models');
const orderFields = require('../constants/orderFields')
const validateEmail = require("../utils/validateEmail");

module.exports = {
    create: async (request, response) => {
        const {username, email, text} = request.body;
        const status = 'active';

        if(!username || !email || !text) {
            return response.status(400).send({message: 'username, email and text must be a string'})
        }

        if(!validateEmail(email)){
            return response.status(400).send({message: 'invalid email'})
        }

        try {
            await Todo.create({username, text, email, status});
        } catch (err) {
            return response.status(500).send({message: err.message})
        }

        response.send({username, text, email, status});
    },

    getPage: async (request, response) => {
        const {page} = request.params;
        const limit = 3;
        const offset = limit * (page - 1);
        let field = request.query.field? request.query.field.trim().toLowerCase(): null;
        let order = request.query.order? request.query.order.trim().toLowerCase(): null;

        field = orderFields.includes(field)? field: null;
        order = order === 'asc' || order === 'desc'? order: null;

        if(isNaN(page)) {
            return response.status(400).send({message: 'Page must be a number!'});
        }

        try {
            const result = await Todo.findAndCountAll({
                order: field && order? [[field, order]]: null,
                limit,
                offset,
            })

            const responseObj = {
                totalTodos: result.count,
                totalPages: Math.ceil(result.count / limit),
                page: page,
                todos: result.rows.map((todo)=>{
                    return {
                        id: todo.id,
                        username: todo.username,
                        email: todo.email,
                        text: todo.text,
                        status: todo.status,
                    }
                }),
            }

            response.send(responseObj);
        } catch (err) {
            return response.status(500).send({message: err.message})
        }
    },

    update: async (request, response) => {
        const {todoId} = request.params;

        if (isNaN(todoId)) {
            return response.status(400).send({message: 'TodoId must be a number!'});
        }

        const status = request.body.status? request.body.status.toLowerCase().trim(): null;
        const text = request.body.text? request.body.text.trim(): null;

        if (!status && !text) {
            return response.status(400).send({message: 'Body must contain text or status fields!'});
        }
        if(typeof text !== 'string' && text !== null) {
            return response.status(400).send({message: 'Text must be a string!'});
        }
        if(!(status === 'active' || status === 'done' || status === null)) {
            return response.status(400).send({message: `Status must be a string ACTIVE or DONE!`});
        }

        try {
            const todo = await Todo.findOne({ where: { id: todoId }})
            if(!todo) {
                return response.status(404).send({message: 'Todo not found!'})
            }

            await todo.update({
                text: text? text: todo.text,
                status: status? status: todo.status,
            })
        } catch (err) {
            return response.status(500).send({message: err.message})
        }

        response.send({message: 'Todo updated.'})
    }

}