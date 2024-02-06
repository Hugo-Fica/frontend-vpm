import { Slider, Grid, Typography } from '@mui/material'
import '@mui/system'
import { useSettingStore } from '../../store/setting-store'
import { useEffect, useState } from 'react'

export const SliderPeriod = ({ setValueSlider }) => {
  const [marks, setMarks] = useState([])
  const period = useSettingStore((state) => state.period)

  const createMarks = (period) => {
    const marks = []
    for (let i = 1; i <= period; i++) {
      marks.push({ value: i, label: `P${i}` })
    }
    return marks
  }

  const handleSliderValue = (e, newValue) => {
    const arr = completeArray(newValue[0], newValue[1])
    setValueSlider(arr)
  }
  const completeArray = (start, end) => {
    const arr = []
    for (let i = start; i <= end; i++) {
      arr.push({ x: i, y: 1 })
    }
    return arr
  }
  useEffect(() => {
    const marks = createMarks(period)
    setMarks(marks)
  }, [period])

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        width: '650px',
        border: ' 1px solid black',
        borderRadius: '10px',
        p: '60px',
        position: 'relative',
      }}
    >
      <Typography
        sx={{
          position: 'absolute',
          left: 0,
          transform: 'translateX(20px) translateY(-85px)',
          bgcolor: 'white',
          pl: '10px',
          pr: '10px',
        }}
      >
        Equipment Vector
      </Typography>
      <Slider
        orientation='horizontal'
        getAriaValueText={(value) => `Period ${value}`}
        valueLabelDisplay='auto'
        marks={marks}
        defaultValue={[2, period - 2]}
        max={marks.length}
        min={1}
        onChange={handleSliderValue}
      />
    </Grid>
  )
}
