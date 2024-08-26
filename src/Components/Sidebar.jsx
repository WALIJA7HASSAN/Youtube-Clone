import React from 'react'
import { HiBars3 } from 'react-icons/hi2'
import { NavLink } from 'react-router-dom'
import { GoHomeFill } from 'react-icons/go'
import { GoHome } from 'react-icons/go'
import { SiYoutubeshorts } from 'react-icons/si'
import shortUnfilled from '../assets/shortsUnfilled.svg'
import youFilled from '../assets/youFilled.svg'
import you from '../assets/you.svg'
import { MdOutlineSubscriptions } from 'react-icons/md'
import { MdSubscriptions } from 'react-icons/md'

const Sidebar = () => {
  return (
    <>
      <div className=" bg-[#0f0f0f] py-3 px-2 w-full h-20 md:h-full   md:w-20   fixed right-0 md:top-0 left-0 bottom-0 z-[500] flex  md:flex-col md:items-center">
        <div className="hidden md:flex  justify-center hover:bg-[#272727] py-2 px-1 w-[40px] rounded-full cursor-pointer transition-all duration-150 ease-in">
          <HiBars3 className="text-[24px]" />
        </div>
        <ul className="w-full py-4 flex justify-between items-center md:block">
          <li>
            <NavLink
              to="/"
              className="grid justify-center hover:bg-[#272727] px-5 md:px-0  md:py-5 rounded-md transition-all duration-150 ease-in"
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <GoHomeFill className="text-[24px]  mx-auto" />
                  ) : (
                    <GoHome className="text-[24px] mx-auto" />
                  )}
                  <span className="text-[10px]">Home</span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shorts"
              className="grid justify-center  hover:bg-[#272727] px-5 md:px-0 md:py-5 rounded-md transition-all duration-150 ease-in"
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <SiYoutubeshorts className="text-[24px] mx-auto" />
                  ) : (
                    <img
                      src={shortUnfilled}
                      className="text-[24px] mx-auto w-7"
                    />
                  )}
                  <span className="text-[10px]  ">Shorts</span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/subscriptions"
              className="grid justify-center hover:bg-[#272727] px-5 md:px-0 md:py-5 rounded-md transition-all duration-150 ease-in"
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <MdSubscriptions className="text-[24px]  mx-auto" />
                  ) : (
                    <MdOutlineSubscriptions className="text-[24px] mx-auto" />
                  )}
                  <span className="text-[10px]">Subscriptions</span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/you"
              className="grid justify-center hover:bg-[#272727] px-5 md:px-0 md:py-5 rounded-md transition-all duration-150 ease-in"
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <img src={youFilled} className="text-[24px] mx-auto w-7" />
                  ) : (
                    <img src={you} className="text-[24px] mx-auto w-7" />
                  )}
                  <span className="text-[10px] text-center">You</span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
