import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import { Provider } from '../services/useAppContext'
import ControlButtons from '../components/ControlButtons'

const renderComponent = () => render(
  <Provider>
    <ControlButtons />
  </Provider>
)

describe('ControlButtons', () => {
  test('Renders the correct number of buttons', () => {
    renderComponent()
    const btns = screen.getAllByRole('button')
    expect(btns).toHaveLength(4)
  })
  test('The buttons are in the correct enabled/disabled state at the start', () => {
    renderComponent()
    expect(screen.getByText('Start')).toBeEnabled()
    expect(screen.getByText('Pause')).toBeDisabled()
    expect(screen.getByText('Reset')).toBeDisabled()
    expect(screen.getByText('Change times')).toBeEnabled()
  })
})
