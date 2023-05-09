import Login from '@/components/Login'
import React from 'react'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
// import Layout from '@/layout/layout';



export default function login() {
  // const { data: session } = useSession();

  // useEffect(() => {
  //   const {pathname} = Router
  //     if (session !== null){
  //       Router.replace('/');
  //       return;
  //     } 

  // }, [session]);
  return (
    // <Layout>
      <div>
        <Login/>
      </div>
    // </Layout> 
  )
}
