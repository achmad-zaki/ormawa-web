import React from 'react'
import Image from 'next/image'
import Avatar from '../public/avatar.png'

const Header = () => {
  return (
    <div className='fixed top-0 left-0 bg-white w-full h-max py-3.5 px-5 z-30 drop-shadow-xl'>
      <div className="flex justify-end">
        <button>
          <Image
            src={Avatar}
            width={35}
            height={35}
            alt='avatar'
          />
        </button>
      </div>
    </div>
  )
}

export default Header