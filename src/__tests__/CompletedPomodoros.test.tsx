import { render, screen } from '@testing-library/react'
import { AppContext } from '../services/useAppContext'
import CompletedPomodoros from '../components/CompletedPomodoros'
import { State } from '../types'

describe('CompletedPomodoros', () => {
  test('Renders the correct number of elements', async () => {
    const contextValue = {
      workTime: 100,
      restTime: 10,
      volumeOn: true,
      state: 'not-started' as State,
      setWorkTime: jest.fn(),
      setRestTime: jest.fn(),
      setVolumeOn: jest.fn(),
      start: jest.fn(),
      pause: jest.fn(),
      reset: jest.fn(),
      completedPomodoros: 0,
    }
    const { rerender } = render(
      <AppContext.Provider value={contextValue}>
        <CompletedPomodoros />
      </AppContext.Provider>
  )
    expect(screen.queryByTestId('completedPomodoros')).toBeFalsy()

    rerender(
      <AppContext.Provider value={{...contextValue, completedPomodoros: 3}}>
        <CompletedPomodoros />
      </AppContext.Provider>
    )
    const elements = await screen.findAllByTestId('streak')
    expect(elements).toHaveLength(3)
  })
})
