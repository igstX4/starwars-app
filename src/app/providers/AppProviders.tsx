import type { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			gcTime: 15 * 60 * 1000,
			retry: (failureCount, error) => {
				if (isAxiosError(error) && error.response?.status === 404) {
					return false
				}
				if (error instanceof Error && error.message.includes('404')) {
					return false
				}
				return failureCount < 2
			},
			retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),
			refetchOnWindowFocus: false,
		},
	},
})

export function AppProviders({ children }: PropsWithChildren) {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}


