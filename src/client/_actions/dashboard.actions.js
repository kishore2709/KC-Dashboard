import { PostApi } from '_helpers/Utils';
import { dashboardConstants } from '../_constants';

function set(message) {
  return { type: dashboardConstants.SET, message };
}

function get(status) {
  return dispatch => {
    dispatch({
      type: dashboardConstants.FETCH_DATA,
    });
    // console.log(' in get ddashboard Actions', status);
    PostApi(`/api/users/getCitiesInfo${status && status.startDate && status.endDate
      ? '?start=' + status.startDate.getTime() + '&end=' + status.endDate.getTime()
      : ''}`, {})
      .then(ret => {
        // console.log('in get cities', ret);
        if (!ret || !('message' in ret)) throw new Error(ret);
        dispatch(set(ret.message));
        dispatch({
          type: dashboardConstants.FETCH_DATA_DONE,
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: dashboardConstants.FETCH_DATA_DONE,
        });
      });
  };
}

function changeCity(message) {
  return { type: dashboardConstants.CHANGE_CITY, message };
}

export const dashboardActions = {
  get,
  changeCity,
  set,
};
