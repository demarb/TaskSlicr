import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function PageNotFound() {
  return (
    <section className='min-h-screen flex flex-col'>
        
        <Nav />
        
        <section className='flex-auto mx-4 py-2 md:mx-12 md:py-4 lg:mx-24 lg:py-10'>
            <h1 className='text-4xl py-12 text-purple-900'>Page Not Found </h1>
            <span className='text-4xl text-purple-900 rounded-full p-4 border-purple-900 border'>:(</span>
        </section>

        <Footer/>

    </section>
  )
}
