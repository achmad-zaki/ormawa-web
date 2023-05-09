import { prisma } from "@/config/db";



export default async function handler(req, res) {
    res.setHeader('Cache-Control', 's-maxage=10'); 

    switch(req.method) {
        case "GET"  :
            return await getProker(req, res);
        case "POST" :
            return await addProker(req, res);
    }
}


const getProker = async (req, res) => {

    try{
        const result = await prisma.proker.findMany();
        return res.status(200).json(result);
    } catch(error) {
        return res.status(500).json(error);
    }
}

const addProker = async (req, res) => {
    
    const {nama_proker, tgl_pelaksanaan, indikator, target, total_anggaran, catatan, status} = req.body;
    try {
        const data = {
            nama_proker: nama_proker,
            tgl_pelaksanaan: new Date(tgl_pelaksanaan),
            indikator: indikator,
            target: target,
            total_anggaran: parseInt(total_anggaran),
            catatan: catatan,
            status: status
        }

        const result = await prisma.proker.create({
            data : data,
            select : {
                id : true
            }
        })

        return res.status(200).json({...result, nama_proker, tgl_pelaksanaan, indikator, target, total_anggaran, catatan, status})
    } catch(error) {
        if (error.code === 'P2025') {
            console.error('user not found');
        } else {
            console.error('error');
        }
        return res.status(500).json(error.message);

    }
}