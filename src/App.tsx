import { FC, useState } from 'react'
import './App.css'
import Countdown from './components/Countdown'
import ControlButtons from './components/ControlButtons'
import { State } from './types'

const App: FC = () => {
  const [currentPomodoro, setCurrentPomodoro] = useState(60)
  const [state, setState] = useState<State>('not-started')
  const start = () => setState('started')
  const pause = () => setState('paused')
  return (
    <div>
      <Countdown time={state === 'started' ? currentPomodoro * 1000 : 0} />
      <ControlButtons state={state} start={start} pause={pause} />
    </div>
  );
}

export default App;
