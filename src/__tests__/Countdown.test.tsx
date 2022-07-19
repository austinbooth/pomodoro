import { render, screen } from '@testing-library/react'
import Countdown from '../components/Countdown'
import { UserSettingsContext } from '../services/useTimesContext'
import { State } from '../types'

describe('Countdown', () => {
  const contextValue = {
    workTime: 0,
    restTime: 0,
    volumeOn: true,
    state: 'work' as State,
    setWorkTime: jest.fn(),
    setRestTime: jest.fn(),
    setVolumeOn: jest.fn(),
    start: jest.fn(),
    pause: jest.fn(),
    reset: jest.fn(),
    completedPomodoros: 0,
  }
  test('Renders the time correctly when time = 0 is passed', () => {
    render(
      <UserSettingsContext.Provider value={contextValue}>
        <Countdown />
      </UserSettingsContext.Provider>
    )
    const element = screen.getByTestId('countdown')
    expect(element).toHaveTextContent('00:00')
  })
  test('Renders the time correctly when time is passed in milliseconds',  () => {
    const { rerender } = render(
      <UserSettingsContext.Provider value={{...contextValue, workTime: 1}}>
        <Countdown />
      </UserSettingsContext.Provider>
    )
    const element = screen.getByTestId('countdown')
    expect(element).toHaveTextContent('00:01')

    rerender(
      <UserSettingsContext.Provider value={{...contextValue, workTime: 30}}>
        <Countdown />
      </UserSettingsContext.Provider>
    )
    const element2 = screen.getByTestId('countdown')
    expect(element2).toHaveTextContent('00:30')

    rerender(
      <UserSettingsContext.Provider value={{...contextValue, workTime: 186}}>
        <Countdown />
      </UserSettingsContext.Provider>
    )
    const element3 = screen.getByTestId('countdown')
    expect(element3).toHaveTextContent('03:06')

    rerender(
      <UserSettingsContext.Provider value={{...contextValue, workTime: 779}}>
        <Countdown />
      </UserSettingsContext.Provider>
    )
    const element4 = screen.getByTestId('countdown')
    expect(element4).toHaveTextContent('12:59')
  })
  test(
    'Display 00:00 time if passed a negaive time value and calls stop countdown function',
    () => {
      render(
        <UserSettingsContext.Provider
          value={{
            ...contextValue,
            workTime: -1,
          }}
        >
        <Countdown />
      </UserSettingsContext.Provider>
      )
      const element = screen.getByTestId('countdown')
      expect(element).toHaveTextContent('00:00')
    }
  )
})