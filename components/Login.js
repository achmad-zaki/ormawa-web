import React from 'react'
import B from '@/public/b.JPG'
import Image from 'next/image'
import C from '@/public/c.JPG'
// import D from '@/public/rectangle-3.svg'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BiHide } from 'react-icons/bi'
import Carousel from './Carousel'
import Swal from 'sweetalert2'
// import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const images = [
    B,
    C
  ];

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username: e.target.username.value,
      password: e.target.password.value,
    });
    console.log(result);
    if (result.ok) {
      router.replace('/');
      return;
    }
    Swal.fire('Username Password Salah');
  };
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className="relative basis-full h-screen bg-gradient-to-t from-[#6026AB] to-[#CC8644] hidden md:block">
        <Carousel className="absolute top-16 left-0" images={images} autoSlideInterval={5000} />
      </div>
      <div className="basis-full h-screen flex flex-col justify-center">
        <div className='w-11/12 flex flex-col justify-center mx-auto bg-white p-10 rounded-lg drop-shadow-xl'>
          <div>
            <h1 className='text-4xl font-bold'>Login</h1>
            <p className='text-sm mt-3 max-w-sm text-slate-500'>Selamat Datang 👋 Tolong login terlebih dahulu</p>
          </div>
          <form onSubmit={onSubmit} className='flex flex-col justify-center mt-10'>
            <div className='w-full flex flex-col justify-center'>
              <label htmlFor="username" className='block mb-2 text-gray-600'>Username</label>
              <input type='text' id='username' name='username' className='w-96 rounded-md border border-gray-400' />
            </div>
            <div className='w-auto mt-5'>
              <label htmlFor="password" className='block mb-2 text-gray-600'>Password</label>
              <div className='flex justify-start'>
                <input type={showPassword ? 'text' : 'password'} id='password' name='password' className='w-96 rounded-md border border-gray-400' />
                <BiHide size={25} className='mt-2 mx-2 cursor-pointer' onClick={togglePasswordVisibility}>
                  {showPassword ? 'Hide Password' : 'Show Password'}
                </BiHide>
              </div>
            </div>
            <div className="mt-5">
              <input type='checkbox' />
              <label htmlFor="" className='ml-3 text-gray-600 rounded text-xs'>Ingat Saya</label>
            </div>
            <button type='submit' className='btn-primary w-full mt-5'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

