import { createSelector } from 'reselect';
import { ALL } from '../constants/RecordTypes';

export const getStates = (state) => state.main.states;
export const getStatesAsArray = (state) => {
  var arr = [];
  var states = getStates(state);
  for(let typeId in states) {
    arr.push({
      id: typeId,
      value: states[typeId]
    });
  }
  return arr;
};
export const getBaby = (state) => state.main.baby;
export const getBabyAge = (state) => {
  var baby = getBaby(state);
  var birthday = baby && baby.birthday ? new Date(baby.birthday) : new Date();
  var time = Date.now() - birthday.getTime();
  return Math.floor(time / 1000 / 60 / 60 / 24);
};
export const getRecordList = (state) => state.main.recordList;
export const getRecordListByType = (state) => {
  var type = state.main.selectedRecordType;
  if(type == ALL) {
    return getRecordList(state);
  }
  return state.main.recordList.filter((rec) => rec.type == type);
};
