import React, { useState, useRef, useEffect, useContext } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { YoutubeContext } from './Context/YoutubeContextStore.jsx'

const CategoryBtn = () => {
  const youtubeCategories = [
    'All',
    'Trending',
    'News',
    'Music',
    'Gaming',
    'Movies & TV Shows',
    'Sports',
    'Live',
    'Learning',
    'Fashion & Beauty',
    'Comedy',
    'Technology',
    'Travel',
    'Health & Fitness',
    'Food',
    'History',
    'Vlogs',
    'Science & Nature',
    'Coding',
    'Podcasts',
    'Mixes',
    'New to You',
  ]
const { selectedCategory, setSelectedCategory } = useContext(YoutubeContext)


  // const [selectedCategory, setSelectedCategory] = useState('All')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollRef = useRef(null)

  useEffect(() => {
    const checkScrollPosition = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
      }
    }

    checkScrollPosition() // Initial check
    const currentScrollRef = scrollRef.current
    if (currentScrollRef) {
      currentScrollRef.addEventListener('scroll', checkScrollPosition)
    }

    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener('scroll', checkScrollPosition)
      }
    }
  }, [])

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  return (
    <div className="flex items-center overflow-x-scroll scrollbar-hidden relative">
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="py-3 px-2 z-50 absolute left-0 text-white w-[55px] bg-[#0F0F0F] cat-arrow-btn-left"
        >
          <MdArrowBackIos />
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex gap-3 items-center bg-[#0F0F0F] py-2 px-2 w-full overflow-x-scroll scrollbar-hidden"
      >
        {youtubeCategories.map((item) => (
          <button
            key={item}
            onClick={() => setSelectedCategory(item)}
            className={`whitespace-nowrap text-[14px] font-medium py-[6px] px-3 rounded-[8px] transition-all duration-150 ease-in ${
              selectedCategory === item
                ? `active-btn-category ${
                    item === 'New to You' ? 'new-btn-ctg' : ''
                  }`
                : 'bg-[#272727] hover:bg-[#3F3F3F]'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="py-3 px-2 z-50 absolute right-0 text-white bg-[#0F0F0F] w-[55px] flex items-center justify-center cat-arrow-btn-right"
        >
          <MdArrowForwardIos />
        </button>
      )}
    </div>
  )
}

export default CategoryBtn
