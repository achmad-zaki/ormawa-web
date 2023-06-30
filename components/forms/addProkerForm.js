import React from 'react'
import { useState } from 'react';
import { toggleChangeAction } from '@/redux/reducer';
import { useDispatch, useSelector } from 'react-redux'
import { useContext } from 'react';
import AppContext from '@/context/appContext';
import { Textarea } from 'flowbite-react';
import TextEditor from '../TextEditor';


export default function AddProkerForm({ user }) {

  const visible = useSelector((state) => state.app.client.toggleForm)
  const dispatch = useDispatch()
  const value = useContext(AppContext)
  const tahunPeriode = ["1993/1994", "1994/1995", "1995/1996", "1996/1997", "1997/1998", "1998/1999", "1999/2000", "2000/2001", "2001/2002", "2002/2003", "2003/2004", "2004/2005", "2005/2006", "2006/2007", "2007/2008", "2008/2009", "2009/2010", "2010/2011", "2011/2012", "2012/2013", "2013/2014", "2014/2015", "2015/2016", "2016/2017", "2017/2018", "2018/2019", "2019/2020", "2020/2021", "2021/2022", "2022/2023", "2023/2024", "2024/2025", "2025/2026", "2026/2027", "2027/2028", "2028/2029", "2029/2030", "2030/2031", "2031/2032", "2032/2033", "2033/2034", "2034/2035", "2035/2036", "2036/2037", "2037/2038", "2038/2039", "2039/2040", "2040/2041", "2041/2042", "2042/2043", "2043/2044", "2044/2045", "2045/2046", "2046/2047", "2047/2048", "2048/2049", "2049/2050", "2050/2051"]
  const tahun = tahunPeriode.map((item) => { return item })


  const [saveProker, setSaveProker] = useState({
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
    role: user,
    author: user
  })


  const handleSaveChange = ({ target: { name, value } }) => {
    setSaveProker({ ...saveProker, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reqOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saveProker),
      };
      const response = await fetch('http://localhost:3000/api/proker/', reqOption);
      const result = await response.json();
      console.log(result)



      if (result) {
        const prevProker = value.proker.concat(result);

        value.setMyProker(prevProker);
        dispatch(toggleChangeAction());

        // Reload the page
        window.location.reload();
        setSaveProker({
          nama_proker: '',
          tgl_pelaksanaan: new Date(''),
          indikator: '',
          target: '',
          total_anggaran: 0,
          catatan: '',
          periode: '',
          tahun: 0,
          status: '',
          file: "",
          author: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handler = () => {
    dispatch(toggleChangeAction());
  };



  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Input Proker
              </h3>
              <button className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={handler}>
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto w-full h-full">
              <form className="w-full overflow-auto h-80 my-4 text-slate-500 text-lg gap-4 leading-relaxed" onSubmit={handleSubmit}>
                <div className="mx-4 overflow-auto">
                  <div className="mb-4 input-type">
                    <label>Nama Proker</label>
                    <input
                      type="text"
                      onChange={handleSaveChange}
                      name="nama_proker"
                      value={saveProker.nama_proker}
                      className="border w-5/6 px-5 py-3 focus:outline-none rounded-md"
                      placeholder="Nama Proker"
                    />
                  </div>
                  <div className="mb-4 input-type">
                    <label>Tanggal Pelaksanaan</label>
                    <input
                      type="date"
                      onChange={handleSaveChange}
                      name="tgl_pelaksanaan"
                      value={saveProker.tgl_pelaksanaan}
                      className="border w-5/6 px-5 py-3 focus:outline-none rounded-md"
                      placeholder="date"
                    />
                  </div>
                  <div className="mb-4 input-type">
                    <label>Indikator Capaian</label>
                    <TextEditor
                      onChange={handleSaveChange}
                      name="indikator"
                      value={saveProker.indikator}
                      className="border w-5/6 px-5 py-3 focus:outline-none rounded-md"
                      placeholder="Indikator"
                    />
                  </div>
                  <div className="mb-4 input-type">
                    <label>Target</label>
                    <br />
                    <input
                      type="text"
                      onChange={handleSaveChange}
                      name="target"
                      value={saveProker.target}
                      className="border w-5/6 px-5 py-3 focus:outline-none rounded-md"
                      placeholder="Target"
                    />
                  </div>
                  <div className="mb-4 input-type">
                    <label>Total Anggaran</label>
                    <input
                      type="number"
                      onChange={handleSaveChange}
                      name="total_anggaran"
                      value={saveProker.total_anggaran}
                      className="border w-5/6 px-5 py-3 focus:outline-none rounded-md"
                      placeholder="Anggaran"
                    />
                  </div>
                  <div className="mb-4 input-type">
                    <label>Catatan</label>
                    <TextEditor
                      onChange={handleSaveChange}
                      name="catatan"
                      value={saveProker.catatan}
                      className="border w-5/6 px-5 py-3 focus:outline-none rounded-md"
                      placeholder="Catatan"
                    />
                  </div>
                  <div className='grid sm:grid-cols-2'>
                    <div className="mb-4 input-type">
                      <label>Periode</label>
                      <select
                        onChange={handleSaveChange}
                        name="periode"
                        value={saveProker.periode}
                        className="border w-5/6 px-5 py-3 focus:outline-none rounded-md"
                      >
                        <option disabled value="">
                          Select an option
                        </option>
                        <option value="Ganjil">Ganjil</option>
                        <option value="Genap">Genap</option>
                      </select>
                    </div>
                    <div className="mb-4 input-type">
                      <label>Tahun</label>
                      <select onChange={handleSaveChange} name="tahun" value={saveProker.tahun} className="border w-5/6 px-5 py-3 focus:outline-none rounded-md">
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
                      onChange={handleSaveChange}
                      name="file"
                      value={saveProker.file}
                      className="border w-5/6 px-5 py-3 focus:outline-none rounded-md"
                      placeholder="Link"
                    />
                  </div>
                  <div className="mb-6 input-type">
                    <label>Ormawa</label>
                    <br />
                    <input
                      disabled
                      type="text"
                      value={user}
                      name="author"
                      className="border w-5/6 px-5 py-3 focus:outline-none rounded-md"
                      placeholder="Author"
                    />
                  </div>
                  {user === "kemahasiswaan" || user === "waket" ?
                    <div className="flex gap-10 items-center">
                      <div className="form-check">
                        <input
                          type="radio"
                          onChange={handleSaveChange}
                          name="status"
                          value="Aprove"
                          id="radioDefault1"
                          className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 check:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        />
                        <label
                          htmlFor="radioDefault1"
                          className="inline-block text-gray-800"
                        >
                          Approve
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          onChange={handleSaveChange}
                          name="status"
                          value="Revisi"
                          id="radioDefault2"
                          className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 check:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        />
                        <label
                          htmlFor="radioDefault2"
                          className="inline-block text-gray-800"
                        >
                          Revisi
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          onChange={handleSaveChange}
                          name="status"
                          value="Cancel"
                          id="radioDefault3"
                          className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 check:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer addCancel"
                        />
                        <label
                          htmlFor="radioDefault3"
                          className="inline-block text-gray-800"
                        >
                          Cancel
                        </label>
                      </div>
                    </div> : <></>
                  }
                </div>
                <div className="flex items-center justify-end p-5 mt-3 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={handler}
                    type="button"
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 addConfirm"
                    type="submit"
                  >
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
