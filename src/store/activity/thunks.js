import {
  deleteActivity,
  getActivitys,
  postActivity,
} from '../../helpers/api/activity';
import {
  deleteActivityFailure,
  deleteActivityStart,
  deleteActivitySucces,
  getActivityFailure,
  getActivityStart,
  getActivitySuccess,
  postActivityFailure,
  postActivityStart,
  postActivitySucces,
} from './activitySlice';

export const checkingActivity = () => {
  return async (dispactch) => {
    dispactch(getActivityStart());
  };
};
export const startGetActivitys = () => {
  return async (dispatch) => {
    dispatch(getActivityStart());
    const { ok, data, errorMessage } = await getActivitys();
    if (!ok) return dispatch(getActivityFailure({ errorMessage }));
    dispatch(getActivitySuccess({ data }));
  };
};
export const startPostActivity = (activity = {}) => {
  return async (dispactch) => {
    dispactch(postActivityStart());
    const { ok, message, errorMessage } = await postActivity(activity);
    if (!ok) return dispactch(postActivityFailure([errorMessage]));
    dispactch(postActivitySucces({ message }));
    dispactch(startGetActivitys());
  };
};
export const startDeleteActivity = (id = '') => {
  return async (dispatch) => {
    dispatch(deleteActivityStart());
    const { ok, message, errorMessage } = await deleteActivity(id);
    if (!ok) return dispatch(deleteActivityFailure({ errorMessage }));
    dispatch(deleteActivitySucces({ message }));
    dispatch(startGetActivitys());
  };
};
