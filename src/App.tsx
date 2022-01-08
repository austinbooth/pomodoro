import { FC, useState, useEffect } from 'react'
import './App.css'
import Countdown from './components/Countdown'
import ControlButtons from './components/ControlButtons'
import { State } from './types'

const App: FC = () => {
  const workSeconds = 60
  const restSeconds = 10
  const [workTime, setWorkTime] = useState(workSeconds)
  const [restTime, setRestTime] = useState(restSeconds)
  const [state, setState] = useState<State>('not-started')
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timer>()
  const start = () => {
    if (state === 'not-started' || state === 'work-paused') {
      setState('work')
    } else {
      setState('rest')
    }
  }
  const pause = () => {
    if (state === 'work') {
      setState('work-paused')
    } else {
      setState('rest-paused')
    }
  }
  const decrementWorkTime = () => setWorkTime(time => time - 1)
  const decrementRestTime = () => setRestTime(time => time - 1)
  const stopCountdown = () => {
    if (intervalRef) {
      clearInterval(intervalRef)
    }
  }

  useEffect(() => {
    if (state === 'work') {
      const interval_ref = setInterval(decrementWorkTime, 1000)
      setIntervalRef(interval_ref)

      return () => clearInterval(interval_ref)
    }
    if (state === 'work-paused' && intervalRef) {
      clearInterval(intervalRef)
    }
    if (state === 'rest') {
      const interval_ref = setInterval(decrementRestTime, 1000)
      setIntervalRef(interval_ref)

      return () => clearInterval(interval_ref)
    }
    if (state === 'rest-paused' && intervalRef) {
      clearInterval(intervalRef)
    }
  }, [state])

  useEffect(() => {
    if (workTime === 0 && state === 'work') {
      setState('rest')
      setWorkTime(workSeconds)
    }
    if (restTime === 0 && state === 'rest') {
      setState('not-started')
      setRestTime(restSeconds)
    }
  }, [workTime, restTime])

  const getTime = (state: State, workTime: number, restTime: number) => {
    if (state === 'work' || state === 'work-paused') {
      return workTime * 1000
    }
    if (state === 'rest' || state === 'rest-paused') {
      return restTime * 1000
    }
    return 0 // state must be 'not-started'
  }

  return (
    <div>
      <Countdown time={getTime(state, workTime, restTime)} stopCountdown={stopCountdown} />
      <ControlButtons state={state} start={start} pause={pause} />
    </div>
  );
}

export default App;
