import { Outlet } from 'react-router-dom'
import { SkyBackground } from '@/shared/ui/backgrounds/SkyBackground'
import { Header } from '@/shared/ui/header/Header'

export default function RootLayout() {
	return (
		<div className="min-h-dvh w-dvw">
			<SkyBackground>
				<Header />
				<div className="pt-20">
					<Outlet />
				</div>
			</SkyBackground>
		</div>
	)
}


