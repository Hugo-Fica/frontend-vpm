import { getCriterias } from '../../helpers/api/criteria';
import {
  getCriteriasFailure,
  getCriteriasStart,
  getCriteriasSuccess,
} from './criteriaSlice';

export const checkingCriteria = () => {
  return async (dispatch) => {
    dispatch(getCriteriasStart());
  };
};

export const startGetCriterias = () => {
  return async (dispatch) => {
    dispatch(getCriteriasStart());
    const { data, ok, errorMessage } = await getCriterias();
    if (!ok) return dispatch(getCriteriasFailure({ errorMessage }));
    dispatch(getCriteriasSuccess({ data }));
  };
};
