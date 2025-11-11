import { beforeAll, afterAll, afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { server } from '@/test/msw/server'

// Polyfills for JSDOm
if (!('ResizeObserver' in globalThis)) {
	class ResizeObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	}
	;(globalThis as any).ResizeObserver = ResizeObserver
}

if (!('IntersectionObserver' in globalThis)) {
	class IntersectionObserver {
		constructor(_: any, __?: any) {}
		observe() {}
		unobserve() {}
		disconnect() {}
		takeRecords() { return [] }
	}
	;(globalThis as any).IntersectionObserver = IntersectionObserver as any
}

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


