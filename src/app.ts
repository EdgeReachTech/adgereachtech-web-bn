import connection from './config/db';
import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/userRoutes';
import { portfolioRouter } from './routes/portfolioRoutes';
import { commentRouter } from './routes/commentRoutes';
import { blogRouter } from './routes/blogsRoutes';
import { messageRouter } from './routes/messageRoutes';
import swaggeUi from 'swagger-ui-express' 

import cors from 'cors'
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
dotenv.config();

const PORT = process.env.PORT||2000;
const app = express();
app.use(cors())
app.use(express.json());
app.use(
    cors({
      origin: '*',
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );

connection();
const options = {
    definition:{
        openapi:'1.0.0',
        info:{
            title:"ERT API Documantation",
            version:"1.0.0",
            description:"EdgeReach Tech API documentation"
        },
        servers: [
            {
                url: 'https://adgereachtech-web-bn-5ycv.onrender.com',
                description: 'testing  server',
            },
            {
                url: 'http://locahost:5000', 
                description: 'development  server',
            },
           
        ],

    },
    apis:[path.join(__dirname,'./routes/blogsRoutes.ts')]
}
const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs',swaggeUi.serve,swaggeUi.setup(swaggerSpec))

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