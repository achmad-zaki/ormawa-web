import React, { useEffect } from 'react'
import { useReducer, useState } from 'react';
import { toggleChangeAction } from '@/redux/reducer';
import { useDispatch, useSelector } from 'react-redux'
import { useContext } from 'react';
import AppContext from '@/context/appContext';


export default function AddProkerForm() {

    const visible = useSelector((state) => state.app.client.toggleForm)
    const dispatch = useDispatch()
    const value = useContext(AppContext)
    

    const [saveProker, setSaveProker] = useState({
        nama_proker : "",
        tgl_pelaksanaan : new Date(""),
        indikator : "",
        target : "",
        total_anggaran : 0,
        catatan : "",
        status : ""
    })


    const handleSaveChange = ({target : {name, value}}) => {
        setSaveProker({...saveProker, [name] : value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reqOption = {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(saveProker)
        }
        const response = await fetch("http://localhost:3000/api/proker/", reqOption);
        const result = await response.json();

        setSaveProker({
            nama_proker : "",
            tgl_pelaksanaan : new Date(""),
            indikator : "",
            target : "",
            total_anggaran : 0,
            catatan : "",
            status : ""
        })


        if(result) {
            var prevProker = value.proker;
            prevProker.push(result);
    
            value.setMyProker(prevProker);
            dispatch(toggleChangeAction());
        }
    }
    const handler = () => {
        dispatch(toggleChangeAction())
    }



    return (
    <>
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                        Modal Title
                        </h3>
                        <button className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handler}>
                            <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                            </span>
                        </button>
                    </div>
                {/*body*/}
                    <div className="relative p-6 flex-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="grid sm:grid-cols-2 w-full my-4 text-slate-500 text-lg gap-4 leading-relaxed">
                                <div className="input-type">
                                    <input  type="text" onChange={handleSaveChange} name="nama_proker" className="border w-5/6 px-5 py-5 focus:outline-none rounded-md" placeholder="Nama Proker"/>
                                </div>
                                <div className="input-type">
                                    <input  type="date" onChange={handleSaveChange} name="tgl_pelaksanaan" className="border w-5/6 px-5 py-5 focus:outline-none rounded-md" placeholder="date"/>
                                </div>
                                <div className="input-type">
                                    <input  type="text" onChange={handleSaveChange} name="indikator" className="border w-5/6 px-5 py-5 focus:outline-none rounded-md" placeholder="Indikator"/>
                                </div>
                                <div className="input-type">
                                    <input  type="text" onChange={handleSaveChange} name="target" className="border w-5/6 px-5 py-5 focus:outline-none rounded-md" placeholder="Target"/>
                                </div>
                                <div className="input-type">
                                    <input  type="number" onChange={handleSaveChange} name="total_anggaran" className="border w-5/6 px-5 py-5 focus:outline-none rounded-md" placeholder="Anggaran"/>
                                </div>
                                <div className="input-type">
                                    <input  type="text" onChange={handleSaveChange} name="catatan" className="border w-5/6 px-5 py-5 focus:outline-none rounded-md" placeholder="Catatan"/>
                                </div>
                                <div className="flex gap-10 items-center">
                                    <div className="form-check">
                                        <input type="radio" onChange={handleSaveChange} name="status" value= "Aprove" id="radioDefault1" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 check:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                                        <label htmlFor="radioDefault1" className="inline-block text-gray-800">
                                        Aprove
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input type="radio" onChange={handleSaveChange} name="status" value="Revisi" id="radioDefault2" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 check:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                                        <label htmlFor="radioDefault3" className="inline-block text-gray-800">
                                        Revisi
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input type="radio" onChange={handleSaveChange}  name="status" value="Cancel" id="radioDefault2" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 check:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer addCancel" />
                                        <label htmlFor="radioDefault2" className="inline-block text-gray-800">
                                        Cancel
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end p-5 mt-3 border-t border-solid border-slate-200 rounded-b">
                                <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={handler} type="button">
                                Close
                                </button>
                                <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 addConfirm" type="submit">
                                Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
    )
}
