import { useMemo, useState } from 'react'
import { Modal, Box, Typography, Button, Grid, TextField } from '@mui/material'
import { TextFieldCustom } from './TexfieldCustom'
import { SelectOption } from './SelectOption'
import { useForm } from '../../hooks/useForm'
import { useCriteriaStore } from '../../store/criteria-store'
import { useAreaStore } from '../../store/area-store'
import { useSubAreaStore } from '../../store/sub-area-store'
import { useActivityStore } from '../../store/activity-store'
import { useVectorStore } from '../../store/vector-store'
import { useAuthSotre } from '../../store/auth-store'
import { calculateSlider, transformData2 } from '../../helpers/datas/data'
import { SliderPeriod } from './SliderPeriod'
import vectorIcon from '../../assets/vector4.png'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 720,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
}
const formData = {
  vector: '',
  availability: 100,
  intake_t: 0,
  output_t: 0,
  k_w: 0,
  air_velocity: 0,
  area_m2: 0,
  r_h: 0,
  volume_m3: 0,
  fix_q: 0,
  power_input: 0,
  position: 0,
  area: '',
  sub_area: '',
  activity: '',
  criteria: '',
}
export const AddModal3 = () => {
  const {
    vector,
    availability,
    intake_t,
    output_t,
    k_w,
    r_h,
    volume_m3,
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
  const [valueSlider, setValueSlider] = useState([])
  const criterias = useCriteriaStore((state) => state.criteria)
  const areas = useAreaStore((state) => state.areas)
  const subareas = useSubAreaStore((state) => state.subareas)
  const activitys = useActivityStore((state) => state.activity)
  const { loading, postVector } = useVectorStore((state) => state)
  const uid = useAuthSotre((state) => state.uid)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    onResetForm()
    setOpen(false)
  }
  const disabled = (valor = '') => {
    const disable = criterias
      .filter((x) => x.id === valor)
      .map((x) => x.name)[0]
    return disable
  }
  const criteriasfilter = criterias.filter((c) => c.other_vector !== 1)
  const disable = disabled(criteria)
  const isChecking = useMemo(() => loading === 'checking', [loading])
  const { newResult } = calculateSlider(valueSlider, disable, formState)
  const transformedData = transformData2(newResult)
  const onSubmit = async (e) => {
    e.preventDefault()
    const vector = {
      user_id: uid,
      area_id: formState.area,
      sub_area_id: formState.sub_area,
      activity_id: formState.activity,
      criteria_id: formState.criteria,
      vector: formState.vector,
      power_input: 0,
      air_velocity: formState.air_velocity,
      area_m2: formState.area_m2,
      fix_q: formState.fix_q,
      intake_t: formState.intake_t,
      output_t: formState.output_t,
      k_w: formState.k_w,
      r_h: formState.r_h,
      volume_m3: formState.volume_m3,
      availability: formState.availability,
      position: transformedData[0].position,
      type_vector: 3,
    }
    postVector(vector, uid, transformedData)
  }
  return (
    <>
      <Button sx={{ color: 'white' }} onClick={handleOpen}>
        <img src={vectorIcon} style={{ width: '80px' }} />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <form onSubmit={onSubmit}>
          <Box sx={style}>
            <Typography sx={{ mb: 4, textAlign: 'center' }} variant='h5'>
              Vector Infrastructure
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
              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  pt: '20px',
                  gap: '12px',
                }}
              >
                <Grid item>
                  <SelectOption
                    value={criteria}
                    onInputChange={onInputChange}
                    title={'Criteria'}
                    name={'criteria'}
                    size={180}
                    data={criteriasfilter}
                  />
                </Grid>
                <Grid
                  sx={{
                    border: ' 1px solid black',
                    borderRadius: '3px',
                    padding: '15px ',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <Typography
                    sx={{
                      position: 'absolute',
                      left: 0,
                      transform: 'translateY(-25px) translateX(10px)',
                      bgcolor: 'white',
                      pl: '10px',
                      pr: '10px',
                      fontWeight: 500,
                    }}
                  >
                    T°
                  </Typography>
                  <TextFieldCustom
                    name={'intake_t'}
                    size={145}
                    symbol={'Intake T°'}
                    type={'number'}
                    min={0}
                    disable={disable !== 'Max T°'}
                    value={intake_t}
                    onInputChange={onInputChange}
                  />
                  <TextFieldCustom
                    name={'output_t'}
                    size={145}
                    symbol={'Output T°'}
                    type={'number'}
                    min={0}
                    disable={disable !== 'Max T°'}
                    value={output_t}
                    onInputChange={onInputChange}
                  />
                  <TextFieldCustom
                    name={'k_w'}
                    size={145}
                    symbol={'KW'}
                    type={'number'}
                    min={0}
                    disable={disable !== 'Max T°'}
                    value={k_w}
                    onInputChange={onInputChange}
                  />
                </Grid>
                <Grid
                  item
                  sx={{
                    display: 'flex',
                    border: 'solid #000 1px',
                    borderRadius: '3px',
                    position: 'relative',
                    flexDirection: 'column',
                    gap: '10px',
                    height: '146px',
                    width: '170px',
                    padding: '10px',
                  }}
                >
                  <Typography
                    sx={{
                      position: 'absolute',
                      left: 0,
                      transform: 'translateX(10px) translateY(-27px)',
                      bgcolor: 'white',
                      pl: '10px',
                      pr: '10px',
                    }}
                  >
                    Air Velocity
                  </Typography>
                  <TextFieldCustom
                    name={'air_velocity'}
                    size={145}
                    symbol={'m/s'}
                    type={'number'}
                    min={0}
                    disable={disable !== 'm/s'}
                    value={air_velocity}
                    onInputChange={onInputChange}
                  />
                  <TextFieldCustom
                    name={'area_m2'}
                    size={145}
                    title={'Area m2'}
                    type={'number'}
                    min={0}
                    disable={disable !== 'm/s'}
                    value={area_m2}
                    onInputChange={onInputChange}
                  />
                </Grid>
                <Grid
                  sx={{
                    position: 'relative',
                    border: '1px solid black',
                    width: '170px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    height: '145px',
                    alignItems: 'center',
                    borderRadius: '3px',
                    padding: '10px',
                  }}
                >
                  <Typography
                    sx={{
                      position: 'absolute',
                      left: 0,
                      bgcolor: 'white',
                      transform: 'translateX(10px) translateY(-22px)',
                      pl: '10px',
                      pr: '10px',
                    }}
                  >
                    R/h
                  </Typography>
                  <TextFieldCustom
                    name={'r_h'}
                    symbol={'N°'}
                    size={145}
                    type={'number'}
                    min={0}
                    disable={disable !== 'R/h'}
                    value={r_h}
                    onInputChange={onInputChange}
                  />
                  <TextFieldCustom
                    name={'volume_m3'}
                    title={'Volume M3'}
                    size={145}
                    type={'number'}
                    min={0}
                    disable={disable !== 'R/h'}
                    value={volume_m3}
                    onInputChange={onInputChange}
                  />
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
            </Grid>
            <Grid
              container
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Grid
                container
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 5,
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <SliderPeriod setValueSlider={setValueSlider} />
                <Grid
                  item
                  sx={{
                    border: '1px solid black',
                    borderRadius: '3px',
                    padding: '10px',
                    mt: '15px',
                    position: 'relative',
                  }}
                >
                  <Typography
                    sx={{
                      position: 'absolute',
                      left: 0,
                      transform: 'translateY(-23px) translateX(10px)',
                      bgcolor: 'white ',
                      pl: '5px',
                      pr: '5px',
                    }}
                  >
                    Requeriment Vector
                  </Typography>
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
                <Button variant='contained' type='submit' disabled={isChecking}>
                  Create Vector
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
