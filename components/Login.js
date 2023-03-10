import React from 'react'
import Image from 'next/image'
import rectangle1 from '@/public/rectangle-1.svg'
import rectangle2 from '@/public/rectangle-2.svg'
import rectangle3 from '@/public/rectangle-3.svg'

const Login = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
        <div className="relative basis-full h-screen bg-gradient-to-t from-[#6026AB] to-[#CC8644] hidden md:block">
            <div className="h-screen flex items-center">
                <h1 className='text-5xl text-white font-bold text-center'>WEBSITE ORGANISASI MAHASISWA</h1>
            </div>
            <Image
                src={rectangle1}
                className='absolute top-0 left-0'
            />
            <Image
                src={rectangle2}
                className='absolute bottom-0 left-0'
            />
            <Image
                src={rectangle3}
                className='absolute top-[50%] right-0'
            />
        </div>
        <div className="basis-full h-screen flex flex-col items-start justify-center">
            <div className='w-11/12 mx-auto bg-white p-10 rounded-lg drop-shadow-xl'>
                <div>
                    <h1 className='text-4xl font-bold'>Login</h1>
                    <p className='text-sm mt-3 max-w-sm text-slate-500'>Selamat Datang 👋 Tolong login terlebih dahulu</p>
                </div>
                <form action="/" className='mt-10'>
                    <div>
                        <label htmlFor="username" className='block mb-2 text-gray-600'>Username</label>
                        <input type='text' className='w-full rounded-md border border-gray-400'/>
                    </div>
                    <div className='mt-5'>
                        <label htmlFor="password" className='block mb-2 text-gray-600'>Password</label>
                        <input type='password' className='w-full rounded-md border border-gray-400'/>
                    </div>
                    <div className="mt-5">
                        <input type='checkbox'/>
                        <label htmlFor="" className='ml-3 text-gray-600 rounded text-xs'>Ingat Saya</label>
                    </div>
                    <button type='submit' className='btn-primary w-full mt-5'>Login</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login