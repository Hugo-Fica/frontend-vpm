import { axiosActivity } from './api'

export const getActivitys = async () => {
  try {
    const { data } = await axiosActivity.get('/activitys')
    return {
      ok: true,
      data,
    }
  } catch (err) {
    const { msg } = err.response.data
    const errorMessage = msg
    return {
      ok: false,
      errorMessage,
    }
  }
}
export const postActivity = async (activity = null) => {
  if (!activity) return
  try {
    const { data } = await axiosActivity.post('/newactivity', activity)
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
export const deleteActivity = async (id = null) => {
  if (!id) return
  try {
    const { data } = await axiosActivity.delete(`/${id}`)
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
