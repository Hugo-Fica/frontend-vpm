import {
  deleteSubArea,
  getSubAreas,
  postSubArea,
} from '../../helpers/api/subarea';
import {
  deleteSubareaFailure,
  deleteSubareaStart,
  deleteSubareaSucces,
  getSubareasFailure,
  getSubareasStart,
  getSubareasSuccess,
  postSubareaFailure,
  postSubareaStart,
  postSubareaSucces,
} from './subareaSlice';

export const checkingSubareas = () => {
  return async (dispatch) => {
    dispatch(getSubareasStart());
  };
};

export const startGetSubareas = () => {
  return async (dispatch) => {
    dispatch(getSubareasStart());
    const { data, ok, errorMessage } = await getSubAreas();
    if (!ok) return dispatch(getSubareasFailure({ errorMessage }));
    dispatch(getSubareasSuccess({ data }));
  };
};
export const startDeleteSubareas = (id = '') => {
  return async (dispatch) => {
    dispatch(deleteSubareaStart);
    const { ok, message, errorMessage } = await deleteSubArea(id);
    if (!ok) return dispatch(deleteSubareaFailure({ errorMessage }));
    dispatch(deleteSubareaSucces({ message }));
    dispatch(startGetSubareas());
  };
};
export const startPostSubarea = (subarea = {}) => {
  return async (dispatch) => {
    dispatch(postSubareaStart());
    const { ok, message, errorMessage } = await postSubArea(subarea);
    if (!ok) return dispatch(postSubareaFailure({ errorMessage }));
    dispatch(postSubareaSucces({ message }));
    dispatch(startGetSubareas());
  };
};
