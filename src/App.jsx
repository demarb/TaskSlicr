import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Scheduler from './pages/Scheduler'
import Profile from './pages/Profile'
import PageNotFound from './pages/PageNotFound'
import AppRoutes from './routes/AppRoutes'


export default function App() {


    
  return (
    <section className='box-border m-0 p-0'>
    
        <Routes>
          <Route index element={ <Home /> }/>
          <Route path="/app/*" element={<AppRoutes/>} ></Route>
          <Route path="*" element={<PageNotFound/>} ></Route>
        </Routes>

        {/* <Home/> */}
        {/* <Login /> */}
        {/* <Scheduler /> */}
        {/* <Profile /> */}
        {/* <PageNotFound /> */}
    
    </section>
  )
}
