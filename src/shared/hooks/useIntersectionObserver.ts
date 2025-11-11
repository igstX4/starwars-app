import { useEffect, useRef, type RefObject } from 'react'

export function useIntersectionObserver(
	callback: (entries: IntersectionObserverEntry[]) => void,
	options?: IntersectionObserverInit,
): RefObject<HTMLDivElement | null> {
	const elementRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const element = elementRef.current
		if (!element) return

		const observer = new IntersectionObserver(callback, options)
		observer.observe(element)

		return () => {
			observer.disconnect()
		}
	}, [callback, options])

	return elementRef
}

