import { FC } from 'react'
import Button from '@mui/material/Button'
import { State } from '../types'

interface Props {
  state: State
  start: () => void
  pause: () => void
}

const ControlButtons: FC<Props> = ({state, start, pause}) => (
  <div id='control-btns'>
    <Button
      variant='contained'
      color='success'
      onClick={start}
      disabled={state === 'work'}
    >
      Start
    </Button>
    <Button
      variant='contained'
      color='warning'
      onClick={pause}
      disabled={state === 'work-paused' || state === 'not-started'}
    >
      Pause
    </Button>
    <Button variant='contained' color='error'>Reset</Button>
  </div>
)

export default ControlButtons
