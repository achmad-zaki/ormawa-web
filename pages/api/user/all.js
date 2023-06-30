import { prisma } from "@/config/db";

export default async function handler(req, res) {
  try {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found!" });
    }
    return res.status(200).json({
      message: "Users retrieved successfully!",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error occurred! Please contact the admin for more information.",
    });
  }
}

