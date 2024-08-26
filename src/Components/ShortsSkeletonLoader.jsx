import React from 'react'

const ShortsSkeleton = () => {
  return (
    <div className="w-full max-w-[360px] h-[90vh] sm:w-[315px]  flex gap-2 items-start justify-center animate-pulse mx-auto">
      <div className="w-full h-full bg-[#3F3F3F] rounded-md"></div>
      <div className="w-[40px] h-full flex flex-col gap-4 justify-end">
        <span className="bg-[#3F3F3F] w-[50px] h-[50px] rounded-full"></span>
        <span className="bg-[#3F3F3F] w-[50px] h-[50px] rounded-full"></span>
        <span className="bg-[#3F3F3F] w-[50px] h-[50px] rounded-full"></span>
        <span className="bg-[#3F3F3F] w-[50px] h-[50px] rounded-full"></span>
        <span className="bg-[#3F3F3F] w-[50px] h-[50px] rounded-full"></span>
        
      </div>
    </div>
  )
}
const ShortsSkeletonLoader = () => {
  return (
    <div><ShortsSkeleton/></div>
  )
}

export default ShortsSkeletonLoader