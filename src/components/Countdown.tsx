import { FC } from 'react'

interface Props {
  time: number
}

const Countdown: FC<Props> = ({time}) => {
  const minutes = Math.floor(time / 60_000)
  const seconds = (time / 1000) - (minutes * 60)

  const minutesDisplay = minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2
  })
  const secondsDisplay = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2
  })
  return (
    <div data-testid='countdown' id='countdown'>
      <div>{minutesDisplay}</div>
      <div>:</div>
      <div>{secondsDisplay}</div>
    </div>
  )
}

export default Countdown
