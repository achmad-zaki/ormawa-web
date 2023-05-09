import { prisma } from "@/config/db";
// import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 's-maxage=10'); 

    switch (req.method) {
        case "DELETE":
            return await deleteMulti(req, res)
        default:
            break;
    }
}


const deleteMulti = async (req, res) => {
    try {
        const {ids} = req.body;

        await prisma.proker.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })
        return res.status(200).json({success: "delete multi"});
    } catch (error) {
        return res.status(500).json(error.message);
    }
}