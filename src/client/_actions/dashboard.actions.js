import { PostApi } from '_helpers/Utils';
import { dashboardConstants } from '../_constants';

function set(message) {
  return { type: dashboardConstants.SET, message };
}

function get() {
  return dispatch => {
    PostApi('/api/users/getCitiesInfo', {})
      .then(ret => {
        console.log('in get cities', ret);
        if (!ret || !('message' in ret)) throw new Error(ret);
        dispatch(set(ret.message));
      })
      .catch(err => {
        console.log(err);
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
