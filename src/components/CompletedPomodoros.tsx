import { FC } from 'react'

interface Props {
  completedPomodoros: number
}

const CompletedPomodoros: FC<Props> = ({completedPomodoros}) => {
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
