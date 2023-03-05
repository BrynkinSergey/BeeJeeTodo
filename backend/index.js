require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')

const db = require('./src/models');
const todo = require('./src/routes/todo');
const auth = require('./src/routes/auth');
const port = process.env.APP_PORT || 8000;
const host = process.env.APP_HOST || '0.0.0.0';


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/todo', todo);
app.use('/auth', auth);

(async () => await db.sequelize.sync())()

app.get('/healthcheck', [
    (req, res, next) => {
        res.send(`Server is running on port ${port}`)
    }
]);

app.listen(port, host, ()=>{
    console.log(`server is running on ${host}/${port}`);
});