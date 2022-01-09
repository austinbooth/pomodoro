/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from 'react'
import './App.css'
import Countdown from './components/Countdown'
import ControlButtons from './components/ControlButtons'
import Streak from './components/Streak'
import Heading from './components/Heading'
import { getTime } from './helpers'
import { State } from './types'

const App: FC = () => {
  const workSeconds = 60
  const restSeconds = 10
  const [workTime, setWorkTime] = useState(workSeconds)
  const [restTime, setRestTime] = useState(restSeconds)
  const [state, setState] = useState<State>('not-started')
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timer>()
  const [streak, setStreak] = useState(0)
  const start = () => {
    if (state === 'not-started' || state === 'work-paused') {
      setState('work')
    } else {
      setState('rest')
    }
  }
  const pause = () => state === 'work' ? setState('work-paused') : setState('rest-paused')
  const reset = () => {
    if (state !== 'not-started') {
      if (intervalRef) {
        clearInterval(intervalRef)
      }
      setState('not-started')
      setWorkTime(workSeconds)
      setRestTime(restSeconds)
    }
  }
  const decrementWorkTime = () => setWorkTime(time => time - 1)
  const decrementRestTime = () => setRestTime(time => time - 1)
  const stopCountdown = () => {
    if (intervalRef) {
      clearInterval(intervalRef)
    }
  }
  const incrementStreak = () => setStreak(streak => streak + 1)

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
      setRestTime(restSeconds)
      incrementStreak()
      setState('work') // start next round
    }
  }, [workTime, restTime])

  return (
    <div id='App'>
      <Heading state={state} />
      <Countdown time={getTime(state, workTime, restTime)} stopCountdown={stopCountdown} />
      <ControlButtons state={state} start={start} pause={pause} reset={reset} />
      <Streak streak={streak} />
    </div>
  );
}

export default App;
