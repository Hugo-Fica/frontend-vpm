/* eslint-disable object-shorthand */
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import {
  deleteEquipVector,
  getVectorById,
  getVectors,
  postOperationalStreet,
  postVector,
  putEquipVector,
} from '../helpers/api/vector'
import {
  createValue,
  createValueEquip,
  createValueOP,
  putValue,
} from '../helpers/datas/data'
import { newPositionForVector } from '../helpers/datas/calculations'
import { putValueEquipVector } from '../helpers/api/valueEquipVector'

export const useVectorStore = create(
  devtools(
    persist(
      (set, get) => {
        return {
          ok: false,
          uid: null,
          vectors: [],
          errorMessage: null,
          activity: null,
          air_velocity: 0,
          area: null,
          area_m2: 0,
          availability: 0,
          criteria: null,
          fix_q: 0,
          power_input: 0,
          sub_area: null,
          vector_name: null,
          user: null,
          values: [],
          message: null,
          getVectors: async () => {
            const { ok, data, errorMessage } = await getVectors()
            if (ok) {
              set({ vectors: data }, false, 'FETCH_VECTOR')
            } else {
              set(
                { vectors: [], error: errorMessage },
                false,
                'ERROR_FETCH_VECTOR'
              )
            }
          },
          getVectorById: async (uid) => {
            const {
              ok,
              activity,
              air_velocity,
              area,
              area_m2,
              availability,
              criteria,
              fix_q,
              id,
              position,
              power_input,
              sub_area,
              user,
              vector,
              values,
              errorMessage,
            } = await getVectorById(uid)
            if (ok) {
              set(
                {
                  activity: activity,
                  air_velocity: air_velocity,
                  area: area,
                  area_m2: area_m2,
                  availability: availability,
                  criteria: criteria,
                  fix_q: fix_q,
                  id: id,
                  position: position,
                  power_input: power_input,
                  sub_area: sub_area,
                  user: user,
                  vectors: vector,
                  values: values,
                },
                false,
                'FETCH_VECTOR_BY_ID'
              )
            } else {
              set({ error: errorMessage }, false, 'ERROR_FETCH_VECTOR_BY_ID')
            }
          },
          postVector: async (vector, userID, newData) => {
            const {
              ok: first,
              id: uid,
              msg: message,
              errorMessage,
            } = await postVector(vector)
            if (first) {
              set({ uid: uid, message: message })
              await createValue(userID, newData, uid)
              const { data } = await getVectors()
              set({ vectors: data })
            } else {
              set({ error: errorMessage })
            }
          },
          postOperationalStreet: async (
            user_id,
            vector,
            equip_value,
            op_value,
            value_vector,
            operational_street
          ) => {
            const {
              ok,
              id: uid,
              msg: message,
              errorMessage,
            } = await postVector(vector)
            if (ok) {
              set({ uid: uid, message: message })
              await createValue(user_id, value_vector, uid)
              await createValueOP(op_value, uid)
              await createValueEquip(equip_value, uid)
              await postOperationalStreet(operational_street, uid)
              const { data } = await getVectors()
              set({ vectors: data })
            } else {
              set({ error: errorMessage })
            }
          },
          putVector: async (id, vector, datas, editValue) => {
            const {
              ok: first,
              message,
              errorMessage,
            } = await putEquipVector(id, vector)
            if (!first) set({ error: errorMessage })
            await putValue(datas, editValue)
            const { data } = await getVectors()
            set({ vectors: data, message: message })
          },
          putVectorPos: async (vectors, state) => {
            await newPositionForVector(vectors, state)
            const { ok, data, errorMessage } = await getVectors()
            if (ok) {
              set({ vectors: data })
            } else {
              set({ error: errorMessage })
            }
          },
          putValueVector: async (id, datas) => {
            const { ok, msg, errorMessage } = await putValueEquipVector(
              id,
              datas
            )
            if (ok) {
              set({ message: msg }, false, 'UPDATE_VALUE_VECTOR')
            } else {
              set({ errorMessage: errorMessage })
            }
          },
          delVector: async (id) => {
            const currentVector = get().vectors
            const delVector = currentVector.filter((vector) => vector.id !== id)
            const { message, ok } = await deleteEquipVector(id)
            if (ok) {
              set({ vectors: delVector, message: message })
            }
          },
          resetVector: () => {
            set({ vectors: [] }, false, 'NO_VECTOR')
          },
        }
      },
      { name: 'vector' }
    )
  )
)
