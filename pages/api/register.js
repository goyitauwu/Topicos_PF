import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongodb';
import log  from 'console';
import User from '../../lib/users';

export default async function registerHandler(req, res) {
  try {
    // Create new instance of MongoDB class
    await dbConnect();

    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method Not Allowed' });
      return;
    }

    const { name, lastname, email, password, company, phone, country, street, city, state, postalcode, isAdmin } = req.body;

    if (!name || !lastname || !email || !password) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({email}).exec();

    if (existingUser!==null) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }
    // Create new user object
    const user =new User(req.body);

    // Insert user into the database
    await user.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
