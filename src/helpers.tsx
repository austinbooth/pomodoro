import { State } from "./types"

export const getTime = (state: State, workTime: number, restTime: number) => {
  if (state === 'work' || state === 'work-paused') {
    return workTime * 1000
  }
  if (state === 'rest' || state === 'rest-paused') {
    return restTime * 1000
  }
  return 0 // state must be 'not-started'
}
