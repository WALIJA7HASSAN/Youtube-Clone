import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaCircleCheck } from 'react-icons/fa6'
import DummyThumbnail from '../assets/DummyThumnail.jpg'
import { YoutubeContext } from './Context/YoutubeContextStore'

const VideoCard = ({ video, direction, imgUrl }) => {
  // Safely destructure the video object with default values
  const {
    id: { videoId } = {}, // Provide an empty object as a fallback
    snippet: {
      channelId = '',
      channelTitle = 'Unknown Channel',
      description = '',
      publishTime = '',
      thumbnails: {
        high: { url: thumbnailUrl } = {}, // Provide an empty object as a fallback
      } = {},
      title = 'Untitled Video',
    } = {},
  } = video || {} // Provide an empty object as a fallback

  const channelImg = channelTitle.substring(0, 1)

  const { formatPublishTime, formatViews, randomHexColorCode } =
    useContext(YoutubeContext)

  return (
    <div
      className={`md:w-[370px] ${
        direction === 'block' ? 'md:w-full grid grid-cols-2' : ''
      } bg-[#0f0f0f] cursor-pointer gap-2 ${direction} mx-auto`}
    >
      {/* image container */}
      <Link to={`/video/${videoId}/${channelId}`}>
        <div className="group aspect-video overflow-hidden">
          <img
            className="w-full rounded-lg transition-all duration-150 ease-linear object-cover aspect-video group-hover:rounded-none cursor-pointer group-hover:scale-[1.02]"
            src={thumbnailUrl || DummyThumbnail} // Use thumbnailUrl if it exists, otherwise fallback to DummyThumbnail
            alt={title || 'Video thumbnail'} // Provide alt text fallback if title doesn't exist
          />
        </div>
      </Link>
      {/* content container */}
      <div className="py-2 flex gap-2 items-start justify-between">
        <Link to={`/channel/${channelId}`}>
          {imgUrl ? (
            <div
              className={`rounded-full overflow-hidden w-[34px] h-[34px]  shrink-0 grid place-content-center ${
                direction === 'block' ? 'hidden' : ''
              }`}
            >
              <img src={imgUrl} alt="" />
            </div>
          ) : (
            <div
              style={{ backgroundColor: randomHexColorCode() }}
              className={`rounded-full overflow-hidden w-[34px] h-[34px]  shrink-0 grid place-content-center ${
                direction === 'block' ? 'hidden' : ''
              }`}
            >
              <p className="font-semibold ">{channelImg}</p>
            </div>
          )}
        </Link>
        <div className="flex-grow">
          <Link to={`/video/${videoId}/${channelId}`}>
            <h4
              title={title}
              className="font-semibold text-[16px] cursor-pointer"
            >
              {title.slice(0, 50)}..
            </h4>
          </Link>
          <Link to={`/channel/${channelId}`}>
            <div className="flex gap-2 items-center my-1">
              {imgUrl ? (
                <div
                  className={`rounded-full overflow-hidden w-[34px] h-[34px]  shrink-0 grid place-content-center ${
                    direction === 'grid' ? 'hidden' : ''
                  }`}
                >
                  <img src={imgUrl} alt="" />
                </div>
              ) : (
                <div
                  style={{ backgroundColor: randomHexColorCode() }}
                  className={`rounded-full overflow-hidden w-[34px] h-[34px]  shrink-0 grid place-content-center ${
                    direction === 'grid' ? 'hidden' : ''
                  }`}
                >
                  <p className="font-semibold ">{channelImg}</p>
                </div>
              )}
              <p className="text-[#AAAAAA] text-[14px] hover:text-white transition-all duration-100 ease-in">
                {channelTitle}
                <FaCircleCheck className="inline mx-2" />
              </p>
            </div>
          </Link>

          <div className="text-[#AAAAAA] text-[14px] flex items-center justify-start gap-1">
            <p>{`${formatViews(Math.random() * 1023464)}`} views</p>{' '}
            <div className="w-1 h-1 rounded-full bg-[#AAAAAA]"></div>
            <p>{`${formatPublishTime(publishTime)}`}</p>
          </div>
        </div>

        <div className="">
          <BsThreeDotsVertical />
        </div>
      </div>
    </div>
  )
}

export default VideoCard
