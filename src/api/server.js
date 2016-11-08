import RecordTypes, { ALL } from '../constants/RecordTypes';
import { isDev, isProd } from '../../env';

var SERVER_URL = 'http://localhost:3000';
if(isDev()) {
  SERVER_URL = 'http://localhost:3000';
} else {
  SERVER_URL = 'https://ibaby.applinzi.com';
}

var data = {
  token: 'pengpeng',
  baby: {
    birthday: new Date('2016-10-25'),
  },
};

export function queryTotal(cb) {
  let states = {};
  for(let typeId in RecordTypes) {
    states[typeId] = 0;
  }
  fetch(SERVER_URL + '/queryStates?token=' + data.token, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((result) => {
    if(result.code == 0) {
      Object.assign(states, result.states);
      cb({
        states: states,
        baby: data.baby
      });
    } else {
      cb({
        states: states,
        baby: data.baby
      });
    }
  })
  .catch((err) => {
      console.log(err);
  });
}

export function queryRecordList(params, cb) {
  let url = SERVER_URL + '/queryRecordList?' +
    'token=' + data.token +
    '&type=' + params.type +
    '&date=' + params.date.getTime();
      console.log(url)
  fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((result) => {
    if(result.code == 0) {
      cb(result.records);
    } else {
      cb([]);
    }
  }).catch(() => {
    cb([]);
  });
}

export function addRecord(record, cb) {
  fetch(SERVER_URL + '/addRecord', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: data.token,
      record: record
    })
  })
  .then((response) => response.json())
  .then((result) => {
    if(result.code == 0) {
      cb();
    } else {
      cb();
    }
  })
  .catch(() => cb());
}

export function updateRecord(record, cb) {
  fetch(SERVER_URL + '/updateRecord', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: data.token,
      record: record
    })
  })
  .then((response) => response.json())
  .then((result) => {
    if(result.code == 0) {
      cb();
    } else {
      cb();
    }
  })
  .catch(() => cb());
}

export function deleteRecord(record, cb) {
  fetch(SERVER_URL + '/deleteRecord', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: data.token,
      record: record
    })
  })
  .then((response) => response.json())
  .then((result) => {
    if(result.code == 0) {
      cb();
    } else {
      cb();
    }
  })
  .catch(() => cb());
}
