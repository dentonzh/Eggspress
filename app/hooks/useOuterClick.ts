import React, { useEffect, useRef } from 'react'

const useOuterClick = (ref: any, onOuterClick: () => void, dependencies = []) => {
  useEffect(() => {
    const onClick = ({ target }: any) => !ref?.contains(target) && onOuterClick?.()
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  })
}

export default useOuterClick
