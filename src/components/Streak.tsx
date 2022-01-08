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
    {Array.from({length: streak}).map((_, index) => (
      <div data-testid='streak' key={index}>
        ✅
      </div>
    ))}
  </div>
)}

export default Streak