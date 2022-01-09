import { render, screen } from '@testing-library/react'
import CompletedPomodoros from '../components/CompletedPomodoros'

describe('CompletedPomodoros', () => {
  test('Renders the correct number of elements', async () => {
    const { rerender } = render(<CompletedPomodoros completedPomodoros={0} />)
    expect(screen.queryByTestId('completedPomodoros')).toBeFalsy()

    rerender(<CompletedPomodoros completedPomodoros={3} />)
    const elements = await screen.findAllByTestId('streak')
    expect(elements).toHaveLength(3)
  })
})
