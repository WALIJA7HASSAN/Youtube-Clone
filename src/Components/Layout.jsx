import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { YoutubeContext } from './Context/YoutubeContextStore.jsx'
import YoutubeContextProvider from './Context/YoutubeContextStore.jsx'

const Layout = () => {
  return (
    <YoutubeContextProvider>
      <div className="bg-[#0F0F0F] text-white">
        
        <div className="md:pl-20"> 
          <Navbar />
          <Outlet />
        </div>
      </div>
    </YoutubeContextProvider>
  )
}

export default Layout