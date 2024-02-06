import { useState } from 'react'
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  IconButton,
} from '@mui/material'
import { SelectOption } from './SelectOption'
import { useForm } from '../../hooks/useForm'
import { TextFieldCustom } from './TexfieldCustom'
import { Knobs } from './Knobs'
import EditIcon from '@mui/icons-material/Edit'
import {
  calculateCriteria,
  reverseTransformData,
  transformData,
  transformGraphs,
} from '../../helpers/datas/data'
import { useActivityStore } from '../../store/activity-store'
import { useAreaStore } from '../../store/area-store'
import { useCriteriaStore } from '../../store/criteria-store'
import { useSubAreaStore } from '../../store/sub-area-store'
import { useAuthSotre } from '../../store/auth-store'
import { useVectorStore } from '../../store/vector-store'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

export const EditModal = ({ vector: editVector }) => {
  const formData = {
    vector: editVector.vector || '',
    availability: editVector.availability,
    power_input: editVector.power_input || 0,
    air_velocity: editVector.air_velocity || 0,
    area_m2: editVector.area_m2 || 0,
    fix_q: editVector.fix_q || 0,
    position: editVector.position || 0,
    area: editVector.area_id || '',
    sub_area: editVector.sub_area_id || '',
    activity: editVector.activity_id || '',
    criteria: editVector.criteria_id || '',
  }
  const [open, setOpen] = useState(false)
  const {
    vector,
    availability,
    power_input,
    air_velocity,
    area_m2,
    fix_q,
    area,
    sub_area,
    activity,
    criteria,
    onInputChange,
    formState,
    onResetForm,
  } = useForm(formData)

  const criterias = useCriteriaStore((state) => state.criteria)
  const areas = useAreaStore((state) => state.areas)
  const subareas = useSubAreaStore((state) => state.subareas)
  const activitys = useActivityStore((state) => state.activity)
  const { uid } = useAuthSotre((state) => state.uid)
  const putVector = useVectorStore((state) => state.putVector)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    onResetForm()
    setOpen(false)
  }
  const disabled = (valor = '') => {
    const disable = criterias
      .filter((x) => x.id === valor)
      .map((x) => x.name)[0]
    return { disable }
  }
  const { disable } = disabled(criteria)
  const transform = transformGraphs(editVector)
  const { newResult } = calculateCriteria(transform, disable, formState)
  const transformedData = transformData(newResult)
  const onSubmit = async (e) => {
    e.preventDefault()
    const vector = {
      user_id: uid,
      area_id: formState.area,
      sub_area_id: formState.sub_area,
      activity_id: formState.activity,
      criteria_id: formState.criteria,
      vector: formState.vector,
      power_input: formState.power_input,
      air_velocity: formState.air_velocity,
      area_m2: formState.area_m2,
      fix_q: formState.fix_q,
      availability: formState.availability,
    }
    if (
      (disable === 'Fix Q' && formState.fix_q !== 0) ||
      ((disable === 'm/s' || disable === 'ft/m') &&
        formState.air_velocity !== 0 &&
        formState.area_m2 !== 0) ||
      ((disable === 'm3/kW' || disable === 'cfm/HP') && formState.power_input)
    ) {
      putVector(editVector.id, vector, transformedData, editVector)

      onResetForm()
      reverseTransformData(transformedData.newData)
      setOpen(false)
    } else {
      putVector(editVector.id, vector, transformedData, editVector)
    }
  }

  return (
    <>
      <IconButton color='warning' size='small' onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <form onSubmit={onSubmit}>
          <Box sx={style}>
            <Typography sx={{ mb: 4, textAlign: 'center' }} variant='h5'>
              Edit Equip Vector
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Grid item>
                <TextFieldCustom
                  size={260}
                  title={'Vector Name'}
                  name={'vector'}
                  type={'text'}
                  value={vector}
                  onInputChange={onInputChange}
                />
              </Grid>
              <Grid item>
                <SelectOption
                  value={area}
                  onInputChange={onInputChange}
                  title={'Area'}
                  name={'area'}
                  size={160}
                  data={areas}
                />
              </Grid>
              <Grid item>
                <SelectOption
                  value={sub_area}
                  onInputChange={onInputChange}
                  title={'Sub Area'}
                  name={'sub_area'}
                  size={160}
                  data={subareas}
                />
              </Grid>
              <Grid item>
                <SelectOption
                  value={activity}
                  onInputChange={onInputChange}
                  title={'Activity'}
                  name={'activity'}
                  size={175}
                  data={activitys}
                />
              </Grid>
              <Grid item>
                <TextFieldCustom
                  name={'availability'}
                  size={100}
                  value={availability}
                  type={'number'}
                  title={'Availability'}
                  symbol={'%'}
                  min={1}
                  max={100}
                  onInputChange={onInputChange}
                />
              </Grid>
              <Grid item>
                <SelectOption
                  value={criteria}
                  onInputChange={onInputChange}
                  title={'Criteria'}
                  name={'criteria'}
                  size={180}
                  data={criterias}
                />
              </Grid>
              <Grid item>
                <TextFieldCustom
                  name={'power_input'}
                  size={145}
                  title={'Power Input'}
                  symbol={'KW'}
                  type={'number'}
                  min={0}
                  disable={disable !== 'm3/kW' && disable !== 'cfm/HP'}
                  value={power_input}
                  onInputChange={onInputChange}
                />
              </Grid>
              <Grid
                item
                sx={{
                  ml: 2,
                  display: 'flex',
                  border: 'solid #000 1px',
                  mt: 1,
                }}
              >
                <Grid item sx={{ margin: '6px 6px 10px -6px' }}>
                  <TextFieldCustom
                    name={'air_velocity'}
                    size={145}
                    title={'Air Velocity'}
                    symbol={'m/s'}
                    type={'number'}
                    min={0}
                    disable={disable !== 'm/s' && disable !== 'ft/m'}
                    value={air_velocity}
                    onInputChange={onInputChange}
                  />
                </Grid>
                <Grid item sx={{ margin: '6px 10px 10px 6px' }}>
                  <TextFieldCustom
                    name={'area_m2'}
                    size={140}
                    title={'Area m2'}
                    type={'number'}
                    min={0}
                    disable={disable !== 'm/s' && disable !== 'ft/m'}
                    value={area_m2}
                    onInputChange={onInputChange}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <TextFieldCustom
                  name={'fix_q'}
                  size={140}
                  title={'Fix Q'}
                  symbol={'m3/s'}
                  type={'number'}
                  disable={disable !== 'Fix Q'}
                  min={0}
                  value={fix_q}
                  onInputChange={onInputChange}
                />
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Grid item sx={{ mt: 3 }}>
                <Knobs transform={transform} />
              </Grid>
              <Grid
                container
                sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}
              >
                <Grid item>
                  {newResult.map((result) => (
                    <TextField
                      size='small'
                      sx={{ width: '60px', p: 1 }}
                      key={result.x}
                      value={result.y}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 2,
              }}
            >
              <Grid item>
                <Button variant='contained' type='submit' color='success'>
                  Update Vector
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' color='error' onClick={handleClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Modal>
    </>
  )
}
