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
              本项权重: <span class="rating-score">{{rules[2].ratio}}%</span>
            </div>
            <div class="rating-item">
              项目数: <span class="rating-score">{{checkTableData.length}}</span>
            </div>
            <div class="rating-item">
              本项得分: <span class="rating-score">{{checkScoreCount}}</span>
            </div>
          </div>
          <basic-score :tableTitle="checkColumnTitle" :tableData="checkTableData">
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
    checkScoreCount () {
      let count = 0
      this.checkTableData.map(item => {
        count += -(item.number * item.deduct || 0)
      })
      return count || 0
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
