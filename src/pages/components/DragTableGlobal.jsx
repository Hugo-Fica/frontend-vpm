import {
  crearArrayConNumeros,
  generateData,
  transformData,
} from '../../helpers/datas/data'
import DeleteIcon from '@mui/icons-material/Delete'
import Draggable from 'react-draggable'
import { useState } from 'react'
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useSettingStore } from '../../store/setting-store'
import { useVectorStore } from '../../store/vector-store'
import { EditModal } from './EditModal'
import { EditModal2 } from './EditModal2'

export const DragTableGlobal = () => {
  const { vectors, delVector, putValueVector, putVector } = useVectorStore(
    (state) => state
  )
  const [state, setState] = useState({
    vectorId: '',
    position: {
      x: 0,
      y: 0,
    },
  })
  const [periodos, setPeriodos] = useState(0)
  const [periodosnegativo, setPeriodosnegativo] = useState(0)
  const { period, leakage, value_leakage } = useSettingStore((state) => state)
  const { result } = generateData(period)
  const arrayPeriod = crearArrayConNumeros(period)

  const onStart = (e, ui) => {
    const position = vectors.find((x) => x.id === ui.node.id)
    setState({
      vectorId: ui.node.id,
      position: { x: position.position, y: 0 },
    })
  }
  const [prevX, setPrevX] = useState(0)

  const onDrag = (e, ui) => {
    const { x } = ui
    if (x > prevX) {
      setPeriodos((prevPeriodos) => prevPeriodos + 1)
      setPeriodosnegativo((prev) => prev - 1)
    } else if (x < prevX) {
      setPeriodos((prevPeriodos) => prevPeriodos - 1)
      setPeriodosnegativo((prev) => prev + 1)
    }
    setPrevX(x)
    setState({
      vectorId: ui.node.id,
      position: { x: ui.x, y: ui.lastY + ui.deltaY },
    })
  }
  const onStop = async (e, ui) => {
    if (!Array.isArray(vectors)) return
    const posVectors = vectors.filter((x) => x.id === state.vectorId)
    for (let i = 0; i < posVectors.length; i++) {
      const vector = posVectors[i]
      const { id } = vector
      const pos = {
        position: ui.deltaX > 0 ? vector.position - 86 : state.position.x,
      }
      for (let j = 0; j < vector.vectors.length; j++) {
        const item = vector.vectors.slice().sort((a, b) => a.period - b.period)[
          j
        ]
        const pos = {
          period:
            periodos > 0
              ? item.period + periodos
              : periodosnegativo < 0
              ? item.period + periodosnegativo
              : j + 1,
        }
        putValueVector(item.id, pos)
      }
      putVector(id, pos)
    }
  }
  const onDeleteVector = async (id = '') => {
    delVector(id)
  }

  const newData = transformData(result)
  const suma_leakage = newData
    .map((n) => {
      const totalValue = Array.isArray(vectors)
        ? vectors.reduce((acc, v) => {
            const matchingItem = v.vectors.find((i) => i.period === n.period)
            return (
              acc +
              (matchingItem ? matchingItem.value * (value_leakage / 100) : 0)
            )
          }, 0)
        : 0

      return {
        period: n.period,
        value: totalValue + n.value,
      }
    })
    .slice(0, period)

  const sumarValoresPorPeriodo = () => {
    const sumByPeriod = {}

    if (Array.isArray(vectors)) {
      vectors.forEach((item) => {
        if (Array.isArray(item.vectors)) {
          item.vectors.forEach((vector) => {
            const { period, value } = vector
            if (sumByPeriod[period]) {
              sumByPeriod[period] += value
            } else {
              sumByPeriod[period] = value
            }
          })
        }
      })

      const newArray = Object.keys(sumByPeriod).map((period) => ({
        period: parseInt(period),
        totalValue: sumByPeriod[period],
      }))

      return newArray
    } else {
      // Manejar el caso en que vectors no es un array
      return []
    }
  }

  const sumarValoresPorPeriodo2 = () => {
    const sumByPeriod = {}

    if (Array.isArray(vectors)) {
      vectors.forEach((item) => {
        item.vectors.forEach((vector) => {
          const { period, value } = vector
          if (sumByPeriod[period]) {
            sumByPeriod[period] += value * (1 + value_leakage / 100)
          } else {
            sumByPeriod[period] = value * (1 + value_leakage / 100)
          }
        })
      })

      const newArray = Object.keys(sumByPeriod).map((period) => ({
        period: parseInt(period),
        totalValue: sumByPeriod[period],
      }))

      return newArray
    } else {
      // Manejar el caso en que vectors no es un array
      return []
    }
  }

  const sum_total_values = sumarValoresPorPeriodo2()
  const sum_values = sumarValoresPorPeriodo()
  const sum_total = sum_values
    .map((n) => {
      const totalValue = vectors.reduce((acc, v) => {
        const matchingItem = v.vectors.find((i) => i.period === n.period)
        return (
          acc + (matchingItem ? matchingItem.value * (value_leakage / 100) : 0)
        )
      }, 0)

      return {
        period: n.period,
        value: totalValue + n.totalValue,
      }
    })
    .slice(0, period)
  return (
    <Grid
      container
      sx={{
        mt: '10px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'scroll',
        flexDirection: 'row',
      }}
    >
      <Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant='head'>Equip Vector</TableCell>
                <TableCell variant='head'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(vectors) && vectors.length !== 0 ? (
                vectors.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {item.vector}
                    </TableCell>
                    <TableCell size='small'>
                      <IconButton onClick={() => onDeleteVector(item.id)}>
                        <DeleteIcon color='error' fontSize='small' />
                      </IconButton>
                      {item.type_vector === 1 && <EditModal vector={item} />}
                      {item.type_vector === 2 && (
                        <EditModal2 editVector={item} />
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={arrayPeriod.length + 1}
                    style={{ textAlign: 'center' }}
                  >
                    <Typography variant='h6'>No data</Typography>
                  </TableCell>
                </TableRow>
              )}
              {leakage ? (
                <TableRow>
                  <TableCell>Leakage</TableCell>
                </TableRow>
              ) : (
                ''
              )}
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }}>Total</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {arrayPeriod.map((p, index) => (
                  <TableCell key={index} variant='head'>
                    Period {p}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(vectors) &&
                vectors.length > 0 &&
                vectors.map((v) => (
                  <Draggable
                    key={v.id}
                    axis='x'
                    bounds={{ left: 0 }}
                    grid={[86, 50]}
                    defaultPosition={{ x: v.position, y: 0 }}
                    onStart={onStart}
                    onDrag={onDrag}
                    onStop={onStop}
                  >
                    <TableRow key={v.id} id={v.id} sx={{ cursor: 'pointer' }}>
                      {v.vectors
                        .slice()
                        .sort((a, b) => a.period - b.period)
                        .map((i) => (
                          <TableCell key={i.id} sx={{ textAlign: 'center' }}>
                            {!leakage
                              ? (i.value * (1 + value_leakage / 100)).toFixed(2)
                              : i.value.toFixed(2)}
                          </TableCell>
                        ))}
                    </TableRow>
                  </Draggable>
                ))}
              <TableRow>
                {Array.isArray(suma_leakage) &&
                  suma_leakage.length > 0 &&
                  leakage &&
                  suma_leakage
                    .slice()
                    .sort((a, b) => a.period - b.period)
                    .map((i) => (
                      <TableCell key={i.period} sx={{ textAlign: 'center' }}>
                        {i.value.toFixed(2)}
                      </TableCell>
                    ))}
              </TableRow>
              <TableRow>
                {Array.isArray(sum_total) &&
                  sum_total.length > 0 &&
                  leakage &&
                  sum_total
                    .slice()
                    .sort((a, b) => a.period - b.period)
                    .map((i) => (
                      <TableCell key={i.period} sx={{ textAlign: 'center' }}>
                        {i.value.toFixed(2)}
                      </TableCell>
                    ))}
                {Array.isArray(sum_total_values) &&
                  sum_total_values.length > 0 &&
                  !leakage &&
                  sum_total_values
                    .slice()
                    .sort((a, b) => a.period - b.period)
                    .map((i) => (
                      <TableCell key={i.period} sx={{ textAlign: 'center' }}>
                        {i.totalValue.toFixed(2)}
                      </TableCell>
                    ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}
