<style lang="less" scoped>
  .project-ratings {
    .table-part-container {
      padding: 10px 10px 0 10px;
      .rating-detail {
        background: #f3f3f7;
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        .rating-item {
          display: inline-block;
          margin-left: 20px;
          font-size: 14px;
          color: #6e6e6e;
          .rating-score {
            color: #000;
          }
        }
      }
    }
  }

  .sub-container {
    border-top: 20px;
  }
</style>
<template>
  <div class="container project-ratings">
    <crumbs @callback="onChangeQuarter">
      <i slot="backIcon"
         @click="back"
         class="iconfont icon-back"></i>
      <template slot='is-select'>
      </template>
    </crumbs>
    <div class="sub-container">
      <div class="table-part-container">
        <div class="rating-detail">
          <div class="rating-item">
            本项权重: <span class="rating-score">{{rules[3].ratio}}%</span>
          </div>
          <div class="rating-item">
            项目数: <span class="rating-score">{{task.length}}</span>
          </div>
          <div class="rating-item">
            得分: <span class="rating-score">{{projectScoreCount}}</span>
          </div>
        </div>
        <content-score :tableData="task"></content-score>
      </div>
    </div>
  </div>
</template>
<script>
import crumbsCom from '@/components/com/crumbs-com'
import Contentscore from '@/components/com/project-score'

export default {
  data () {
    return {
      task: [],
      score: {
        data: {}
      },
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
    }
  },
  components: {
    crumbs: crumbsCom,
    contentScore: Contentscore
  },
  methods: {
    back () {
      this.$router.go(-1)
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
    },
    getRules () {
      this.$http({
        url: 'score/rules'
      }).then(data => {
        this.rules = data
        this.setScoreData()
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
          staffId: this.staffInfo.uid
        }
      }).then(data => {
        this.task = data.task
        this.score = data.score
        this.setScoreData()
      })
    }
  },
  beforeMount () {
    this.getRules()
  }
}
</script>
