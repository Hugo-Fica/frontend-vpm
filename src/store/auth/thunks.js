import { loginUser } from '../../helpers/api/userAuth';
import { getUserByID } from '../../helpers/api/user';
import { checkinCredentials, login, logout } from './authSlice';

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkinCredentials());
  };
};
export const startLogin = (user) => {
  return async (dispatch) => {
    dispatch(checkinCredentials());
    const { ok, uid, token, errorMessage, exp } = await loginUser(user);
    if (!ok) return dispatch(logout({ errorMessage }));
    const { user_name, fname, lname, email, state, role_name } =
      await getUserByID(uid);
    dispatch(
      login({
        uid,
        token,
        user_name,
        fname,
        lname,
        email,
        state,
        role_name,
        exp,
      })
    );
  };
};
