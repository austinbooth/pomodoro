import { FC } from 'react'
import Button from '@mui/material/Button'
import { State } from '../types'

interface Props {
  state: State
  start: () => void
  pause: () => void
  reset: () => void
}

const ControlButtons: FC<Props> = ({state, start, pause, reset}) => (
  <div id='control-btns'>
    <Button
      variant='contained'
      color='success'
      onClick={start}
      disabled={state === 'work' || state === 'rest'}
    >
      Start
    </Button>
    <Button
      variant='contained'
      color='warning'
      onClick={pause}
      disabled={state === 'not-started' || state === 'work-paused' || state === 'rest-paused'}
    >
      Pause
    </Button>
    <Button
      variant='contained'
      color='error'
      onClick={reset}
      disabled={state === 'not-started'}
    >
      Reset
    </Button>
  </div>
)

export default ControlButtons
