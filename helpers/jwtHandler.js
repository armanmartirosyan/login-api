import JWT from "jsonwebtoken";
import createHttpError from "http-errors";
import { sendError } from "../helpers/errorHandler.js";

export function signAccessToken(userID) {
	return new Promise((resolve, reject) => {
		const payload = {
		};
		const secret = process.env.ACCESS_TOKEN_SECRET;
		const options = {
			expiresIn: "12h",
			issuer: "youtube.com",
			audience: userID.toString(),
		};
		JWT.sign(payload, secret, options, (err, token) => {
			if (err) {
				console.log(err.message);
				return (reject(createHttpError.InternalServerError()));
			}
			return resolve(token);
		});
	});
}

export function verifyAccessToken(req, res, next) {
	if (!req.headers["authorization"]) {
		sendError(res, createHttpError.Unauthorized());
		return ;
	}
	const token = req.headers["authorization"].split(' ')[1];
	JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
		if (err) {
			sendError(res, createHttpError.Unauthorized());
			return ;
		}
		req.payload = payload;
		next();
	});
}