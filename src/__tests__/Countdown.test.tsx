import { render, screen } from '@testing-library/react'
import Countdown from '../components/Countdown'

describe('Countdown', () => {
  test('Renders the time correctly when time = 0 is passed', () => {
    render(<Countdown time={0} />)
    const element = screen.getByTestId('countdown')
    expect(element).toHaveTextContent('00:00')
  })
  test('Renders the time correctly when time is passed in milliseconds',  () => {
    const { rerender } = render(<Countdown time={1_000} />)
    const element = screen.getByTestId('countdown')
    expect(element).toHaveTextContent('00:01')

    rerender(<Countdown time={30_000} />)
    const element2 = screen.getByTestId('countdown')
    expect(element2).toHaveTextContent('00:30')

    rerender(<Countdown time={186_000} />)
    const element3 = screen.getByTestId('countdown')
    expect(element3).toHaveTextContent('03:06')

    rerender(<Countdown time={779_000} />)
    const element4 = screen.getByTestId('countdown')
    expect(element4).toHaveTextContent('12:59')
  })
})