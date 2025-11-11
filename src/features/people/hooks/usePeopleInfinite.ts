import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPeople } from '@/shared/api/swapi'

export function usePeopleInfinite(search: string) {
	return useInfiniteQuery({
		queryKey: ['people', search],
		queryFn: async ({ pageParam = 1 }) => fetchPeople({ page: pageParam, search }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (!lastPage.next) return undefined
			try {
				const url = new URL(lastPage.next)
				const pageParam = url.searchParams.get('page')
				return pageParam ? Number(pageParam) : undefined
			} catch {
				const match = lastPage.next.match(/[?&]page=(\d+)/)
				return match ? Number(match[1]) : undefined
			}
		},
	})
}



