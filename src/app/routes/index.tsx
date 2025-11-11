import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './RootLayout'
import { PeoplePage } from '@/pages/people/PeoplePage'
import { PersonPage } from '@/pages/person/PersonPage'
import { HomePage } from '@/pages/home/HomePage'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'people', element: <PeoplePage /> },
			{ path: 'person/:id', element: <PersonPage /> },
		],
	},
])


