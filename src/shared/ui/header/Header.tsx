import { Link } from 'react-router-dom'
import logo from '@/assets/logo.png'

export function Header() {
	return (
		<header className="fixed inset-x-3 top-3 z-50">
			<div className="mx-auto max-w-5xl rounded-2xl border border-white/15 bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] px-4 py-2 text-white shadow-lg backdrop-blur-lg transition-colors">
				<div className="grid grid-cols-3 items-center">
					<Link to="/" className="flex items-center justify-start">
						<img
							src={logo}
							alt="Stormtrooper"
							className="h-7 w-auto drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]"
						/>
					</Link>
					<Link to="/" className="flex items-center h-full justify-center">
						<span
							className="select-none text-lg md:text-xl font-semibold tracking-[0.25em] uppercase text-white/95
              [text-shadow:0_0_8px_rgba(255,255,255,0.6),0_0_18px_#8bd4ff]
              transition
              hover:[text-shadow:0_0_10px_rgba(255,255,255,0.9),0_0_28px_#8bd4ff]"
						>
							Star&nbsp;Wars
						</span>
					</Link>
					<div className="flex items-center justify-end">
						<a
							href="https://github.com/igstX4/starwars-app"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 p-1 transition hover:bg-white/20"
							aria-label="Open GitHub"
							title="Open GitHub"
						>
							<svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
								<path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.25.82-.57v-2.1c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.78-1.34-1.78-1.1-.76.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.86 2.84 1.32 3.53 1.01.11-.79.42-1.32.77-1.62-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.25-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.24a11.5 11.5 0 0 1 6 0c2.29-1.56 3.3-1.24 3.3-1.24.66 1.65.24 2.87.12 3.17.77.85 1.24 1.93 1.24 3.25 0 4.63-2.8 5.66-5.48 5.96.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.82.57A12 12 0 0 0 12 .5Z" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</header>
	)
}


