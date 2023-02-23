import React from 'react'
import { FiBox } from 'react-icons/fi'
 
const Card = ({title, count}) => {
  return (
    <div className='bg-white rounded-md px-8 py-10 md:py-8 drop-shadow-xl'>
        <div className="flex items-center gap-3">
            <div className="bg-blue-300 p-3 rounded-md">
                <FiBox className='text-5xl text-white'/>
            </div>
            <div className="title">
                <h3 className='font-normal capitalize text-lg text-slate-400'>{title}</h3>
                <p className='font-bold text-sm'>{count}</p>
            </div>
        </div>
    </div>
  )
}

export default Card