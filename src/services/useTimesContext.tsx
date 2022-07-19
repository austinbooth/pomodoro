/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useEffect, FC} from 'react'
import { getTimesFromLocalStorage } from '../helpers'
import soundfile from '../sounds/Alarm-clock-bell-ringing-sound-effect.mp3'
import { State } from '../types'

interface Args {
  workTime: number
  restTime: number
  setWorkTime: (value: number | React.SetStateAction<number>) => void
  setRestTime: (value: number | React.SetStateAction<number>) => void
  volumeOn: boolean
  setVolumeOn: (value: boolean | React.SetStateAction<boolean>) => void
  state: State
  stopCountdown: () => void
  start: () => void
  pause: () => void
  reset: () => void
  completedPomodoros: number
}

export const UserSettingsContext = createContext<Args | undefined>(undefined)

export const UserSettingsProvider: FC = ({children}) => {
  const times = getTimesFromLocalStorage()
  const [workTime, setWorkTime] = useState(times.workTime)
  const [restTime, setRestTime] = useState(times.restTime)
  const [volumeOn, setVolumeOn] = useState(true)
  const [state, setState] = useState<State>('not-started')
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timer>()
  const [completedPomodoros, setCompletedPomodoros] = useState(0)

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
    <UserSettingsContext.Provider value={{
      workTime, setWorkTime,
      restTime, setRestTime,
      volumeOn, setVolumeOn,
      state,
      stopCountdown,
      start,
      pause,
      reset,
      completedPomodoros,
    }}>
      {children}
    </UserSettingsContext.Provider>
  )
}

export default function useUserSettings() {
  const context = useContext(UserSettingsContext)
  if (context === undefined) {
    throw new Error('useUserSettings must be used in a userSettings provider')
  }
  return context
}
