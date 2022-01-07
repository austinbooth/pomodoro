import { render, screen } from '@testing-library/react'
import Countdown from '../components/Countdown'

const generateMockStopCountdown = () => jest.fn()

describe('Countdown', () => {
  test('Renders the time correctly when time = 0 is passed', () => {
    render(<Countdown time={0} stopCountdown={() => generateMockStopCountdown()} />)
    const element = screen.getByTestId('countdown')
    expect(element).toHaveTextContent('00:00')
  })
  test('Renders the time correctly when time is passed in milliseconds',  () => {
    const { rerender } = render(<Countdown time={1_000} stopCountdown={() => generateMockStopCountdown()} />)
    const element = screen.getByTestId('countdown')
    expect(element).toHaveTextContent('00:01')

    rerender(<Countdown time={30_000} stopCountdown={() => generateMockStopCountdown()} />)
    const element2 = screen.getByTestId('countdown')
    expect(element2).toHaveTextContent('00:30')

    rerender(<Countdown time={186_000} stopCountdown={() => generateMockStopCountdown()} />)
    const element3 = screen.getByTestId('countdown')
    expect(element3).toHaveTextContent('03:06')

    rerender(<Countdown time={779_000} stopCountdown={() => generateMockStopCountdown()} />)
    const element4 = screen.getByTestId('countdown')
    expect(element4).toHaveTextContent('12:59')
  })
  test(
    'Display 00:00 time if passed a negaive time value and calls stop countdown function',
    () => {
      const mockStopCountdown = generateMockStopCountdown()
      render(<Countdown time={-1000} stopCountdown={mockStopCountdown} />)
      const element = screen.getByTestId('countdown')
      expect(element).toHaveTextContent('00:00')
      expect(mockStopCountdown).toHaveBeenCalled()
    }
  )
})