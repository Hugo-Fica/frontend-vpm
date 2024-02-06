import { Button, Grid, Snackbar, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { DragTableGlobal } from './components/DragTableGlobal'
import { useEffect, useState } from 'react'
import { DragTableArea } from './components/DragTableArea'
import { useActivityStore } from '../store/activity-store'
import { useAreaStore } from '../store/area-store'
import { useSubAreaStore } from '../store/sub-area-store'
import { useCriteriaStore } from '../store/criteria-store'
import { useVectorStore } from '../store/vector-store'
import { DragTableActivity } from './components/DragTableActivity'
export const Home = () => {
  const getSubAreas = useSubAreaStore((state) => state.getSubAreas)
  const getCriteria = useCriteriaStore((state) => state.getCriteria)
  const getVectors = useVectorStore((state) => state.getVectors)
  const [vista, setVista] = useState(0)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const getActivys = useActivityStore((state) => state.getActivys)
  const getAreas = useAreaStore((state) => state.getAreas)
  // ... (otras importaciones)

  const miArray = [1, 2, 3]

  // Función para manejar clic en la flecha izquierda
  const handleClickIzquierda = () => {
    setVista(vista === 0 ? miArray.length - 1 : vista - 1)
  }

  // Función para manejar clic en la flecha derecha
  const handleClickDerecha = () => {
    setVista(vista === miArray.length - 1 ? 0 : vista + 1)
  }
  useEffect(() => {
    getVectors()
    getCriteria()
    getAreas()
    getActivys()
    getSubAreas()
  }, [])

  return (
    <Grid
      container
      sx={{ display: 'flex', justifyContent: 'center', mt: 'calc(115px)' }}
    >
      <Snackbar
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* {ok === true ? (
          <Alert onClose={() => setShowSnackbar(false)} severity='success'>
            {message}
          </Alert>
        ) : (
          <Alert onClose={() => setShowSnackbar(false)} severity='error'>
            {errorMessage}
          </Alert>
        )} */}
      </Snackbar>
      <Grid item sx={{ mt: 3 }}>
        <Typography variant='h4'>Ventilation Project Manager</Typography>
      </Grid>
      <Grid container sx={{ display: 'flex', justifyContent: 'end' }}>
        <Grid
          item
          sx={{
            display: 'flex',
            flexDirection: 'row',
            border: 'solid #1976d2 1px',
            borderRadius: '5px',
          }}
        >
          <Button variant='contained' onClick={handleClickIzquierda}>
            <ArrowBackIcon />
          </Button>
          <Typography sx={{ p: 1 }}>
            {(vista === 0 && 'Global') ||
              (vista === 1 && 'Area') ||
              (vista === 2 && 'Activity')}
          </Typography>
          <Button variant='contained' onClick={handleClickDerecha}>
            <ArrowForwardIcon />
          </Button>
        </Grid>
      </Grid>
      {vista === 0 && (
        <Grid item>
          <DragTableGlobal />
        </Grid>
      )}
      {vista === 1 && (
        <Grid item>
          <DragTableArea />
        </Grid>
      )}
      {vista === 2 && (
        <Grid item>
          <DragTableActivity />
        </Grid>
      )}
    </Grid>
  )
}
