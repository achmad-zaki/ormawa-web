import { getSession } from 'next-auth/react';
import { prisma } from '@/config/db';

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Implement your logout logic here
    // For example, you can clear the session or update the user's logout status in the database

    // Update the user's session token to null or remove it from the database
    await prisma.user.update({
      where: { id: session.user.id },
      data: { sessionToken: null },
    });

    // Respond with a success message or redirect the user
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ error: 'An error occurred during logout' });
  }
}
