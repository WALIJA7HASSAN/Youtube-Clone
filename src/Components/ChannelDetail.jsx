import React, { useState, useEffect, useContext } from 'react'
import Sidebar from './Sidebar'
import { fetchFromApi } from './utils/FetchFromApi'
import { useParams } from 'react-router-dom'
import Videos from './Videos'
import SkeletonLoader from './SkeletonLoader'
import { Link } from 'react-router-dom'
import DummyThumbnail from '../assets/DummyThumnail.jpg'
import { BsBell } from 'react-icons/bs'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { YoutubeContext } from './Context/YoutubeContextStore.jsx'

const ChannelDetail = () => {
  const { id } = useParams()
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const { formatViews, subList, addSub, deleteSub } = useContext(YoutubeContext)

 useEffect(()=>{
   // Check if the channel is already subscribed
    setIsSubscribed(subList.some((sub) => sub.id === id))
 },[subList])
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [channelResponse, videosResponse] = await Promise.all([
          fetchFromApi(`channels?part=snippet,statistics&id=${id}`),
          fetchFromApi(
            `search?channelId=${id}&part=snippet&order=date&maxResults=50`
          ),
        ])

        setChannelDetail(channelResponse.items[0])
        setVideos(videosResponse.items)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return <SkeletonLoader />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const {
    snippet: {
      channelTitle,
      title,
      description,
      thumbnails: {
        medium: { url },
      },
    },
    statistics: { subscriberCount, videoCount },
  } = channelDetail
  
  

  return (
    <>
      <Sidebar />
      <div className="px-10 py-3 md:px-4">
        <div className="w-full h-[200px] flex items-center justify-center bg-white rounded-md">
          <img
            src={url || DummyThumbnail}
            className="rounded-full w-[160px] h-[160px] object-cover object-top"
            alt=""
          />
        </div>
        <div className="bg-[#0f0f0f] cursor-pointer grid gap-2 py-4">
          <Link to={`/channel/${id}`} className="flex flex-col items-center sm:flex-row gap-4">
            <img
              src={url || DummyThumbnail}
              className="rounded-full w-[160px] h-[160px] object-cover"
              alt=""
            />
            <div className="grid gap-2">
              <h2 className="font-semibold text-[18px] md:text-[36px] ">
                {channelTitle || title}
              </h2>
              <div className="text-[#AAAAAA] text-[12px] md:text-[14px] flex gap-2 items-center justify-start flex-wrap">
                <p>{`${formatViews(subscriberCount)} subscribers`}</p>
                <span className="w-1 h-1 rounded-full bg-[#AAAAAA]"></span>
                <p>{`${formatViews(videoCount)} videos`}</p>
              </div>
              <div className="text-[#AAAAAA] text-[12px] md:text-[14px]">
                <p
                  className={`overflow-hidden transition-all md:max-w-96 duration-300 ${
                    isExpanded ? 'max-h-auto' : 'max-h-[20px]'
                  }`}
                >
                  {description}
                </p>
                <span
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="font-semibold cursor-pointer"
                >
                  {isExpanded ? 'Show less...' : 'more...'}
                </span>
              </div>
              <div>
                {!isSubscribed ? (
                  <button
                    onClick={() => {
                      // handleAddSub()
                      addSub({id,channelTitle:title})
                     
                      
                      
                    }}
                    className="text-[14px] text-black bg-white px-4 py-2 rounded-[25px] transition-all duration-100 ease-in hover:bg-[#D9D9D9] font-medium w-full md:w-auto"
                  >
                    Subscribe
                  </button>
                ) : (
                  <button
                    onClick={() => deleteSub(id)}
                    className="text-[14px] bg-[#272727] px-4 py-2 rounded-[25px] transition-all duration-100 ease-in hover:bg-[#3F3F3F] font-medium flex items-center justify-center gap-2 w-full md:w-auto"
                  >
                    <BsBell />
                    Subscribed
                    <MdOutlineKeyboardArrowDown />
                  </button>
                )}
              </div>
            </div>
          </Link>
        </div>
        <div className="px-2 md:px-4 mt-4">
          <Videos videos={videos} direction={'grid'} />
        </div>
      </div>
    </>
  )
}

export default ChannelDetail
