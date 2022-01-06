import { FC } from 'react'
import Button from '@mui/material/Button'

const ControlButtons: FC = () => (
  <div id='control-btns'>
    <Button variant='contained' color='success'>Start</Button>
    <Button variant='contained' color='warning'>Pause</Button>
    <Button variant='contained' color='error'>Reset</Button>
  </div>
)

export default ControlButtons
