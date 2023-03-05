const jwt = require('jsonwebtoken');

module.exports ={
    login: (request, response) =>{
        let {username, password} = request.body;
        username = typeof username === 'string'? username.toLowerCase().trim(): null;
        password = typeof password === 'string'? password.toLowerCase().trim(): null;

        if(username !== 'admin' || password !== '123') {
            return response.status(401).send({message: 'Bad username or password!'});
        }

        response.send({
            message: 'login successful',
            token: `Bearer ${jwt.sign({ data: { role: 'admin' }}, process.env.JWT_SECRET, { expiresIn: '1d' })}`
        });
    }
}