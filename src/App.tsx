import { FC, useState, useEffect } from 'react'
import './App.css'
import Countdown from './components/Countdown'
import ControlButtons from './components/ControlButtons'
import { State } from './types'

const App: FC = () => {
  const [currentPomodoro, setCurrentPomodoro] = useState(60)
  const [state, setState] = useState<State>('not-started')
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timer>()
  const start = () => setState('started')
  const pause = () => setState('paused')
  const decrementTime = () => setCurrentPomodoro(time => time - 1)
  const stopCountdown = () => {
    if (intervalRef) {
      clearInterval(intervalRef)
    }
  }

  useEffect(() => {
    if (state === 'started') {
      const interval_ref = setInterval(decrementTime, 1000)
      setIntervalRef(interval_ref)

      return () => clearInterval(interval_ref)
    }
  }, [state])

  return (
    <div>
      <Countdown time={state === 'started' ? currentPomodoro * 1000 : 0} stopCountdown={stopCountdown} />
      <ControlButtons state={state} start={start} pause={pause} />
    </div>
  );
}

export default App;
