import { FC } from 'react'
import Button from '@mui/material/Button'
import ChangeTimesDialog from './ChangeTimesDialog'
import useUserSettings from '../services/useTimesContext'

const ControlButtons: FC = () => {
  const {state, start, pause, reset} = useUserSettings()
  return (
    <>
      <div id='control-btns'>
        <Button
          variant='contained'
          color='success'
          onClick={start}
          disabled={state === 'work' || state === 'rest'}
        >
          Start
        </Button>
        <div className='control-button'>
          <Button
            variant='contained'
            color='warning'
            onClick={pause}
            disabled={state === 'not-started' || state === 'work-paused' || state === 'rest-paused'}
          >
            Pause
          </Button>
        </div>
        <Button
          variant='contained'
          color='error'
          onClick={reset}
          disabled={state === 'not-started'}
        >
          Reset
        </Button>
      </div>
      <ChangeTimesDialog disabled={state !== 'not-started'} />
    </>
)}

export default ControlButtons
