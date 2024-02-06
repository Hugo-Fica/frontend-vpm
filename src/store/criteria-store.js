import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { getCriterias, putCriteria } from '../helpers/api/criteria'

export const useCriteriaStore = create(
  devtools(
    persist(
      (set) => {
        return {
          criteria: [],
          error: '',
          message: '',
          getCriteria: async () => {
            const { data, ok, errorMessage } = await getCriterias()
            if (ok) {
              set({ criteria: data }, false, 'FETCH_CRITERIA')
            } else {
              set({ error: errorMessage }, false, 'ERROR_FETCH_CRITERIA')
            }
          },
          putCriteria: async (id, value) => {
            const { ok, msg } = await putCriteria(id, value)
            if (ok) {
              const { data } = await getCriterias()
              set({ criteria: data, message: msg }, false, 'UPDATE_CRITERIA')
            }
          },
        }
      },
      { name: 'criteria' }
    )
  )
)
