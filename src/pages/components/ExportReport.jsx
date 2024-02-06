import { Grid, Typography } from '@mui/material'
import { DesingCriteria } from './DesingCriteria'
import { GlobalRequeriment } from './GlobalRequeriment'
import { AreaRequeriment } from './AreaRequeriment'
import { ActivityRequeriment } from './ActivityRequeriment'
export const ExportReport = () => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        ml: '160px',
      }}
    >
      <Typography sx={{ mt: '100px', textAlign: 'center' }}>
        Export Report
      </Typography>
      <Grid
        item
        sx={{
          display: 'flex',
          flexDirection: 'row',
          mt: '60px',
          gap: '20px',
        }}
      >
        <DesingCriteria />
        <GlobalRequeriment />
        <AreaRequeriment />
        <ActivityRequeriment />
      </Grid>
    </Grid>
  )
}
