import { describe, it, expect } from 'vitest'
import { buildGraph } from './buildGraph'

describe('buildGraph', () => {
  const person = {
    id: 1,
    name: 'Luke Skywalker',
    starships: [12, 'starships/22/'],
  }
  const films = [
    { id: 2, title: 'A New Hope', starships: [12] },
    { id: 'https://sw-api.starnavi.io/films/3/', title: 'Empire Strikes Back', starships: [22, 99] },
  ]
  const starships = [
    { id: 12, name: 'X-wing' },
    { id: 22, name: 'Imperial Shuttle' },
  ]

  it('creates nodes and edges: person → films and films → intersected starships', () => {
    const { nodes, edges } = buildGraph(person, films, starships)

    // person node
    expect(nodes.find((n) => n.id === 'person:1' && n.label === 'Luke Skywalker')).toBeTruthy()
    // film nodes
    expect(nodes.find((n) => n.id === 'film:2' && n.label === 'A New Hope')).toBeTruthy()
    expect(nodes.find((n) => n.id === 'film:3' && n.label === 'Empire Strikes Back')).toBeTruthy()
    // starship nodes (only intersected ids: 12 and 22) with real names
    const starship12 = nodes.find((n) => n.id === 'starship:12')
    expect(starship12).toBeTruthy()
    expect(starship12?.label).toBe('X-wing')
    const starship22 = nodes.find((n) => n.id === 'starship:22')
    expect(starship22).toBeTruthy()
    expect(starship22?.label).toBe('Imperial Shuttle')
    expect(nodes.find((n) => n.id === 'starship:99')).toBeFalsy()

    // edges person -> films
    expect(edges.find((e) => e.source === 'person:1' && e.target === 'film:2')).toBeTruthy()
    expect(edges.find((e) => e.source === 'person:1' && e.target === 'film:3')).toBeTruthy()
    // edges films -> starships (only if present in that film)
    expect(edges.find((e) => e.source === 'film:2' && e.target === 'starship:12')).toBeTruthy()
    expect(edges.find((e) => e.source === 'film:2' && e.target === 'starship:22')).toBeFalsy()
    expect(edges.find((e) => e.source === 'film:3' && e.target === 'starship:22')).toBeTruthy()
  })
})


