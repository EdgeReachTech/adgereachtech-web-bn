import connection from './config/db';
import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/userRoutes';

dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

connection();

app.get('/', (req, res) => {
    res.send('welcome to edge-reach tech website')
});

app.use('/user', userRouter);
app.listen(PORT, () => {
    console.log(`app is listening to http://localhost:${PORT}`);
});
export default app;