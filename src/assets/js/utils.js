import store from '../../store'
export default {
  getLocalUser () {
    return localStorage.user ? JSON.parse(localStorage.user) : {}
  },
  clone (obj) {
    return JSON.parse(JSON.stringify(obj))
  },
  // 计算基本评分
  calBasicScore (scoreList = {}, rule) {
    let scoreDetail = {total: 0}
    let rules = rule || store.state.basic.ratingRules
    for (let [type, amount] of Object.entries(scoreList)) {
      scoreDetail[type] = Math.round(amount.evaluateScore * rules.class[type].ratio) / 100
      scoreDetail.total += amount.evaluateScore * rules.class[type].ratio
    }
    scoreDetail.total = Math.round(scoreDetail.total) / 100
    return scoreDetail
  },
  // 计算行政考勤
  calCheckScore (scoreList = {}, rule) {
    let scoreDetail = {total: 10000}
    let rules = rule || store.state.basic.ratingRules
    for (let [type, amount] of Object.entries(scoreList)) {
      // 行政事项做特别处理
      if (Array.isArray(amount)) {
        let sScore = 0
        amount.forEach((item) => {
          sScore += item.number * item.evaluateScore * rules.class[type].ratio
        })
        scoreDetail[type] = Math.round(sScore) / -100
        scoreDetail.total -= sScore
      } else {
        scoreDetail[type] = Math.round(amount.number * rules.decount[type].score * rules.class[type].ratio) / -100
        scoreDetail.total -= amount.number * rules.decount[type].score * rules.class[type].ratio
      }
    }
    scoreDetail.total = Math.round(scoreDetail.total) / 100
    return scoreDetail
  },
  // 计算项目评分
  calTaskScore (scoreList = {}, taskStatistic = {}, rule) {
    let scoreDetail = {total: 0}
    let rules = rule || store.state.basic.ratingRules
    // 判断任务评分是否存在
    if (Object.keys(scoreList)) {
      let averageNum = Object.keys(scoreList).length
      for (let [tid, tScore] of Object.entries(scoreList)) {
        let taskAmount = 0
        // 任务列表是否存在该任务判断
        if (!taskStatistic[tid]) {
          averageNum--
          continue
        }
        for (let [cid, cScore] of Object.entries(tScore)) {
          taskAmount += cScore.evaluateScore * rules.class[cid].ratio
        }
        scoreDetail[tid] = Math.round(taskAmount) / 100
        scoreDetail.total += taskAmount * rules.projectLv[taskStatistic[tid]].ratio / 100
      }

      if (averageNum) {
        scoreDetail.total = Math.round(scoreDetail.total / averageNum) / 100
      } else {
        scoreDetail.total = 0
      }
    }
    return scoreDetail
  },
  // 计算简报和考勤
  calbriefingAndCheck (scoreList = {}, rule) {
    let scoreDetail = {total: 0}
    let rules = rule || store.state.basic.ratingRules
    for (let [type, amount] of Object.entries(scoreList)) {
      scoreDetail[type] = 0
      if (amount.length) {
        amount.forEach((val) => {
          scoreDetail[type] += Number(val.evaluateScore)
        })
        scoreDetail.total += scoreDetail[type] * rules.class[type].ratio
        scoreDetail[type] = Math.round(scoreDetail[type])
      }
    }
    scoreDetail.total = Math.round(scoreDetail.total) / 100
    return scoreDetail
  },
  // 计算总体评分和绩效等级
  calScore (scoreList = [], taskStatistic = {}) {
    if (!Array.isArray(scoreList)) scoreList = [scoreList]
    let rules = store.state.basic.ratingRules
    return scoreList.map((score) => {
      let totalScore = {pScore: 0}
      let data = score.data
      // 遍历score根据类型计算得分
      for (let [scoreType, scoreAmount] of Object.entries(data)) {
        switch (scoreType) {
          case '1':
            totalScore[scoreType] = this.calBasicScore(scoreAmount, rules)
            totalScore.pScore += totalScore[scoreType].total * rules.module[scoreType].ratio
            break
          case '2':
            totalScore[scoreType] = this.calCheckScore(scoreAmount, rules)
            totalScore.pScore += totalScore[scoreType].total * rules.module[scoreType].ratio
            break
          case '3':
            totalScore[scoreType] = this.calTaskScore(scoreAmount, taskStatistic, rules)
            totalScore.pScore += totalScore[scoreType].total * rules.module[scoreType].ratio
            break
          case '4':
          case '5':
            totalScore[scoreType] = this.calbriefingAndCheck(scoreAmount, rules)
            totalScore.pScore += totalScore[scoreType].total * rules.module[scoreType].ratio
            break
          default:
            break
        }
      }
      totalScore.pScore = Math.round(totalScore.pScore) / 100
      // 根据评分获取绩效等级
      for (let i = 0; i < rules.perLv.descArr.length; i++) {
        if (totalScore.pScore > rules.perLv.descArr[i]) {
          totalScore.perLv = rules.perLv[rules.perLv.descArr[i]]
          break
        }
      }
      return Object.assign(score, {calScore: totalScore})
    })
  }
}
