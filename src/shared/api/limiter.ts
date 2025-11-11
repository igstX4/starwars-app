type SemaphoreOptions = {
	maxConcurrent: number
	minSpacingMs?: number
	jitterRatio?: number
}
// fix 429
export class Semaphore {
	private current = 0
	private readonly queue: Array<() => void> = []
	private readonly minSpacingMs: number
	private readonly jitterRatio: number
	private readonly max: number

	constructor(max: number, opts?: Omit<SemaphoreOptions, 'maxConcurrent'>) {
		this.max = max
		this.minSpacingMs = opts?.minSpacingMs ?? 0
		this.jitterRatio = opts?.jitterRatio ?? 0.2
	}

	async acquire() {
		if (this.current < this.max) {
			this.current += 1
			return
		}
		await new Promise<void>((resolve) => this.queue.push(resolve))
		this.current += 1
	}
	
	release() {
		this.current = Math.max(0, this.current - 1)
		const next = this.queue.shift()
		if (!next) return
		const jitter = this.minSpacingMs * this.jitterRatio * Math.random()
		const delay = Math.max(0, this.minSpacingMs + jitter)
		if (delay > 0) {
			setTimeout(next, delay)
		} else {
			next()
		}
	}
}

export const globalSemaphore = new Semaphore(2, { minSpacingMs: 150, jitterRatio: 0.3 })

export function sleep(ms: number) {
	return new Promise((r) => setTimeout(r, ms))
}


