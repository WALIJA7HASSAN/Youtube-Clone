import React from 'react'
import noInternet from '../assets/noInternet.svg'
import { Link } from 'react-router-dom'

const SorryNotSupported = ({message}) => {

  return (
    <div className="flex items-center justify-center w-full h-[80vh] ">

    <div className=' text-center'>
      <p className='text-[34px]'>{message}</p>
      <Link to='/'>
      <button className='bg-red-600 px-5 py-2 rounded-[25px] border-2 border-red-600 hover:bg-transparent'>Take me Home</button>
      </Link>
    </div>
    </div>
  )
}

export default SorryNotSupported