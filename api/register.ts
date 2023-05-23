import { NextApiRequest, NextApiResponse } from 'next';
import MongoDB from '../lib/mongodb';

export default async function registerHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const { name, lastname, email, password, company, phone, country, street, city, state, postalcode, isAdmin } = req.body;

    if (!name || !lastname || !email || !password) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Create new instance of MongoDB class
    const db = new MongoDB();

    // Check if user already exists
    const existingUser = await db.findOne({ email }, 'Users');
    
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    // Create new user object
    const newUser = {
      name,
      lastname,
      email,
      password,
      company,
      phone,
      country,
      street,
      city,
      state,
      postalcode,
      isAdmin: isAdmin === 'true', // Convert string to boolean
    };

    // Insert user into the database
    await db.insertUser(newUser, 'Users');

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
