import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Person } from '@/entities/people/types'
import { IMG_BASE_PEOPLE } from '@/shared/config/env'
import fallbackLogo from '@/assets/logo.png'

export function PeopleCard({ person }: { person: Person }) {
	const [imgError, setImgError] = useState(false)
	const isValidId = !isNaN(person.id) && person.id > 0
	const imgSrc = isValidId ? `${IMG_BASE_PEOPLE}/${person.id}.jpg` : ''
	const fallbackSrc = fallbackLogo
	const navigate = useNavigate()

	return (
		<button
			type="button"
			onClick={() => navigate(`/person/${person.id}`)}
			className="group text-left overflow-hidden rounded-xl border border-white/15 bg-[rgba(255,255,255,0.06)] backdrop-blur-xl text-white shadow-lg"
		>
			<div className="relative aspect-[3/4] w-full overflow-hidden bg-black/20">
				{!imgError && isValidId && imgSrc ? (
					<img
						src={imgSrc}
						alt={person.name}
						className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
						onError={() => setImgError(true)}
						loading="lazy"
					/>
				) : (
					<div className="flex size-full items-center justify-center">
						<img src={fallbackSrc} alt={person.name} className="h-12 w-12 opacity-50" />
					</div>
				)}
			</div>
			<div className="p-3">
				<h3 className="text-sm font-semibold leading-tight">{person.name}</h3>
				<p className="mt-1 text-xs text-white/70">
					{person.gender ? `Gender: ${person.gender}` : '—'}
				</p>
			</div>
		</button>
	)
}



