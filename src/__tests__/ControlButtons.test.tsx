import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import ControlButtons from '../components/ControlButtons'

describe('ControlButtons', () => {
  test('Renders the correct number of buttons', () => {
    const mock = jest.fn()
    render(<ControlButtons state='not-started' start={mock} pause={mock} reset={mock} />)
    const btns = screen.getAllByRole('button')
    expect(btns).toHaveLength(4)
  })
  test('The buttons are in the correct enabled/disabled state at the start', () => {
    const mock = jest.fn()
    render(<ControlButtons state='not-started' start={mock} pause={mock} reset={mock} />)
    expect(screen.getByText('Start')).toBeEnabled()
    expect(screen.getByText('Pause')).toBeDisabled()
    expect(screen.getByText('Reset')).toBeDisabled()
    expect(screen.getByText('Change times')).toBeEnabled()
  })
})
