import React, { useEffect, useState } from 'react';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Title from '@/components/Title';
import Sidebar from '@/components/Sidebar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import PieChart from '@/components/PieCharts';

export default function Home({proker}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [myUser, setMyUser] = useState([]);


  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:3000/api/user/all");
      const result = await response.json();
      if (result) {
        const roleUser = result.data;
        console.log(roleUser)
        setMyUser(roleUser);
      }
    };

    fetchUser();
  }, []);

  console.log(myUser)

  const [myProker, setMyProker] = useState(proker);

  const olahraga = myProker.filter((item) => item.author === "olahraga" && item.status === "Aprove");
  const kloso = myProker.filter((item) => item.author === "kloso" && item.status === "Aprove");
  const bem = myProker.filter((item) => item.author === "bem" && item.status === "Aprove");
  const sms = myProker.filter((item) => item.author === "sms" && item.status === "Aprove");
  const rohisti = myProker.filter((item) => item.author === "rohisti" && item.status === "Aprove");
  const meds = myProker.filter((item) => item.author === "meds" && item.status === "Aprove");
  const rpg = myProker.filter((item) => item.author === "rpg" && item.status === "Aprove");
  const kamera = myProker.filter((item) => item.author === "kamera" && item.status === "Aprove");
  const aprovedData = myProker.filter((item) => item.status === "Aprove");
  const onProcessData = myProker.filter((item) => item.status === "");
  const canceledData = myProker.filter((item) => item.status === "Cancel");

  
  const dataku = [
    { label: "Kloso", value: kloso.length, color: 'bg-greenly', sector: 'green' },
    { label: "Olahraga", value: olahraga.length, color: 'bg-bluely', sector: 'blue' },
    { label: "SMS", value: sms.length, color: 'bg-redly', sector: 'red' },
    { label: "BEM", value: bem.length, color: 'bg-navyly', sector: 'navy' },
    { label: "Rohisti", value: rohisti.length, color: 'bg-limely', sector: 'lime' },
    { label: "MEDS", value: meds.length, color: 'bg-cyanly', sector: 'cyan' },
    { label: "RPG", value: rpg.length, color: 'bg-orangely', sector: 'orange' },
    { label: "Kamera", value: kamera.length, color: 'bg-indigoly', sector: 'indigo' },
  ];


  useEffect(() => {
    if (session == null) {
      localStorage.setItem('nextRoute', router.asPath);
      if (router.asPath !== '/login') {
        router.replace('/login');
      }
    }
  }, [session, router]);

  return (
    <>
      {session && (
        <Sidebar>
          <Header />
          <Title title={'dashboard'} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card title={'Proker Disetujui'} count={aprovedData.length} />
            <Card title={'Proker Proses'} count={onProcessData.length} />
            <Card title={'Proker Batal'} count={canceledData.length} />
          </div>
          <div className='flex justify-center mt-10'>
            <PieChart myProker={myProker} data={dataku} user={myUser} width={200} height={200} />
          </div>

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


