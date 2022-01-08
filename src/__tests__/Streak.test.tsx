import { render, screen } from '@testing-library/react'
import Streak from '../components/Streak'

describe('Streak', () => {
  test('Renders the correct number of elements', async () => {
    const { rerender } = render(<Streak streak={0} />)
    expect(screen.queryByTestId('streak')).toBeFalsy()

    rerender(<Streak streak={3} />)
    const elements = await screen.findAllByTestId('streak')
    expect(elements).toHaveLength(3)
  })
})
