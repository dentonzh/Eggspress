import Image from 'next/image'
import React from 'react'


const NextImage: React.FC<{src: string, alt: string, width: number, height: number}> = ({src, alt, width, height}: {src: string, alt: string, width: number, height: number}) => {
  return (
    <Image alt={alt} src={src} width={width} height={height}></Image>
  )
}

export default NextImage