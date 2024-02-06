import { getSetting, putSetting } from '../../helpers/api/setting';
import {
  getSettingFailure,
  getSettingStart,
  getSettingSucces,
  putSettingFailure,
  putSettingSucces,
} from './settingSlice';

export const checkingSetting = () => {
  return async (dispatch) => {
    dispatch(getSettingStart());
  };
};
export const startGetSetting = (idS = '') => {
  return async (dispatch) => {
    dispatch(checkingSetting());
    const { ok, unit, leakage, value_leakage, period, errorMessage, id } =
      await getSetting(idS);
    if (!ok) return dispatch(getSettingFailure({ errorMessage }));
    dispatch(getSettingSucces({ unit, leakage, value_leakage, period, id }));
  };
};

export const startPutSetting = (idS = '', setting = {}) => {
  return async (dispatch) => {
    dispatch(checkingSetting());
    const { ok, message, errorMessage } = await putSetting(idS, setting);
    if (!ok) return dispatch(putSettingFailure({ errorMessage }));
    dispatch(putSettingSucces({ message }));
    dispatch(startGetSetting(idS));
  };
};
