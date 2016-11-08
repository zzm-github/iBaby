import * as T from '../constants/ActionTypes';
import { ALL } from '../constants/RecordTypes';
import { combineReducers } from 'redux';
import { isCommonDate } from '../utils';

const initialState = {
  baby: {},
  states: {},
  selectedRecordType: ALL,
  recordList: [],
  recordListDate: null
};

function recordListSorter(a, b) {
  return a.startTime - b.startTime;
}

const main = (state = initialState, action) => {
  let states;
  let recordList;
  switch (action.type) {
    case T.RECEIVE_STATES:
      return {
        ...state,
        baby: action.data.baby,
        states: action.data.states,
      };
    case T.SET_SELECT_RECORD_TYPE:
      return {
        ...state,
        selectedRecordType: action.id
      };
    case T.RECEIVE_RECORD_LIST:
      return {
        ...state,
        recordList: (action.recordList || []).sort(recordListSorter),
        recordListDate: action.date,
      };
    case T.ADD_RECORD:
      if(!isCommonDate(state.recordListDate, new Date(action.record.startTime))) return state;
      recordList = state.recordList.slice(0);
      states = state.states;
      states[action.record.type] ++;
      recordList.push(action.record);
      return {
        ...state,
        states: states,
        recordList: recordList.sort(recordListSorter),
      };
    case T.UPDATE_RECORD:
      if(!isCommonDate(state.recordListDate, new Date(action.record.startTime))) return state;
      recordList = state.recordList.slice(0);
      states = state.states;
      let oldRec;
      for(let i=0,len=recordList.length; i<len; i++) {
        let record = recordList[i];
        if(record.id === action.record.id) {
          oldRec = record;
          recordList[i] = action.record;
          break;
        }
      }
      states[oldRec.type] --;
      states[action.record.type] ++;
      return {
        ...state,
        states: states,
        recordList: recordList.sort(recordListSorter),
      };
    case T.DELETE_RECORD:
      if(!isCommonDate(state.recordListDate, new Date(action.record.startTime))) return state;
      recordList = state.recordList.slice(0);
      states = state.states;
      states[action.record.type] --;
      for(let i=0,len=recordList.length; i<len; i++) {
        let record = recordList[i];
        if(record.id === action.record.id) {
          recordList.splice(i, 1);
          break;
        }
      }
      return {
        ...state,
        states: states,
        recordList: recordList,
      };
    default:
      return state;
  }
};

export default combineReducers({
  main
});
