import { api } from './client'
import type { PeopleResponse, PersonDetail, Film, Starship } from '@/entities/people/types'

export async function fetchPeople({ page = 1, search = '' }: { page?: number; search?: string }) {
	const params = new URLSearchParams()
	params.set('page', String(page))
	if (search) params.set('search', search)
	const { data } = await api.get<PeopleResponse>(`/people/?${params.toString()}`)
	return data
}

export async function fetchPerson(id: number): Promise<PersonDetail> {
	const { data } = await api.get<PersonDetail>(`/people/${id}/`)
	return data
}

export async function fetchFilm(id: number): Promise<Film> {
	const { data } = await api.get<Film>(`/films/${id}/`)
	return data
}

export async function fetchStarship(id: number): Promise<Starship> {
	const { data } = await api.get<Starship>(`/starships/${id}/`)
	return data
}



