import { prisma } from "@/config/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { role, username, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      const newUser = await prisma.user.create({
        data: {
          role: role,
          username: username,
          password: hashedPassword,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
        if (error.code === 'P2025') {
            console.error('user not found');
        } else {
            console.error('error');
        }
        return res.status(500).json(error.message);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
