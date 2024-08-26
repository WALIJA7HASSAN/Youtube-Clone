import React, { useContext, useState, useEffect } from 'react'
import DummyThumbnail from '../assets/DummyThumnail.jpg'
import { YoutubeContext } from './Context/YoutubeContextStore'
import { BsBell } from 'react-icons/bs'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BiSolidCommentDetail } from 'react-icons/bi'
import {
  RiThumbUpLine,
  RiThumbUpFill,
  RiThumbDownLine,
  RiThumbDownFill,
} from 'react-icons/ri'

import { PiShareFatLight } from 'react-icons/pi'

const ShortsCard = ({ videos }) => {
  const { randomHexColorCode, formatPublishTime, formatViews } =
    useContext(YoutubeContext)
  const [randomColor, setRandomColor] = useState('#000')
  const [subscribed, setSubscribed] = useState(false)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  useEffect(() => {
    setRandomColor(() => randomHexColorCode())
  }, [])

  const handleLike = () => {
    setLiked((prev) => !prev)
    if (disliked) setDisliked(false)
  }

  const handleDislike = () => {
    setDisliked((prev) => !prev)
    if (liked) setLiked(false)
  }

  const {
    id: { videoId },
  } = videos
  return (
    <div className="grid justify-center">
      {/* card */}
      <div className="p-4 flex items-end gap-2 relative">
        {/* video */}
        <div className="rounded-md overflow-hidden w-full max-w-[360px] h-[90vh] sm:w-[315px] relative ">
          {/* <img src={DummyThumbnail} className="w-full h-full" alt="" /> */}
          <iframe
            className="w-full h-full object-cover cursor-pointer "
            src={`https://www.youtube.com/embed/${videoId}?rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            width="100%"
            height="100%"
            frameBorder="0"
          />

          {/* <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div
                style={{ background: randomColor }}
                className="rounded-full overflow-hidden w-[34px] h-[34px] shrink-0 grid place-content-center"
              >
                <p className="font-semibold">A</p>
              </div>
              <h3 className="">@sdjosd</h3>
              {!subscribed ? (
                <button
                  onClick={() => setSubscribed(true)}
                  className="text-[14px] text-black bg-white px-4 py-2 rounded-[25px] transition-all duration-100 ease-in hover:bg-[#D9D9D9] font-medium"
                >
                  Subscribe
                </button>
              ) : (
                <button
                  onClick={() => setSubscribed(false)}
                  className="text-[14px] bg-[#272727] px-4 py-2 rounded-[25px] transition-all duration-100 ease-in hover:bg-[#3F3F3F] font-medium flex items-center gap-2"
                >
                  <BsBell />
                  Subscribed
                  <MdOutlineKeyboardArrowDown />
                </button>
              )}
            </div>
            <h4 className="font-semibold text-[16px] md:text-[20px]">
              jaskdlat tiosl
            </h4>
          </div> */}
        </div>
        {/* icons */}
        <div className="absolute bottom-10 right-4  sm:static  flex flex-col items-center gap-4 ">
          <button onClick={handleLike} className=" flex flex-col items-center">
            <span className="p-3 rounded-full bg-[#272727] transition-all duration-100 ease-in hover:bg-[#3F3F3F]">
              {liked ? (
                <RiThumbUpFill className="text-[18px]" />
              ) : (
                <RiThumbUpLine className="text-[18px]" />
              )}
            </span>
            <span>Like</span>
          </button>
          <button
            onClick={handleDislike}
            className=" items-center flex flex-col"
          >
            <span className="p-3 rounded-full bg-[#272727] transition-all duration-100 ease-in hover:bg-[#3F3F3F]">
              {disliked ? (
                <RiThumbDownFill className="text-[18px]" />
              ) : (
                <RiThumbDownLine className="text-[18px]" />
              )}
            </span>
            <span>Dislike</span>
          </button>
          <button className=" flex flex-col">
            <span className="p-3 rounded-full bg-[#272727] transition-all duration-100 ease-in hover:bg-[#3F3F3F]">
              <BiSolidCommentDetail className="text-[18px]" />
            </span>
            <span>Share</span>
          </button>
          <button className=" flex flex-col">
            <span className="p-3 rounded-full bg-[#272727] transition-all duration-100 ease-in hover:bg-[#3F3F3F]">
              <PiShareFatLight className="text-[18px]" />
            </span>
            <span>Share</span>
          </button>
          <button className=" flex flex-col">
            <span className="p-3 rounded-full bg-[#272727] transition-all duration-100 ease-in hover:bg-[#3F3F3F]">
              <BsThreeDotsVertical className="text-[18px]" />
            </span>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShortsCard
