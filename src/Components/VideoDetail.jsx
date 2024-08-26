  import React, { useContext, useEffect, useState, useRef } from 'react'
  import Videos from './Videos'
  import { Link } from 'react-router-dom'

  import SkeletonLoader from './SkeletonLoader'
  import { useParams } from 'react-router-dom'
  import { fetchFromApi } from './utils/FetchFromApi'
  import { FaCircleCheck } from 'react-icons/fa6'
  import { YoutubeContext } from './Context/YoutubeContextStore'

  import {
    RiThumbUpLine,
    RiThumbUpFill,
    RiThumbDownLine,
    RiThumbDownFill,
  } from 'react-icons/ri'

  import { PiShareFatLight } from 'react-icons/pi'
  import { TfiDownload } from 'react-icons/tfi'
  import { HiOutlineScissors, HiDotsHorizontal } from 'react-icons/hi'
  import { BsBell } from 'react-icons/bs'
  import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
  import ReactPlayer from 'react-player'

  import VideoComment from './VideoComment'
import FetchError from './FetchError'

  const VideoDetail = () => {
    const [videoDetail, setVideoDetail] = useState(null)
    const [videos, setVideos] = useState([])
    const [fetching, setFetching] = useState(true)
    const [isExpanded, setIsExpanded] = useState(false)
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)
    const [subscribed, setSubscribed] = useState(false)
    const [randomColor, setRandomColor] = useState('#000')
    const [randomSub, setRandomSub] = useState('34023')
    const { id,channel } = useParams()
    const { randomHexColorCode, formatPublishTime, formatViews } =
      useContext(YoutubeContext)
  const { addSub, deleteSub, subList } = useContext(YoutubeContext)


 useEffect(() => {
   setSubscribed(subList.some((sub) => sub.id === channel))
 }, [subList, channel])



    useEffect(() => {
      const fetchVideoData = async () => {
        setFetching(true)

        try {
          const videoData = await fetchFromApi(
            `videos?part=contentDetails,snippet,statistics&id=${id}`
          )
          setVideoDetail(videoData.items[0])

          const relatedVideosData = await fetchFromApi(
            `search?part=snippet,id&maxResults=50&relatedToVideoId=${id}`
          )
          setVideos(relatedVideosData.items)
        } catch (error) {
          console.error('Error fetching video data:', error)
        } finally {
          setFetching(false)
        }
      }

      fetchVideoData()
      setRandomColor(randomHexColorCode())
    }, [id, randomHexColorCode])

    useEffect(() => {
      setRandomSub(formatViews(Math.random() * 1000000))
    }, [])

    if (fetching || !videoDetail)
      return (
        <div className="videoDetail">
          <SkeletonLoader direction={'grid'} width={'full'} />
          <SkeletonLoader direction={'block'} height={'h-[150px]'} />
        </div>
      )

    const {
      snippet: { channelId, title, channelTitle, publishedAt, description, tags },
      statistics: { likeCount, viewCount, commentCount },
    } = videoDetail

    const tagsArray = tags ? tags : ['']

    const handleLike = () => {
      setLiked((prev) => !prev)
      if (disliked) setDisliked(false)
    }

    const handleDislike = () => {
      setDisliked((prev) => !prev)
      if (liked) setLiked(false)
    }
 
    
    const channelInitial = channelTitle.substring(0, 1)

    

    return (
      <div className="md:p-4 videoDetail md:pr-20">
        <div>
          <div className="group overflow-hidden md:rounded-lg">
            {/* <ReactPlayer
              className="w-full h-auto object-cover cursor-pointer"
              url={`https://www.youtube.com/watch?v=${id}`}
              playing
              controls
              width="100%"
              config={{
                youtube: {
                  playerVars: {
                    autoplay: 1,
                    rel: 0,
                  },
                },
              }}
            /> */}
            <iframe
              className="w-full h-auto object-cover cursor-pointer aspect-video"
              src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              width="100%"
              height="auto"
              frameBorder="0"
            />
          </div>
          <div className="p-2 grid gap-2 text-[#f1f1f1]">
            <h4 className="font-semibold text-[16px] md:text-[20px]">{title}</h4>
            <div className="flex flex-col flex-wrap gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-4 items-start">
                <Link to={`/channel/${channelId}`}>
                  <div
                    style={{ background: randomColor }}
                    className="rounded-full overflow-hidden w-[34px] h-[34px] shrink-0 grid place-content-center"
                  >
                    <p className="font-semibold">{channelInitial}</p>
                  </div>
                </Link>

                <div>
                  <Link to={`/channel/${channelId}`}>
                    <p className="text-[16px] text-white">
                      {channelTitle}
                      <FaCircleCheck className="inline mx-2" />
                    </p>
                  </Link>

                  <p className="text-[#AAAAAA] text-[12px] hover:text-white transition-all duration-100 ease-in">
                    {`${randomSub}`} Subscribers
                  </p>
                </div>
                {!subscribed ? (
                  <button
                    onClick={() => {
                       addSub({ id: channelId, channelTitle })
                    }}
                    className="text-[14px] text-black bg-white px-4 py-2 rounded-[25px] transition-all duration-100 ease-in hover:bg-[#D9D9D9] font-medium"
                  >
                    Subscribe
                  </button>
                ) : (
                  <button
                    onClick={() => {
                     deleteSub(channelId)
                    }}
                    className="text-[14px] bg-[#272727] px-4 py-2 rounded-[25px] transition-all duration-100 ease-in hover:bg-[#3F3F3F] font-medium flex items-center gap-2"
                  >
                    <BsBell />
                    Subscribed
                    <MdOutlineKeyboardArrowDown />
                  </button>
                )}
              </div>
              <div className="flex text-[14px] font-medium flex-wrap gap-3">
                <div className="flex items-center bg-[#272727] rounded-[25px]">
                  <button
                    onClick={handleLike}
                    className="flex gap-2 items-center px-3 h-full rounded-l-[25px] transition-all duration-100 ease-in hover:bg-[#3F3F3F] border-r border-[#f1f1f1c1]"
                  >
                    <span>{formatViews(likeCount)}</span>
                    {liked ? (
                      <RiThumbUpFill className="text-[16px]" />
                    ) : (
                      <RiThumbUpLine className="text-[16px]" />
                    )}
                  </button>
                  <button
                    onClick={handleDislike}
                    className="px-3 h-full rounded-r-[25px] transition-all duration-100 ease-in hover:bg-[#3F3F3F]"
                  >
                    {disliked ? (
                      <RiThumbDownFill className="text-[16px]" />
                    ) : (
                      <RiThumbDownLine className="text-[16px]" />
                    )}
                  </button>
                </div>
                <button className="flex gap-2 items-center px-4 py-1 rounded-[25px] bg-[#272727] transition-all duration-100 ease-in hover:bg-[#3F3F3F]">
                  <PiShareFatLight className="text-[18px]" /> <span>Share</span>
                </button>
                <button className="flex gap-2 items-center px-4 py-1 rounded-[25px] bg-[#272727] transition-all duration-100 ease-in hover:bg-[#3F3F3F] md:hidden">
                  <TfiDownload className="text-[18px]" /> <span>Download</span>
                </button>
                <button className="flex gap-2 items-center px-4 py-1 rounded-[25px] bg-[#272727] transition-all duration-100 ease-in hover:bg-[#3f3f3f] md:hidden">
                  <HiOutlineScissors className="text-[18px]" /> <span>Clip</span>
                </button>
                <button className="flex items-center p-2 rounded-full bg-[#272727] transition-all duration-100 ease-in hover:bg-[#3F3F3F]">
                  <HiDotsHorizontal className="text-[18px]" />
                </button>
              </div>
            </div>
          </div>
          <div
            onClick={() => setIsExpanded(true)}
            className="bg-[#272727] p-2 rounded-md text-[14px] m-2"
          >
            <div className=" font-medium">
              <p className="whitespace-nowrap inline">{`${formatViews(
                viewCount
              )} views  `}</p>
              <p className="whitespace-nowrap inline">
                {formatPublishTime(publishedAt)}
              </p>
              {tagsArray.length > 0 && (
                <p className="text-[#aaaaaa] inline break-all">
                  {tagsArray.map((item) => (
                    <span key={item}>#{item},</span>
                  ))}
                </p>
              )}
            </div>
            <p
              className={`overflow-hidden transition-all duration-300 ${
                isExpanded ? 'max-h-auto' : 'max-h-[20px]'
              }`}
            >
              {description}
            </p>
            <span
              onClick={(event) => {
                event.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
              className="font-semibold cursor-pointer"
            >
              {isExpanded ? 'Show less...' : 'more...'}
            </span>
          </div>
          <VideoComment commentCount={commentCount} />
        </div>
        <div className="md:h-[1024px] overflow-y-scroll scrollbar-hidden p-2">
          <Videos videos={videos} direction={'block'} />
        </div>
      </div>
    )
  }

  export default VideoDetail
