export function Spinner({ label }: { label?: string }) {
	return (
		<div className="flex w-full items-center justify-center py-16">
			<div className="flex items-center gap-3 rounded-xl border border-white/15 bg-[rgba(255,255,255,0.06)] px-4 py-3 text-white shadow-lg backdrop-blur-md">
				<span className="relative inline-flex">
					<span className="size-5 rounded-full border-2 border-transparent border-t-white/80 border-l-white/60 animate-spin" />
				</span>
				<span className="text-sm opacity-90">{label ?? 'Loading...'}</span>
			</div>
		</div>
	)
}


