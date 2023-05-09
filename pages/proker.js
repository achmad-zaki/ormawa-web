// import { Table } from 'flowbite-react'

import Sidebar from '@/components/Sidebar';
import ProkerLayout from '@/components/ProkerLayout';
import AppContext from '@/context/appContext';
import { useState } from 'react';

export default function Proker({proker}) {

  const [myProker, setMyProker] = useState(proker);

  return (
    <>

    <Sidebar>
      <AppContext.Provider value = {{
            proker : myProker,
            setMyProker : setMyProker 
      }}>
        <ProkerLayout />
      </AppContext.Provider>
    </Sidebar>

    </>
  )
}


export async function getServerSideProps({req, res}) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const response = await fetch("http://localhost:3000/api/proker");
  const proker = await response.json();

  return {
      props : {
          proker : proker
      }
  }
}



