import {
  postValueEquipVector,
  putValueEquipVector,
} from '../api/valueEquipVector'
import { postEquipVectorValue, postOperationalStreetValue } from '../api/vector'
// ? por subir
export const generateData = (period) => {
  const result = []
  for (let i = 0; i <= period - 1; i++) {
    const point = { x: i, y: 0 }
    result.push(point)
  }
  return { result }
}
export const crearArrayConNumeros = (numero) => {
  const array = []
  for (let i = 0; i < numero; i++) {
    array.push(i + 1)
  }
  return array
}
export const transformData = (result = []) => {
  const newData = result.map((item, index) => ({
    position: ((index + 1) * 86).toFixed(1),
    value: item.y,
    period: item.x + 1,
  }))
  return newData
}
export const transformData2 = (result = []) => {
  const newData = result.map((item) => ({
    position: ((item.x - 1) * 86).toFixed(1),
    value: item.y,
    period: item.x,
  }))
  return newData
}
export const transformGraphs = (data = {}) => {
  const availabilityDecimal = data.availability / 100
  if (data.criteria === 'm/s' || data.criteria === 'ft/m') {
    const newData = data.vectors
      .slice()
      .sort((a, b) => a.period - b.period)
      .map((item) => ({
        x: item.period - 1,
        y:
          item.value / availabilityDecimal / (data.air_velocity * data.area_m2),
      }))
    return newData
  }
  if (data.criteria === 'm3/kW' || data.criteria === 'cfm/HP') {
    const newData = data.vectors
      .slice()
      .sort((a, b) => a.period - b.period)
      .map((item) => ({
        x: item.period - 1,
        y: item.value / availabilityDecimal / data.power_input,
      }))
    return newData
  }
  if (data.criteria === 'Fix Q') {
    const newData = data.vectors
      .slice()
      .sort((a, b) => a.period - b.period)
      .map((item) => ({
        x: item.period - 1,
        y: item.value / availabilityDecimal / data.fix_q,
      }))
    return newData
  }
}
export const reverseTransformData = (data = []) => {
  const originalData = data.map((item) => ({
    position: item.position,
    value: 0,
  }))
  return originalData
}
export const calculateCriteria = (
  result = [],
  disable = '',
  formState = {},
  m3kW = 0
) => {
  const availabilityDecimal = formState.availability / 100
  if (disable === 'Fix Q') {
    const newResult = result.map((item) => ({
      x: item.x,
      y: formState.fix_q * availabilityDecimal * item.y,
    }))

    return { newResult }
  }
  if (disable === 'm/s' || disable === 'ft/m') {
    const newResult = result.map((item) => ({
      x: item.x,
      y:
        formState.air_velocity *
        formState.area_m2 *
        availabilityDecimal *
        item.y,
    }))

    return { newResult }
  }
  if (disable === 'm3/kW' || disable === 'cfm/HP') {
    //! MODIFICAR CALCULO SEGUN VALOR DEL CRITERIO.
    // ? VER COMO MODIFICAR DATOS.
    const newResult = result.map((item) => ({
      x: item.x,
      y: m3kW * formState.power_input * availabilityDecimal * item.y,
    }))

    return { newResult }
  } else {
    const newResult = result.map((item) => ({
      x: item.x,
      y: item.y,
    }))
    return { newResult }
  }
}
export const createValue = async (uidUser = '', data = [], uidVector) => {
  for (let i = 0; i < data.length; i++) {
    const element = data[i]
    const newPosition = element.position
    const newValue = element.value

    const newCreatedValue = {
      vector_id: uidVector,
      value: newValue,
      position: newPosition,
      user_id: uidUser,
      period: element.period ? element.period : i + 1,
    }
    await postValueEquipVector(newCreatedValue)
  }
}
export const createValueOP = async (data = [], id) => {
  for (let i = 0; i < data.length; i++) {
    const element = data[i]
    const val_y = element.y
    const val_x = element.x
    const newOPVal = {
      vector_id: id,
      value_y: val_y,
      value_x: val_x,
    }
    await postOperationalStreetValue(newOPVal)
  }
}
export const createValueEquip = async (data = [], id) => {
  for (let i = 0; i < data.length; i++) {
    const element = data[i]
    const val_y = element.y
    const val_x = element.x
    const newVEVal = {
      vector_id: id,
      value_y: val_y,
      value_x: val_x,
    }
    await postEquipVectorValue(newVEVal)
  }
}
export const putValue = async (data = [], vectors = {}) => {
  const datas = vectors.vectors
  for (let i = 0; i < data.length; i++) {
    const element = data[i]
    const item = datas[i]
    const id = item.id
    const { position: pos, value: val } = element
    const newValue = {
      position: pos,
      value: val,
      period: i + 1,
    }
    await putValueEquipVector(id, newValue)
  }
}
export const modPos = () => {}

export const calculateCriteriaOS = (
  result = [],
  disable = '',
  formState = {},
  disable2 = '',
  valueEquipVector = [],
  m3kW = 0
) => {
  const availabilityDecimal = formState.availability / 100
  if (disable === 'Fix Q') {
    if (disable2 === 'Fix Q') {
      const newResult = result.map((item, i) => ({
        x: item.x,
        y: (
          formState.fix_q * availabilityDecimal * item?.y +
          formState.fix_q_2 * (valueEquipVector[i]?.y - item?.y)
        ).toFixed(2),
      }))
      return { newResult }
    }
    if (disable2 === 'm/s' || disable === 'ft/m') {
      const newResult = result.map((item, i) => ({
        x: item.x,
        y: (
          formState.fix_q * availabilityDecimal * item?.y +
          formState.air_velocity_2 *
            formState.area_m2_2 *
            (valueEquipVector[i]?.y - item?.y)
        ).toFixed(2),
      }))
      return { newResult }
    }
    if (disable === 'm3/kW' || disable === 'cfm/HP') {
      //! MODIFICAR CALCULO SEGUN VALOR DEL CRITERIO.
      // ? VER COMO MODIFICAR DATOS.
      const newResult = result.map((item, i) => ({
        x: item.x,
        y: (
          formState.fix_q * availabilityDecimal * item?.y +
          m3kW * formState.power_input_2 * (valueEquipVector[i]?.y - item?.y)
        ).toFixed(2),
      }))
      return { newResult }
    } else {
      const newResult = result.map((item) => ({
        x: item.x,
        y: item.y,
      }))
      return { newResult }
    }
  }
  if (disable === 'm/s' || disable === 'ft/m') {
    if (disable2 === 'Fix Q') {
      const newResult = result.map((item, i) => ({
        x: item.x,
        y: (
          formState.air_velocity *
            formState.area_m2 *
            availabilityDecimal *
            item?.y +
          formState.fix_q_2 * (valueEquipVector[i]?.y - item?.y)
        ).toFixed(2),
      }))
      return { newResult }
    }
    if (disable2 === 'm/s' || disable === 'ft/m') {
      const newResult = result.map((item, i) => ({
        x: item.x,
        y: (
          formState.air_velocity *
            formState.area_m2 *
            availabilityDecimal *
            item?.y +
          formState.air_velocity_2 *
            formState.area_m2_2 *
            (valueEquipVector[i]?.y - item?.y)
        ).toFixed(2),
      }))
      return { newResult }
    }
    if (disable === 'm3/kW' || disable === 'cfm/HP') {
      //! MODIFICAR CALCULO SEGUN VALOR DEL CRITERIO.
      // ? VER COMO MODIFICAR DATOS.
      const newResult = result.map((item, i) => ({
        x: item.x,
        y: (
          formState.air_velocity *
            formState.area_m2 *
            availabilityDecimal *
            item?.y +
          m3kW * formState.power_input_2 * (valueEquipVector[i]?.y - item?.y)
        ).toFixed(2),
      }))

      return { newResult }
    } else {
      const newResult = result.map((item) => ({
        x: item.x,
        y: item.y,
      }))
      return { newResult }
    }
  }
  if (disable === 'm3/kW' || disable === 'cfm/HP') {
    //! MODIFICAR CALCULO SEGUN VALOR DEL CRITERIO.
    // ? VER COMO MODIFICAR DATOS.
    if (disable2 === 'Fix Q') {
      const newResult = result.map((item, i) => ({
        x: item.x,
        y: (
          m3kW * formState.power_input * availabilityDecimal * item?.y +
          formState.fix_q_2 * (valueEquipVector[i]?.y - item?.y)
        ).toFixed(2),
      }))
      return { newResult }
    }
    if (disable2 === 'm/s' || disable === 'ft/m') {
      const newResult = result.map((item, i) => ({
        x: item.x,
        y: (
          m3kW * formState.power_input * availabilityDecimal * item?.y +
          formState.air_velocity_2 *
            formState.area_m2_2 *
            (valueEquipVector[i]?.y - item?.y)
        ).toFixed(2),
      }))

      return { newResult }
    }
    if (disable === 'm3/kW' || disable === 'cfm/HP') {
      //! MODIFICAR CALCULO SEGUN VALOR DEL CRITERIO.
      // ? VER COMO MODIFICAR DATOS.
      const newResult = result.map((item, i) => ({
        x: item.x,
        y: (
          m3kW * formState.power_input * availabilityDecimal * item?.y +
          m3kW * formState.power_input_2 * (valueEquipVector[i]?.y - item?.y)
        ).toFixed(2),
      }))
      return { newResult }
    } else {
      const newResult = result.map((item) => ({
        x: item.x,
        y: item.y,
      }))
      return { newResult }
    }
  } else {
    const newResult = result.map((item) => ({
      x: item.x,
      y: item.y,
    }))
    return { newResult }
  }
}
export const calculateSlider = (result = [], disable = '', formState = {}) => {
  const availabilityDecimal = formState.availability / 100
  if (disable === 'Fix Q') {
    const newResult = result.map((item) => ({
      x: item.x,
      y: item.y * formState.fix_q * availabilityDecimal,
    }))
    return { newResult }
  }
  if (disable === 'Max T°') {
    const newResult = result.map((item) => ({
      x: item.x,
      y:
        item.y *
        (((formState.k_w * 859.845) /
          (0.24 * (formState.output_t - formState.intake_t)) /
          3600) *
          availabilityDecimal),
    }))
    return { newResult }
  }
  if (disable === 'm/s') {
    const newResult = result.map((item) => ({
      x: item.x,
      y:
        item.y *
        formState.air_velocity *
        formState.area_m2 *
        availabilityDecimal,
    }))
    return { newResult }
  }
  if (disable === 'R/h') {
    const newResult = result.map((item) => ({
      x: item.x,
      y:
        item.y *
        ((formState.r_h * formState.volume_m3) / 3600) *
        availabilityDecimal,
    }))

    return { newResult }
  } else {
    const newResult = result.map((item) => ({
      x: item.x,
      y: item.y,
    }))
    return { newResult }
  }
}
