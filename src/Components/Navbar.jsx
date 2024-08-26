import React, { useRef, useState } from 'react'
import { HiBars3 } from 'react-icons/hi2'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdMic } from 'react-icons/io'
import { RiVideoAddLine } from 'react-icons/ri'
import Logo from '../assets/Logo.svg'
import { FaRegBell } from 'react-icons/fa'
import { FaUserCircle } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineSubscriptions } from 'react-icons/md'
import { MdSubscriptions } from 'react-icons/md'
import { useContext } from 'react'
import { YoutubeContext } from './Context/YoutubeContextStore'

const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState(false)
  const searchRef = useRef('')
  const hiddenSearchRef = useRef('')
  const { setSearchInput, setSelectedCategory } = useContext(YoutubeContext)
  const nav = useNavigate()

  const handleSearchInput = (e) => {
    e.preventDefault()
    if (searchVisible) {
      setSearchInput(hiddenSearchRef.current.value)
    } else {
      setSearchInput(searchRef.current.value)
    }
    setSelectedCategory(null)
    nav('/search')
  }

  return (
    <>
      <nav className="flex items-center justify-between gap-1  py-2 px-1 sm:px-4 bg-[#0f0f0f] z-50 sticky top-0">
        <div className="flex gap-1 sm:gap-3 md:gap-6 items-center">
          <HiBars3 className="text-[24px] md:hidden" />
          <Link
            to="/"
            onClick={() => {
              // hiddenSearchRef.current.value=''
              // searchRef.current.value=''
            }}
            className="flex gap-1 items-center"
          >
            <img src={Logo} className=" w-[30px]" alt="" />
            <span className="text-[18px]  sm:text-[22px] font-medium tracking-tight">
              YouTube
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-end sm:justify-normal gap-1 sm:gap-2 flex-grow  max-w-[731px]">
          <form
            onSubmit={(e) => handleSearchInput(e)}
            className=" items-center flex-grow hidden sm:flex"
          >
            <div className="flex items-center bg-[#121212] py-1 px-4 rounded-l-[1.5rem] border border-[#f0f0f03e] shrink grow  focus-within:border-blue-700 group">
              <FaMagnifyingGlass className="text-[20px]  hidden group-focus-within:block" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search"
                className="text-[16px] px-2 py-1 bg-transparent border-none focus:outline-none w-full"
              />
            </div>
            <button className="bg-[#222222] py-[10px] px-6 rounded-r-[1.5rem] border border-[#f0f0f03e] cursor-pointer">
              <FaMagnifyingGlass className="text-[20px]" />
            </button>
          </form>
          <div
            onClick={() => setSearchVisible(true)}
            className="sm:hidden p-2 inline-block rounded-full cursor-pointer hover:bg-[#3D3D3D] transition-all duration-100 ease-linear"
          >
            <FaMagnifyingGlass className="text-[20px]  " />
          </div>
          <div className="sm:bg-[#222222] p-2 sm:p-3 inline-block rounded-full cursor-pointer hover:bg-[#3D3D3D] transition-all duration-100 ease-linear">
            <IoMdMic className="text-[20px]  " />
          </div>
        </div>
        <div className=" flex items-center gap-1  md:gap-2 justify-between">
          <div className="hidden md:block p-2 sm:p-3 inline-block rounded-full cursor-pointer hover:bg-[#3D3D3D] transition-all duration-100 ease-linear">
            <RiVideoAddLine className="text-[20px]" />
          </div>
          <div className="p-2 sm:p-3 inline-block rounded-full cursor-pointer hover:bg-[#3D3D3D] transition-all duration-100 ease-linear">
            <FaRegBell className="text-[20px]" />
          </div>
          <div className="inline-block cursor-pointer">
            <FaUserCircle className="text-[20px] sm:text-[34px] " />
          </div>
        </div>
      </nav>

      {/* hidden search */}
      {searchVisible && (
        <div className="flex items-center justify-end sm:justify-normal gap-1 sm:gap-2 flex-grow  max-w-[731px] fixed bg-[#0F0F0F] w-full top-0 py-2 z-50 sm:hidden">
          <div
            onClick={() => setSearchVisible(false)}
            className="sm:bg-[#222222] p-3 inline-block rounded-full cursor-pointer hover:bg-[#3D3D3D] transition-all duration-100 ease-linear mr-4"
          >
            <FaArrowLeft className="text-[20px]  " />
          </div>
          <form
            onSubmit={(e) => handleSearchInput(e)}
            className=" items-center flex-grow flex"
          >
            <div className="flex items-center bg-[#121212] py-1 px-4 rounded-l-[1.5rem] border border-[#f0f0f03e] shrink grow  focus-within:border-blue-700 group">
              <FaMagnifyingGlass className="text-[20px]  hidden group-focus-within:block" />
              <input
                ref={hiddenSearchRef}
                type="text"
                placeholder="Search"
                className="text-[16px] px-2 py-1 bg-transparent border-none focus:outline-none w-full"
              />
            </div>
            <button className="bg-[#222222] py-[10px] px-6 rounded-r-[1.5rem] border border-[#f0f0f03e] cursor-pointer">
              <FaMagnifyingGlass className="text-[20px]" />
            </button>
          </form>

          <div className="sm:bg-[#222222] p-3 inline-block rounded-full cursor-pointer hover:bg-[#3D3D3D] transition-all duration-100 ease-linear">
            <IoMdMic className="text-[20px]  " />
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
