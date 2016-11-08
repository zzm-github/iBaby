const RecordTypes = {
  10: '喂奶粉',
  20: '喂母乳',
  30: '喂水',
  40: '睡觉',
  50: '嘘嘘',
  60: '粑粑',
  70: '沐浴',
  80: '体温',
  90: '医药/护理',
  100: '其他'
};

const RecordTypeImages = {
  10: require('../assets/bottle.png'),
  20: require('../assets/feed.png'),
  30: require('../assets/water.png'),
  40: require('../assets/cane.png'),
  50: require('../assets/xuxu.png'),
  60: require('../assets/shit.png'),
  70: require('../assets/wash.png'),
  80: require('../assets/temprature.png'),
  90: require('../assets/help.png'),
  100: require('../assets/other.png'),
};

export const ALL = 0;

export default RecordTypes;

export function mapRecordType(func) {
  var arr = [];
  for(let id in RecordTypes) {
    arr.push(func(id, RecordTypes[id]));
  }
  return arr;
}

export function getDisplayRemark(record) {
  switch(parseInt(record.type)) {
    case 20:
      return '1次';
    case 30:
    case 10:
      return record.remark + '毫升';
    case 80:
      return (record.remark/10) + '℃';
    default:
      return record.remark;
  }
}

export function getIconURL(id) {
  return RecordTypeImages[id];
}
