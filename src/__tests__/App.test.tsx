import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import App from '../App'
test('The time display decreases when start btn pressed', async() => {
  render(<App />)  
  screen.getByText('Start').click()
  expect(screen.getByTestId('countdown')).toHaveTextContent('01:00')
  await act(() => new Promise((resolve) => setTimeout(resolve, 3000)))
  expect(screen.getByTestId('countdown')).toHaveTextContent(/00:5[7|8]/)
})

