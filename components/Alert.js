import React, {useState} from 'react'
import { FiX } from 'react-icons/fi'


export default function Alert(style, message) {

    const [show, setShow] = useState(false)

    const handleAlert = (e) => {
        e.preventDefault;
        setShow(false)
    }

    return (
        <>
        { open === true ?
        <div  role="alert">
            <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                {message}
            </div>
            <div className="flex justify-between border border-t-0 border-green-400 rounded-b bg-white px-4 py-3 text-green-700">
                <p>Sukses input data.</p>
                <button onClick={handleAlert} className="bg-transparent text-2xl text-black font-semibold leading-none right-0 top-0 mr-3 outline-none focus:outline-none">
                    <span className='text-black'><FiX /></span>
                </button>
            </div>
        </div> : <></>
        }
        </>
    )
}
