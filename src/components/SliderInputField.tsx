/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ChangeEvent, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import MuiInput from '@mui/material/Input'
import Coffee from '@mui/icons-material/Coffee'
import Done from '@mui/icons-material/Done'
import FreeBreakfast from '@mui/icons-material/FreeBreakfast'
import RocketLaunch from '@mui/icons-material/RocketLaunch'
import TaskAlt from '@mui/icons-material/TaskAlt'
import Weekend from '@mui/icons-material/Weekend'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material'

const Input = styled(MuiInput)`
  width: 42px
`
type Icons = 'coffee' | 'done' | 'free-breakfast' | 'rocket-launch' | 'task-alt' | 'weekend'
interface Props {
  title: string
  icon: Icons
  value: number
  setValue: (value: number | React.SetStateAction<number>) => void
}

const iconComponents: Record<Icons, OverridableComponent<SvgIconTypeMap>> = {
  coffee: Coffee,
  done: Done,
  'free-breakfast': FreeBreakfast,
  'rocket-launch': RocketLaunch,
  'task-alt': TaskAlt,
  weekend: Weekend,
}

const InputSlider: FC<Props> = ({title, icon, value, setValue}) => {
  const setMinutes = (mins: number): void => setValue(mins * 60)
  const getTimeInMinutes = (): number => value / 60

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setMinutes(newValue[0])
    } else {
      setMinutes(newValue)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setMinutes(Number(event.target.value))

  useEffect(() => {
    localStorage.setItem(title.toLowerCase(), (value).toString())
  }, [value])

  const handleBlur = () => {
    if (getTimeInMinutes() < 1) {
      setMinutes(1)
    } else if (getTimeInMinutes() > 50) {
      setMinutes(50)
    }
  }

  const IconComponent = iconComponents[icon]

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        {`${title} minutes`}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <IconComponent />
        </Grid>
        <Grid item xs>
          <Slider
            value={getTimeInMinutes()}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            onBlur={handleBlur}
            min={0}
            max={50}
          />
        </Grid>
        <Grid item>
          <Input
            value={getTimeInMinutes()}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 5,
              min: 0,
              max: 50,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default InputSlider
