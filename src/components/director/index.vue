<style lang="less" scoped>
  .container.dir-index {
    .review-items {
      display: flex;
      justify-content: space-between;
      background: #f2f2f2;
      margin-right: -20px;
      .review-item {
        display: flex;
        height: 110px;
        width: 33.3%;
        margin-top: 20px;
        justify-content: space-between;
        align-items: center;
        margin-right: 20px;
        background: #fff;
        .review-desc {
          margin-left: 20px;
        }
        .review-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          margin-right: 20px;
        }
        .subordinates-score {
          background: #b5a8ee url('../../assets/images/kaoheguanli.svg') center center/28px no-repeat;
        }
        .pro-pending-img {
          background: #b5a8ee url('../../assets/images/Projectapproval.png') center center no-repeat;
        }
        .dept-score {
          background: #b5a8ee url('../../assets/images/shenpiguanli.svg') center center/28px no-repeat;
        }
        .rating-pending {
          background: #b5a8ee url('../../assets/images/rating-pending.png') center center no-repeat;
        }
      }
    }
    .table-rows {
      display: flex;
      justify-content: flex-start;
      margin-right: -20px;
      padding-top: 20px;
      background: #f2f2f2;
      .col-1,
      .col-2 {
        height: 340px;
        background: #fff;
        margin-right: 20px;
        &.col-1 {
          width: 33.3%;
          .col-nav {
            height: 50px;
          }
          .col-content {
            padding: 0 39px;
            .top-part {
              margin-top: 36px;
              display: flex;
              justify-content: space-between;
            }
            .separate-line {
              height: 2px;
              border: 1px solid #e0e0e0;
              width: 100%;
              margin-top: 45px;
            }
            .bottom-part {
              margin-top: 44px;
              display: flex;
              justify-content: space-between;
            }
          }
        }
        &.col-2 {
          width: 67.8%;
        }
      }
    }
    /*数据展示公共部分抽离*/
    .review-desc {
      .review-num {
        font-size: 36px;
        color: #9986ed;
        letter-spacing: 0;
        line-height: 36px;
        &.c-yellow {
          color: #f5a623;
        }
        &.c-black {
          color: #000;
        }
        &.f-24 {
          font-size: 24px;
        }
      }
      .review-name {
        font-size: 14px;
        color: #9c9c9c;
        line-height: 14px;
        margin-top: 11px;
      }
    }
    /*根据暂时类型匹配样式*/
    .c-yellow {
      color: #f5a623;
    }
    .c-black {
      color: #000;
    }
    .f-24 {
      font-size: 24px;
    }
  }
</style>
<template>
  <div class="container dir-index">
    <crumbs class="top-nav" @callback="getStatisticData"></crumbs>
    <div class="sub-container">
      <div class="review-items">
        <div class="review-item">
          <div class="review-desc">
            <p class="review-num">{{statisticData.unreviewData&&statisticData.unreviewData.subWaitMarkNum}}</p>
            <p class="review-name">下属待考核</p>
          </div>
          <div class="review-icon subordinates-score"></div>
        </div>
        <div class="review-item">
          <div class="review-desc">
            <p class="review-num">{{statisticData.unreviewData&&statisticData.unreviewData.unreviewProjectNum}}</p>
            <p class="review-name">项目待考核</p>
          </div>
          <div class="review-icon pro-pending-img"></div>
        </div>
        <div class="review-item">
          <div class="review-desc">
            <p class="review-num">{{statisticData.unreviewData&&statisticData.unreviewData.unreviewDeptNum}}</p>
            <p class="review-name">部门绩效待审批</p>
          </div>
          <div class="review-icon dept-score"></div>
        </div>
        <!--<div class="review-item">-->
        <!--<div class="review-desc">-->
        <!--<p class="review-num">24</p>-->
        <!--<p class="review-name">评级待审批</p>-->
        <!--</div>-->

        <!--<div class="review-icon rating-pending"></div>-->
        <!--</div>-->
      </div>
      <div class="table-rows">
        <div class="col-1">
          <div class="col-nav">
            <chartNav
              :navData="{title: '考核状况', isSubTitleShow: false, showMore:true, path:'/employee-assessment?name=下属考核&subname=待考核'}"></chartNav>
          </div>
          <div class="col-content">
            <div class="top-part">
              <div class="review-desc">
                <p class="review-num c-yellow">
                  {{statisticData.checkStatisticData&&statisticData.checkStatisticData.bonusAmount}}</p>
                <p class="review-name">绩效奖金（万元）</p>
              </div>
              <div class="review-desc">
                <p class="review-num c-yellow f-24">
                  {{statisticData.checkStatisticData&&statisticData.checkStatisticData.growthRate}}%</p>
                <p class="review-name">同比增长</p>
              </div>
            </div>
            <p class="separate-line"></p>
            <div class="bottom-part">
              <div class="review-desc">
                <p class="review-num c-yellow">
                  {{statisticData.checkStatisticData&&statisticData.checkStatisticData.count}}</p>
                <p class="review-name">总人数</p>
              </div>
              <div class="review-desc">
                <p class="review-num c-yellow">{{statisticData.checkStatisticData&&statisticData.checkStatisticData.bonusNum}}</p>
                <p class="review-name">分配奖金人数</p>
              </div>
              <div class="review-desc">
                <p class="review-num c-black">{{statisticData.checkStatisticData&&statisticData.checkStatisticData.probationNum}}</p>
                <p class="review-name">试用期人数</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-2">
          <component :is="chartAlive[0]"
                     :id="'charts4'"
                     :chartData="pieData1&&pieData1.percent"
                     :tableData="performanceRanking"
                     :totalNum="pieData1.totalNum"
                     :chartNum="pieData1&&pieData1.data"></component>
        </div>
      </div>
      <div class="table-rows">
        <div class="col-1">
          <component :is="chartAlive[1]"
                     :id="'charts3'"
                     :chartNum="pieData2.num"
                     :chartData="pieData2.percent"
                     :navData="{title: '项目概况', subTitle: '总人数', number: pieData2.totalNum, showMore:true, path:'/manage-project?name=绩效管理&subname=项目管理'}"></component>

        </div>
        <div class="col-1">
          <component :is="chartAlive[2]"
                     :id="'charts1'"
                     :chartData="checkStatistic"
                     :navData="{title: '考勤概况', subTitle: '总人数', number: checkStatistic.totalNum, showMore:true, path:'/attendance-management?name=行为规范&subname=考勤管理'}"></component>

        </div>
        <div class="col-1">
          <component :is="chartAlive[3]"
                     :id="'charts2'"
                     :chartData="briefingStatistic"
                     :navData="{title: '简报概况', subTitle: '总人数', number: briefingStatistic.totalNum, showMore:true, path:'/briefing-management?name=行为规范&subname=简报管理'}"></component>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import crumbs from '@/components/com/crumbs-com'
import chartNav from '@/components/com/chart-nav'
import performanceGeneral from '@/components/com/performance-general'
import echartsBar from '@/components/com/echarts-bar'
import echartPie from '@/components/com/echarts-pie'

export default {
  data () {
    return {
      chartAlive: ['', '', '', ''],
      statisticData: {},
      chartData1: {
        正常: 80,
        迟到: 68,
        早退: 47,
        请假: 50,
        旷工: 23
      },
      chartData2: {
        人事部: 3,
        运维部: 6,
        设计部: 4,
        数据部: 5
      },
      pieData1: {
        totalNum: 0,
        data: {
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0,
          F: 0
        },
        percent: {
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0,
          F: 0
        }
      },
      performanceRanking: [],
      pieData2: {
        totalNum: 0,
        num: {},
        percent: {}
      },
      checkStatistic: {
        valArr: [],
        keyArr: [],
        totalNum: 0
      },
      briefingStatistic: {
        keyArr: [],
        valArr: [],
        totalNum: 0
      }
    }
  },
  computed: {
    quarterId () {
      return this.$store.state.common.quarterId
    }
  },
  methods: {
    // 获取首页统计数据
    getStatisticData () {
      this.$http.post('/home/direct', {uid: '4e961743019a4fa5be0ed567a782cbf2', quarterId: this.quarterId})
        .then((result) => {
          this.$http.post('/home/direct-decount', {uid: '4e961743019a4fa5be0ed567a782cbf2', quarterId: this.quarterId})
            .then((subres) => {
              this.statisticData = Object.assign(result, subres)
              this.getPerformanceStatistic(this.statisticData.performancestatistics)
              this.getProjectStatistic(this.statisticData.projectGeneralData)
              this.getCheckStatistic(this.statisticData.decountStatistic.data, this.statisticData.decountStatistic.num)
              this.getBriefingStatistic(this.statisticData.briefingStatistic.data, this.statisticData.briefingStatistic.num)
            })
        })
    },
    // 获取绩效概况统计数据
    getPerformanceStatistic (data) {
      // 获取各等级绩效数量
      let ectypeData = {
        totalNum: 0,
        data: {
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0,
          F: 0
        },
        percent: {
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0,
          F: 0
        }
      }
      data.performanceDistribute.forEach((val) => {
        ectypeData.data[val.performanceLv]++
        ectypeData.totalNum++
      })
      // 获取各等级绩效百分比
      for (let [key, val] of Object.entries(ectypeData.data)) {
        let cardinal = data.performanceDistribute.length || 0
        ectypeData.percent[key] = Math.round(val * 100 / cardinal) || 0
      }
      this.pieData1 = ectypeData
      // 获取绩效排名数据
      this.performanceRanking = data.performanceRanking.map((val, index) => {
        return {
          ranking: index + 1,
          name: val.uname,
          department: val.deptName,
          score: val.performanceScore
        }
      })
      this.chartAlive[0] = 'performanceGeneral'
    },
    // 获取项目概况统计数据
    getProjectStatistic (data) {
      let ectypeData = {
        totalNum: 0,
        num: {},
        percent: {}
      }
      ectypeData.totalNum = data.projectNum
      ectypeData.num.review = data.reviewNum
      ectypeData.num.unreview = data.unreviewNum
      ectypeData.percent.review = Math.round(data.reviewNum * 100 / data.projectNum)
      ectypeData.percent.unreview = Math.round(data.unreviewNum * 100 / data.projectNum)
      this.pieData2 = ectypeData
      this.chartAlive[1] = 'echartPie'
    },
    // 获取考勤概况统计数据
    getCheckStatistic (data, num) {
      let ectypeData = {
        keyArr: [],
        valArr: [],
        totalNum: num
      }
      for (let val of Object.entries(data)) {
        ectypeData.keyArr.push(val[1].name)
        ectypeData.valArr.push(val[1].person)
      }
      this.checkStatistic = ectypeData
      this.chartAlive[2] = 'echartsBar'
    },
    // 获取简报概况统计数据
    getBriefingStatistic (data, num) {
      let ectype = {
        keyArr: [],
        valArr: [],
        totalNum: 0
      }
      ectype.totalNum = num
      for (let val of Object.entries(data)) {
        ectype.keyArr.push(val[1].name)
        ectype.valArr.push(val[1].num)
      }
      this.briefingStatistic = ectype
      this.chartAlive[3] = 'echartsBar'
    }
  },
  components: {
    crumbs: crumbs,
    chartNav: chartNav,
    performanceGeneral: performanceGeneral,
    echartsBar: echartsBar,
    echartPie: echartPie
  },
  created () {

    //    console.log(this.$store.state.basic.projectLevel)
    //    console.log(this.$store.state.basic.quarter)
    //    console.log(this.$store.state.basic.staff)
    //    console.log(this.$store.state.basic.department)
  }
}
</script>
