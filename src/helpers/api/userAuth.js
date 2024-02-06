import JWT from 'jwt-decode';
import { axiosAuth } from './api';

export const loginUser = async (user = null) => {
  if (!user) return;

  try {
    const { data } = await axiosAuth.post('/login', user);
    const { token } = await data;
    const { uid, exp } = JWT(token);
    return {
      ok: true,
      uid,
      token,
      exp,
    };
  } catch (err) {
    const { response, message } = await err;
    const errorMessage =
      message || response.data?.msg || response.data.errors[0]?.msg;
    return { ok: false, errorMessage };
  }
};
