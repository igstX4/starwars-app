import { useQuery } from '@tanstack/react-query'
import { fetchFilm, fetchPerson, fetchStarship } from '@/shared/api/swapi'
import { normalizeIdArray } from '@/features/person/lib/id'
import { buildGraph } from '@/features/person/lib/buildGraph'

export function usePersonGraph(personId: number) {
  return useQuery({
    queryKey: ['person-graph', personId],
    queryFn: async () => {
      const person = await fetchPerson(personId)
      const filmIds = normalizeIdArray(person.films ?? [])
      const films = await Promise.all(filmIds.map(fetchFilm))
      
      const personStarshipIds = new Set(normalizeIdArray(person.starships ?? []))
      const filmStarshipIds = new Set(
        films.flatMap((f) => normalizeIdArray(f.starships ?? [])),
      )
      const intersectedStarshipIds = [...filmStarshipIds].filter((id) => personStarshipIds.has(id))
      
      const starships = await Promise.all(intersectedStarshipIds.map(fetchStarship))
      
      const { nodes, edges } = buildGraph(person, films, starships)
      return { person, films, starships, nodes, edges }
    },
  })
}

