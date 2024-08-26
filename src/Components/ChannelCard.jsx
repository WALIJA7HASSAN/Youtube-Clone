import React from 'react'
import { Link } from 'react-router-dom';

const ChannelCard = ({channelDetail,key}) => {
  
    const {snippet:{channelId,channelTitle,description,thumbnails:{medium:{url}}}}=channelDetail
  return (
    <div
      className="md:w-[370px] bg-[#0f0f0f] cursor-pointer  grid gap-2"
      key={key}
    >
      <Link to={`/channel/${channelId}`}>
        <div className=" w-full flex items-center justify-center">
          <img src={url} className="rounded-full w-[200px]" alt="" />
        </div>
        <h2 className="font-semibold text-[18px] text-center">
          {channelTitle}
        </h2>
        <p className="text-center text-[#AAAAAA] text-[12px] ">{description}</p>
      </Link>
    </div>
  )
}

export default ChannelCard