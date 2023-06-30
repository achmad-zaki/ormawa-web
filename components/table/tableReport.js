import React, { useContext, useEffect, useRef } from "react";
import AppContext from '@/context/appContext';
import { useSelector, useDispatch } from "react-redux";
import { BiEdit, BiTrashAlt, BiDownload } from "react-icons/bi"
import { toggleChangeAction, updateAction } from '@/redux/reducer';







export default function TableReport({ user, setEditProker, proker, handleDelete }) {

  const value = useContext(AppContext)
  const data = value.data


  const prokerGenerator = () => {

    return (
      <>
        {
          proker.map((proker, idx) => {
            // console.log(proker);
            return <ProkerList className="px-3 py-4" user={user} setEditProker={setEditProker} key={proker.id} proker={proker} idx={idx} handleDelete={handleDelete} />
          })
        }
      </>
    )
  }
  return (
    <>
      <div className="grid grid-cols-1">
        <div className="relative overflow-x-auto border border-stone-400">
          <table className="w-full text-sm table-auto border-collapse border text-black dark:text-gray-400">
            <thead className="text-xs text-black uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="border border-black px-4 py-3">
                  <span>No.</span>
                </th>
                <th className="border border-black px-3 py-4">
                  <span className="">UKM</span>
                </th>
                <th scope="col" className="border border-black px-3 py-4">
                  <span>Rencana Strategis</span>
                </th>
                <th className="border border-black px-3 py-4">
                  <span className="">Waktu/Timeline</span>
                </th>
                <th className="border border-black px-3 py-4">
                  <span className="">Periode</span>
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
    </>
  )
}

function ProkerList({ user, setEditProker, proker, idx }) {
  console.log(user)

  const dispatch = useDispatch()
  // console.log(user)
  const visible = useSelector((state) => state.app.client.toggleForm)
  const fetchProker = async (prokerId) => {

    const response = await fetch("http://localhost:3000/api/proker/" + prokerId);
    const result = await response.json()
    setEditProker(result)


  }

  function onUpdate(prokerId) {

    dispatch(toggleChangeAction())
    if (!visible) {
      fetchProker(prokerId)
      dispatch(updateAction(prokerId))

    }

  }

  const indikatorRef = useRef(null);

  useEffect(() => {
    if (proker.indikator) {
      const htmlElement = document.createElement("div");
      htmlElement.innerHTML = proker.indikator;
      indikatorRef.current.innerHTML = "";
      indikatorRef.current.appendChild(htmlElement);
    }
  }, [proker.indikator]);

  const catatanRef = useRef(null);

  useEffect(() => {
    if (proker.catatan) {
      const htmlElement = document.createElement("div");
      htmlElement.innerHTML = proker.catatan;
      catatanRef.current.innerHTML = "";
      catatanRef.current.appendChild(htmlElement);
    }
  }, [proker.catatan]);

  const url = proker.file;
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


  const dates = proker.tgl_pelaksanaan;
  const data = new Date(dates);
  let dd = String(data.getDate()).padStart(2, '0');
  let mm = String(data.getMonth() + 1).padStart(2, '0');
  let yyyy = data.getFullYear();
  let date = dd + '-' + mm + '-' + yyyy;


  const switchUser = () => {
    const userRole = user;
    switch (userRole) {
      case "bem":
        return (
          <td className="px-2 py-2 border border-stone-700">
            <div className='flex justify-evenly gap-2'>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "olahraga":
        return (
          <td className="px-2 py-2 border border-stone-700">
            <div className='flex justify-evenly gap-2'>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "kloso":
        return (
          <td className="px-2 py-2 border border-stone-700">
            <div className='flex justify-evenly gap-2'>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "kamera":
        return (
          <td className="px-2 py-2 border border-stone-700">
            <div className='flex justify-evenly gap-2'>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "rpg":
        return (
          <td className="px-2 py-2 border border-stone-700">
            <div className='flex justify-evenly gap-2'>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "kamera":
        return (
          <td className="px-2 py-2 border border-stone-700">
            <div className='flex justify-evenly gap-2'>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "rohisti":
        return (
          <td className="px-2 py-2 border border-stone-700">
            <div className='flex justify-evenly gap-2'>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "meds":
        return (
          <td className="px-2 py-2 border border-stone-700">
            <div className='flex justify-evenly gap-2'>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "kemahasiswaan":
        return (
          <td className="px-2 py-2 border border-stone-700">
            <div className='flex justify-evenly gap-2'>
              <button className="cursor" onClick={() => onUpdate(proker.id)}><BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit></button>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "waket":
        return (
          <td className="px-2 py-2 border border-stone-700">
            <div className='flex justify-evenly gap-2'>
              <button className="cursor" onClick={() => onUpdate(proker.id)}><BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit></button>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      default:
        return (
          <></>
        )

    }
  }

  return (
    <>
      <tr className="bg-gray-50 ">
        <td className="px-2 py-2 border border-stone-700 text-center">
          <span>{idx + 1} </span>
        </td>
        <td className="px-2 py-2 border border-stone-700 text-center">
          <span>{proker.author || ""}</span>
        </td>
        <td className="px-2 py-2 border border-stone-700 text-left">
          <span className="text-center font-semibold">{proker.nama_proker || "Unknown"}</span>
        </td>
        <td className="px-2 py-2 border border-stone-700 text-center">
          <span>{date || "Unknown"}</span>
        </td>
        <td className="px-2 py-2 border border-stone-700 text-center">
          <span>{proker.periode + "/" + proker.tahun || ""}</span>
        </td>
        <td className="px-2 py-2 border border-stone-700 text-justify list-decimal" ref={indikatorRef}>
          {/* <span>{proker.indikator || "Unknown"}</span> */}
        </td>
        <td className="px-2 py-2 border border-stone-700 text-justify">
          <span>{proker.target || "Unknown"}</span>
        </td>
        <td className="px-2 py-2 border border-stone-700 text-center">
          <span>{parseToRupiah(proker.total_anggaran) || "Unknown"}</span>
        </td>
        <td className="px-1 py-2 border border-stone-700 text-justify" ref={catatanRef}>
          {/* <span>{proker.catatan || ""}</span> */}
        </td>
        <td className="px-2 py-2 border border-stone-700">
          <button className="cursor"><span className={`${proker.status == "Aprove" ? 'bg-green-500' : proker.status == "Cancel" ? 'bg-rose-500' : 'bg-yellow-500'} text-white px-2 py-2 rounded`}>{proker.status || "Unknown"}</span></button>
        </td>
        {/* <td className="px-2 py-2 border border-stone-700">
                        <div className='flex justify-evenly gap-2'>
                        <button className="cursor" onClick={() => onUpdate(proker.id)}><BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit></button>
                        <button onClick={() => handleDelete(proker.id)} className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
                        </div>
                    </td> */}
        {switchUser()}
      </tr>
    </>
  )
}
