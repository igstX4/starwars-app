import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { PersonPage } from './PersonPage'

function renderWithProviders(initialEntries = ['/person/21']) {
  const client = new QueryClient()
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/person/:id" element={<PersonPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('PersonPage', () => {
  it('renders person name and graph container using mocks (no network)', async () => {
    renderWithProviders()
    const nameEl = await screen.findByRole('heading', { name: /Palpatine/i })
    const filmsEl = await screen.findByText(/Films:/i, { selector: 'p' })
    expect(nameEl).toBeInTheDocument()
    expect(filmsEl).toBeInTheDocument()
  })
})


