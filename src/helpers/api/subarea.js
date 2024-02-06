import { axiosSubArea } from './api'

export const getSubAreas = async () => {
  try {
    const { data } = await axiosSubArea.get('/subAreas')
    return {
      ok: true,
      data,
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
export const postSubArea = async (subarea = null) => {
  if (!subarea) return
  try {
    const { data } = await axiosSubArea.post('/addSubArea', subarea)
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
export const deleteSubArea = async (id = null) => {
  if (!id) return
  try {
    const { data } = await axiosSubArea.delete(`/${id}`)
    const { msg: message } = await data
    return {
      ok: true,
      message,
    }
  } catch (err) {
    const { errors } = err.response.data
    const errorMessage = errors.map((e) => e.msg)[0]
    return {
      ok: false,
      errorMessage,
    }
  }
}
