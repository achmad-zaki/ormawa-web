import { prisma } from "../../../libs/prisma.libs";

export default function handler(req, res) {
  prisma.user.findMany()
    .then((users) => {
      if (users.length === 0) return res.status(404).json({ message: "No users found!" });
      res.status(200).json({
        message: "Users retrieved successfully!",
        data: users,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || "Error occured! Please contact the admin for more information.",
      });
    });
}