import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { FiBox, FiMenu } from 'react-icons/fi'
import { FiAirplay } from 'react-icons/fi'
import { FiX } from 'react-icons/fi'
import { FiPhone } from 'react-icons/fi'
import Logo from '../public/logo/logo-company.svg'
import { useRouter } from 'next/router'

const Sidebar = ({children}) => {
  const [show, setShow] = useState(false)
  const router = useRouter()
  return (
  <>
    <div className="h-screen flex">
      <aside className={`relative border h-screen ${show ? 'w-20' : 'w-1/2 md:w-1/4'} bg-[#FFFFFF] transition-all duration-200 z-40`}>
        <button className='absolute z-50 -right-10 top-4 bg-[#5932EA] p-2 rounded-lg' onClick={() => setShow(!show)}>
          {show === false ?
            <FiMenu className='text-lg text-white'/>
            :
            <FiX className='text-lg text-white'/>
          }
        </button>
        <div className="flex flex-col p-4 gap-3">
          <Link href='/' className={`mb-10 flex items-center gap-3 ${show ? 'justify-center' : ''}`}>
            <Image src={Logo} width={40} height={40} alt='logo' />
            <h3 className={`${show ? 'hidden' : ''} font-bold text-lg`}>Sidebars</h3>
          </Link>
          <ul className='flex flex-col gap-5'>
            <li className='flex items-center'>
              <Link href={'/'} className={`text-md w-full flex items-center ${show ? 'justify-center' : ''} gap-3 px-4 py-3 ${router.pathname === '/' ? 'active' : ''}`}>
                  <span className="logo"><FiAirplay className='text-lg'/></span>
                  <span className={`${show ? 'hidden' : ''}`}>Dashboard</span>
              </Link>
            </li>
            <li className='flex items-center'>
              <Link href={'/proker'} className={`text-md w-full flex items-center ${show ? 'justify-center' : ''} gap-3 px-4 py-3 hover:bg-[#5932EA] hover:text-white rounded-lg ${router.pathname === '/proker' ? 'active' : ''}`}>
                  <span className="logo"><FiBox className='text-lg'/></span>
                  <span className={`${show ? 'hidden' : ''}`}>Program Kerja</span>
              </Link>
            </li>
            <li className='flex items-center'>
              <Link href={'/'} className={`transition duration-300 text-md w-full flex items-center ${show ? 'justify-center' : ''} gap-3 px-4 py-3 hover:bg-[#5932EA] hover:text-white text-black rounded-lg`}>
                  <span className="logo"><FiPhone className='text-lg'/></span>
                  <span className={`${show ? 'hidden' : ''}`}>Contact</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="w-full h-screen bg-[#F5F6FA] pt-20 px-5 overflow-y-auto">
        {children}
      </div>
    </div>
  </>
  )
}

export default Sidebar