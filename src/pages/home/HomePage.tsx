import { HomeIntroCard } from '@/widgets/home-intro/ui/HomeIntroCard'
import { scrollToElementByIdWithOffset } from '@/shared/lib/scroll'
import { PeoplePage } from '@/pages/people/PeoplePage'

export function HomePage() {
	return (
		<div className="px-4">
			<div className="mx-auto max-w-5xl pt-28 md:pt-36 min-h-[calc(100dvh-9rem)] grid place-items-start">
				<HomeIntroCard />
				<div className="mt-6 flex w-full justify-center">
					<button
						type="button"
						onClick={() => {
							scrollToElementByIdWithOffset('people-section', -80)
						}}
						className="group inline-flex items-center justify-center rounded-full border border-white/20 bg-[rgba(255,255,255,0.06)] backdrop-blur-md p-2 text-white/90 hover:bg-[rgba(255,255,255,0.12)] transition"
						aria-label="Scroll to people list"
						title="Scroll to people list"
					>
						<svg viewBox="0 0 24 24" className="size-6 transition group-hover:translate-y-0.5" fill="currentColor" aria-hidden="true">
							<path d="M12 16.5 4.5 9l1.4-1.4L12 13.7l6.1-6.1L19.5 9 12 16.5z" />
						</svg>
					</button>
				</div>
			</div>
			<section id="people-section" className="mx-auto max-w-5xl pt-16">
				<PeoplePage />
			</section>
		</div>
	)
}


