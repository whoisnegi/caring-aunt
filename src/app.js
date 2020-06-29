import express from 'express';
import blogRouter from './routers/blog';
import userRouter from './routers/user';
import menstRouter from './routers/menstrual';
import path from 'path';
import 'dotenv/config';
import './db/mongoose'
import './utils/sms'
import './utils/sms2'

const app = express();

app.use(express.static('views'));

//Setting Up View_Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send(`<h1 style="color:red">WELCOME TO CARING-AUNT</h1>`)
})
app.use(userRouter);
app.use(menstRouter);
app.use(blogRouter);

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
