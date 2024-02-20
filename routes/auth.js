import express from "express";
import {getUserByEmail, createUser} from "../helpers/database.js";
import createHttpError from "http-errors";
import { sendError } from "../helpers/errorHandler.js";
import {registerSchema, loginSchema} from "../helpers/validationSchema.js";
import {signAccessToken, verifyAccessToken} from "../helpers/jwtHandler.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", async(req, res) => {
	try {
		const result = await registerSchema.validateAsync(req.body);
		const doesExist = await getUserByEmail(result.email);
		if (doesExist)
			throw createHttpError.Conflict(`${result.email} is already in use.`);
		const user = await createUser(result.name, result.email, result.password);
		const accessToken = await signAccessToken(user.id);
		res.send({accessToken});
	} catch(error) {
		if (error.isJoi === true)
			error.status = 422;
		sendError(res, error);
	}
});

router.post("/login", async(req, res, next) => {
	try {
		const result = await loginSchema.validateAsync(req.body);
		const user = await getUserByEmail(result.email);
		if (!user || !await bcrypt.compare(result.password, user.password))
			throw createHttpError.BadRequest("Invalid username or password");
		const accessToken = await signAccessToken(user.id);
		res.send({accessToken});
	} catch (error) {
		if (error.isJoi === true)
			error.status = 422;
		sendError(res, error);
	}
});

router.get("/verify-user", verifyAccessToken, async(req, res, next) => {
	res.send("Hello from express!"); 
});

router.post("/refresh-token", async(req, res, next) => {
	res.send("refresh token route");
});

router.delete("/logout", async(req, res, next) => {
	res.send("logout route");
});

export default router;