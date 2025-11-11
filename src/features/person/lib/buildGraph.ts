import { normalizeIdArray, extractId } from './id'
import type { PersonDetail, Film, Starship } from '@/entities/people/types'

export type GraphNode = { id: string; label: string; type: 'person' | 'film' | 'starship' }
export type GraphEdge = { id: string; source: string; target: string }

export function buildGraph(person: PersonDetail, films: Film[], starships: Starship[]) {
	const personId = extractId(person.id ?? person.url)

	const filmNodes: GraphNode[] = films.map((f) => ({
		id: `film:${extractId(f.id ?? f.url)}`,
		label: f.title,
		type: 'film',
	}))

	const starshipMap = new Map<number, Starship>()
	starships.forEach((ship) => {
		const id = extractId(ship.id ?? ship.url)
		if (!isNaN(id) && id > 0) {
			starshipMap.set(id, ship)
		}
	})

	const personStarshipIds = new Set(normalizeIdArray(person.starships ?? []))
	const filmStarshipIds = new Set(
		films.flatMap((f) => normalizeIdArray(f.starships ?? [])),
	)
	const intersected = [...filmStarshipIds].filter((id) => personStarshipIds.has(id))

	const starshipNodes: GraphNode[] = intersected.map((id) => {
		const starship = starshipMap.get(id)
		return {
			id: `starship:${id}`,
			label: starship?.name ?? `Starship ${id}`,
			type: 'starship' as const,
		}
	})

	const personNode: GraphNode = {
		id: `person:${personId}`,
		label: person.name,
		type: 'person',
	}

	const edges: GraphEdge[] = [
		...filmNodes.map((f) => ({
			id: `e:p-${personId}->f-${extractId(f.id)}`,
			source: personNode.id,
			target: f.id,
		})),
		...films.flatMap((f) => {
			const filmId = extractId(f.id ?? f.url)
			const sIds = normalizeIdArray(f.starships ?? [])
			return intersected
				.filter((id) => sIds.includes(id))
				.map((id) => ({
					id: `e:f-${filmId}->s-${id}`,
					source: `film:${filmId}`,
					target: `starship:${id}`,
				}))
		}),
	]

	return {
		nodes: [personNode, ...filmNodes, ...starshipNodes],
		edges,
	}
}


