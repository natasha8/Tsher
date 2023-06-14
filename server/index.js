import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors());

app.get("/", (req, res) => {
	res.status(200).json({ message: "Hello, From Dall-E!" });
});

app.listen(PORT, () => console.log("Connected to port 8080"));
