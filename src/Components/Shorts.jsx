import React, { useState, useEffect } from 'react'
import ShortsCard from './ShortsCard'
import { fetchFromApi } from './utils/FetchFromApi'

import Sidebar from './Sidebar'
import ShortsSkeletonLoader from './ShortsSkeletonLoader'

const Shorts = () => {
  const [videos, setVideos] = useState(null)

  useEffect(() => {
    fetchFromApi(
      `search?q=shorts&part=snippet,id&chart=mostPopular&maxResults=50&regionCode=PK&type=shorts`
    ).then((data) => setVideos(data.items))
  }, [])

  return !videos ? (
    <>
      <ShortsSkeletonLoader />
      <Sidebar />
    </>
  ) : (
    <>
      <Sidebar />
      <div>
        {videos.map((v) => (
          <ShortsCard key={v.id.videoId} videos={v} />
        ))}
      </div>
    </>
  )
}

export default Shorts
