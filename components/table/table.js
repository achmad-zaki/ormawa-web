import { Table } from 'flowbite-react'
import { useEffect } from "react";
import Form from "../forms/form"
import { useState } from "react";
import { useContext } from "react";
import AppContext from '@/context/appContext';
import { useSelector, useDispatch } from "react-redux";
import { BiEdit, BiTrashAlt } from "react-icons/bi"
import { toggleChangeAction, updateAction } from '@/redux/reducer';
import { fetchData } from 'next-auth/client/_utils';






export default function Tables ({setEditProker, proker, handleDelete}) {

    const value = useContext(AppContext)


    const prokerGenerator = () => {

        return (
            <>
                {
                    proker.map((proker, idx) => {
                        // console.log(proker);
                        return <ProkerList className="px-3 py-4" setEditProker = {setEditProker} key = {proker.id} proker = {proker} idx = {idx} handleDelete={handleDelete} />
                    }) 
                }
            </>
        )
    }   
    return (
    <div className="grid grid-cols-1">
        <div className="relative overflow-x-auto border border-stone-400">
            <table className="w-full text-sm table-auto border-collapse border text-black dark:text-gray-400">
                <thead className="text-xs text-black uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="border border-black px-4 py-3">
                            <span>No.</span>
                        </th>
                        <th scope="col" className="border border-black px-3 py-4">
                            <span>Rencana Strategis</span>
                        </th>
                        <th className="border border-black px-3 py-4">
                            <span className="">Waktu/Timeline</span>
                        </th>
                        <th className="border border-black px-3 py-4">
                            <span className="">Indikator Capaian</span>
                        </th>
                        <th className="border border-black px-3 py-4">
                            <span className="">Target</span>
                        </th>                        
                        <th className="border border-black px-3 py-4">
                            <span className="">Anggaran</span>
                        </th>                        
                        <th className="border border-black px-3 py-4">
                            <span className="">Catatan</span>
                        </th>
                        <th className="border border-black px-3 py-4">
                            <span className="">Status</span>
                        </th>
                        <th className="border border-black px-3 py-4">
                            <span className="">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="">
                    {prokerGenerator()}
                </tbody>
            </table>
        </div>
    </div>
    )
}

function ProkerList({setEditProker, proker, idx, handleDelete}) {


    const dispatch = useDispatch()
    const visible = useSelector((state) => state.app.client.toggleForm)


    const fetchProker = async (prokerId) => {

        const response = await fetch("http://localhost:3000/api/proker/" + prokerId);
        const result = await response.json()
        // console.log(prokerId)
        setEditProker(result)


    }

function onUpdate (prokerId) {

    dispatch(toggleChangeAction())
    if (!visible) {
        console.log(prokerId)
        dispatch(updateAction(prokerId))

    }
    // console.log(updateAction(prokerId))

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
            <button className="cursor" onClick={() => onUpdate(proker.id)}><BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit></button>
            <button onClick={() => handleDelete(proker.id)} className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
            </div>
        </td>
    </tr>
    )
}
