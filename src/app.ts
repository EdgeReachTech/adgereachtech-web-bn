import connection from './config/db';
import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/userRoutes';
import { portfolioRouter } from './routes/portfolioRoutes';
import { commentRouter } from './routes/commentRoutes';
import { blogRouter } from './routes/blogsRoutes';
import { messageRouter } from './routes/messageRoutes';
import cors from 'cors'
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(cors())
app.use(express.json());

connection();

app.get('/', (req, res) => {
    res.send('welcome to edge-reach tech website')
});

app.use('/user', userRouter);
app.use("/portfolio", portfolioRouter);
app.use("/comment", commentRouter);
app.use("/blog", blogRouter);
app.use("/message", messageRouter);

app.listen(PORT, () => {
    console.log(`app is listening to http://localhost:${PORT}`);
});
export default app;