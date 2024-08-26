import { FaRegBell } from 'react-icons/fa'
import { FaUserCircle } from 'react-icons/fa'
import React, { useContext, useEffect, useState, useRef } from 'react'
import {
  RiThumbUpLine,
  RiThumbUpFill,
  RiThumbDownLine,
  RiThumbDownFill,
} from 'react-icons/ri'
import { CiFaceSmile } from 'react-icons/ci'

const Comment=({comment})=>{
      const [liked, setLiked] = useState(false)
      const [disliked, setDisliked] = useState(false)
     const handleLike = () => {
    setLiked((prev) => !prev)
    if (disliked) setDisliked(false)
  }

  const handleDislike = () => {
    setDisliked((prev) => !prev)
    if (liked) setLiked(false)
  }
    return (
      <div className="comment flex gap-2 my-4">
        <FaUserCircle className="text-[20px] sm:text-[34px] inline-block cursor-pointer" />
        <div className="">
          <p>
           {comment}
          </p>
          <div className=" flex items-center justify-start flex-wrap gap-2">
            <button
              onClick={handleLike}
              className="  rounded-full flex gap-2 items-center p-3 h-full  transition-all duration-100 ease-in hover:bg-[#3F3F3F] "
            >
              {liked ? (
                <RiThumbUpFill className="text-[16px]" />
              ) : (
                <RiThumbUpLine className="text-[16px]" />
              )}
            </button>
            <button
              onClick={handleDislike}
              className=" rounded-full flex gap-2 items-center p-3 h-full  transition-all duration-100 ease-in hover:bg-[#3F3F3F] "
            >
              {disliked ? (
                <RiThumbDownFill className="text-[16px]" />
              ) : (
                <RiThumbDownLine className="text-[16px]" />
              )}
            </button>
            <p className="px-2 py-1 sm:px-3 inline-block rounded-full cursor-pointer hover:bg-[#3D3D3D] transition-all duration-100 ease-linear">
              Reply
            </p>
          </div>
        </div>
      </div>
    )
}

const VideoComment = ({comentCount}) => {
  const commentRef = useRef('')
  const [inputFocus, setInputFocus] = useState(false)
  const [comments, setComments] = useState([])

  const [inputValue, setInputValue] = useState('') // State to track input value
 
  // Handler to update input value state
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleCommentInput = (e) => {
    e.preventDefault();
    setComments([...comments, commentRef.current.value])
    commentRef.current.value=''

  }

  return (
    <div className="p-2 m-2">
      <p className="text-[20px] font-bold">{comentCount} Comments</p>

      <div className="flex gap-2 my-4">
        <FaUserCircle className="text-[20px] sm:text-[34px] inline-block cursor-pointer" />
        <form onSubmit={(e) => handleCommentInput(e)} className="w-full">
          <input
            onClick={() => {
              setInputFocus(true)
            }}
            onChange={handleInputChange} // Update input value on change
            ref={commentRef}
            type="text"
            placeholder="Add a comment..."
            className="w-full bg-transparent focus:outline-none border-b text-[14px] text-[#AAAAAA] focus:border-b-2 focus:text-white peer"
          />
          <div
            className={`flex items-center justify-between p-2 ${
              inputFocus ? 'flex' : 'hidden'
            }`}
          >
            <div className="p-2 sm:p-3 inline-block rounded-full cursor-pointer hover:bg-[#3D3D3D] transition-all duration-100 ease-linear">
              <CiFaceSmile className="text-[20px]" />
            </div>

            <div className="text-[14px] font-medium flex gap-2 items-center">
              <button
                onClick={() => {
                  commentRef.current.value = ''
                  setInputValue('') // Reset input value state
                  setInputFocus(false)
                }}
                className="px-2 py-1 sm:px-4 sm:py-2 inline-block rounded-full cursor-pointer hover:bg-[#3D3D3D] transition-all duration-100 ease-linear"
                type="reset"
              >
                Cancel
              </button>
              <button
                className={`px-2 py-1 sm:px-4 sm:py-2 inline-block rounded-full cursor-pointer transition-all duration-100 ease-linear ${
                  inputValue.trim() !== ''
                    ? 'bg-[#3EA6FF] text-black hover:bg-[#65B8FF]'
                    : 'text-[#aaa] bg-[#3D3D3D]'
                }`}
                type="submit"
              >
                Comment
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* comment container */}
      <div className="">
        {comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </div>
    </div>
  )
}

export default VideoComment;