import { prisma } from "@/config/db";


export default async function handler(req, res) {


  switch(req.method) {
      case "GET"  :
          return await getUser(req, res);
  }


}

const getUser = async (req, res) => {

  try{
    const { userId } = req.query;
    if (req.method === 'GET') {
      await prisma.user.findFirst({
        where: {
          id: parseInt(userId),
        },
        select: {
          id: true,
          role: true,
          username: true,
        }
      })
        .then((user) => {
          if (user !== null && user !== undefined) {
            res.status(200).json({
              message: "User found!",
              data: user,
            });
            // resolve();
          }
          else {
            res.status(404).json({
              message: "User not found!",
            });
          }
  
        })
        .catch((err) => {
          if (err.code === 'P2025') {
            console.error('user not found');
        } else {
            console.error('error');
        }
        return res.status(500).json(err.message);
        });
    }
  } catch(error){
      return res.status(500).json(error.message);
  }
}