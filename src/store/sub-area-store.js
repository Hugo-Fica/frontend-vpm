import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { deleteSubArea, getSubAreas, postSubArea } from '../helpers/api/subarea'

export const useSubAreaStore = create(
  devtools(
    persist(
      (set, get) => {
        return {
          subareas: [],
          getSubAreas: async () => {
            const { data, ok, errorMessage } = await getSubAreas()
            if (ok) {
              set({ subareas: data }, false, 'FETCH_SUBAREAS')
            } else {
              set(
                { subareas: [], error: errorMessage },
                false,
                'ERROR_FETCH_SUBAREAS'
              )
            }
          },
          postSubAreas: async (subarea) => {
            const { ok, message, errorMessage } = await postSubArea(subarea)
            if (ok) {
              const { data } = await getSubAreas()
              set({ subareas: data, msg: message }, false, 'POST_SUBAREAS')
            } else {
              set({ error: errorMessage }, false, 'ERROR_POST_SUBAREAS')
            }
          },
          delSubArea: async (id) => {
            const currentArea = get().subareas
            const delArea = currentArea.filter((sub) => sub.id !== id)
            const { ok, message, errorMessage } = await deleteSubArea(id)
            if (ok) {
              set({ subareas: delArea, msg: message }, false, 'DELETE_SUBAREA')
            } else {
              set({ error: errorMessage }, false, 'ERROR_DELETE_SUBAREA')
            }
          },
          resetSubAreas: () => {
            set({ subareas: [] }, false, 'NO_SUBAREAS')
          },
        }
      },
      { name: 'sub_area' }
    )
  )
)
