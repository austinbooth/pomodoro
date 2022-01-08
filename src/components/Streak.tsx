import { FC } from 'react'

interface Props {
  streak: number
}

const Streak: FC<Props> = ({streak}) => {
  if (streak <= 0) {
    return null
  }
  return (
  <div id='streak'>
    <p>Streak:</p>
    {Array.from({length: streak}).map((_, index) => (
      <div data-testid='streak' key={`streak_${index}`}>
        ✅
      </div>
    ))}
  </div>
)}

export default Streak