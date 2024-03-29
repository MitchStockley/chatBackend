import express from 'express';
import http from "http";
import { Server } from "socket.io";
import sockets from './socket/sockets.js';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './api/routes.js';
import cors from 'cors'


await mongoose.connect(
    "mongodb+srv://mitchellstockley:mitchellstockley@cluster0.xncsowh.mongodb.net/?retryWrites=true&w=majority"
    )


const app = express();
const PORT = 4000;
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: ['https://voluble-pegasus-76e234.netlify.app'], //change to netlify?
    }
})






const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.use('/', router);

io.on('connection',sockets)



httpServer.listen(PORT, () => {
    console.log("server is running at http://localhost:4000")
})