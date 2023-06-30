import React, { useContext } from 'react'
// import { useReducer } from 'react';
// import { BiPlus } from "react-icons/bi"
import { toggleChangeAction, updateAction } from '@/redux/reducer';
import { useDispatch, useSelector } from 'react-redux'
import AppContext from '@/context/appContext';
import { Textarea } from 'flowbite-react';
import TextEditor from '../TextEditor';





export default function UpdateProkerForm({ formId, user, editProker, setEditProker, handleEditChange }) {

  // const [showModal, setShowModal] = React.useState(false);
  const visible = useSelector((state) => state.app.client.toggleForm)
  const dispatch = useDispatch()
  const value = useContext(AppContext)
  const tahunPeriode = ["1993/1994", "1994/1995", "1995/1996", "1996/1997", "1997/1998", "1998/1999", "1999/2000", "2000/2001", "2001/2002", "2002/2003", "2003/2004", "2004/2005", "2005/2006", "2006/2007", "2007/2008", "2008/2009", "2009/2010", "2010/2011", "2011/2012", "2012/2013", "2013/2014", "2014/2015", "2015/2016", "2016/2017", "2017/2018", "2018/2019", "2019/2020", "2020/2021", "2021/2022", "2022/2023", "2023/2024", "2024/2025", "2025/2026", "2026/2027", "2027/2028", "2028/2029", "2029/2030", "2030/2031", "2031/2032", "2032/2033", "2033/2034", "2034/2035", "2035/2036", "2036/2037", "2037/2038", "2038/2039", "2039/2040", "2040/2041", "2041/2042", "2042/2043", "2043/2044", "2044/2045", "2045/2046", "2046/2047", "2047/2048", "2048/2049", "2049/2050", "2050/2051"]
  const tahun = tahunPeriode.map((item) => { return item })
  // console.log(formId)

  // const [change, setChange] = useState({})

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const reqOption = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editProker)
    }
    const response = await fetch("http://localhost:3000/api/proker/" + formId, reqOption);
    // console.log(response)
    const result = await response.json();
    // console.log(result)



    if (result) {
      var prevProker = value.proker.filter(proker => {
        return proker.id !== formId
      });
      // console.log(prevProker)
      prevProker.push(result);
      value.setMyProker(prevProker);


      setEditProker(prevProker);
      dispatch(toggleChangeAction());
      window.location.reload();

    }
  }
  const handler = () => {
    dispatch(toggleChangeAction())
  }

  // const onChangeValue = (e) => {
  //     const name = e.target.name;
  //     const value = e.target.value;
  //     setChange({
  //         ...change,
  //         [name]: value
  //     })
  // }



  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Edit Data
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
              <form className="w-auto overflow-auto h-72 my-4 text-slate-500 text-lg gap-4 leading-relaxed" onSubmit={handleEditSubmit}>
                <div className="mx-4 overflow-auto">
                  {user === "kemahasiswaan" || user === "waket" ?
                    <></> :
                    <>
                      <div className="mb-4 input-type">
                        <label>Nama Proker</label>
                        <input type="text" value={editProker.nama_proker} onChange={handleEditChange} name="nama_proker" className="border w-5/6 px-5 py-3 focus:outline-none rounded-md" placeholder="Nama Proker" />
                      </div>
                      <div className="mb-4 input-type">
                        <label>Tanggal Pelaksanaan</label>
                        <input type="date" value={editProker.tgl_pelaksanaan} onChange={handleEditChange} name="tgl_pelaksanaan" className="border w-5/6 px-5 py-3 focus:outline-none rounded-md" placeholder="date" />
                      </div>
                      <div className="mb-4 input-type">
                        <label>Indikator Capaian</label>
                        <TextEditor value={editProker.indikator} onChange={handleEditChange} name="indikator" className="border w-5/6 px-5 py-3 focus:outline-none rounded-md" placeholder="Indikator" />
                      </div>
                      <div className="mb-4 input-type">
                        <label>Target</label>
                        <br />
                        <input type="text" value={editProker.target} onChange={handleEditChange} name="target" className="border w-5/6 px-5 py-3 focus:outline-none rounded-md" placeholder="Target" />
                      </div>
                      <div className="mb-4 input-type">
                        <label>Total Anggaran</label>
                        <input type="number" value={editProker.total_anggaran} onChange={handleEditChange} name="total_anggaran" className="border w-5/6 px-5 py-3 focus:outline-none rounded-md" placeholder="Anggaran" />
                      </div>
                      <div className='grid sm:grid-cols-2'>
                        <div className="mb-4 input-type">
                          <label>Periode</label>
                          <select value={editProker.periode} onChange={handleEditChange} name="periode" className="border w-5/6 px-5 py-3 focus:outline-none rounded-md">
                            <option value="" disabled selected>
                              Select an option
                            </option>
                            <option value="Ganjil">Ganjil</option>
                            <option value="Genap">Genap</option>
                          </select>
                        </div>
                        <div className="mb-4 input-type">
                          <label>Tahun</label>
                          <select onChange={handleEditChange} name="tahun" value={editProker.tahun} className="border w-5/6 px-5 py-3 focus:outline-none rounded-md">
                            <option value="Pilih Periode">
                              Pilih Tahun
                            </option>
                            {
                              tahun.map((item, idx) => {
                                return <option key={idx} value={item}>{item}</option>
                              })
                            }
                          </select>
                        </div>
                      </div>
                      <div className="mb-4 input-type">
                    <label>Link Proposal</label>
                    <br />
                    <input
                      type="text"
                      onChange={handleEditChange}
                      name="file"
                      value={editProker.file}
                      className="border w-5/6 px-5 py-3 focus:outline-none rounded-md"
                      placeholder="Link"
                    />
                  </div>
                    </>

                  }
                  <div className="mb-4 input-type">
                    <label>Catatan</label>
                    <TextEditor value={editProker.catatan} onChange={handleEditChange} name="catatan" className="border w-5/6 px-5 py-3 focus:outline-none rounded-md" placeholder="Catatan" />
                  </div>
                  <div className="mb-6 input-type">
                    <label>Ormawa</label>
                    <br />
                    <input disabled type="text" value={user} onChange={handleEditChange} name="author" className="border w-5/6 px-5 py-3 focus:outline-none rounded-md" placeholder="Author" />
                  </div>
                  <div className="flex gap-10 items-center">
                    {user === "kemahasiswaan" || user === "waket" ?
                      <>
                        <div className="form-check">
                          <input type="radio" onChange={handleEditChange} name="status" value="Aprove" id="radioDefault1" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 check:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                          <label htmlFor="radioDefault1" className="inline-block text-gray-800">
                            Aprove
                          </label>
                        </div>
                        <div className="form-check">
                          <input type="radio" onChange={handleEditChange} name="status" value="Revisi" id="radioDefault2" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 check:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                          <label htmlFor="radioDefault3" className="inline-block text-gray-800">
                            Revisi
                          </label>
                        </div>
                      </> : <></>
                    }
                    {user === "kemahasiswaan" || user === "waket" ?
                      <></>
                      :
                      <div className="form-check">
                        <input type="radio" onChange={handleEditChange} name="status" value="Cancel" id="radioDefault2" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 check:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer addCancel" />
                        <label htmlFor="radioDefault2" className="inline-block text-gray-800">
                          Cancel
                        </label>
                      </div>
                    }
                  </div>
                </div>
                <div className="flex items-center justify-end p-5 mt-3 border-t border-solid border-slate-200 rounded-b">
                  <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={handler} type="button">
                    Close
                  </button>
                  <button className="bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 addConfirm" type="submit">
                    Save Edit
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
