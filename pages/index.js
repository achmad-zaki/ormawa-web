import React from 'react'
import Card from '@/components/Card'
import Header from '@/components/Header'
import Title from '@/components/Title'
import Sidebar from '@/components/Sidebar'
import { useEffect } from 'react';
import axios from 'axios';
import { ApolloClient, gql, InMemoryCache,  } from '@apollo/client';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
// import dashboard from './dashboard'
import Login from '@/components/Login'




export default function Home() {

  const { data: session } = useSession();

  useEffect(() => {
    const {pathname} = Router
      if (session == null){
        Router.replace('/login');
        return;
      } 

  }, [session]);
  return (
    <>
    {session && (
                    <Sidebar>
                    <Header/>
                    <Title
                    title={'dashboard'}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card
                        title={'tugas selesai'}
                        count={'230'}
                    />
                    <Card
                        title={'tugas belum'}
                        count={'100'}
                    />
                    <Card
                        title={'tugas proses'}
                        count={'120'}
                    />
                    </div>
                </Sidebar>
            )}
    </>
  )
}
