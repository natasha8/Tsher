import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import dalleRoute from "./routes/dalleRoute.js";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors());

app.use(express.json({ limig: "50mb" }));

app.use("/api/v1/dalle", dalleRoute);

app.get("/", (req, res) => {
	res.status(200).json({ message: "Hello, From Dall-E!" });
});

app.listen(PORT, () => console.log(`Connected to port ${PORT}`));
