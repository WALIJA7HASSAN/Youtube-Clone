import React from 'react'

const Skeleton = ({direction,height,width}) => {
  return (
    <div
      className={`w-full  flex ${
        direction === 'block' ? 'mb-4' : 'flex-col'
      } gap-2 items-start justify-center animate-pulse`}
    >
      <div
        className={`w-full   ${
          direction === 'block' ? (height ? height : 'h-[250px]') : 'h-[150px]'
        } ${width ? 'h-[350px]' : ''} bg-[#3F3F3F] `}
      ></div>
      <div className="grid gap-2 w-[100%]">
        <div className="w-[100%] h-[20px] bg-[#3F3F3F]"></div>
        <div className="w-[40%] h-[20px] bg-[#3F3F3F]"></div>
      </div>
    </div>
  )
}
const SkeletonLoader = ({direction,height,width}) => {
     const skeletons = []
     for (let i = 0; i < 30; i++) {
       skeletons.push(<Skeleton direction={direction} height={height} width={width}  key={i} />)
     }
  return (
    <div
      className={`bg-[#0f0f0f] px-8 py-3 md:px-4 ${
        direction === 'block' ? 'block' : 'grid'
      } ${
        width ? 'w-full' : 'md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
      } gap-x-4 gap-y-8`}
    >
      {skeletons}
    </div>
  )
}

export default SkeletonLoader