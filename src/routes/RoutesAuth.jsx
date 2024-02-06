import { Route, Routes } from 'react-router-dom'
import { Sidebar, NavBar } from '../pages/components'
import { AreaGraphs, Home } from '../pages'
import { Container, Grid } from '@mui/material'
import { GlobalGraph } from '../pages/components/GlobalGraph'
import { ActivityGraph } from '../pages/components/ActivityGraph'
import { ExportReport } from '../pages/components/ExportReport'

export const RoutesAuth = () => {
  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}
    >
      <Sidebar />
      <NavBar />
      <Grid item sx={{ mt: 5 }}>
        <Routes>
          <Route path='home' element={<Home />} />
          <Route path='area-graph' element={<AreaGraphs />} />
          <Route path='global-graph' element={<GlobalGraph />} />
          <Route path='activity-graph' element={<ActivityGraph />} />
          <Route path='export-report' element={<ExportReport />} />
        </Routes>
      </Grid>
    </Container>
  )
}
