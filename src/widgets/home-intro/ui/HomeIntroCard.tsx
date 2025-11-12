import logo from '@/assets/logo.png'

export function HomeIntroCard() {
	return (
		<div className="w-full rounded-2xl border border-white/15 bg-[rgba(255,255,255,0.06)] backdrop-blur-xl shadow-lg p-6 md:p-10 text-white">
			<div className="flex flex-col items-center text-center gap-4 md:gap-6">
				<img
					src={logo}
					alt="Star Wars emblem"
					className="h-16 w-auto opacity-90 drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
				/>
				<h1 className="text-3xl md:text-4xl font-bold tracking-[0.25em] uppercase [text-shadow:0_0_10px_rgba(255,255,255,0.6),0_0_24px_#8bd4ff]">
					Star&nbsp;Wars
				</h1>
				<p className="max-w-2xl text-white/80">
					Explore characters of Star Wars, see films they appear in, and visualize the starships they
					travelled with using interactive graphs.
				</p>
				<a
					href="https://sw-api.starnavi.io/documentation"
					target="_blank"
					rel="noreferrer"
					className="mt-2 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition"
				>
					<span>Open API documentation</span>
					<svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
						<path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z" />
					</svg>
				</a>
			</div>
		</div>
	)
}



