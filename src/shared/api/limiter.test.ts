import { describe, it, expect } from 'vitest'
import { Semaphore, sleep } from './limiter'

describe('Semaphore', () => {
  it('limits concurrency to max', async () => {
    const sem = new Semaphore(2, { minSpacingMs: 0 })
    let running = 0
    let maxObserved = 0

    async function task() {
      await sem.acquire()
      running++
      maxObserved = Math.max(maxObserved, running)
      await sleep(50)
      running--
      sem.release()
    }

    await Promise.all([task(), task(), task(), task()])
    expect(maxObserved).toBeLessThanOrEqual(2)
  })

  it('applies minimal spacing with jitter between queued tasks', async () => {
    const min = 60
    const sem = new Semaphore(1, { minSpacingMs: min, jitterRatio: 0 })
    const timestamps: number[] = []

    async function task() {
      await sem.acquire()
      timestamps.push(performance.now())
      await sleep(10)
      sem.release()
    }

    await Promise.all([task(), task(), task()])
    // Differences between sequential starts should be at least ~min ms
    const diffs = []
    for (let i = 1; i < timestamps.length; i++) diffs.push(timestamps[i] - timestamps[i - 1])
    expect(diffs.length).toBeGreaterThan(0)
    expect(diffs.every((d) => d >= min - 5)).toBe(true)
  })
})


