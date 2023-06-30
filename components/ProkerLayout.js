import React, { useContext, useEffect, useState } from 'react'
import { BiUserPlus } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import AppContext from '@/context/appContext';
import { toggleChangeAction, updateAction } from '@/redux/reducer';
import { Paginate } from '@/helpers/paginate';
import { Search } from '@/helpers/search'
import Header from './Header'
import Pagination from './Pagination'
import Tables from './table/table'
import Form from './forms/form'
import Title from './Title'
// import Alert from './Alert'
// import Bug from './forms/Bug'


export default function ProkerLayout() {

  const visible = useSelector((state) => state.app.client.toggleForm)
  const value = useContext(AppContext)
  const dispatch = useDispatch()
  const data = value.data
  const dataSource = value.proker;
  // const tahun = value.proker.map((item) => {return item.tahun})
  const tahunPeriode = ["2022/2023", "2023/2024", "2024/2025", "2025/2026"]
  const tahun = tahunPeriode.map((item) => { return item })
  // console.log(tahun)
  const [user, setUser] = useState({
    role: ""
  })

  const [dataFilter, setDataFilter] = useState([]);
  const [filteredProker, setFilteredProker] = useState([])
  const [selectedPeriode, setSelectedPeriode] = useState("Pilih Periode");
  const [selectedTahun, setSelectedTahun] = useState("Pilih Tahun");
  const paginateData = dataFilter

  console.log(dataFilter)
  const [editProker, setEditProker] = useState({
    id: "",
    nama_proker: "",
    tgl_pelaksanaan: new Date(""),
    indikator: "",
    target: "",
    total_anggaran: 0,
    catatan: "",
    periode: "",
    tahun: 0,
    status: "",
    file: "",
    role: "",
    author: ""
  })
  // console.log(editProker)

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const onPageChange = (page) => {
    setCurrentPage(page);
  }

  let paginatedProker;
  let searchedResult;

  if (searchQuery.length > 0) {
    searchedResult = Search(paginateData, searchQuery);
    paginatedProker = Paginate(searchedResult, currentPage, pageSize);
  } else {
    paginatedProker = Paginate(paginateData, currentPage, pageSize);
  }

  useEffect(() => {
    const fetchUser = async (userId) => {
      const response = await fetch(`http://localhost:3000/api/user/${userId}`);
      const result = await response.json();
      if (result) {
        const roleUser = result.data.role;
        setUser(roleUser);
      }
    };

    fetchUser(data);
  }, []);

  const handleEditChange = ({ target: { name, value } }) => {
    setEditProker({ ...editProker, [name]: value })
  }

  const handleDelete = async (prokerId) => {

    const reqOption = {
      method: "DELETE"
    }

    const response = await fetch("http://localhost:3000/api/proker/" + prokerId, reqOption);
    const result = await response.json();

    if (result) {

      const prevProker = value.proker;
      const newProker = prevProker.filter(proker => {
        return proker.id != prokerId;
      })
      value.setMyProker(newProker);
      window.location.reload();

    }
  }

  const handler = () => {
    dispatch(updateAction(null))
    dispatch(toggleChangeAction())

  }

  function parseToRupiah(numberString) {
    const number = parseFloat(numberString);
    if (isNaN(number)) {
      return "Invalid number";
    }
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(number);
  }




  const filterData = () => {
    if (user === "kemahasiswaan" || user === "waket") {
      setDataFilter(dataSource)
    } else {
      const filteredData = dataSource.filter((item) => item.author === user);
      setDataFilter(filteredData);
      setFilteredProker(filteredData);
    }
  };

  useEffect(() => {
    filterData();
  }, [user]);

  const filterByPeriode = () => {
    if (selectedPeriode === "Pilih Periode") {
      filterData();
    } else {
      const filteredData = filteredProker.filter((item) => item.author === user && item.periode.toLowerCase() === selectedPeriode.toLowerCase());
      setDataFilter([...filteredData]);
      setFilteredProker([...filteredData]);
      console.log(filteredData);
    }
  };

  useEffect(() => {
    filterByPeriode();
  }, [selectedPeriode]);

  const filterByTahun = () => {
    if (selectedTahun === "Pilih Tahun") {
      filterByPeriode();
    } else {
      const filteredData = filteredProker.filter((item) => item.tahun === selectedTahun);
      setDataFilter(filteredData);
    }
  };

  useEffect(() => {
    filterByTahun();
  }, [selectedTahun]);

  //   const searchedResult = Search(dataFilter, searchQuery);
  //   const paginatedProker = Paginate(searchedResult, currentPage, pageSize);



  const sum = dataFilter.reduce((acc, item) => acc + item.total_anggaran, 0);


  return (
    <>
      <Header />
      <Title title={'Program Kerja'} />
      <div className='flex justify-between py-5 mx-auto'>
        <div className="flex gap-3 ml-1">
          {user === "kemahasiswaan" || user === "waket" ?
            (<></>) : (
              <button onClick={handler} className='flex justify-between align-middle bg-cyan-500 text-white text-sm px-2 py-3 border rounded-md hover:bg-gray-50 hover:border-cyan-500 hover:text-black' >
                Tambah Proker <span className='px-1 text-sm'><BiUserPlus size={20}></BiUserPlus></span>
              </button>
            )
          }
          <select onChange={(e) => setSelectedPeriode(e.target.value)} name="periode" className="border w-5/6 px-2 py-1 focus:outline-none rounded-md">
            <option value="Pilih Periode">
              Pilih Periode
            </option>
            <option value="Ganjil">Ganjil</option>
            <option value="Genap">Genap</option>
          </select>
          <select onChange={(e) => setSelectedTahun(e.target.value)} name="tahun" className="border w-5/6 px-2 py-1 mr-3 focus:outline-none rounded-md">
            <option value="Pilih Tahun">
              Pilih Tahun
            </option>
            {
              tahun.map((item, idx) => {
                return <option key={idx} value={item}>{item}</option>
              })
            }
          </select>
        </div>
        <div className="mr-5">
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
      <div>
        {visible ? (
          <Form
            user={user}
            setEditProker={setEditProker}
            editProker={editProker}
            handleEditChange={handleEditChange}
          />
        ) : (
          <></>
        )}
      </div>
      <Tables
        editProker={editProker}
        data={data}
        user={user}
        setEditProker={setEditProker}
        proker={paginatedProker}
        handleDelete={handleDelete}
        dataFilter={paginatedProker}
      />
      <Pagination
        prokerCount={searchQuery.length > 0 ? searchedResult.length : paginateData.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
      <div className='mt-8 border my-2 py-2 px-2 bg-green-500 w-72 rounded-lg'>Total Anggaran: {parseToRupiah(sum)}</div>

    </>
  )
}
