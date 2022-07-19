import { FC } from 'react'
import useAppContext from '../services/useAppContext'

const Heading: FC = () => {
  const { state } = useAppContext()
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
