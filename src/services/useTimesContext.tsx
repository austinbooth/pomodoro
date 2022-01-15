import { createContext, useContext } from 'react'

interface Args {
  workTime: number
  restTime: number
  setWorkTime: (value: number) => void
  setRestTime: (value: number) => void
}

export const TimesContext = createContext<Args | undefined>(undefined)

export default function useUserTimes() {
  const context = useContext(TimesContext)
  if (context === undefined) {
    throw new Error('useUserTimes must be used in a userTimes provider')
  }
  return context
}
