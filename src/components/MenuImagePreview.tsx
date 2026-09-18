import { useEffect, useRef, useState } from 'react'

type MenuImagePreviewProps = {
  alt: string
  src: string
  priority?: boolean
}

export function MenuImagePreview({
  alt,
  src,
  priority = false
}: MenuImagePreviewProps) {
  const imageRef = useRef<HTMLImageElement>(null)
  const [shouldLoad, setShouldLoad] = useState(priority)

  useEffect(() => {
    if (priority) {
      setShouldLoad(true)
      return
    }

    const image = imageRef.current
    if (!image || !('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) {
          return
        }

        setShouldLoad(true)
        observer.disconnect()
      },
      { rootMargin: '320px 0px' }
    )

    observer.observe(image)
    return () => observer.disconnect()
  }, [priority])

  return (
    <img
      ref={imageRef}
      src={shouldLoad ? src : undefined}
      alt={alt}
      className="menu-image"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}
