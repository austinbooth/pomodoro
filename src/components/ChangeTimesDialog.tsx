import { FC, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import SliderInputField from './SliderInputField'
import useUserTimes from '../services/useTimesContext'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props: any) => {
  const { children, onClose, ...other } = props
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

interface Props {
  disabled: boolean
}

const ChangeTimesDialog: FC<Props> = ({disabled}) => {
  const userTimes = useUserTimes()
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        variant="outlined"
        id='change-times-btn'
        onClick={handleOpen}
        disabled={disabled}
      >
        Change times
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle onClose={handleClose}>Times</BootstrapDialogTitle>
        <DialogContent dividers>
          <SliderInputField title='Work' icon='rocket-launch' value={userTimes.workTime} setValue={userTimes.setWorkTime} />
          <SliderInputField title='Rest' icon='coffee' value={userTimes.restTime} setValue={userTimes.setRestTime} />
        </DialogContent>
      </BootstrapDialog>
    </div>
  )
}

export default ChangeTimesDialog
