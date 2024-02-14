import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React from 'react'
import Draggable from 'react-draggable'
import { tranformAreaVectors } from '../../helpers/datas/transformation'
import {
  crearArrayConNumeros,
  generateData,
  transformData,
} from '../../helpers/datas/data'
import { useSettingStore } from '../../store/setting-store'
import { useVectorStore } from '../../store/vector-store'

export const DragTableArea = () => {
  const { vectors } = useVectorStore((state) => state)
  const { period, leakage, value_leakage } = useSettingStore((state) => state)
  const { areaVectors } = tranformAreaVectors(vectors)
  const arrayPeriod = crearArrayConNumeros(period)
  const { result } = generateData(period)

  const onStart = () => {}
  const onDrag = () => {}
  const onStop = () => {}
  const newData = transformData(result)

  const sumarValoresPorPeriodo = () => {
    const sumByPeriod = {}

    if (Array.isArray(areaVectors)) {
      areaVectors.forEach((item) => {
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

    if (Array.isArray(areaVectors)) {
      areaVectors.forEach((item) => {
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
  const suma_leakage = newData
    .map((n) => {
      const totalValue = Array.isArray(areaVectors)
        ? areaVectors.reduce((acc, v) => {
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
                <TableCell variant='head'>Area Vector</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(areaVectors) && areaVectors.length !== 0 ? (
                areaVectors.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {item.area}
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
              {Array.isArray(areaVectors) &&
                areaVectors.length > 0 &&
                areaVectors.map((v) => (
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
