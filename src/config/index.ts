import dotenv from "dotenv";

dotenv.config();

const config = Object.freeze({
	env: process.env.NODE_ENV || "development",
});

export default config;
