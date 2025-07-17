import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes';
import connectDB from './config/db';
import { folderRouter } from './routes/folders.routes';
import uploadRouter from './routes/upload.routes';
import fileRouter from './routes/file.routes';
import shareRouter from './routes/share.routes';
import binRouter from './routes/bin.routes';
const app = express()

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/folders", folderRouter);
app.use("/upload", uploadRouter);
app.use("/files", fileRouter);
app.use("/shares", shareRouter);
app.use("/bin", binRouter);
app.get("/", (req, res) => {
    res.json({ msg: "Hello World" })
})

app.listen(process.env.PORT || 4500, async () => {
    try {
        await connectDB();
        console.log("Connected to db...")
        console.log(`Server is running on port http://localhost:${process.env.PORT || 4500}`);
    } catch (error) {
        console.log("Error connecting to db:", error);
    }

});