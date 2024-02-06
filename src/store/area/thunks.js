import { deleteArea, getAreas, postArea } from '../../helpers/api/area';
import {
  deleteAreaFailure,
  deleteAreaStart,
  deleteAreaSucces,
  getAreasFailure,
  getAreasStart,
  getAreasSuccess,
  postAreaFailure,
  postAreaStart,
  postAreaSucces,
} from './areaSlice';
export const checkingArea = () => {
  return async (dispatch) => {
    dispatch(getAreasStart());
  };
};
export const startGetAreas = () => {
  return async (dispatch) => {
    dispatch(getAreasStart());
    const { ok, data, errorMessage } = await getAreas();
    if (!ok) return getAreasFailure({ errorMessage });
    dispatch(getAreasSuccess({ data }));
  };
};
export const startDeleteArea = (id = '') => {
  return async (dispatch, getState) => {
    dispatch(deleteAreaStart());
    const { ok, message, errorMessage } = await deleteArea(id);
    if (!ok) return dispatch(deleteAreaFailure({ errorMessage }));
    dispatch(deleteAreaSucces({ message }));
    const currentAreas = getState().area.areas;
    const updatedAreas = currentAreas.filter((area) => area.id !== id);
    dispatch(getAreasSuccess({ data: updatedAreas }));
  };
};
export const startPostArea = (area = {}) => {
  return async (dispatch) => {
    dispatch(postAreaStart());
    const { ok, message, errorMessage } = await postArea(area);
    if (!ok) return dispatch(postAreaFailure({ errorMessage }));
    dispatch(postAreaSucces({ message }));
    dispatch(startGetAreas());
  };
};
