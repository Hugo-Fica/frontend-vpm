import { generateData } from '../../helpers/datas/data'
import { Grid, Button } from '@mui/material'
import { useSettingStore } from '../../store/setting-store'
import { useVectorStore } from '../../store/vector-store'
import * as XLSX from 'xlsx'

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
export const GlobalRequeriment = () => {
  const { vectors } = useVectorStore((state) => state)
  const { period } = useSettingStore((state) => state)
  const { result } = generateData(period)

  const algo = vectors.map((v) => {
    const obj = { vector: v.vector }

    result.forEach((r) => {
      const matchingValue = v.vectors.find((vec) => vec.period === r.x + 1)
      obj['Period ' + (r.x + 1)] = matchingValue
        ? matchingValue.value.toFixed(2)
        : 0
    })

    return obj
  })
  const handleDownload = () => {
    const url = generateExcel(algo)
    const a = document.createElement('a')
    a.href = url
    a.download = 'global_requeriment.xlsx'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  return (
    <Grid container>
      <Button onClick={handleDownload}>Globar Requeriment</Button>
    </Grid>
  )
}
