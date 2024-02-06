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
import { crearArrayConNumeros } from '../../helpers/datas/data'
import { useSettingStore } from '../../store/setting-store'
import { useVectorStore } from '../../store/vector-store'

export const DragTableArea = () => {
  const { vectors } = useVectorStore((state) => state)
  const period = useSettingStore((state) => state.period)
  const { areaVectors } = tranformAreaVectors(vectors)
  const arrayPeriod = crearArrayConNumeros(period)

  const calculateColumnWidth = () => {
    const tableWidth = 859
    const numColumns = arrayPeriod.length
    return tableWidth / numColumns
  }
  const onStart = () => {}
  const onDrag = () => {}
  const onStop = () => {}
  return (
    <Grid
      container
      sx={{
        mt: 3,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'scroll',
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell variant='head'>Area Vector</TableCell>
              {arrayPeriod.map((p, index) => (
                <TableCell key={index} variant='head'>
                  Period {p}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(areaVectors) && areaVectors.length !== 0 ? (
              areaVectors.map((items) => (
                <Draggable
                  key={items.id}
                  bounds={{ left: 0 }}
                  axis='x'
                  defaultPosition={{ x: items.position, y: 0 }}
                  grid={[calculateColumnWidth(), 50]}
                  onStart={onStart}
                  onDrag={onDrag}
                  onStop={onStop}
                >
                  <TableRow id={items.id} key={items.id}>
                    <TableCell>{items.area}</TableCell>
                    {arrayPeriod.map((p) => {
                      const item = items.vectors.find((v) => v.period === p)
                      return (
                        <TableCell key={p} style={{ textAlign: 'center' }}>
                          {item && item.value.toFixed(2)}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                </Draggable>
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
            <TableRow>
              <TableCell>Result</TableCell>
              {/* {resultSum
                .slice()
                .sort((a, b) => a.position - b.position)
                .map((r, index) => (
                  <TableCell key={index} style={{ textAlign: 'center' }}>
                    {r.value}
                  </TableCell>
                ))} */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}
