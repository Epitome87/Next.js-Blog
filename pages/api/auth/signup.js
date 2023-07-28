import { connectDatabase } from '../../../utils/databaseUtilities';
import { hashPassword } from '../../../utils/authUtilities';

async function handler(req, res) {
  if (req.method !== 'post') {
    return;
  }

  const { data } = req.body;
  const { email, password } = data;

  if (!email || !email.includes('@') || !password || password.trim().length < 7) {
    return res.status(422).json({ message: 'Invalid user input' });
  }

  const client = await connectDatabase();
  const db = client.db();

  const hashedPassword = await hashPassword(password);

  // Create and store new User
  const result = await db.collection('users').insertOne({
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: 'User created successfully!' });
}

export default handler;
