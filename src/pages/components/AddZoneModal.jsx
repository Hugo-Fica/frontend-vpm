import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { useActivityStore } from '../../store/activity-store'
import { useAreaStore } from '../../store/area-store'
import { useSubAreaStore } from '../../store/sub-area-store'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 300,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
}
const formData = {
  zone: '',
}
export const AddZoneModal = ({ title }) => {
  const { zone, formState, onInputChange, onResetForm } = useForm(formData)
  const postActivity = useActivityStore((state) => state.postActivity)
  const postAreas = useAreaStore((state) => state.postAreas)
  const postSubAreas = useSubAreaStore((state) => state.postSubAreas)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    onResetForm()
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    if (title === 'Area') {
      const area = { area: formState.zone }
      postAreas(area)
      onResetForm()
      setOpen(false)
    }
    if (title === 'Sub Area') {
      const subArea = { sub_area: formState.zone }
      postSubAreas(subArea)
      onResetForm()
      setOpen(false)
    }
    if (title === 'Activity') {
      const activity = { activity: formState.zone }
      postActivity(activity)
      onResetForm()
      setOpen(false)
    }
  }
  return (
    <>
      <Button
        variant='contained'
        size='small'
        sx={{ color: 'white', fontSize: 13 }}
        onClick={handleOpen}
      >
        {`Add ${title}`}
        <AddIcon />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <form onSubmit={onSubmit}>
          <Box sx={style}>
            <Typography sx={{ mb: 4, textAlign: 'center' }} variant='h5'>
              {`Add new ${title}`}
            </Typography>

            <Grid
              item
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Grid item sx={{ mt: 6 }}>
                <FormControl variant='outlined'>
                  <InputLabel>{`Add ${title}`}</InputLabel>
                  <OutlinedInput
                    type='text'
                    name='zone'
                    value={zone}
                    onChange={onInputChange}
                    label={`Add ${title}`}
                  />
                </FormControl>
              </Grid>
              <Grid item sx={{ mt: 6 }}>
                <Button variant='contained' color='success' type='submit'>
                  {`Add new ${title}`}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Modal>
    </>
  )
}
