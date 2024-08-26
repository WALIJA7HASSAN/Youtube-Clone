import React,{useContext, useEffect, useState} from 'react'
import VideoCard from './VideoCard'
import ChannelCard from './ChannelCard'


const Videos = ({ videos,direction,imgUrl }) => {

  return (
    <div
      className={`w-full  ${direction}  ${
        direction === 'block'
          ? 'grid gap-4'
          : 'md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-8'
      }`}
    >
      {videos &&
        videos.map((item, index) => {
          if (item.id.videoId) {
            return (
              <VideoCard
                key={item.id.videoId}
                video={item}
                direction={direction}
                imgUrl={imgUrl}
              />
            )
          } else if (item.id.channelId) {
            return (
              <div key={index}>
                {/* Uncomment and use ChannelCard component if available */}
                <ChannelCard channelDetail={item} key={index} />
              </div>
            )
          }
          return null // Return null if neither videoId nor channelId exists
        })}
    </div>
  )
}

export default Videos