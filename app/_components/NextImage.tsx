import Image from 'next/image'
import React from 'react'


const NextImage: React.FC<{src: string, alt: string, width: number, height: number, className: string}> = ({src, alt, width, height, className}: {src: string, alt: string, width: number, height: number, className: string}) => {
  if (!alt || !src || !width || !height ) {
    return
  }
  return (
    <Image alt={alt} src={src} width={width} height={height} className={className}></Image>
  )
}

export default NextImage