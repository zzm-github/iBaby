import * as api from '../api/server';
import * as T from '../constants/ActionTypes';
import { ALL } from '../constants/RecordTypes';

function dispatchRecordChange(record, dispatch, getState) {
  /*let selectedType = getState().main.selectedRecordType;
  if(record.type == selectedType || selectedType == ALL) {
    dispatch(queryRecordList({
      date: new Date(),
    }, () => {}));
  }
  dispatch(queryTotal());*/
}

export const queryTotal = (cb) => (dispatch) => {
  api.queryTotal((data) => {
    dispatch({
      type: T.RECEIVE_STATES,
      data: data
    });
    cb && cb();
  });
};

export const setSelectRecordType = (id) => (dispatch) => {
  dispatch({
    type: T.SET_SELECT_RECORD_TYPE,
    id: id
  });
}

export const queryRecordList = (params, cb) => (dispatch, getState) => {
  var type = params.type || ALL;
  api.queryRecordList({
    type: type,
    date: params.date,
  }, (recordList) => {
    dispatch({
      type: T.RECEIVE_RECORD_LIST,
      recordList: recordList,
      date: params.date
    });
    cb();
  });
}

export const addRecord = (record, cb) => (dispatch, getState) => {
  api.addRecord(record, () => {
    dispatch({
      type: T.ADD_RECORD,
      record: record,
    });
    cb();

    dispatchRecordChange(record, dispatch, getState);
  });
};

export const updateRecord = (record, cb) => (dispatch, getState) => {
  api.updateRecord(record, () => {
    dispatch({
      type: T.UPDATE_RECORD,
      record: record,
    });
    cb();

    dispatchRecordChange(record, dispatch, getState);
  });
};

export const deleteRecord = (record, cb) => (dispatch, getState) => {
  api.deleteRecord(record, () => {
    dispatch({
      type: T.DELETE_RECORD,
      record: record,
    });
    cb();

    dispatchRecordChange(record, dispatch, getState);
  });
};
