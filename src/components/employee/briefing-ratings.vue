<style lang="less" scoped>
  @import "../../assets/style/variable.less";

  .table-part-container {
    padding: 10px 10px 0 10px;
    .rating-detail {
      background: #f3f3f7;
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
      .rating-notice {
        float: right;
        font-size: 14px;
        margin-right: 20px;
        .notice-content {
          font-size: 14px;
          color: #6e6e6e;
        }
      }
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
      color: #fc041b;
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
          <div class="rating-notice">
            注：
            <span class="notice-content">简报处罚累计99分不能评A或B(情节严重可直接D开除)；累计超过30分，不能评A；</span>
          </div>
          <div class="rating-item">
            本项为减分项
          </div>
          <div class="rating-item">
            本项扣分:
            <span class="rating-score">{{bulletinCount}}</span>
          </div>
        </div>
        <basic-score :tableTitle="bulletinColumnTitle" :tableData="bulletinTableData">
          <span slot='basic-msg'></span>
        </basic-score>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="50%">
      <template slot="title">
        <span class="dialog-title">BUG问题处理不及时</span>
        <span class="score-subtract">本次扣分：
          <span class="score-num">-2</span>
        </span>
      </template>
      <div class="sub-items">
        <div class="sub-title">简报内容</div>
        <div class="sub-content">
          <div class="sub-item">简报内容：
            <span class="sub-detail">bug问题处理不及时</span>
          </div>
          <div class="sub-item">所属项目：
            <span class="sub-detail">ERP系统重构</span>
          </div>
          <div class="sub-item">简报申请人：
            <span class="sub-detail">李勇敢</span>
          </div>
          <div class="sub-item">项目负责人：
            <span class="sub-detail">李勇敢</span>
          </div>
          <div class="sub-item">上级领导：
            <span class="sub-detail">李勇敢</span>
          </div>
          <div class="sub-item">简报时间：
            <span class="sub-detail">2018.04.20</span>
          </div>
        </div>
      </div>
      <div class="sub-items">
        <div class="sub-title">简报详情</div>
        <p class="briefing-detail">
          睡懒觉了司空见惯两居室的管理局数量的工具劳动工具数量监督管理局大概累计收到了建设领导机构来看待世界管理升级了关键零售价格绿色空间的了科技时代利口捷给累计收到了看经理看</p>
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import crumbsCom from '@/components/com/crumbs-com'
import BasicScore from '@/components/com/basic-score'

export default {
  data () {
    return {
      dialogVisible: false,
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
      ]
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
    bulletinCount () {
      let score = this.score.data[5] ? this.score.data[5][1000] : []
      let count = 0
      score.map(item => {
        count += item.evaluateScore
      })
      return count
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
  components: {
    crumbs: crumbsCom,
    basicScore: BasicScore
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
    },
    showDetails (data) {
      this.dialogVisible = true
    }
  },
  beforeMount () {
    this.getRules()
  }
}
</script>
