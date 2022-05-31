import { MongoClient } from 'mongodb';
import { connectDatabase, insertDocument } from '../../databaseUtilities';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, message, name } = req.body;

    console.log('EMAIL, MESSAGE, NAME', email, message, name);

    if (!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
      return res.status(422).json({ message: 'Invalid contact input' });
    }

    // TODO: Store in a database

    const newMessage = { email, message, name };

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      return res.status(500).json({ message: 'Could not connect to database' });
    }

    try {
      const document = await insertDocument(client, 'messages', newMessage);
      client.close();
    } catch (error) {
      client.close();

      return res.status(500).json({ message: 'Failed to save message ' });
    }

    res.status(201).json({ message: 'Successfully stored message', message: newMessage });
  }
}

export default handler;
