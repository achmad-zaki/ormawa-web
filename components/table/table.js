import { BiEdit, BiTrashAlt } from "react-icons/bi"
import data from "@/database/data.json"
import { Table } from 'flowbite-react'



export default function Tables () {
    return (
    <div className="grid grid-cols-1">
        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
            <table className="w-full text-sm table-auto text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <span>Nama Proker</span>
                        </th>
                        <th className="px-6 py-3">
                            <span className="">Total Anggaran</span>
                        </th>
                        <th className="px-6 py-3">
                            <span className="">Ketua Panitia</span>
                        </th>
                        <th className="px-6 py-3">
                            <span className="">Tanggal Pelaksanaan</span>
                        </th>
                        <th className="px-6 py-3">
                            <span className="">Status</span>
                        </th>
                        <th className="px-6 py-3">
                            <span className="">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="">
                    {
                        data.map((obj, i) => <Tr {...obj} key = {i}/>)
                    }
                </tbody>
            </table>
        </div>
    </div>
    )
}

function Tr ({id, namaproker, totalanggaran, ketuapanitia, date, status}) {

    // const visible = useSelector((state) => state.app.client.toggleForm)
    // const dispatch = useDispatch()

    // const onUpdate = () => {
    //     dispatch(toggleChangeAction())
    //     console.log(visible)
    // }

    return (
        <tr className="bg-gray-50 text-center">
        <td className="px-6 py-3">
            <span className="text-center font-semibold">{namaproker || "Unknown"}</span>
        </td>
        <td className="px-6 py-3">
            <span>{totalanggaran || "Unknown"}</span>
        </td>
        <td className="px-6 py-3">
            <span>{ketuapanitia || "Unknown"}</span>
        </td>
        <td className="px-6 py-3">
            <span>{date || "Unknown"}</span>
        </td>
        <td className="px-16 py-3">
            <button className="cursor"><span className={`${status == "Success" ? 'bg-green-500': status == "Unsuccess" ? 'bg-rose-500' : 'bg-yellow-500'} text-white px-5 py-1 rounded-full`}>{status || "Unknown"}</span></button>
        </td>
        <td className="px-6 py-3 flex justify-around gap-5">
            <button className="cursor"><BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit></button>
            <button className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
        </td>
    </tr>
    )
}