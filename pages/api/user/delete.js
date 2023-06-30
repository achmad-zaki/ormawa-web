import { prisma } from "@/config/db";


export default function handler(req, res) {
  const { id } = req.query;
  if (id && req.method === "DELETE") {
    prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    })
      .then((user) => {
        return res.status(201).json({
          message: "User deleted successfully!",
          data: user,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: error || "Error occured! Please contact the admin for more information.",
        });
      });
  } else {
    return res.status(400).json({
      message: "Please fill all the fields!",
    });
  }
}