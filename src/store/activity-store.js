import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import {
  deleteActivity,
  getActivitys,
  postActivity,
} from '../helpers/api/activity'
export const useActivityStore = create(
  devtools(
    persist(
      (set, get) => {
        return {
          activity: [],
          getActivys: async () => {
            const { ok, data, errorMessage } = await getActivitys()
            if (ok) {
              set({ activity: data }, false, 'FETCH_ACTIVITY')
            } else {
              set({ error: errorMessage }, false, 'ERROR_FETCH_ACTIVITY')
            }
          },
          postActivity: async (activity) => {
            const { ok, message, errorMessage } = await postActivity(activity)
            if (ok) {
              const { data } = await getActivitys()
              set({ msg: message, activity: data }, false, 'POST_ACTVITY')
            } else {
              set({ error: errorMessage }, false, 'ERROR_POST_ACTIVITY')
            }
          },
          deleteActivity: async (id) => {
            const currentActivity = get().activity
            const delActivity = currentActivity.filter(
              (activity) => activity.id !== id
            )
            const { ok, message, errorMessage } = await deleteActivity(id)
            if (ok) {
              set(
                { msg: message, activity: delActivity },
                false,
                'DELETE_ACTIVITY'
              )
            } else {
              set({ error: errorMessage }, false, 'ERROR_DELETE_ACTIVITY')
            }
          },
          resetActivyt: () => {
            set({ activity: [] }, false, 'NO_ACTIVITY')
          },
        }
      },
      { name: 'Activity' }
    )
  )
)
