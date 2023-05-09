import Form from './forms/form'
import Tables from './table/table'
import Pagination from './Pagination'
import Alert from './Alert'
import Header from './Header'
import Title from './Title'
import { toggleChangeAction, updateAction } from '@/redux/reducer';
import { useDispatch, useSelector } from 'react-redux'
import React, { useContext, useEffect, useState } from 'react'
import { BiUserPlus } from "react-icons/bi";
import AppContext from '@/context/appContext';
import { Paginate } from '@/helpers/paginate';
import { Search } from '@/helpers/search'
import Bug from './forms/Bug'


export default function ProkerLayout() {
    
    const visible = useSelector((state) => state.app.client.toggleForm)
    const value = useContext(AppContext)
    const dispatch = useDispatch()


    const [editProker, setEditProker] = useState({
        id: "",
        nama_proker: "",
        tgl_pelaksanaan: new Date(""),
        indikator: "",
        target: "",
        total_anggaran: 0,
        catatan: "",
        status: ""
    })

    const[searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    let paginatedProker;
    let searchedResult;

    if (searchQuery.length > 0) {
        searchedResult = Search(value.proker, searchQuery);
        paginatedProker = Paginate(searchedResult, currentPage, pageSize);
    } else {
        paginatedProker = Paginate(value.proker, currentPage, pageSize);
    }


    const handleEditChange = ({target : {name, value}}) => {
        setEditProker({...editProker, [name] : value})
    }

    const handleDelete = async (prokerId) => {

        const reqOption = {
            method : "DELETE"
        }

        const response = await fetch("http://localhost:3000/api/proker/" + prokerId, reqOption);
        const result = await response.json();

        if(result) {

            const prevProker = value.proker;
            const newProker = prevProker.filter(proker => {
                return proker.id != prokerId;
            })
            value.setMyProker(newProker);
        }
    }

    const handler = () => {
        dispatch(updateAction(null))
        dispatch(toggleChangeAction())
        
    }
    return (
        <>
            <Header/>
            <Title title={'Program Kerja'}/>
            {/* <Alert /> */}
            <div className='flex justify-between py-5 mx-auto'>
                <div className="left flex gap-3 ml-1">
                    <button onClick={handler} className='flex bg-cyan-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-cyan-500 hover:text-black'>
                        Add Employee <span className='px-1'><BiUserPlus size={23}></BiUserPlus></span>
                    </button>
                </div>
                    <div className="mr-2">
                        <label htmlFor="table-search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" id="table-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                            </div>
                    </div>
            </div>
            {visible ? <Form setEditProker ={setEditProker} editProker = {editProker} handleEditChange = {handleEditChange}></Form> : <></>}
            <Tables setEditProker = {setEditProker} proker = {paginatedProker} handleDelete={handleDelete} />
            <Pagination prokerCount = {searchQuery.length > 0 ? searchedResult.length : value.proker.length} currentPage = {currentPage} pageSize = {pageSize} onPageChange = {onPageChange} />
        </>
    )
}
