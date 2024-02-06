import { axiosUser } from './api'

export const getUserByID = async (uid = null) => {
  if (!uid) return
  try {
    const { data } = await axiosUser.get(`/${uid}`)
    const { email, fname, lname, role, user_name, state } = await data
    const { role: role_name } = role
    return { ok: true, user_name, fname, lname, email, state, role_name }
  } catch (err) {
    const { response } = err
    const { msg: errorMessage } = response.data
    return {
      ok: false,
      errorMessage,
    }
  }
}
