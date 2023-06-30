import { prisma } from "@/config/db";

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=10');

  switch (req.method) {
    case "GET":
      return await getProker(req, res);
    case "PUT":
      return await updateProker(req, res);
    case "DELETE":
      return await deleteProker(req, res);
  }
}

const getProker = async (req, res) => {
  try {
    const { prokerId } = req.query;

    const result = await prisma.proker.findFirst({
      where: {
        id: {
          equals: parseInt(prokerId)
        }
      }
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateProker = async (req, res) => {
  try {
    const {
      nama_proker,
      tgl_pelaksanaan,
      indikator,
      target,
      total_anggaran,
      catatan,
      periode,
      tahun,
      status,
      role,
      author,
      file
    } = req.body;
    const { prokerId } = req.query;

    const result = await prisma.proker.update({
      where: {
        id: parseInt(prokerId)
      },
      data: {
        nama_proker: nama_proker,
        tgl_pelaksanaan: new Date(tgl_pelaksanaan),
        indikator: indikator,
        target: target,
        total_anggaran: parseInt(total_anggaran),
        catatan: catatan,
        periode: periode,
        tahun: tahun,
        status: status,
        author: author,
        file: file
      }
    });

    return res.status(200).json({
      nama_proker,
      tgl_pelaksanaan,
      indikator,
      target,
      total_anggaran,
      catatan,
      periode,
      tahun,
      status,
      role,
      author,
      file,
      prokerId
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteProker = async (req, res) => {
  try {
    const { prokerId } = req.query;

    const result = await prisma.proker.delete({
      where: {
        id: parseInt(prokerId)
      }
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
