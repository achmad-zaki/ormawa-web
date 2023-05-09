import React from 'react'
import { BiEdit, BiTrashAlt } from "react-icons/bi"
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, updateAction } from '@/redux/reducer';
import { useContext } from 'react';




export default function ProkerList({id, proker, idx, handleDelete}) {


    const visible = useSelector((state) => state.app.client.toggleForm)
    const dispatch = useDispatch()


    const onUpdate = () => {
        dispatch(toggleChangeAction())
        if (visible) {
            dispatch(updateAction(proker.id))

        }
    }

    const dates = proker.tgl_pelaksanaan;
    const data = new Date(dates);
    let dd = String(data.getDate()).padStart(2, '0');
    let mm = String(data.getMonth() + 1).padStart(2, '0');
    let yyyy = data.getFullYear();
    let date = dd + '-' + mm + '-' + yyyy;



    return (
        <tr className="bg-gray-50 text-center">
            <td className="px-2 py-2 border border-stone-700">
            <span>{idx + 1} </span>
            </td>
        <td className="px-2 py-2 border border-stone-700">
            <span className="text-center font-semibold">{proker.nama_proker || "Unknown"}</span>
        </td>
        <td className="px-2 py-2 border border-stone-700">
            <span>{date || "Unknown"}</span>
        </td>
        <td className="px-2 py-2 border border-stone-700">
            <span>{proker.indikator || "Unknown"}</span>
        </td>
        <td className="px-2 py-2 border border-stone-700">
            <span>{proker.target || "Unknown"}</span>
        </td>
        <td className="px-2 py-2 border border-stone-700">
            <span>{proker.total_anggaran || "Unknown"}</span>
        </td>
        <td className="px-2 py-2 border border-stone-700">
            <span>{proker.catatan || "Unknown"}</span>
        </td>
        <td className="px-2 py-2 border border-stone-700">
            <button className="cursor"><span className={`${proker.status == "Aprove" ? 'bg-green-500': proker.status == "Cancel" ? 'bg-rose-500' : 'bg-yellow-500'} text-white px-5 py-1 rounded-full`}>{proker.status || "Unknown"}</span></button>
        </td>
        <td className="px-2 py-2 border border-stone-700">
            <div className='flex justify-evenly gap-2'>
            <button className="cursor" onClick={onUpdate(proker.id)}><BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit></button>
            <button onClick={() => handleDelete(proker.id)} className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
            </div>
        </td>
    </tr>
    )
}
