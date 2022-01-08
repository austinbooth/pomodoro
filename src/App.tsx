import { FC, useState, useEffect } from 'react'
import './App.css'
import Countdown from './components/Countdown'
import ControlButtons from './components/ControlButtons'
import { State } from './types'

const App: FC = () => {
  const [workTime, setWorkTime] = useState(60)
  const [restTime, setRestTime] = useState(10)
  const [state, setState] = useState<State>('not-started')
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timer>()
  const start = () => setState('work')
  const pause = () => setState('work-paused')
  const decrementTime = () => setWorkTime(time => time - 1)
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
    if (workTime === 0) {
      setState('not-started')
      setWorkTime(60)
    }
  }, [workTime])

  return (
    <div>
      <Countdown time={state === 'not-started' ? 0 : workTime * 1000} stopCountdown={stopCountdown} />
      <ControlButtons state={state} start={start} pause={pause} />
    </div>
  );
}

export default App;
