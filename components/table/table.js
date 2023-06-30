import { useContext, useEffect, useState, useRef } from "react";
import AppContext from '@/context/appContext';
import { useSelector, useDispatch } from "react-redux";
import { BiEdit, BiTrashAlt, BiDownload } from "react-icons/bi"
import { toggleChangeAction, updateAction } from '@/redux/reducer';
import parse from "html-react-parser";







export default function Tables({ user, setEditProker, dataFilter, handleDelete }) {

  const value = useContext(AppContext)
  const data = value.data

  const [sortedDataFilter, setSortedDataFilter] = useState([]);

  const sortDataFilter = () => {
    const sortedData = [...dataFilter];
    sortedData.sort((a, b) => {
      const dateA = new Date(a.tgl_pelaksanaan);
      const dateB = new Date(b.tgl_pelaksanaan);
      return dateA - dateB;
    });
    setSortedDataFilter(sortedData);
  };

  useEffect(() => {
    if (dataFilter.length > 0) {
      sortDataFilter();
    }
  }, [dataFilter]);


  const prokerGenerator = () => {
    return (
      <>
        {sortedDataFilter.map((dataFilter, idx) => (
          <ProkerList
            className="px-3 py-4"
            dataFilter={dataFilter}
            user={user}
            setEditProker={setEditProker}
            key={idx}
            idx={idx}
            handleDelete={handleDelete}
          />
        ))}
      </>
    );
  }

  useEffect(() => {
    if (dataFilter.length > 0) {
      prokerGenerator();
    }
  }, [dataFilter]);

  return (
    <>
      <div className="grid grid-cols-1">
        <div className="relative overflow-x-auto border border-stone-400">
          <table className="w-full text-sm table-auto border-collapse border text-black dark:text-gray-400">
            <thead className="text-xs text-black uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="border border-black px-1 py-1">
                  <span>No.</span>
                </th>
                <th className="border border-black px-1 py-1">
                  <span className="">UKM</span>
                </th>
                <th scope="col" className="border border-black px-2 py-2">
                  <span>Rencana Strategis</span>
                </th>
                <th className="border border-black px-2 py-2">
                  <span className="">Waktu/Timeline</span>
                </th>
                <th className="border border-black px-2 py-2">
                  <span className="">Periode</span>
                </th>
                <th className="border border-black px-3 py-4">
                  <span className="">Indikator Capaian</span>
                </th>
                <th className="border border-black px-3 py-4">
                  <span className="">Target</span>
                </th>
                <th className="border border-black px-2 py-2">
                  <span className="">Anggaran</span>
                </th>
                <th className="border border-black px-3 py-4">
                  <span className="">Catatan</span>
                </th>
                <th className="border border-black px-3 py-4">
                  <span className="">Status</span>
                </th>
                <th className="border border-black px-2 py-2">
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

function ProkerList({ user, dataFilter, setEditProker, idx, handleDelete }) {

  const dispatch = useDispatch()
  // console.log(user)
  const visible = useSelector((state) => state.app.client.toggleForm)
  const fetchProker = async (prokerId) => {

    const response = await fetch("http://localhost:3000/api/proker/" + prokerId);
    const result = await response.json()
    setEditProker(result)


  }

  // const [indikator, setIndikator] = useState("");

  // useEffect(() => {
  //   if (dataFilter.indikator) {
  //     setIndikator(dataFilter.indikator);
  //   }
  // }, [dataFilter.indikator]);

  const indikatorRef = useRef(null);

  useEffect(() => {
    if (dataFilter.indikator) {
      const htmlElement = document.createElement("div");
      htmlElement.innerHTML = dataFilter.indikator;
      indikatorRef.current.innerHTML = "";
      indikatorRef.current.appendChild(htmlElement);
    }
  }, [dataFilter.indikator]);

  const catatanRef = useRef(null);

  useEffect(() => {
    if (dataFilter.catatan) {
      const htmlElement = document.createElement("div");
      htmlElement.innerHTML = dataFilter.catatan;
      catatanRef.current.innerHTML = "";
      catatanRef.current.appendChild(htmlElement);
    }
  }, [dataFilter.catatan]);

  function onUpdate(prokerId) {

    dispatch(toggleChangeAction())
    if (!visible) {
      fetchProker(prokerId)
      dispatch(updateAction(prokerId))

    }

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

  const url = dataFilter.file;

  const dates = dataFilter.tgl_pelaksanaan;
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
          <td className="px-1 py-1 border border-stone-700">
            <div className='flex justify-evenly gap-1'>
              <button className="cursor" onClick={() => onUpdate(dataFilter.id)}><BiEdit size={25} color={"rgb(219,219,2)"}></BiEdit></button>
              <button onClick={() => handleDelete(dataFilter.id)} className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "olahraga":
        return (
          <td className="px-1 py-1 border border-stone-700">
            <div className='flex justify-evenly gap-1'>
              <button className="cursor" onClick={() => onUpdate(dataFilter.id)}><BiEdit size={25} color={"rgb(219,219,2)"}></BiEdit></button>
              <button onClick={() => handleDelete(dataFilter.id)} className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "kloso":
        return (
          <td className="px-1 py-1 border border-stone-700">
            <div className='flex justify-evenly gap-1'>
              <button className="cursor" onClick={() => onUpdate(dataFilter.id)}><BiEdit size={25} color={"rgb(219,219,2)"}></BiEdit></button>
              <button onClick={() => handleDelete(dataFilter.id)} className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "sms":
        return (
          <td className="px-1 py-1 border border-stone-700">
            <div className='flex justify-evenly gap-1'>
              <button className="cursor" onClick={() => onUpdate(dataFilter.id)}><BiEdit size={25} color={"rgb(219,219,2)"}></BiEdit></button>
              <button onClick={() => handleDelete(dataFilter.id)} className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "kamera":
        return (
          <td className="px-1 py-1 border border-stone-700">
            <div className='flex justify-evenly gap-1'>
              <button className="cursor" onClick={() => onUpdate(dataFilter.id)}><BiEdit size={25} color={"rgb(219,219,2)"}></BiEdit></button>
              <button onClick={() => handleDelete(dataFilter.id)} className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "rpg":
        return (
          <td className="px-1 py-1 border border-stone-700">
            <div className='flex justify-evenly gap-1'>
              <button className="cursor" onClick={() => onUpdate(dataFilter.id)}><BiEdit size={25} color={"rgb(219,219,2)"}></BiEdit></button>
              <button onClick={() => handleDelete(dataFilter.id)} className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
            </div>
            <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
          </td>
        )
      case "kamera":
        return (
          <td className="px-1 py-1 border border-stone-700">
            <div className='flex justify-evenly gap-1'>
              <button className="cursor" onClick={() => onUpdate(dataFilter.id)}><BiEdit size={25} color={"rgb(219,219,2)"}></BiEdit></button>
              <button onClick={() => handleDelete(dataFilter.id)} className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "rohisti":
        return (
          <td className="px-1 py-1 border border-stone-700">
            <div className='flex justify-evenly gap-1'>
              <button className="cursor" onClick={() => onUpdate(dataFilter.id)}><BiEdit size={25} color={"rgb(219,219,2)"}></BiEdit></button>
              <button onClick={() => handleDelete(dataFilter.id)} className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "meds":
        return (
          <td className="px-1 py-1 border border-stone-700">
            <div className='flex justify-evenly gap-1'>
              <button className="cursor" onClick={() => onUpdate(dataFilter.id)}><BiEdit size={25} color={"rgb(219,219,2)"}></BiEdit></button>
              <button onClick={() => handleDelete(dataFilter.id)} className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "kemahasiswaan":
        return (
          <td className="px-1 py-1 border border-stone-700">
            <div className='flex justify-evenly gap-1'>
              <button className="cursor" onClick={() => onUpdate(dataFilter.id)}><BiEdit size={25} color={"rgb(219,219,2)"}></BiEdit></button>
              <a href={url} rel="noreferrer noopener" target="_blank" className="cursor" ><BiDownload className="text-green-500" size={25} ></BiDownload></a>
            </div>
          </td>
        )
      case "waket":
        return (
          <td className="px-1 py-1 border border-stone-700">
            <div className='flex justify-evenly gap-1'>
              <button className="cursor" onClick={() => onUpdate(dataFilter.id)}><BiEdit size={25} color={"rgb(219,219,2)"}></BiEdit></button>
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
    dataFilter &&
    <>
      <tr className="bg-gray-50">
        <td className="px-1 py-1 border border-stone-700 text-center">
          <span>{idx + 1} </span>
        </td>
        <td className="px-1 py-1 border border-stone-700 text-center">
          <span>{dataFilter.author || ""}</span>
        </td>
        <td className="px-1 py-1 border border-stone-700 text-left">
          <span className="text-center font-semibold">{dataFilter.nama_proker || "Unknown"}</span>
        </td>
        <td className="px-1 py-1 border border-stone-700 text-center">
          <span>{date || "Unknown"}</span>
        </td>
        <td className="px-1 py-1 border border-stone-700 text-center">
          <span>{dataFilter.periode + "/" + dataFilter.tahun || ""}</span>
        </td>
        <td className="px-2 py-2 border border-stone-700 list-decimal text-justify" ref={indikatorRef}>
          {/* <p className="list-decimal" dangerouslySetInnerHTML={{__html: indikator}}></p> */}
        </td>
        <td className="px-2 py-2 border border-stone-700 text-justify">
          <span>{dataFilter.target || "Unknown"}</span>
        </td>
        <td className="px-2 py-2 border border-stone-700 text-center">
          <span>{parseToRupiah(dataFilter.total_anggaran) || "Unknown"}</span>
        </td>
        <td className="px-1 py-2 border border-stone-700 text-justify" ref={catatanRef}>
          {/* <span>{dataFilter.catatan || ""}</span> */}
        </td>
        <td className="px-2 py-3 border border-stone-700 text-center">
          <div className="cursor w-full"><span className={`${dataFilter.status == "Aprove" ? 'bg-green-500' : dataFilter.status == "Cancel" ? 'bg-rose-500' : 'bg-yellow-500'} text-white px-2 py-2 rounded`}>{dataFilter.status || "Proccess"}</span></div>
        </td>
        {switchUser()}
      </tr>
    </>
  )
}
