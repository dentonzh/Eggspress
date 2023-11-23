import Image from 'next/image'
import React from 'react'


const EggspressImage: React.FC<{src: string, alt: string, width: number, height: number, className: string}> = ({src, alt, width, height, className}: {src: string, alt: string, width: number, height: number, className: string}) => {
  const videoExtensions = ['.webm', '.mp4', '.m4v', '.mov', '.wmv', '.asf', '.avi', '.mpg', '.mpeg']
  const srcExtension = src.slice(src.lastIndexOf('.'))
  
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
    <Image alt={alt} src={src} width={width} height={height} className={className}></Image>
  )
}

export default EggspressImage