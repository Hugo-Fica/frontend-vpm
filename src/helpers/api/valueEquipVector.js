import { axiosValuesEquip } from './api';

export const postValueEquipVector = async (valueEquip = null) => {
  if (!valueEquip) return;
  try {
    const { data } = await axiosValuesEquip.post('/newValue', valueEquip);
    const { msg } = data;
    return {
      ok: true,
      msg,
    };
  } catch (err) {
    const { errors } = err.response.data;
    const errorMessage = errors.map((e) => e.msg)[0];
    return {
      ok: false,
      errorMessage,
    };
  }
};

export const putValueEquipVector = async (id = null, datas = null) => {
  if (!id && !datas) return;
  try {
    const { data } = await axiosValuesEquip.put(`/${id}`, datas);
    const { msg } = data;
    return {
      ok: true,
      msg,
    };
  } catch (err) {
    const { errors } = err.response.data;
    const errorMessage = errors.map((e) => e.msg)[0];
    return {
      ok: false,
      errorMessage,
    };
  }
};
