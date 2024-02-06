import {
  deleteEquipVector,
  getVectorById,
  getVectors,
  postVector,
  putEquipVector,
} from '../../helpers/api/vector';
import { newPositionForVector } from '../../helpers/datas/calculations';
import { createValue, putValue } from '../../helpers/datas/data';
import {
  getVectorFailure,
  VectorStart,
  getVectorSucces,
  getVectorSuccesByid,
  postVectorSucces,
  postVectorFailure,
  postVectorStart,
  deleteVectorStart,
  deleteVectorFailure,
  deleteVectorSucces,
  putVectorStart,
  putVectorFailure,
  putVectorSucces,
} from './vectorSlice';

export const checkingVector = () => {
  return async (dispatch) => {
    dispatch(VectorStart());
  };
};
export const startGetVectors = () => {
  return async (distpach) => {
    distpach(VectorStart());
    const { ok, data, errorMessage } = await getVectors();
    if (!ok) return getVectorFailure({ errorMessage });
    distpach(getVectorSucces({ data }));
  };
};
export const startGetVectorById = (uid = '') => {
  return async (distpach) => {
    distpach(VectorStart());
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
    } = await getVectorById(uid);
    if (!ok) return getVectorFailure({ errorMessage });
    distpach(
      getVectorSuccesByid({
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
      })
    );
  };
};
export const startPostVector = (vector = {}, userID = '', newData = []) => {
  return async (distpach) => {
    distpach(postVectorStart());
    const {
      ok: first,
      id: uid,
      msg: message,
      errorMessage,
    } = await postVector(vector);
    if (!first) return distpach(postVectorFailure({ errorMessage }));
    distpach(postVectorSucces({ uid, message }));
    await createValue(userID, newData, uid);
    const { ok, data, errorMessage: error } = await getVectors();
    if (!ok) return getVectorFailure({ error });
    distpach(getVectorSucces({ data }));
  };
};
export const startPutVector = (
  id = '',
  vector = {},
  datas = [],
  editValue = {}
) => {
  return async (distpach) => {
    distpach(putVectorStart());
    const {
      ok: first,
      message,
      errorMessage,
    } = await putEquipVector(id, vector);
    if (!first) return distpach(putVectorFailure({ errorMessage }));
    await putValue(datas, editValue);
    const { ok, data, errorMessage: error } = await getVectors();
    if (!ok) return getVectorFailure({ error });
    distpach(putVectorSucces({ message, data }));
  };
};

export const startPutVectorPos = (vectors = [], state = {}) => {
  return async (distpach) => {
    distpach(putVectorStart());
    await newPositionForVector(vectors, state);
    const { ok, data, errorMessage: error } = await getVectors();
    if (!ok) return getVectorFailure({ error });
    distpach(putVectorSucces({ data }));
  };
};
export const startDeleteVector = (id = '') => {
  return async (distpach) => {
    distpach(deleteVectorStart());
    const { ok: first, message, errorMessage } = await deleteEquipVector(id);
    if (!first) return distpach(deleteVectorFailure({ errorMessage }));
    distpach(deleteVectorSucces({ message }));
    distpach(startGetVectors());
  };
};
