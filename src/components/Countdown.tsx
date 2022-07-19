import { FC } from 'react'
import useUserSettings from '../services/useTimesContext'
import { getTime } from '../helpers'

const Countdown: FC = () => {
  const { state, workTime, restTime } = useUserSettings()

  const time = getTime(state, workTime, restTime)
  const minutes = time <= 0 ? 0 : Math.floor(time / 60_000)
  const seconds = time <= 0 ? 0 : (time / 1000) - (minutes * 60)

  const minutesDisplay = minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2
  })
  const secondsDisplay = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2
  })
  return (
    <>
      <div data-testid='countdown' id='countdown'>
        <div id='countdown-background'>
          <div>00</div>
          <div>:</div>
          <div>00</div>
        </div>

        <div>{minutesDisplay}</div>
        <div>:</div>
        <div>{secondsDisplay}</div>
      </div>
    </>
  )
}

export default Countdown
