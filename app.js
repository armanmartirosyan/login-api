import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv"
import AuthRoute from "./routes/auth.js"
import pool from "./helpers/database.js"
import { createDirectory } from "./helpers/createDir.js";


dotenv.config();
createDirectory();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.join(__dirname, "./public");
const PORT = process.env.PORT || 8080;
const accessLogStream = fs.createWriteStream( path.join(__dirname, "logs/access.log"), { flags: "a" });


app.use(morgan("common", { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(publicDirectory));

app.use("/auth", AuthRoute);

app.listen(8080, () => {
	console.log(`Server is running on port ${PORT}...`);
});

process.on('SIGINT', () => {
	console.log("Received SIGINT signal. Gracefully shutting down...")
	pool.end();
	process.exit();
});
