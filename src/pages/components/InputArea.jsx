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
import { useState } from 'react'
import { useAreaStore } from '../../store/area-store'
import { SelectOption } from './SelectOption'
import { v4 } from 'uuid'

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
export const InputArea = () => {
  const areas = useAreaStore((state) => state.areas)
  const [intake, setIntake] = useState([
    {
      id: v4(),
      area_id: '',
      intake: '',
      min_m3s: 0,
      max_m3s: 0,
    },
  ])
  const [output, setOutput] = useState([
    { id: v4(), area_id: '', output: '', min_m3s: 0, max_m3s: 0 },
  ])
  const [open, setOpen] = useState(false)
  const [area, setArea] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }
  const onInputChange = ({ target }) => {
    setArea(target.value)
  }
  const addIntake = () => {
    setIntake((prev) => [
      ...prev,
      {
        id: v4(),
        area_id: '',
        output: '',
        min_m3s: 0,
        max_m3s: 0,
      },
    ])
  }
  const addOutput = () => {
    setOutput((prev) => [
      ...prev,
      {
        id: v4(),
        area_id: '',
        output: '',
        min_m3s: 0,
        max_m3s: 0,
      },
    ])
  }
  const removeIntake = (id) => () => {
    setIntake((prev) => prev.filter((i) => i.id !== id))
  }
  const removeOutput = (id) => () => {
    setOutput((prev) => prev.filter((i) => i.id !== id))
  }
  return (
    <>
      <Button sx={{ color: 'white' }} onClick={handleOpen}>
        Input Área
      </Button>
      <Modal open={open} onClose={handleClose}>
        <form onSubmit={'onSubmit'}>
          <Box sx={style}>
            <Typography sx={{ mb: 4, textAlign: 'center' }} variant='h5'>
              Input Área
            </Typography>
            <Grid container gap={4} justifyItems={'center'}>
              <Grid item>
                <SelectOption
                  title={'Area'}
                  name={'area'}
                  onInputChange={onInputChange}
                  data={areas}
                  value={area}
                  size={150}
                />
              </Grid>
              <Grid
                item
                sx={{
                  border: 'solid 1px black',
                  borderRadius: '5px',
                  position: 'relative',
                  width: '355px',
                  height: '225px',
                }}
              >
                <Typography
                  sx={{
                    position: 'absolute',
                    left: 0,
                    transform: 'translateY(-13px) translateX(15px)',
                    bgcolor: 'white',
                    pl: '10px',
                    pr: '10px',
                    zIndex: '10',
                  }}
                >
                  Intake
                </Typography>
                <Grid item sx={{ overflowY: 'scroll', height: '210px' }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell>Min m3/s</TableCell>
                          <TableCell>Max m3/s</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {intake.map((i) => (
                          <TableRow key={i.id}>
                            <TableCell>
                              <IconButton
                                size='small'
                                onClick={removeIntake(i.id)}
                              >
                                <Delete color='error' />
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              <SelectOption s={'small'} />
                            </TableCell>
                            <TableCell>
                              <TextField size='small' />
                            </TableCell>
                            <TableCell>
                              <TextField size='small' />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <IconButton onClick={addIntake}>
                      <Add color='primary' />
                    </IconButton>
                  </TableContainer>
                </Grid>
              </Grid>
              <Grid
                item
                sx={{
                  border: 'solid 1px black',
                  borderRadius: '5px',
                  position: 'relative',
                  width: '355px',
                  height: '225px',
                }}
              >
                <Typography
                  sx={{
                    position: 'absolute',
                    left: 0,
                    transform: 'translateY(-13px) translateX(15px)',
                    bgcolor: 'white',
                    pl: '10px',
                    pr: '10px',
                    zIndex: '10',
                  }}
                >
                  Return
                </Typography>
                <Grid item sx={{ overflowY: 'scroll', height: '210px' }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell>Min m3/s</TableCell>
                          <TableCell>Max m3/s</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {output.map((i) => (
                          <TableRow key={i.id}>
                            <TableCell>
                              <IconButton
                                size='small'
                                onClick={removeOutput(i.id)}
                              >
                                <Delete color='error' />
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              <SelectOption s={'small'} />
                            </TableCell>
                            <TableCell>
                              <TextField size='small' />
                            </TableCell>
                            <TableCell>
                              <TextField size='small' />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <IconButton onClick={addOutput}>
                      <Add color='primary' />
                    </IconButton>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Modal>
    </>
  )
}
