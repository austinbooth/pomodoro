import { FC } from 'react'
import useUserSettings from '../services/useTimesContext'

const CompletedPomodoros: FC = () => {
  const { completedPomodoros } = useUserSettings()
  if (completedPomodoros <= 0) {
    return null
  }
  return (
  <div id='completedPomodoros'>
    <p>Completed:</p>
    {Array.from({length: completedPomodoros}).map((_, index) => (
      <div data-testid='streak' key={`streak_${index}`}>
        ✅
      </div>
    ))}
  </div>
)}

export default CompletedPomodoros
