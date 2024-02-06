import axios from 'axios'

const prodConnection = 'backend-vpm-production.up.railway.app'

export const axiosAuth = axios.create({
  baseURL: `https://${prodConnection}/api/auth/`,
})
export const axiosUser = axios.create({
  baseURL: `https://${prodConnection}/api/user/`,
})
export const axiosCriteria = axios.create({
  baseURL: `https://${prodConnection}/api/criteria`,
})
export const axiosArea = axios.create({
  baseURL: `https://${prodConnection}/api/area`,
})
export const axiosActivity = axios.create({
  baseURL: `https://${prodConnection}/api/activity`,
})
export const axiosSubArea = axios.create({
  baseURL: `https://${prodConnection}/api/subarea`,
})
export const axiosVector = axios.create({
  baseURL: `https://${prodConnection}/api/vector`,
})
export const axiosValuesEquip = axios.create({
  baseURL: `https://${prodConnection}/api/values`,
})
export const axiosSetting = axios.create({
  baseURL: `https://${prodConnection}/api/setting`,
})
