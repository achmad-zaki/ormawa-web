import Title from '@/components/Title'
// import { Table } from 'flowbite-react'
import React from 'react'
import { BiUserPlus } from "react-icons/bi";
import Form from '@/components/forms/form'
import Tables from '@/components/table/table'
import { useDispatch, useSelector } from 'react-redux'
import { toggleChangeAction } from '@/redux/reducer';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function Proker() {

  const visible = useSelector((state) => state.app.client.toggleForm)
  const dispatch = useDispatch()

  const handler = () => {
    dispatch(toggleChangeAction())
  }

  return (
    <>
    <Sidebar>
      <Header/>
      <Title title={'Program Kerja'}/>
      <div className='container mx-auto flex justify-between py-5 border-b'>
          <div className="left flex gap-3">
            <button onClick={handler} className='flex bg-cyan-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-cyan-500 hover:text-black'>
              Add Employee <span className='px-1'><BiUserPlus size={23}></BiUserPlus></span>
            </button>
          </div>
        </div>

      {visible ? <Form></Form> : <></>}
      <Tables></Tables>
    </Sidebar>
    </>
  )
}

