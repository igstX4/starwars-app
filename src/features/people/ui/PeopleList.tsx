import { useCallback, useMemo } from 'react'
import { usePeopleInfinite } from '@/features/people/hooks/usePeopleInfinite'
import { PeopleCard } from './PeopleCard'
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver'
import type { Person } from '@/entities/people/types'

type PeopleListProps = {
  search: string
}

export function PeopleList({ search }: PeopleListProps) {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    status,
  } = usePeopleInfinite(search)


  const people: Person[] = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  )

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if (!entry.isIntersecting) return
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const sentinelRef = useIntersectionObserver(handleIntersection, {
    rootMargin: '100px',
  })


  if (status === 'error') {
    return <div className="text-red-300">Failed to load people.</div>
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {people.map((person) => (
          <PeopleCard key={person.id} person={person} />
        ))}
      </div>

      <div ref={sentinelRef} className="h-10" />

      {isFetchingNextPage && (
        <div className="mt-2 text-white/70">Loading more...</div>
      )}

      {!hasNextPage && people.length > 0 && (
        <div className="mt-2 text-white/50">No more results.</div>
      )}
    </div>
  )
}
