import { FC } from 'react'
import { State } from '../types'

interface Props {
  state: State
}

const Heading: FC<Props> = ({state}) => (
  <h1 id='phase'>{
    state === 'not-started'
      ? <div>&nbsp;</div>
      : state === 'work' || state === 'work-paused'
        ? 'Work'
        : 'Break'
  }</h1>
)

export default Heading
