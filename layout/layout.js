import React from 'react'
import Image from 'next/image'
import rectangle1 from '@/public/rectangle-1.svg'
import rectangle2 from '@/public/rectangle-2.svg'
import rectangle3 from '@/public/rectangle-3.svg'

export default function Layout({ children }) {
  return (
    <div className='flex h-screen bg-blue-500'>
        <div className='m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2'>
            <div>

            </div>
            <div className='right flex flex-col justify-evenly'>
                <div className='text-center py-10'>
                    {children}
                </div>
            </div>
        </div>


    </div>  
    )
}
