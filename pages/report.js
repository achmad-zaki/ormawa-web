import Sidebar from '@/components/Sidebar';
import ReportLayout from '@/components/ReportLayout';
import AppContext from '@/context/appContext';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Report({ proker }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session == null) {
      localStorage.setItem('nextRoute', router.asPath);
      router.replace('/login');
    }
  }, [session, router]);

  const [myProker, setMyProker] = useState(proker);

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
            <ReportLayout />
          </AppContext.Provider>
        </Sidebar>
      )}
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  const response = await fetch('http://localhost:3000/api/proker');
  const proker = await response.json();

  return {
    props: {
      proker: proker,
    },
  };
}
