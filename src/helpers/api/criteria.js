import { axiosCriteria } from './api'

export const getCriterias = async () => {
  try {
    const { data } = await axiosCriteria.get('/criterias')
    return {
      ok: true,
      data,
    }
  } catch (err) {
    const { msg: errorMessage } = err.response.data
    return {
      ok: false,
      errorMessage,
    }
  }
}
export const putCriteria = async (id = '', value = {}) => {
  try {
    const { data } = await axiosCriteria.put(`/${id}`, value)
    return {
      ok: true,
      msg: data.msg,
    }
  } catch (err) {
    console.log(err)
    const { msg: errorMessage } = err.response.data
    return {
      ok: false,
      errorMessage,
    }
  }
}
