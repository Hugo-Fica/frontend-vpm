import { axiosSetting } from './api'

export const getSetting = async (idS = null) => {
  if (!idS) return
  try {
    const { data } = await axiosSetting.get(`/${idS}`)
    console.log(data)
    const { unit, leakage, value_leakage, period, id } = data
    return {
      ok: true,
      unit,
      leakage,
      value_leakage,
      period,
      id,
    }
  } catch (err) {
    const { errors } = await err.response.data
    const errorMessage = errors.map((e) => e.msg)[0]
    return {
      ok: false,
      errorMessage,
    }
  }
}
export const putSetting = async (id = null, setting = null) => {
  if (!setting && !id) return
  try {
    const { data } = await axiosSetting.put(`/${id}`, setting)
    const { msg: message } = await data
    return {
      ok: true,
      message,
    }
  } catch (err) {
    const { errors } = await err.response.data
    const errorMessage = errors.map((e) => e.msg)[0]
    return {
      ok: false,
      errorMessage,
    }
  }
}
