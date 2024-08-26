import React from 'react'
import Sidebar from './Sidebar'
import SorryNotSupported from './SorryNotSupported'

import SkeletonLoader from './SkeletonLoader'
import FetchError from './FetchError'

const You = () => {
  return (
    <>
      <Sidebar />
      <SorryNotSupported
        message={
          ' Guys khabi khabi raat ke 3 baje phone side pe rakh kar 😴💤 jana chahiye,we dont track histories'
        }
      />
    </>
  )
}

export default You