import { Grid, Button } from '@mui/material'
import * as XLSX from 'xlsx'
import { useVectorStore } from '../../store/vector-store'
const generateExcel = (data) => {
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  const arrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([arrayBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = URL.createObjectURL(blob)

  return url
}
export const DesingCriteria = () => {
  const vectors = useVectorStore((state) => state.vectors)
  const desingCriteriaVector = vectors.reduce((accumulator, v) => {
    if (v.criteria === 'm3/kW' || v.criteria === 'cfm/HP') {
      const obj = {
        vector: v.vector,
        criteria: v.criteria,
        value: v.power_input.toFixed(2),
      }
      accumulator.push(obj)
    }
    if (v.criteria === 'Fix Q') {
      const obj = {
        vector: v.vector,
        criteria: v.criteria,
        value: v.fix_q.toFixed(2),
      }
      accumulator.push(obj)
    }
    if (v.criteria === 'ft/m' || v.criteria === 'm/s') {
      const obj = {
        vector: v.vector,
        criteria: v.criteria,
        value: (v.air_velocity + v.area_m2).toFixed(2),
      }
      accumulator.push(obj)
    }
    if (v.criteria === 'Max T°') {
      const obj = {
        vector: v.vector,
        criteria: v.criteria,
        value: (
          (v.k_w * 859.845) /
          (0.24 * (v.output_t - v.intake_t)) /
          3600
        ).toFixed(2),
      }
      accumulator.push(obj)
    }
    if (v.criteria === 'R/h') {
      const obj = {
        vector: v.vector,
        criteria: v.criteria,
        value: ((v.r_h * v.volume_m3) / 3600).toFixed(2),
      }
      accumulator.push(obj)
    }
    return accumulator
  }, [])
  const handleDownload = () => {
    const url = generateExcel(desingCriteriaVector)
    const a = document.createElement('a')
    a.href = url
    a.download = 'desing_criteria.xlsx'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  return (
    <Grid container>
      <Button onClick={handleDownload}>Desing Criteria</Button>
    </Grid>
  )
}
