import React, { useContext, useRef, useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import SorryNotSupported from './SorryNotSupported'
import { YoutubeContext } from './Context/YoutubeContextStore'
import Videos from './Videos'
import SkeletonLoader from './SkeletonLoader'
import { fetchFromApi } from './utils/FetchFromApi'

const Subscriptions = () => {
  const { subList, randomHexColorCode } = useContext(YoutubeContext)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const containerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [selectedChannel, setSelectedChannel] = useState(null)

  useEffect(() => {
    if (subList.length === 0) {
      setLoading(false) // Stop loading if no channels are available
      return
    }

    setSelectedChannel(subList[0].id)
  }, [subList])

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedChannel) return // Prevent fetch if no channel is selected

      try {
        setLoading(true)
        setError(null)

        const videosResponse = await fetchFromApi(
          `search?channelId=${selectedChannel}&part=snippet&order=date&maxResults=50`
        )

        setVideos(videosResponse.items)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (subList.length > 0) {
      fetchData()
    }
  }, [selectedChannel, subList])

  const handleMouseDown = (e) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleTouchMove = (e) => {
    if (!isDragging || !containerRef.current) return
    const x = e.touches[0].pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  if (loading) {
    return <SkeletonLoader />
  }

  if (error) {
    return (
      <>
        <Sidebar />
        <SorryNotSupported
          message={
            'Hmm, seems like your favorite channels are on vacation 🏖️. Check back soon to catch up on the latest videos!'
          }
        />
      </>
    )
  }

  if (subList.length === 0) {
    return (
      <>
        <Sidebar />
        <SorryNotSupported
          message={
            "Hmm, seems like you don't have any subscribed channels. Discover new channels to get started!"
          }
        />
      </>
    )
  }

  return (
    <>
      <Sidebar />
      <section
        ref={containerRef}
        className="flex gap-8 px-6 py-3 w-full overflow-x-auto scrollbar-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {subList.map((sub) => (
          <div
            key={sub.id}
            className="text-center"
            onClick={() => setSelectedChannel(sub.id)}
          >
            <div
              style={{ background: randomHexColorCode() }}
              className="rounded-full overflow-hidden w-[80px] h-[80px] shrink-0 grid place-content-center cursor-pointer"
            >
              <p className="font-semibold text-[30px]">
                {sub.channelTitle.substring(0, 1)}
              </p>
            </div>
            <div>
              <p className="text-[14px] mt-4 text-white">{sub.channelTitle}</p>
            </div>
          </div>
        ))}
      </section>
      <Videos videos={videos} direction={'grid'} />
    </>
  )
}

export default Subscriptions
