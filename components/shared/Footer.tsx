import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='wrapper flex-between items-center gap-4 sm:flex flex-col md:flex-row'>
      <Image 
      src="/assets/images/logo.svg" 
      alt="Evently" 
      width={128} 
      height={38}/>
      <p>Copyright © 2023 Evently</p> 
    </div>
  )
}

export default Footer