import connection from "./config/db";
import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRoutes";
import { portfolioRouter } from "./routes/portfolioRoutes";
import { commentRouter } from "./routes/commentRoutes";
import { blogRouter } from "./routes/blogsRoutes";
import { messageRouter } from "./routes/messageRoutes";
import studentRouter  from "./routes/student.routes";
import swaggeUi, { serve } from "swagger-ui-express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { env } from "./config/env";
import { createServer } from "http";
import { Server } from "socket.io";
dotenv.config();


const server = express();
const app =createServer(server)
const io= new Server(app,{
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  }
})
server.use(cors());
server.use(express.json());
server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

connection();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ERT API Documentation",
      version: "1.0.0",
      description: "EdgeReach Tech API documentation",
    },
    servers: [
      {
        url: "https://adgereachtech-web-bn-5ycv.onrender.com",
        description: "Testing server",
      },
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(__dirname, "./routes/blogsRoutes.ts"),
    path.join(__dirname, "./routes/userRoutes.ts"),
    path.join(__dirname, "./routes/portfolioRoutes.ts"),
    path.join(__dirname, "./routes/messageRoutes.ts"),
  ],
};

const swaggerSpec = swaggerJSDoc(options);
server.use("/api-docs", swaggeUi.serve, swaggeUi.setup(swaggerSpec));

server.get("/", (req, res) => {
  res.send("HEY I AM EDGEREACH SERVER IM DOING GREAT!!");
});

server.use("/user", userRouter);
server.use("/portfolio", portfolioRouter);
server.use("/comment", commentRouter);
server.use("/blog", blogRouter);
server.use("/message", messageRouter);
server.use("/students",studentRouter) 

io.on('connection',(socket)=>{
  console.log('socket connected')

socket.on('send_message',(message)=>{
  console.log('Receive message',message)
  socket.emit('message_received',message)
})})
app.listen(env.PORT, () => {
  console.log(`app is listening to http://localhost:${env.PORT}`);
});
export default app;
