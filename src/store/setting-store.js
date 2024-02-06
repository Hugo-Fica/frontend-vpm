import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { getSetting, putSetting } from '../helpers/api/setting'

export const useSettingStore = create(
  devtools(
    persist(
      (set, get) => {
        return {
          id: null,
          unit: null,
          leakage: null,
          value_leakage: null,
          period: null,
          message: null,
          errorMessage: null,
          getSetting: async (idS) => {
            const {
              ok,
              unit: u,
              leakage: l,
              value_leakage: vl,
              period: p,
              errorMessage,
              id: i,
            } = await getSetting(idS)
            if (ok) {
              set(
                { id: i, unit: u, leakage: l, value_leakage: vl, period: p },
                false,
                'FETCH_SETTING'
              )
            } else {
              set({ error: errorMessage }, false, 'ERROR_FETCH_SETTING')
            }
          },
          putSetting: async (setting) => {
            const id = get().id
            const { ok, message, errorMessage } = await putSetting(id, setting)
            if (ok) {
              const {
                unit: u,
                leakage: l,
                value_leakage: vl,
                period: p,
                id: i,
              } = await getSetting(id)
              set(
                {
                  id: i,
                  unit: u,
                  leakage: l,
                  value_leakage: vl,
                  period: p,
                  msg: message,
                },
                false,
                'PUT_SETTING'
              )
            } else {
              set({ error: errorMessage }, false, 'ERROR_PUT_SETTING')
            }
          },
        }
      },
      { name: 'setting' }
    )
  )
)
