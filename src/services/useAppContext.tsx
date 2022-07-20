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
  start: () => void
  pause: () => void
  reset: () => void
  completedPomodoros: number
}

export const AppContext = createContext<Args | undefined>(undefined)

export const Provider: FC = ({children}) => {
  const times = getTimesFromLocalStorage()
  const [workTime, setWorkTime] = useState(times.workTime)
  const [restTime, setRestTime] = useState(times.restTime)
  const [volumeOn, setVolumeOn] = useState(true)
  const [state, setState] = useState<State>('not-started')
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timer>()
  const [completedPomodoros, setCompletedPomodoros] = useState(0)

  const sound = new Audio(soundfile)
  const start = () => setState(state === 'not-started' || state === 'work-paused' ? 'work' : 'rest')
  const pause = () => setState(state === 'work' ? 'work-paused' : 'rest-paused')
  const stopCountdownAndClearInterval = () => {
    if (intervalRef) {
      clearInterval(intervalRef)
      setIntervalRef(undefined)
    }
  }
  const reset = () => {
    if (state === 'not-started') {
      return
    }
    stopCountdownAndClearInterval()
    setState('not-started')
  }

  useEffect(() => {
    if (state === 'not-started') {
      setWorkTime(times.workTime)
      setRestTime(times.restTime)
    } else if (state === 'work' || state === 'rest') {
      const interval_ref = setInterval(() => (
        state === 'work'
          ? setWorkTime(time => time - 1)
          : setRestTime(time => time - 1)
      ), 1000)
      setIntervalRef(interval_ref)
      return () => clearInterval(interval_ref)
    } else { // state must be 'work-paused' || 'rest-paused'
      stopCountdownAndClearInterval()
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
      setCompletedPomodoros(completed => completed + 1)
      if (volumeOn) {
        sound.play()
      }
    }
  }, [workTime, restTime])

  return (
    <AppContext.Provider value={{
      workTime, setWorkTime,
      restTime, setRestTime,
      volumeOn, setVolumeOn,
      state,
      start,
      pause,
      reset,
      completedPomodoros,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used in a AppContext provider')
  }
  return context
}
