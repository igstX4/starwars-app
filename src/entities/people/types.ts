export type Person = {
	id: number
	name: string
	gender: string
	birth_year: string
	height: string
	mass: string
	hair_color: string
	skin_color: string
	eye_color: string
	homeworld: number
	films: number[]
	species: number[]
	starships: number[]
	vehicles: number[]
	url: string
	created: string
	edited: string
  }
  
  export type PeopleResponse = {
	count: number
	next: string | null
	previous: string | null
	results: Person[]
}

export type Film = {
	id?: number
	url?: string
	title: string
	starships?: (number | string)[]
}

export type Starship = {
	id?: number
	url?: string
	name: string
}

export type PersonDetail = {
	id?: number
	url?: string
	name: string
	films?: (number | string)[]
	starships?: (number | string)[]
}