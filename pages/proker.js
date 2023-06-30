import Sidebar from '@/components/Sidebar';
import ProkerLayout from '@/components/ProkerLayout';
import AppContext from '@/context/appContext';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Proker({ proker }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session == null) {
      console.log('Saving nextRoute to localStorage:', router.asPath);  
      localStorage.setItem('nextRoute', router.asPath);
      router.replace('/login');
    }
  }, [session, router]);

  const [myProker, setMyProker] = useState(proker);
  console.log(myProker)

  useEffect(() => {
    const nextRoute = localStorage.getItem('nextRoute');
    if (nextRoute && nextRoute !== router.asPath) {
      localStorage.removeItem('nextRoute');
      router.replace(nextRoute);
    }
  }, [router]);

  return (
    <>
      {session && (
        <Sidebar>
          <AppContext.Provider
            value={{
              proker: myProker,
              setMyProker: setMyProker,
              data: session.user.id,
            }}
          >
            <ProkerLayout />
          </AppContext.Provider>
        </Sidebar>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/proker');
  const proker = await response.json();

  return {
    props: {
      proker: proker,
    },
  };
}
