import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { loginUser } from '../helpers/api/userAuth'
import { getUserByID } from '../helpers/api/user'
export const useAuthSotre = create(
  devtools(
    persist(
      (set) => {
        return {
          status: 'not-authenticated',
          uid: null,
          user_name: null,
          email: null,
          fname: null,
          lname: null,
          role_name: null,
          errorMessage: null,
          state: null,
          token: null,
          expiresAt: null,
          login: async (user) => {
            const {
              ok,
              uid: u,
              token: t,
              errorMessage: em,
              exp,
            } = await loginUser(user)
            if (ok) {
              const {
                user_name: un,
                fname: f,
                lname: l,
                email: e,
                state: s,
                role_name: rn,
              } = await getUserByID(u)
              set(
                {
                  status: 'authenticated',
                  uid: u,
                  user_name: un,
                  email: e,
                  fname: f,
                  lname: l,
                  role_name: rn,
                  state: s,
                  token: t,
                  expiresAt: exp,
                },
                false,
                'LOGIN'
              )
            } else {
              set({ errorMessage: em }, false, 'ERROR_LOGIN')
            }
          },
          resetUser: () => {
            set(
              {
                status: 'not-authenticated',
                uid: null,
                user_name: null,
                email: null,
                fname: null,
                lname: null,
                role_name: null,
                errorMessage: null,
                state: null,
                token: null,
                expiresAt: null,
              },
              false,
              'NO_USER'
            )
          },
        }
      },
      { name: 'auth' }
    )
  )
)
