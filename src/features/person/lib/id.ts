export function extractId(value: unknown): number {
	if (typeof value === 'number') return value
	const match = String(value ?? '').match(/(\d+)/)
	return match ? Number(match[1]) : NaN
}

export function normalizeIdArray(arr: unknown[]): number[] {
	return arr.map(extractId).filter((n) => !isNaN(n) && n > 0)
}


