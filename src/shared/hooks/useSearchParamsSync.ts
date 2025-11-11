import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useSearchParamsSync(paramName: string, value: string, debounceMs = 400) {
	const [, setSearchParams] = useSearchParams()

	useEffect(() => {
		const timer = setTimeout(() => {
			const trimmed = value.trim()
			setSearchParams((prev) => {
				const next = new URLSearchParams(prev)
				if (trimmed) {
					next.set(paramName, trimmed)
				} else {
					next.delete(paramName)
				}
				return next
			}, { replace: true })
		}, debounceMs)

		return () => clearTimeout(timer)
	}, [value, paramName, debounceMs, setSearchParams])
}

