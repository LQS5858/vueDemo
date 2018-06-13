<style lang="less" scoped>
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

  .sub-container {
    border-top: 0;
  }
</style>
<template>
  <div class="container">
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
            本项权重: <span class="rating-score">{{rules[1].ratio}}%</span>
          </div>
          <div class="rating-item">
            项目数: <span class="rating-score">{{basicTableData.length}}</span>
          </div>
          <div class="rating-item">
            本项得分: <span class="rating-score">{{basicsScoreCount}}</span>
          </div>
        </div>
        <basic-score :tableTitle="basicColumnTitle" :tableData="basicTableData">
          <span slot='basic-msg'></span>
        </basic-score>
      </div>
    </div>
  </div>
</template>
<script>
import crumbsCom from '@/components/com/crumbs-com'
import BasicScore from '@/components/com/basic-score'

export default {
  data () {
    return {
      rules: {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {}
      },
      score: {
        data: {}
      },
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
      basicTableData: []
    }
  },
  components: {
    crumbs: crumbsCom,
    basicScore: BasicScore
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
    }
  },
  beforeMount () {
    this.getRules()
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
        this.user = data.user
        this.score = data.score
        this.setScoreData()
      })
    },
    setScoreData () {
      // 基础评分
      let rulesClass = this.rules[1].class || []
      this.basicTableData = []
      rulesClass.map((item, index) => {
        if (index > 2) return
        let scoreItem = this.score.data[1] ? this.score.data[1][item.id] : {}
        item.score = scoreItem.evaluateScore || '-'
        this.basicTableData.push(item)
      })
    }
  }
}
</script>
