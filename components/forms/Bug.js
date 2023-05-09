import React from 'react'
import { BiX } from 'react-icons/bi'

export default function Bug({message}) {
    return (
        <div className='success container mx-auto'>
            <div className='flex justify-center mx-auto border border-yellow-200 bg-yellow-400 w-3/6 text-gray-900 text-md my-4 py-2 text-center bg-opacity-5'>
                {message} <BiX size={25} color={"rgb(246,113,113)"}></BiX>
            </div>
        </div>
    )
}