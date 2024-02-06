import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { deleteArea, getAreas, postArea } from '../helpers/api/area'

export const useAreaStore = create(
  devtools(
    persist(
      (set, get) => {
        return {
          areas: [],
          getAreas: async () => {
            const { ok, data, errorMessage } = await getAreas()
            if (ok) {
              set({ areas: data }, false, 'FETCH_AREAS')
            } else {
              set({ error: errorMessage }, false, 'ERROR_FETCH_AREAS')
            }
          },
          postAreas: async (area) => {
            const { ok, message, errorMessage } = await postArea(area)
            if (ok) {
              const { data } = await getAreas()
              set({ areas: data, msg: message }, false, 'POST_AREA')
            } else {
              set({ error: errorMessage }, false, 'ERROR_POST_AREA')
            }
          },
          delAreas: async (id) => {
            const currentArea = get().areas
            const delArea = currentArea.filter((area) => area.id !== id)
            const { ok, message, errorMessage } = await deleteArea(id)
            if (ok) {
              set({ msg: message, areas: delArea }, false, 'DELETE_AREA')
            } else {
              set({ error: errorMessage }, false, 'ERROR_DELETE_AREA')
            }
          },
          resetArea: () => {
            set({ areas: [] }, false, 'NO_AREAS')
          },
        }
      },
      { name: 'area' }
    )
  )
)
