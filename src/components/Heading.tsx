import { FC } from 'react'
import useUserSettings from '../services/useTimesContext'

const Heading: FC = () => {
  const { state } = useUserSettings()
  return (
  <h1 id='phase'>{
    state === 'not-started'
      ? <div>&nbsp;</div>
      : state === 'work' || state === 'work-paused'
        ? 'Work'
        : 'Break'
  }</h1>
)}

export default Heading
