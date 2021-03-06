/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from 'react'
import './App.css'
import Countdown from './components/Countdown'
import ControlButtons from './components/ControlButtons'
import CompletedPomodoros from './components/CompletedPomodoros'
import Heading from './components/Heading'
import { getTime, getTimesFromLocalStorage } from './helpers'
import { UserSettingsContext } from './services/useTimesContext'
import soundfile from './sounds/Alarm-clock-bell-ringing-sound-effect.mp3'
import { State } from './types'

const App: FC = () => {
  const times = getTimesFromLocalStorage()
  const [workTime, setWorkTime] = useState(times.workTime)
  const [restTime, setRestTime] = useState(times.restTime)
  const [state, setState] = useState<State>('not-started')
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timer>()
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [volumeOn, setVolumeOn] = useState(true)

  const sound = new Audio(soundfile)
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
    }
  }

  const decrementTime = (state: 'work' | 'rest') => state === 'work'
    ? setWorkTime(time => time - 1)
    : setRestTime(time => time - 1)

  const stopCountdown = () => {
    if (intervalRef) {
      clearInterval(intervalRef)
    }
  }
  const incrementCompletedPomodoros = () => setCompletedPomodoros(completed => completed + 1)

  useEffect(() => {
    if (state === 'not-started') {
      setWorkTime(times.workTime)
      setRestTime(times.restTime)
    }
    if (state === 'work' || state === 'rest') {
      const interval_ref = setInterval(() => decrementTime(state), 1000)
      setIntervalRef(interval_ref)
      return () => clearInterval(interval_ref)
    } else { // state must be 'work-paused' || 'rest-paused'
      stopCountdown()
    }
  }, [state])

  useEffect(() => {
    if (workTime === 0 && state === 'work') {
      setState('rest')
      setWorkTime(times.workTime)
      if (volumeOn) {
        sound.play()
      }
    }
    if (restTime === 0 && state === 'rest') {
      setState('work') // start next round
      setRestTime(times.restTime)
      incrementCompletedPomodoros()
      if (volumeOn) {
        sound.play()
      }
    }
  }, [workTime, restTime])

  return (
    <div id='App'>
      <Heading state={state} />
      <Countdown time={getTime(state, workTime, restTime)} stopCountdown={stopCountdown} />
      <UserSettingsContext.Provider value={{
          workTime, setWorkTime,
          restTime, setRestTime,
          volumeOn, setVolumeOn,
        }}
      >
        <ControlButtons state={state} start={start} pause={pause} reset={reset} />
      </UserSettingsContext.Provider>
      <CompletedPomodoros completedPomodoros={completedPomodoros} />
    </div>
  )
}

export default App;
