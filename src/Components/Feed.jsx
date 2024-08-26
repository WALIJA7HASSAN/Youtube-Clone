import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { YoutubeContext } from './Context/YoutubeContextStore'
import { fetchFromApi } from './utils/FetchFromApi'
import Videos from './Videos'
import SkeletonLoader from './SkeletonLoader'
import Sidebar from './Sidebar'
import FetchError from './FetchError' // Import your error component

const Feed = () => {
  const { selectedCategory } = useContext(YoutubeContext)
  const [videos, setVideos] = useState(null)
  const [direction, setDirection] = useState('grid')
  const [error, setError] = useState(false) // Use a boolean for error handling
  const navigate = useNavigate()
  

  useEffect(() => {
    setVideos(null)
    setDirection('grid')
    setError(false) // Reset error state on category change

    const fetchVideos = async () => {
      try {
        let data
        if (selectedCategory === 'All') {
          data = await fetchFromApi(
            `search?part=snippet,id&maxResults=50&regionCode=PK`
          )
        } else if (selectedCategory === 'New to You') {
          data = await fetchFromApi(
            `search?part=snippet,id&maxResults=50&order=date`
          )
        } else if (selectedCategory === 'Trending') {
          data = await fetchFromApi(
            `search?part=snippet,id&chart=mostPopular&maxResults=50`
          )
        } else {
          data = await fetchFromApi(
            `search?q=${selectedCategory}&part=snippet,id&maxResults=50`
          )
        }

        if (data.error) {
          throw new Error() // Throw an error to trigger the catch block
        }

        setVideos(data.items)
      } catch {
        setError(true) // Set error state if fetching fails
      }
    }

    fetchVideos()
  }, [selectedCategory])

  if (error) {
    return <FetchError /> // Render FetchError component if error exists
  }

  return !videos ? (
    <>
      <Sidebar />
      <SkeletonLoader direction={'grid'} />
    </>
  ) : (
    <div className="bg-[#0f0f0f] px-10 py-3 md:px-4">
      <Sidebar />
      <Videos videos={videos} direction={direction} />
    </div>
  )
}

export default Feed
