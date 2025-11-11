import { useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { usePersonGraph } from '@/features/person/hooks/usePersonGraph'
import ReactFlow, { Background, Controls } from 'reactflow'
import 'reactflow/dist/style.css'
import { Spinner } from '@/shared/ui/loader/Spinner'
import { IMG_BASE_PEOPLE } from '@/shared/config/env'

export function PersonPage() {
	const { id } = useParams()
	const personId = useMemo(() => Number(id), [id])
	const { data, status } = usePersonGraph(personId)

	if (status === 'pending') return <Spinner label="Loading person graph..." />
	if (!data) return <div className="p-6 text-white">Not found</div>

	const nodes = data.nodes.map((n, idx) => ({
		id: n.id,
		data: { label: n.label },
		position: { x: (idx % 4) * 220, y: Math.floor(idx / 4) * 120 },
		style:
			n.type === 'person'
				? { border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.08)', color: 'white' }
				: n.type === 'film'
				? { border: '1px solid rgba(96,165,250,0.4)', background: 'rgba(30,58,138,0.35)', color: 'white' }
				: { border: '1px solid rgba(147,197,253,0.4)', background: 'rgba(2,132,199,0.35)', color: 'white' },
	}))
	const edges = data.edges

	return (
		<div className="p-4 md:p-6 text-white">
			<div className="mx-auto max-w-5xl">
				<div className="mb-6 flex items-center gap-4">
					<img
						src={`${IMG_BASE_PEOPLE}/${personId}.jpg`}
						alt={data.person.name}
						className="h-20 w-20 rounded-lg object-cover bg-black/30"
					/>
					<div>
						<h1 className="text-2xl font-semibold">{data.person.name}</h1>
						<p className="text-white/70 text-sm">
							Films: {data.films.length}
						</p>
					</div>
				</div>

				<div className="h-[600px] w-full rounded-xl border border-white/20 bg-[rgba(255,255,255,0.06)] backdrop-blur-md">
					<ReactFlow nodes={nodes} edges={edges} fitView style={{ background: 'transparent' }} className="bg-transparent">
						<Background color="rgba(255,255,255,0.15)" />
						<Controls />
					</ReactFlow>
				</div>
			</div>
		</div>
	)
}


