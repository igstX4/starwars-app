import { http, HttpResponse } from 'msw'
import { API_BASE_URL } from '@/shared/config/env'

const base = API_BASE_URL

export const handlers = [
  http.get(`${base}/people/`, ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get('search') ?? ''
    const page = Number(url.searchParams.get('page') ?? '1')

    const all = [
      { id: 1, name: 'Luke Skywalker', gender: 'male', birth_year: '19BBY', url: `${base}/people/1/` },
      { id: 21, name: 'Palpatine', gender: 'male', birth_year: '82BBY', url: `${base}/people/21/` },
    ].filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

    const pageSize = 10
    const start = (page - 1) * pageSize
    const results = all.slice(start, start + pageSize)
    const next = start + pageSize < all.length ? `${base}/people/?page=${page + 1}&search=${search}` : null

    return HttpResponse.json({ count: all.length, next, previous: null, results })
  }),

  http.get(`${base}/people/:id/`, ({ params }) => {
    const id = Number(params.id)
    if (id === 21) {
      return HttpResponse.json({
        id,
        name: 'Palpatine',
        films: [2, 3, 4, 5, 6],
        starships: [],
        url: `${base}/people/${id}/`,
      })
    }
    return HttpResponse.json({
      id,
      name: 'Luke Skywalker',
      films: [2, 3],
      starships: [12, 22],
      url: `${base}/people/${id}/`,
    })
  }),

  http.get(`${base}/films/:id/`, ({ params }) => {
    const id: number = Number(params.id)
    const map: Record<number, { id: number; title: string; starships: number[] }> = {
      2: { id: 2, title: 'A New Hope', starships: [12] },
      3: { id: 3, title: 'Empire Strikes Back', starships: [22] },
      4: { id: 4, title: 'Return of the Jedi', starships: [] },
      5: { id: 5, title: 'The Phantom Menace', starships: [] },
      6: { id: 6, title: 'Attack of the Clones', starships: [] },
    }
    const fallback: { id: number; title: string; starships: number[] } = { id, title: `Film ${id}`, starships: [] }
    return HttpResponse.json(map[id] ?? fallback)
  }),

  http.get(`${base}/starships/:id/`, ({ params }) => {
    const id = Number(params.id)
    const map: Record<number, { id: number; name: string }> = {
      12: { id: 12, name: 'X-wing' },
      22: { id: 22, name: 'Imperial Shuttle' },
    }
    return HttpResponse.json(map[id] ?? { id, name: `Starship ${id}` })
  }),
]


