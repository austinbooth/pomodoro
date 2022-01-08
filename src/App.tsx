import { FC, useState, useEffect } from 'react'
import './App.css'
import Countdown from './components/Countdown'
import ControlButtons from './components/ControlButtons'
import { State } from './types'

const App: FC = () => {
  const [currentPomodoro, setCurrentPomodoro] = useState(60)
  const [state, setState] = useState<State>('not-started')
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timer>()
  const start = () => setState('work')
  const pause = () => setState('work-paused')
  const decrementTime = () => setCurrentPomodoro(time => time - 1)
  const stopCountdown = () => {
    if (intervalRef) {
      clearInterval(intervalRef)
    }
  }

  useEffect(() => {
    if (state === 'work') {
      const interval_ref = setInterval(decrementTime, 1000)
      setIntervalRef(interval_ref)

      return () => clearInterval(interval_ref)
    }
    if (state === 'work-paused' && intervalRef) {
      clearInterval(intervalRef)
    }
  }, [state])

  useEffect(() => {
    if (currentPomodoro === 0) {
      setState('not-started')
      setCurrentPomodoro(60)
    }
  }, [currentPomodoro])

  return (
    <div>
      <Countdown time={state === 'not-started' ? 0 : currentPomodoro * 1000} stopCountdown={stopCountdown} />
      <ControlButtons state={state} start={start} pause={pause} />
    </div>
  );
}

export default App;
