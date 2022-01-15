import { createContext, useContext } from 'react'

interface Args {
  workTime: number
  restTime: number
  setWorkTime: (value: number | React.SetStateAction<number>) => void
  setRestTime: (value: number | React.SetStateAction<number>) => void
  volumeOn: boolean
  setVolumeOn: (value: boolean | React.SetStateAction<boolean>) => void
}

export const UserSettingsContext = createContext<Args | undefined>(undefined)

export default function useUserSettings() {
  const context = useContext(UserSettingsContext)
  if (context === undefined) {
    throw new Error('useUserSettings must be used in a userSettings provider')
  }
  return context
}
