import { locationTableConstants } from '../_constants';

const _data = [
  {
    locName: 'Hà Nội', 
    location: 'Việt Nam', 
    dataSource: '1',
  },
  {
    locName: 'Đà Nẵng', 
    location: 'Việt Nam', 
    dataSource: '2',
  },
  {
    locName: 'TP Hồ Chí Minh', 
    location: 'Việt Nam', 
    dataSource: '3',
  },
];

export function locationTable(state = _data, action) {
  switch (action.type) {
    case locationTableConstants.LOCATION_TABLE_ADD:
      return [...state, action.message];
    case locationTableConstants.LOCATION_TABLE_UPDATE:
      let newState = [...state];
      for (let i = 0; i < newState.length; i++)
        if (newState[i].locName === action.message.locName) {
          newState[i] = action.message;
          break;
        }
      // console.log(newState);
      return newState;
    case locationTableConstants.LOCATION_TABLE_SET:
      return action.message;
    case locationTableConstants.LOCATION_TABLE_DELETE:
      newState = [...state];
      const arr = [];
      for (let i = 0; i < newState.length; i++)
        if (newState[i].locName !== action.message.locName) {
          arr.push(newState[i]);
        }
      // console.log(newState);
      return arr;
    case locationTableConstants.LOCATION_TABLE_ERROR:
      return state;
    default:
      return state;
  }
}
