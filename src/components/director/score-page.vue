<!-- 评分页面 -->
<style lang='less' scoped>
  .table-content {
    background-color: @backGroundColor;
    .name,
    .table-title {
      margin: 0 16px 0 20px;
    }
    .table-title {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #9875ea;
      line-height: 14px;
    }
    .table-score {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #9a9aa6;
      line-height: 14px;
    }
    .name {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      line-height: 14px;
    }
    .item-score {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #f5a623;
      line-height: 14px;
    }
    .table-desc {
      padding: 0 20px;
      background: #f1f1f5;
      box-shadow: inset 0 -1px 0 0 #dcdae2;
    }
    .formula {
      background: #f8f8fa;
      margin: 12px 20px;
      .score-formula {
        height: 40px;
        line-height: 40px;
      }
    }
    .basic-score {
      background: #ffffff;
      border: 1px solid #dcdae2;
      border-radius: 4px;
      margin: 0 20px;
    }
    .project-score {
      background: #ffffff;
      border: 1px solid #dcdae2;
      border-radius: 4px;
    }
    .score-title {
      margin-bottom: 16px;
    }
    .btn {
      height: 128px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      background: #ffffff;
      /*border: 1px solid #dcdae2;*/
      padding: 20px 0 0 20px;
      .cancel {
        margin-left: 16px;
      }
    }
    .team-contribution {
      border: 1px solid #dcdae2;
      border-radius: 4px;
    }
  }
</style>
<template>
  <div class="table-content">
    <crumbs @callback="getData"
            class="top-nav">
      <i slot="backIcon"
         @click="back"
         class="iconfont icon-back"></i>
    </crumbs>

    <user-info :user="user"></user-info>
    <div class='formula'>
      <ScoreFormula
        :score="{basicsScoreCount, projectScoreCount, contributionCount, checkScoreCount, bulletinCount}"></ScoreFormula>
    </div>
    <div class="basic-score ">
      <div class="score-title">
        <Tabletitle title="基本评分">
          <template slot="composite-scores-wrap">
            <div class='composite-scores-wrap'>
              <span class='score-weight-com'>综合得分</span>
              <span class='per-score-com self-color'>{{basicsScoreCount | numToFixed}}</span>
              <span class='score-weight-com'>权重</span>
              <span class='per-score-com'>{{rules[1].ratio}}%</span>
            </div>
          </template>
        </Tabletitle>
      </div>
      <ratings :ratingScore="score.data[1]" :ratingRules="rules[1].class" @scoreDetail="getBasicScore"></ratings>
      <!--<review-quarter :rules="rules[1]['class']"-->
                      <!--:data="score.data[1]">-->
        <!--<span slot="dept-set"></span>-->
        <!--<span slot='confirm-button'></span>-->
      <!--</review-quarter>-->
    </div>
    <div class="project-score mtlf">
      <div class="score-title">
        <Tabletitle :title="'项目评分'">
          <template slot="composite-scores-wrap">
            <div class='composite-scores-wrap'>
              <span class='score-weight-com'>项目评分</span>
              <span class='per-score-com self-color'>{{projectScoreCount}}</span>
              <span class='score-weight-com'> 权重</span>
              <span class='per-score-com'>{{rules[3].ratio}}%</span>
            </div>
          </template>
        </Tabletitle>
      </div>
      <el-collapse>
        <el-collapse-item v-for="item in task"
                          :key="item.id">
          <template slot="title">
            <div class="table-desc">
              <span class="table-title">{{item.project}} - {{item.task}}</span>
              <span class="table-score">负责人：
                <span class="name">{{item.ownerUUID | getValueById(staff, 'uid', 'name')}}</span>
              </span>
              <span class="table-score">项目得分：
                <span class="item-score">{{item.scoreCount || 0}}</span>
              </span>
            </div>
          </template>
          {{item.scoreData}}
          <ratingTable :tableData="item.class || []"></ratingTable>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="team-contribution mtlf">
      <div class="score-title">
        <Tabletitle :title="'团队贡献'">
          <template slot="composite-scores-wrap">
            <div class='composite-scores-wrap'>
              <span class='score-weight-com'>团队贡献</span>
              <span class='per-score-com self-color'>{{contributionCount}}</span>
              <span class='score-weight-com'>权重</span>
              <span class='per-score-com'>加分项</span>
            </div>
          </template>
        </Tabletitle>
      </div>
      <team-contribution @callback="setContribution"
                         :tableData="contributionData"
                         :rules="this.rules[4]"></team-contribution>
    </div>
    <div class='btn mt'>
      <el-button type="primary" @click="submitScore">确定</el-button>
      <div class='cancel'>
        <el-button @click="$router.back(-1)">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
//  面包屑组件
import crumbs from '@/components/com/crumbs-com'
import inviteTable from '@/components/com/invite-score-table'
import ratingTable from '@/components/com/project-score-table'
import Userinformsg from '@/components/com/user-infomation'
import ScoreFormula from '@/components/com/score-formula'
import Tabletitle from '@/components/com/table-title'
import ReviewQuarter from '@/components/com/review-quarterly-table'
import TeamContribution from '@/components/com/team-contribution'
import ratings from '@/components/com/ratings'

export default {
  components: {
    crumbs: crumbs,
    inviteTable: inviteTable,
    ratingTable: ratingTable,
    userInfo: Userinformsg,
    reviewQuarter: ReviewQuarter,
    teamContribution: TeamContribution,
    ScoreFormula,
    Tabletitle,
    ratings
  },
  data () {
    return {
      score: {
        data: {}
      },
      user: {},
      task: [],
      taskLv: {},
      rules: {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {}
      },
      basicsScoreCount: 0,
      basicsScoreList: {},
      ratingDetails: {}
    }
  },
  computed: {
    quarterId () {
      return this.$store.state.common.quarterId
    },
    staffInfo () {
      return this.$store.state.common.user
    },
    staff () {
      return this.$store.state.basic.staff
    },
    contributionData () {
      return this.score.data[4] ? this.score.data[4][2000] : []
    },
    // 表格数据
    checkTableData () {
      let checkRulesClass = this.rules[2].class || []
      let checkTableData = []
      checkRulesClass.map((item, index) => {
        let scoreItem = this.score.data[2] ? this.score.data[2][item.id] : {}
        item.score = -(scoreItem.number * item.deduct) || '-'
        item.number = scoreItem.number || '-'
        checkTableData.push(item)
      })
      return checkTableData
    },
    contributionTableData () {
      let rulesClass = this.rules[4].class && this.rules[4].class[0] ? this.rules[4].class[0].options : []
      let score = this.score.data[4] ? this.score.data[4][2000] : []
      let data = []
      score.map(item => {
        data.push({
          name: item.evaluateTxt,
          type: this.$options.filters.getValueById(item.evaluateId, rulesClass, 'id', 'name'),
          score: item.evaluateScore
        })
      })
      return data
    },
    bulletinTableData () {
      let score = this.score.data[5] ? this.score.data[5][1000] : []
      let data = []
      score.map(item => {
        if (item.evaluateScore) {
          item.evaluateDate = this.$options.filters.date(item.evaluateDate)
          data.push(item)
        }
      })
      return data
    },
    // 总分
    projectScoreCount () {
      return this.$utils.calTaskScore(this.score.data[3], this.taskLv).total || '-'
    },
    contributionCount () {
      let count = 0
      let contribution = this.score.data[4] ? this.score.data[4][2000] : []
      contribution.forEach(item => {
        count += item.evaluateScore
      })
      return count
    },
    checkScoreCount () {
      let count = 0
      this.checkTableData.map(item => {
        count += -(item.number * item.deduct || 0)
      })
      return count || 0
    },
    bulletinCount () {
      let score = this.score.data[5] ? this.score.data[5][1000] : []
      let count = 0
      score.map(item => {
        count += item.evaluateScore
      })
      return count
    }
  },
  watch: {
    task () {
      this.taskData()
    },
    rules () {
      this.taskData()
    }
  },
  methods: {
    taskData () {
      let classData = this.rules[3].class || []
      this.task.map(item => {
        let score = this.score.data[3][item.id] || {}
        item.class = []
        item.scoreCount = 0
        classData.map(rule => {
          if (score[rule.id]) {
            item.scoreCount += (score[rule.id].evaluateScore || 0) * rule.ratio / 100
            item.class.push({
              name: rule.name,
              radio: rule.ratio + '%',
              score: score[rule.id].evaluateScore,
              text: this.$options.filters.getValueById(score[rule.id].evaluateId, rule.options, 'id', 'name')
            })
          }
        })
      })
    },
    back () {
      this.$router.go(-1)
    },
    getRules () {
      this.$http({
        url: 'score/rules'
      }).then(data => {
        this.setBasicsScoreData(data[1].class)
        this.rules = data
      })
    },
    getData () {
      this.$http({
        url: 'score/staff',
        data: {
          quarterId: this.quarterId,
          staffId: this.$route.params.id
        }
      }).then(data => {
        this.user = data.user
        this.score = data.score
        this.task = data.task
        // 判断是否已评分(对基本评分进行判断)
        if (this.score.status === 2 || this.score.status === 3) {
          this.ratingDetails = this.score.data[1]
          this.basicsScoreCount = this.$utils.calBasicScore(this.score.data[1]).total
        }
      })
      this.$http.post('basic/score-project-level', {staffId: this.$route.params.id}).then(res => {
        this.taskLv = res
      })
    },
    setBasicsScoreData (data) {
      if (!this.score.data[1]) {
        this.score.data[1] = {}
        data.map(item => {
          this.$set(this.score.data[1], item.id, {
            evaluateId: '',
            evaluateScore: ''
          })
        })
      }
    },
    setContribution (row, index) {
      index = index === false ? this.score.data[4][2000].length : index
      if (row) {
        this.$set(this.score.data[4][2000], index, row)
      } else {
        this.score.data[4][2000].splice(index, 1)
      }
    },
    submitScore () {
      let params = Object.assign(this.score, {
        quarterId: this.quarterId,
        staffId: this.$route.params.id
      })
      this.$http({
        url: 'score/add',
        data: params
      }).then(data => {
        this.$message.success('评分成功')
        this.$router.back(-1)
      })
    },
    // 获取基本评分
    getBasicScore (data) {
      this.basicsScoreCount = data.totalScore
      this.score.data[1] = data.data
    }
  },
  beforeMount () {
    this.getRules()
  }
}
</script>
