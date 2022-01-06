import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import ControlButtons from '../components/ControlButtons'

describe('ControlButtons', () => {
  test('Renders the correct number of buttons', () => {
    const mock = jest.fn()
    render(<ControlButtons state='not-started' start={mock} pause={mock} />)
    const btns = screen.getAllByRole('button')
    expect(btns).toHaveLength(3)
  })
})
