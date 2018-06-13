<style lang="less" scoped>
  @import "../../assets/style/variable.less";

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

  .dialog-title {
    font-size: 16px;
    font-weight: bold;
  }

  .score-subtract {
    font-size: 12px;
    margin-left: 20px;
    .score-num {
      font-size: 14px;
      color: #1fca6a;
    }
  }

  .sub-items {
    margin-bottom: 50px;
    .sub-title {
      font-size: 14px;
      font-weight: bold;
      color: #000;
      margin-bottom: 15px;
    }
    .sub-content {
      display: flex;
      flex-wrap: wrap;
      .sub-item {
        flex: 0 1 33%;
        color: @subtitleColor;
        .sub-detail {
          margin-left: 10px;
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
  <div class="container briefing-ratings">
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
            本项为加分项
          </div>
          <div class="rating-item">
            本项加分:
            <span class="rating-score">{{contributionCount}}</span>
          </div>
        </div>
        <basic-score :tableTitle="contributionColumnTitle" :tableData="contributionTableData">
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
      ]
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
    contributionCount () {
      let count = 0
      let contribution = this.score.data[4] ? this.score.data[4][2000] : []
      contribution.forEach(item => {
        count += item.evaluateScore
      })
      return count
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
      })
    }
  }
}
</script>
