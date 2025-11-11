import { useState } from 'react'
import { PeopleList } from '@/features/people/ui/PeopleList'
import { useSearchParamsSync } from '@/shared/hooks/useSearchParamsSync'
import { useSearchParams } from 'react-router-dom'

export function PeoplePage() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')


  useSearchParamsSync('q', query, 400)

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)

  const search = query.trim()

  return (
    <div className="p-4 md:p-6 text-white">
      <div className="mx-auto max-w-5xl w-full">
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="text-xl font-semibold">People</h1>
          <input
            value={query}
            onChange={handleQueryChange}
            placeholder="Search for a hero..."
            className="w-full sm:flex-1 rounded-md border border-white/20 bg-[rgba(255,255,255,0.06)] backdrop-blur-md px-3 py-2 text-sm outline-none placeholder:text-white/50 focus:bg-[rgba(255,255,255,0.1)] transition"
          />
        </div>
        <PeopleList search={search} />
      </div>
    </div>
  )
}
