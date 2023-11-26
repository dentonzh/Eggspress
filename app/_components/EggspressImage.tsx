import Image from 'next/image'
import React from 'react'

interface EggspressImageProps {
  src: string,
  alt: string,
  width: number,
  height: number,
  className: string,
  fetchPriority?: "high" | "low" | "auto" | undefined
}

const EggspressImage: React.FC<EggspressImageProps> = ({src, alt, width, height, className, fetchPriority}: EggspressImageProps) => {
  const videoExtensions = ['.webm', '.mp4', '.m4v', '.mov', '.wmv', '.asf', '.avi', '.mpg', '.mpeg']
  const srcExtension = src.slice(src.lastIndexOf('.'))

  const priority = fetchPriority === 'high' ? true : false
  
  if (videoExtensions.includes(srcExtension)) {

    return (
      <video muted loop autoPlay>
        <source src={src}></source>
      </video>
    )
  }

  if (!width || !height ) {
    // Provided in the event that image-size package cannot return valid width and/or height
    return <img src={src} alt={alt}></img>
  }
  return (
    <Image alt={alt} src={src} width={width} height={height} className={className} priority={priority}></Image>
  )
}

export default EggspressImage