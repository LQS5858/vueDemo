<style lang='less' scoped>
  .employee-home-wrap {
    position: relative;
    .home-wrap-com-padding {
      padding: 0 20px;
      margin-top: 20px;
    }
    .score-formula {
      height: 67px;
      padding-left: 32px;
      line-height: 67px;
      .formula-com-color {
        color: @fontColor;
      }
      li {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #666666;
        display: inline-block;
      }
    }
    // 四个评分组件样式
    .basic-behavior-wrap {
      display: flex;
      flex-direction: row;
      justify-content: center;
      /*width: 100%;*/
      margin-top: 19px;
      padding: 0 20px;
      flex-wrap: wrap;
      /*height: 100%;*/
      .basic-score-wrap, .technology-innovation {
        background-color: @backGroundColor;
      }
      .brief-title {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #9875ea;
      }
      // 相同宽度类
      .com-width {
        width: 49%;
        /*flex-grow: 0;*/
      }
      // 相同margin-top
      .com-margin-top {
        margin-bottom: 20px;
      }
      // 相同的padding-right
      .com-padding-right {
        /*padding-right: 10px;*/
        margin-right: 10px;
      }
      // 相同的padding-left
      .com-padding-left {
        /*padding-left: 10px;*/
        margin-left: 10px;
      }
    }
  }
</style>
<template>
  <div class='employee-home-wrap'>
    <!-- 面包屑组件 -->
    <crumbs @callback="onChangeQuarter">
      <template slot='is-select'>
      </template>
      <i v-if="dirctorRole"
         slot="backIcon"
         @click="back"
         class="iconfont icon-back"></i>
    </crumbs>
    <!-- 用户信息组件 -->
    <div class='user-msg'>
      <user-information :user="user" :score="score">
      </user-information>
    </div>
    <!--<div class='score-formula'>
      <li>综合得分</li>
      <li class='formula-com-color'>78.5=</li>
      <li>项目评分</li>
      <li class='formula-com-color'>30</li>
      <li>+</li>
      <li>基本评分</li>
      <li class='formula-com-color'>60.5</li>
      <li>+</li>
      <li>行为规范</li>
      <li class='formula-com-color'>-10</li>
      <li>+</li>
      <li>简报评分</li>
      <li class='formula-com-color'>-30</li>
      <li>+</li>
      <li>技术创新</li>
      <li class='formula-com-color'>10</li>
    </div>-->
    <!-- 项目评分组件 -->
    <div class="pro-score home-wrap-com-padding">
      <!-- 表格标题插件 -->
      <table-title :path="`/project-ratings?name=项目列表`" title="项目评分">
        <template slot="composite-scores-wrap">
          <div class='composite-scores-wrap'>
            <span class='score-weight-com'>综合得分</span>
            <span class='per-score-com self-color'>{{projectScoreCount | numToFixed}}</span>
            <span class='score-weight-com'> 权重</span>
            <span class='per-score-com'>{{rules[3].ratio}}%</span>
          </div>
        </template>
      </table-title>
      <content-score :tableData="task.slice(0, 3)"></content-score>
    </div>
    <!--<div class='basic-behavior-wrap'>-->
    <div class='basic-behavior-wrap'>
      <div class='basic-score-wrap com-width com-padding-right'>
        <table-title path="/basic-ratings?name=基本评分" title="基本评分">
          <template slot="composite-scores-wrap">
            <div class='composite-scores-wrap'>
              <span class='score-weight-com'>综合得分</span>
              <span class='per-score-com self-color'>{{basicsScoreCount | numToFixed}}</span>
              <span class='score-weight-com'> 权重</span>
              <span class='per-score-com'>{{rules[1].ratio}}%</span>
            </div>
          </template>
        </table-title>
        <basic-score :tableTitle="basicColumnTitle" :tableData="basicTableData.slice(0, 3)">
          <span slot='basic-msg'></span>
        </basic-score>
      </div>
      <div class='basic-score-wrap  com-width  com-padding-left'>
        <table-title path="/admin-attendance?name=行政考勤" title="行政考勤">
          <template slot="composite-scores-wrap">
            <div class='composite-scores-wrap'>
              <span class='score-weight-com'>综合得分</span>
              <span class='per-score-com self-color'>{{checkScoreCount | numToFixed}}</span>
              <span class='score-weight-com'>权重</span>
              <span class='per-score-com'>{{rules[2].ratio}}%</span>
            </div>
          </template>
        </table-title>
        <basic-score :tableTitle="checkColumnTitle" :tableData="checkTableData.slice(0, 3)">
          <span slot='basic-msg'></span>
        </basic-score>
      </div>
    </div>
    <div class='basic-behavior-wrap'>
      <div class="technology-innovation com-width com-margin-top com-padding-right">
        <table-title title="简报评分" path="briefing-ratings?name=简报规则">
          <span class='brief-title el-icon-warning'>简报规则</span>
          <template slot="composite-scores-wrap">
            <div class='composite-scores-wrap'>
              <span class='score-weight-com'>扣分</span>
              <span class='per-score-com self-color'>{{bulletinCount | numToFixed}}</span>
            </div>
          </template>
        </table-title>
        <basic-score :tableTitle="bulletinColumnTitle" :tableData="bulletinTableData.slice(0, 3)">
          <span slot='basic-msg'></span>
        </basic-score>
      </div>
      <div class="technology-innovation com-width com-margin-top com-padding-left">
        <table-title path="/technological-innovation?name=团队贡献" title="团队贡献">
          <template slot="composite-scores-wrap">
            <div class='composite-scores-wrap'>
              <span class='score-weight-com'>综合得分</span>
              <span class='per-score-com self-color'>{{contributionCount | numToFixed}}</span>
            </div>
          </template>
        </table-title>
        <basic-score :tableTitle="contributionColumnTitle" :tableData="contributionTableData.slice(0, 3)">
          <span slot='basic-msg'></span>
        </basic-score>
      </div>
    </div>
    <!--</div>-->
  </div>
</template>

<script>
import Crumbscom from '@/components/com/crumbs-com'
import Contentscore from '@/components/com/project-score'
import Userinformsg from '@/components/com/user-infomation'
import BasicScore from '@/components/com/basic-score'
import Tabletitle from '@/components/com/table-title'

export default {
  components: {
    crumbs: Crumbscom,
    contentScore: Contentscore,
    userInformation: Userinformsg,
    basicScore: BasicScore,
    tableTitle: Tabletitle
  },
  data () {
    return {
      dirctorRole: false,
      basicColumnTitle: [
        {
          title: '考核事项',
          row: 'name'
        },
        {
          title: '子权重',
          row: 'ratio',
          width: 120,
          format: (row) => {
            return row.ratio + '%'
          }
        },
        {
          title: '具体评分',
          row: 'score',
          width: 120
        }
      ],
      basicTableData: [],
      checkColumnTitle: [
        {
          title: '考核事项',
          row: 'name'
        },
        {
          title: '次数',
          row: 'number',
          width: 120
        },
        {
          title: '具体扣分',
          row: 'score',
          width: 120
        }
      ],
      contributionColumnTitle: [
        {
          title: '内容',
          row: 'name'
        },
        {
          title: '类别',
          row: 'type',
          width: 120
        },
        {
          title: '分数',
          row: 'score',
          width: 120
        }
      ],
      bulletinColumnTitle: [
        {
          title: '内容',
          row: 'evaluateTxt'
        },
        {
          title: '时间',
          row: 'evaluateDate',
          width: 120
        },
        {
          title: '分数',
          row: 'evaluateScore',
          width: 120
        }
      ],
      score: {
        data: {}
      },
      user: {},
      task: [],
      rules: {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {}
      }
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
    // 总分计算
    basicsScoreCount () {
      let data = this.score.data[1] || {}
      let rule = this.rules[1].class || {}
      let count = 0
      for (let key in rule) {
        let score = data[rule[key].id] ? data[rule[key].id].evaluateScore : ''
        if (score !== '') {
          count += score * rule[key].ratio / 100
        } else {
          count = -1
          break
        }
      }
      return count === -1 ? '-' : count
    },
    projectScoreCount () {
      let count = 0
      let len = this.task.length
      let rule = this.rules[3] || {}
      let ruleClass = rule.class || []
      let item, scoreItem
      for (let i = 0; i < len; i++) {
        item = this.task[i]
        scoreItem = this.score.data[3][item.id]
        if (!scoreItem) {
          count = -1
          break
        } else {
          for (let key in scoreItem) {
            count += scoreItem[key].evaluateScore * this.$options.filters.getValueById(+key, ruleClass, 'id', 'ratio') / 100
          }
        }
      }
      return count === -1 || !len ? '-' : count
    },
    checkScoreCount () {
      let count = 0
      this.checkTableData.map(item => {
        count += -(item.number * item.deduct || 0)
      })
      return count || 0
    },
    contributionCount () {
      let count = 0
      let contribution = this.score.data[4] ? this.score.data[4][2000] : []
      contribution.forEach(item => {
        count += item.evaluateScore
      })
      return count
    },
    bulletinCount () {
      let score = this.score.data[5] ? this.score.data[5][1000] : []
      let count = 0
      score.map(item => {
        count += item.evaluateScore
      })
      return count
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
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    getRules () {
      this.$http({
        url: 'score/rules'
      }).then(data => {
        this.rules = data
        this.setScoreData()
      })
    },
    setScoreData () {
      // 任务分数
      let score = this.score.data[3]
      let sumCount = (data) => {
        let sum = 0
        let ruleClass = this.rules[3].class || []
        for (let i in data) {
          ruleClass.map(item => {
            if (item.id === +i) {
              sum += (+data[i].evaluateScore || 0) * item.ratio / 100
            }
          })
        }
        return sum.toFixed(2)
      }
      this.task.map(item => {
        for (let i in score) {
          if (+item.id === +i) {
            item.score = score[i]
            item.scoreCount = sumCount(score[i])
          }
        }
      })
      console.log(this.task)
      // 基础评分
      let rulesClass = this.rules[1].class || []
      this.basicTableData = []
      rulesClass.map((item, index) => {
        if (index > 2) return
        let scoreItem = this.score.data[1] ? this.score.data[1][item.id] : {}
        item.score = scoreItem.evaluateScore || '-'
        this.basicTableData.push(item)
      })
    },
    onChangeQuarter () {
      this.getStaffInfo()
    },
    getStaffInfo () {
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
        this.setScoreData()
      })
    }
  },
  beforeMount () {
    if (this.$route.params.id) {
      this.dirctorRole = true
    } else {
      this.dirctorRole = false
    }
    this.getRules()
  },
  mounted () {
  }
}
</script>
