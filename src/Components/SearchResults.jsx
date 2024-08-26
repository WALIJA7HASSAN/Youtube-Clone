import React, { useContext, useState, useEffect } from 'react'
import { YoutubeContext } from './Context/YoutubeContextStore'
import { fetchFromApi } from './utils/FetchFromApi'
import Videos from './Videos'
import SkeletonLoader from './SkeletonLoader'
import Sidebar from './Sidebar'

const SearchResults = () => {
  const { searchInput, selectedCategory } = useContext(YoutubeContext)
  const [videos, setVideos] = useState(null)
  const [direction, setDirection] = useState('block')

  useEffect(() => {
    setVideos(null)
    setDirection('block')

    fetchFromApi(
      `search?q=${searchInput}&part=snippet,id&chart=mostPopular&maxResults=50`
    ).then((data) => {
      setVideos(data.items)
    })
  }, [searchInput])

  useEffect(() => {
    if (selectedCategory !== null) {
      setVideos(null)
      setDirection('grid')

      let fetchUrl = ''

      if (selectedCategory === 'All') {
        fetchUrl = `search?part=snippet,id&chart=mostPopular&maxResults=50&regionCode=PK&type=video`
      } else if (selectedCategory === 'New to You') {
        fetchUrl = `search?q=LatestVideos&part=snippet,id&maxResults=50`
      } else {
        fetchUrl = `search?q=${selectedCategory}&part=snippet,id&maxResults=50`
      }

      fetchFromApi(fetchUrl).then((data) => setVideos(data.items))
    }
  }, [selectedCategory])

  return !videos ? (
    <>
      <Sidebar />
      <SkeletonLoader direction={'block'} />
    </>
  ) : (
    <div className="bg-[#0f0f0f] px-10 py-3 md:px-4">
      <Sidebar />
      <Videos videos={videos} direction={direction} />
    </div>
  )
}

export default SearchResults
