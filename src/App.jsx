import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Scheduler from './pages/Scheduler'
import Settings from './pages/Settings'
import PageNotFound from './pages/PageNotFound'


export default function App() {


    
  return (
    <section className='box-border m-0 p-0'>
    
        <Home/>
        {/* <Login /> */}
        {/* <Scheduler /> */}
        {/* <Settings /> */}
        {/* <PageNotFound /> */}
    
    </section>
  )
}
