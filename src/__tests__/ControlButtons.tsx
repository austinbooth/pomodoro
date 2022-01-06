import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import ControlButtons from '../components/ControlButtons'

describe('ControlButtons', () => {
  test('Renders the correct number of buttons', () => {
    render(<ControlButtons />)
    const btns = screen.getAllByRole('button')
    expect(btns).toHaveLength(3)
  })
})
