import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function Scheduler() {
  return (
    <section className='min-h-screen flex flex-col'>
        
        <Nav />
        

        {/* Sample Mockup Sizes:
          1. 10 to 20 Minutes => w-1/4
          2. 30 to 40  Minutes => w-2/4
          3. 50+  Minutes => w-3/4 */}

        <section className='flex flex-wrap flex-auto mx-4 py-2 md:mx-12 md:py-4 lg:mx-24 lg:py-10'>
            <div className='bg-yellow-300 w-3/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>

            <div className='bg-orange-300 w-1/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>
            <div className='bg-red-300 w-2/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>

            <div className='bg-green-300 w-2/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>
            <div className='bg-yellow-300 w-1/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>

            <div className='bg-green-300 w-1/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>
            <div className='bg-yellow-300 w-1/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>
            <div className='bg-red-300 w-1/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>
        </section>

        <Footer/>

    </section>
  )
}
