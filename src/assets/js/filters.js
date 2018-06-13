import moment from 'moment'

export default {
  date (date = new Date(), fmt = 'YYYY-MM-DD') {
    return moment(date).format(fmt)
  },
  getValueById (id, data = [], key, name) {
    let resItem = {}
    let iKey = key || 'id'
    data.map(item => {
      if (item[iKey] === id) resItem = item
    })
    return name ? (resItem[name] || '') : resItem
  },
  getAttendanceScore (data, opt) {
    let ids = [10000, 10001, 10002, 10003]
    let rs = 0
    if (opt['2']) {
      let obj = opt['2']['class']
      ids.forEach(item => {
        obj.forEach(i => {
          if (i.id === item) {
            rs -= +data[item]['number'] * i.deduct
          }
        })
      })
    }

    return rs
  },
  getAdminScore (data, opt) {
    let s = 0
    data.forEach((item) => {
      s += +item.evaluateScore
    })
    return -s
  },
  getAdminTime (data) {
    let time = 0
    data.forEach((item) => {
      time += +item.number
    })
    return time
  },
  getBriefingTime (data) {
    let time = 0
    data.forEach((item) => {
      time += (item.evaluateScore === 0 && item.evaluateTxt === '') ? 0 : 1
    })
    return time
  },
  getBriefingScore (data) {
    let time = 0
    data.forEach((item) => {
      time += +item.evaluateScore
    })
    return time
  },
  numToFixed (value, num = 2) {
    if (value === '-') return value
    return +Number(value).toFixed(num)
  },
  getSex (sex) {
    if (typeof sex === 'number') {
      return ['男', '女'][sex]
    } else {
      return '--'
    }
  },
  getStaffNameById (id, list, flag) {
    if (list.length && id) {
      for (let i = 0, l = list.length; i < l; i++) {
        let item = list[i]
        if (item.uid.trim() === id.trim()) {
          return item.name
        }
      }
    } else {
      return flag || '--'
    }
  }
}
