import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import App from '../App'
test('The time display decreases when start btn pressed', async() => {
  render(<App />)  
  screen.getByText('Start').click()
  expect(screen.getByTestId('countdown')).toHaveTextContent('25:00')
  await act(() => new Promise((resolve) => setTimeout(resolve, 3000)))
  expect(screen.getByTestId('countdown')).toHaveTextContent(/24:5[7|8]/)
})
test('Pause button works', async () => {
  render(<App />)  
  screen.getByText('Start').click()
  await act(() => new Promise((resolve) => setTimeout(resolve, 2000)))
  screen.getByText('Pause').click()
  expect(screen.getByText('Start')).toBeEnabled()
  expect(screen.getByText('Pause')).toBeDisabled()
  expect(screen.getByText('Reset')).toBeEnabled()
  await act(() => new Promise((resolve) => setTimeout(resolve, 2000)))
  expect(screen.getByTestId('countdown')).toHaveTextContent(/24:5[8|9]/)
})
test('Change times btn is only enabled when not in a pomodoro', () => {
  render(<App />)
  expect(screen.getByText('Change times')).toBeEnabled()
  screen.getByText('Start').click()
  expect(screen.getByText('Change times')).toBeDisabled()
  screen.getByText('Pause').click()
  expect(screen.getByText('Change times')).toBeDisabled()
  screen.getByText('Reset').click()
  expect(screen.getByText('Change times')).toBeEnabled()
})
