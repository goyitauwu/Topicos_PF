import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import log from "console";
import User from "../../lib/users";

export default async function registerHandler(req, res) {
	try {
		// Create new instance of MongoDB class
		await dbConnect();

		if (req.method !== "POST") {
			res.status(405).json({ message: "Method Not Allowed" });
			return;
		}

		const { email, password } = req.body;

		if (!email || !password) {
			res.status(400).json({ message: "Missing required fields" });
			return;
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email, password }).exec();
		if (!existingUser) {
			res.status(409).json({ message: "User does not exists" });
			return;
		} else {
			if (
				existingUser["isAdmin"] == false ||
				existingUser["isAdmin"] == "False"
			) {
				res.status(200).json({ message: "User exists" });
				return;
			} else {
				if (
					existingUser["isAdmin"] == true ||
					existingUser["isAdmin"] == "True"
				) {
					res.status(201).json({ message: "User exists" });
					return;
				}
			}
		}
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}
