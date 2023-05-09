import { prisma } from "@/config/db";


export default async function handler(req, res) {
    res.setHeader('Cache-Control', 's-maxage=10'); 


    switch(req.method) {
        case "GET"  :
            return await getProker(req, res);
        case "PUT":
            return await updateProker(req, res);
        case "DELETE":
            return await deleteProker(req, res);
    }
}


const getProker = async (req, res) => {

    try{
        const {prokerId} = req.query;

        const result = await prisma.proker.findFirst({
            where : {
                id : {
                    equals : parseInt(prokerId)
                }
            }
        })
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error.message);
    }
}

const updateProker = async (req, res) => {

    try {
        
        const {nama_proker, tgl_pelaksanaan, indikator, target, total_anggaran, catatan, status} = req.body;
        const {prokerId} = req.query;

        const result = await prisma.proker.update({
            where : {
                id
            },
            data : {
                nama_proker,
                tgl_pelaksanaan,
                indikator,
                target,
                total_anggaran,
                catatan,
                status
            }
        })

        return res.status(200).json({...result, nama_proker, tgl_pelaksanaan, indikator, target, tgl_pelaksanaan, catatan, status, prokerId});

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const deleteProker = async (req, res) => {

    try {
        

        const {prokerId} = req.query;

        const result = await prisma.proker.delete({
            where : {
                id : parseInt(prokerId)
            }
        })

        return res.status(200).json({success : true});

    } catch (error) {
        return res.status(500).json(error.message);
    }
}