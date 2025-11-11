import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { PeoplePage } from './PeoplePage'

function renderWithProviders(ui: React.ReactNode, initialEntries = ['/people']) {
  const client = new QueryClient()
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/people" element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('PeoplePage', () => {
  it('renders people from API mock without real network', async () => {
    renderWithProviders(<PeoplePage />)
    await waitFor(async () => {
      expect(await screen.findByText(/People/i)).toBeInTheDocument()
      expect(await screen.findByText(/Luke Skywalker/i)).toBeInTheDocument()
      expect(await screen.findByText(/Palpatine/i)).toBeInTheDocument()
    })
  })
})


