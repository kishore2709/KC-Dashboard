import { PostApi } from '_helpers/Utils';
import { dashboardConstants } from '../_constants';

function set(message) {
  return { type: dashboardConstants.SET, message };
}

function get(status) {
  return doRequest(status)
}

function doRequest(status) {
  console.log(status)
  return dispatch => {
    dispatch({
      type: dashboardConstants.FETCH_DATA,
    });
    PostApi(`/api/users/getCitiesInfo?city=${status.targetCity}&start=${status.dateRange.start.getTime()}&end=${status.dateRange.end.getTime()}`, {})
      .then(ret => {
        if (!ret || !('message' in ret) || !('cities' in ret)) throw new Error(ret);
        dispatch(set(ret.message));
        dispatch(changeDateRange(status.dateRange))
        dispatch(changeCity(status.targetCity))
        dispatch(setCities(ret.cities))
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
  }
};

function setCities(message) {
  return { type: dashboardConstants.SET_CITY, message };
}

function getAllCities() {
  return dispatch => {
    PostApi(`/api/users/getCities`, {})
      .then(ret => {
        if (!ret || !('message' in ret)) throw new Error(ret);
        dispatch(setCities(ret.message));
      })
      .catch(err => {
        console.log(err);
      });
  }
}

function changeDateRange(message) {
  return { type: dashboardConstants.CHANGE_DATE_RANGE, message };
}

function changeCity(message) {
  return { type: dashboardConstants.CHANGE_CITY, message };
}

function setRef(message){
  return { type: 'setRef', message};
}
export const dashboardActions = {
  setRef,
  get,
  changeCity,
  changeDateRange,
  set,
  getAllCities,
};
