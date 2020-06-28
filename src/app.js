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
//Setting Up View_Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT;

app.use(express.json());

app.use(userRouter);
app.use(menstRouter);
app.use(blogRouter);

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
