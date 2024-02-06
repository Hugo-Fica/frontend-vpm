import { useMemo, useState } from 'react'
import { v4 } from 'uuid'
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import { SelectOption } from './SelectOption'
import { useForm } from '../../hooks/useForm'
import { useCriteriaStore } from '../../store/criteria-store'
import { useAreaStore } from '../../store/area-store'
import { useSubAreaStore } from '../../store/sub-area-store'
import { useActivityStore } from '../../store/activity-store'
import { useVectorStore } from '../../store/vector-store'
import { useAuthSotre } from '../../store/auth-store'
import { useSettingStore } from '../../store/setting-store'
import { generateData, transformData } from '../../helpers/datas/data'
import vectorIcon from '../../assets/vector3.png'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1300,
  height: 720,
  overflow: 'hidden', // Añade la propiedad overflow para ocultar el desbordamiento y permitir el uso de scroll
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
}
const formData = {
  availability: 100,
  position: 0,
  area: '',
  sub_area: '',
  activity: '',
  criteria: '',
}

export const AddModal4 = () => {
  const period = useSettingStore((state) => state.period)
  const { result } = generateData(period)
  const { postVector } = useVectorStore((state) => state)
  const { area, sub_area, activity, criteria, onInputChange, onResetForm } =
    useForm(formData)
  const [vectors, setVectors] = useState([
    {
      id_vector: v4(),
      vector: '',
      area_id: '',
      sub_area_id: '',
      activity_id: '',
      criteria_id: '',
      power_input: 0,
      air_velocity: 0,
      area_m2: 0,
      fix_q: 0,
      availability: 100,
      values: result,
      type_vector: 1,
    },
  ])
  const criterias = useCriteriaStore((state) => state.criteria)
  const areas = useAreaStore((state) => state.areas)
  const subareas = useSubAreaStore((state) => state.subareas)
  const activitys = useActivityStore((state) => state.activity)
  const { loading } = useVectorStore((state) => state)
  const isChecking = useMemo(() => loading === 'checking', [loading])
  const uid = useAuthSotre((state) => state.uid)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    onResetForm()
    setOpen(false)
  }
  const criteriasfilter = criterias.filter(
    (c) =>
      c.name === 'cfm/HP' ||
      c.name === 'm3/kW' ||
      c.name === 'Fix Q' ||
      c.name === 'ft/m'
  )
  const filterCriteria = criterias.find((c) => c.name === 'm3/kW')
  const disabled = (valor = '') => {
    const disable = criterias
      .filter((x) => x.id === valor)
      .map((x) => x.name)[0]
    return { disable }
  }
  const addVector = () => {
    setVectors((prev) => [
      ...prev,
      {
        id_vector: v4(),
        vector: '',
        area_id: '',
        sub_area_id: '',
        activity_id: '',
        criteria_id: '',
        power_input: 0,
        air_velocity: 0,
        area_m2: 0,
        fix_q: 0,
        availability: 100,
        values: result,
        type_vector: 1,
      },
    ])
  }
  const updVector = (id, e) => {
    e.preventDefault()
    setVectors((prev) =>
      prev.map((v) =>
        v.id_vector === id
          ? {
              ...v,
              vector: e.target.value,
              area_id: area,
              sub_area_id: sub_area,
              activity_id: activity,
            }
          : v
      )
    )
  }
  const updCriteriaVector = (id, e) => {
    e.preventDefault()
    if (disable === 'm3/kW' || disable === 'cfm/HP') {
      setVectors((prev) =>
        prev.map((v) =>
          v.id_vector === id
            ? { ...v, power_input: e.target.value, criteria_id: criteria }
            : v
        )
      )
    }
    if (disable === 'Fix Q') {
      setVectors((prev) =>
        prev.map((v) =>
          v.id_vector === id
            ? { ...v, fix_q: e.target.value, criteria_id: criteria }
            : v
        )
      )
    }
    if (disable === 'ft/m') {
      setVectors((prev) =>
        prev.map((v) =>
          v.id_vector === id
            ? {
                ...v,
                air_velocity: e.target.value,
                area_m2: e.target.value,
                criteria_id: criteria,
              }
            : v
        )
      )
    }
  }
  const removeVector = (id) => () => {
    setVectors((prev) => prev.filter((p) => p.id_vector !== id))
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    for (let i = 0; i < vectors.length; i++) {
      const element = vectors[i]
      const vector = {
        user_id: uid,
        area_id: element.area_id,
        sub_area_id: element.sub_area_id,
        activity_id: element.activity_id,
        criteria_id: element.criteria_id,
        vector: element.vector,
        power_input: element.power_input || 0,
        air_velocity: element.air_velocity || 0,
        area_m2: element.area_m2 || 0,
        fix_q: element.fix_q || 0,
        availability: element.availability,
        type_vector: 1,
      }
      const transformedData = transformData(element.values)
      await postVector(vector, uid, transformedData)
      console.log(vector, uid, transformedData)
    }
  }
  const updAvailability = (id, e) => {
    e.preventDefault()
    setVectors((prev) =>
      prev.map((v) =>
        v.id_vector === id ? { ...v, availability: e.target.value } : v
      )
    )
  }
  const { disable } = disabled(criteria)
  const handleInputChange = (event, index, id) => {
    event.preventDefault()
    if (disable === 'm3/kW' || disable === 'cfm/HP') {
      const newValue = parseFloat(event.target.value, 10)
      setVectors((prev) => {
        const updatedVectors = prev.map((v) =>
          v.id_vector === id
            ? {
                ...v,
                values: v.values.map((val, i) =>
                  i === index
                    ? {
                        ...val,
                        y: (
                          filterCriteria?.value *
                          v.power_input *
                          newValue
                        ).toFixed(2),
                      }
                    : val
                ),
              }
            : v
        )
        return updatedVectors
      })
    }
    if (disable === 'Fix Q') {
      const newValue = parseFloat(event.target.value, 10)
      setVectors((prev) => {
        const updatedVectors = prev.map((v) =>
          v.id_vector === id
            ? {
                ...v,
                values: v.values.map((val, i) =>
                  i === index
                    ? {
                        ...val,
                        y: (v.fix_q * newValue).toFixed(2),
                      }
                    : val
                ),
              }
            : v
        )
        return updatedVectors
      })
    }
    if (disable === 'ft/m') {
      const newValue = parseFloat(event.target.value, 10)
      setVectors((prev) => {
        const updatedVectors = prev.map((v) =>
          v.id_vector === id
            ? {
                ...v,
                values: v.values.map((val, i) =>
                  i === index
                    ? {
                        ...val,
                        y: (v.area_m2 * v.air_velocity * newValue).toFixed(2),
                      }
                    : val
                ),
              }
            : v
        )
        return updatedVectors
      })
    }
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
              Bulk Input Equip
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Grid item>
                <SelectOption
                  value={area}
                  onInputChange={onInputChange}
                  title={'Area'}
                  name={'area'}
                  size={200}
                  data={areas}
                />
              </Grid>
              <Grid item>
                <SelectOption
                  value={sub_area}
                  onInputChange={onInputChange}
                  title={'Sub Area'}
                  name={'sub_area'}
                  size={200}
                  data={subareas}
                />
              </Grid>
              <Grid item>
                <SelectOption
                  value={activity}
                  onInputChange={onInputChange}
                  title={'Activity'}
                  name={'activity'}
                  size={200}
                  data={activitys}
                />
              </Grid>
              <Grid item>
                <SelectOption
                  value={criteria}
                  onInputChange={onInputChange}
                  title={'Criteria'}
                  name={'criteria'}
                  size={200}
                  data={criteriasfilter}
                />
              </Grid>
            </Grid>
            <Grid sx={{ mt: '30px' }}>
              <Typography sx={{ textAlign: 'center' }}>
                Equipment Vector
              </Typography>
              <TableContainer sx={{ overflowY: 'auto', maxHeight: '500px' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        Vector Name
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {criteriasfilter.find((c) => c.id === criteria)?.name ||
                          'Criteria'}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>%</TableCell>
                      {result.map((p) => (
                        <TableCell key={p.x} sx={{ textAlign: 'center' }}>{`P${
                          p.x + 1
                        }`}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vectors.map((v) => (
                      <TableRow key={v.id_vector}>
                        <TableCell size='small'>
                          <IconButton onClick={removeVector(v.id_vector)}>
                            <Delete color='error' />
                          </IconButton>
                        </TableCell>
                        <TableCell align='center'>
                          <TextField
                            label={'Vector Name'}
                            size='small'
                            name='vector'
                            value={v.vector}
                            onChange={(e) => updVector(v.id_vector, e)}
                          />
                        </TableCell>
                        <TableCell align='center'>
                          {disable === 'Fix Q' ? (
                            <TextField
                              size='small'
                              sx={{ width: '70px' }}
                              type='number'
                              name='fix_q'
                              value={v.fix_q}
                              onChange={(e) =>
                                updCriteriaVector(v.id_vector, e)
                              }
                            />
                          ) : disable === 'ft/m' ? (
                            <TextField
                              size='small'
                              sx={{ width: '70px' }}
                              type='number'
                              name='air_velocity'
                              value={v.air_velocity}
                              onChange={(e) =>
                                updCriteriaVector(v.id_vector, e)
                              }
                            />
                          ) : disable === 'cfm/HP' ? (
                            <TextField
                              size='small'
                              sx={{ width: '70px' }}
                              type='number'
                              name='power_input'
                              value={v.power_input}
                              onChange={(e) =>
                                updCriteriaVector(v.id_vector, e)
                              }
                            />
                          ) : (
                            <TextField
                              size='small'
                              sx={{ width: '70px' }}
                              type='number'
                              name='power_input'
                              value={v.power_input}
                              onChange={(e) =>
                                updCriteriaVector(v.id_vector, e)
                              }
                            />
                          )}
                        </TableCell>
                        <TableCell align='center'>
                          <TextField
                            size='small'
                            sx={{ width: '70px' }}
                            type='number'
                            name='availability'
                            value={v.availability}
                            onChange={(e) => updAvailability(v.id_vector, e)}
                          />
                        </TableCell>
                        {v.values.map((val, index) => (
                          <TableCell align='center' key={val.x}>
                            <TextField
                              size='small'
                              sx={{ width: '55px' }}
                              type='number'
                              defaultValue={val.y}
                              onChange={(event) =>
                                handleInputChange(event, index, v.id_vector)
                              }
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <IconButton onClick={addVector}>
                  <Add />
                </IconButton>
              </TableContainer>
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
