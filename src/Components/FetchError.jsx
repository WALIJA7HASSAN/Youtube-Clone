import React from 'react'
import Sidebar from './Sidebar'

const FetchError = () => {
  return (
    <>
      <Sidebar />
      <div className="flex items-center justify-center w-full h-[50vh] ">
        <div className=" text-center">
          <p className="text-[44px]">
            Guys khabi khabi raat ke 3 baje phone side pe rakh kar 😴💤 jana
            chahiye
          </p>
          <small className="text-[10px]">request limit reached, kal ana</small>
        </div>
      </div>
    </>
  )
}

export default FetchError