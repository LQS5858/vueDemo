<!-- 中心管理者首页 -->
<style lang='less' scoped>
  .performance-general-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    li {
      list-style-type: none;
      padding-top: 11px;
    }
    .right-performance {
      flex-grow: 1;
      // width: 400px;
      width: 400px;
      .com-font-size {
        font-family: SFProText-Regular;
        font-size: 36px;
        color: #9986ed;
        letter-spacing: 0;
        line-height: 36px;
      }
      .pro-com-font-size {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #9c9c9c;
        letter-spacing: 0;
        line-height: 14px;
      }
    }
    .right-performance-userheader {
      float: right;
    }
    .subordinates_performance,
    .pro-preformance {
      height: 160px;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      background-color: @backGroundColor;
    }
    .performance-general {
      flex-grow: 3;
      padding-right: 10px;
      // width: 100%;
    }
  }

  .bar-pie-tatal-wrap {
    display: flex;
    flex-direction: row;
    // flex-wrap: wrap;
    .project-overview-wrap {
      background-color: @backGroundColor;
    }
    .briefing-table {
      height: 400px;
      width: 400px;
      background-color: @backGroundColor;
    }
    .com-width {
      width: 100%/3;
      flex-grow: 1;
    }
  }
</style>
<template>
  <div class='manager-wrap'>
    <!-- 面包屑组件 -->
    <crumbs @callback="getStatisticData"></crumbs>
    <!-- 用户信息组件 -->
    <div class='user-msg'>
      <user-information :user="user" :score="score">
      </user-information>
    </div>
    <!-- 绩效概况组件 -->
    <div class='performance-general-wrap mt prl'>
      <div class='performance-general'>
        <components :is="activeComponent[0]"
                    :id="'charts4'"
                    :chartData="pieData1&&pieData1.percent"
                    :tableData="performanceRanking"
                    :totalNum="pieData1.totalNum"
                    :chartNum="pieData1&&pieData1.data"></components>
      </div>
      <!-- <echarts_pie></echarts_pie> -->
      <div class='right-performance'>
        <div class="subordinates_performance">

          <div class='prl'>
            <li class='com-font-size'>{{performanceAppraisal}}</li>
            <li class='pro-com-font-size'>下属绩效考核</li>
          </div>
          <div class='right-performance-userheader prl'><img src="@/assets/images/userheader.png" alt="加载失败"></div>
        </div>
        <div class='pro-preformance mt'>
          <div class='prl'>
            <li class='com-font-size'>{{projectInspectionCount}}</li>
            <li class='pro-com-font-size'>项目待考核</li>
          </div>
          <div class='fr prl'>
            <img src="@/assets/images/Projectapproval.png" alt='加载是吧'>
          </div>

        </div>
      </div>
    </div>
    <!-- 三个表格大容器 -->
    <div class='bar-pie-tatal-wrap  mt prl'>
      <div class='project-overview-wrap com-width'>
        <!-- 饼图组件  -->
        <components :is="activeComponent[1]"
                    :id="'charts3'"
                    :chartNum="pieData2.num"
                    :chartData="pieData2.percent"
                    :navData="{title: '项目概况', subTitle: '总人数', number: pieData2.totalNum, showMore:true, path:'/manage-project?name=绩效管理&subname=项目管理'}">
        </components>
      </div>
      <!-- 第二个柱状图容器 -->
      <div class='attendance-bar com-width prl'>
        <echarts_bar :id="'charts1'"
                     :chartData="checkStatistic"
                     :navData="{title: '考勤概况', subTitle: '总人数', number: checkStatistic.totalNum||'0', showMore:true, path:'/attendance-management?name=行为规范&subname=考勤管理'}">
        </echarts_bar>
      </div>
      <!-- 第三个简报表格容器 -->
      <div class='briefing-table '>
        <chart_nav
          :navData="{title: '简报概况', subTitle: '总人数', number: briefingStatistic.totalNum||'0', showMore:true, path:'/briefing-management?name=行为规范&subname=简报管理'}"></chart_nav>
        <components :is="activeComponent[2]"
                    :tableTitle="tableTitle"
                    :tableData="tableData">
          <template slot='basic-msg'>
            <p></p>
          </template>
        </components>
      </div>
    </div>
  </div>
</template>

<script>
import Crumbs from '@/components/com/crumbs-com'
import UserInformation from '@/components/com/user-infomation'
import Performancegeneral from '@/components/com/performance-general'
import Echartspie from '@/components/com/echarts-pie'
import ChartNav from '@/components/com/chart-nav'
import Echartbar from '@/components/com/echarts-bar'
import Tabletitle from '@/components/com/table-title'
import Basicscore from '@/components/com/basic-score'

export default {
  data () {
    return {
      tableData: [],
      tableTitle: [
        {
          title: '姓名',
          format: (row) => {
            return this.$options.filters.getValueById(row.uid, this.staff, 'uid', 'name')
          }
        },
        {
          title: '内容',
          row: 'evaluateTxt'
        },
        {
          title: '时间',
          row: 'evaluateDate'
        },
        {
          title: '分数',
          row: 'evaluateScore'
        }],
      activeComponent: ['', '', ''],
      score: {
        data: {}
      },
      user: {},
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
      statisticData: {},
      pieData1: {
        totalNum: 0,
        data: {
          A: 0,
          B: 0,
          C: 0,
          D: 0
        },
        percent: {
          A: 0,
          B: 0,
          C: 0,
          D: 0
        }
      },
      newPieDataTwo: {},
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
      },
      performanceRanking: []
    }
  },

  components: {
    crumbs: Crumbs,
    userInformation: UserInformation,
    performance_general: Performancegeneral,
    echarts_pie: Echartspie,
    chart_nav: ChartNav,
    echarts_bar: Echartbar,
    table_title: Tabletitle,
    basic_score: Basicscore
  },
  computed: {
    staff () {
      return this.$store.state.basic.staff
    },
    // 下属绩效考核
    performanceAppraisal () {
      return this.statisticData.unreviewData && this.statisticData.unreviewData.subWaitMarkNum
    },
    // 项目待考核
    projectInspectionCount () {
      return this.statisticData.unreviewData && this.statisticData.unreviewData.unreviewProjectNum
    },
    quarterId () {
      return this.$store.state.common.quarterId
    },
    getUid () {
      return this.$store.state.common.user.uid
    },
    getDeptId () {
      return this.$store.state.common.user.deptId
    }
  },
  mounted () {},
  methods: {
    // 获取首页统计数据
    getStatisticData () {
      let data = {
        quarterId: this.quarterId,
        uid: this.getUid,
        deptid: '1003'
      }
      this.$http({
        url: '/home/manage',
        data: data
      }).then(result => {
        this.$http({
          url: '/home/manage-decount',
          data: data
        }).then(subdata => {
          Object.assign(result, subdata)
          this.getCheckStatistic(result.decountStatistic.data, result.decountStatistic.num)
          this.getProjectStatistic(result.projectGeneralData)
          this.getBriefingStatistic(result.briefingStatistic.data, result.briefingStatistic.num)
          this.getPerformanceStatistic(result.performancestatistics)
          this.statisticData = result
          /*
          console.log(result)
           console.log(this.getDeptId)
           */
        })
      })
      this.getStaffInfo()
    },
    getPerformanceStatistic (data) {
      // 获取各等级绩效数量
      let ectypeData = {
        totalNum: 0,
        data: {
          A: 0,
          B: 0,
          C: 0,
          D: 0
        },
        percent: {
          A: 0,
          B: 0,
          C: 0,
          D: 0
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
      this.activeComponent[0] = 'performance_general'
      // 获取绩效排名数据
      this.performanceRanking = data.performanceRanking.map((val, index) => {
        return {
          ranking: index + 1,
          name: val.uname,
          department: val.deptName,
          score: val.performanceScore
        }
      })
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
      this.activeComponent[1] = 'echarts_pie'
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
    },
    // 获取简报概况数据
    getBriefingStatistic (data, num) {
      this.briefingStatistic.totalNum = num
      this.tableData = data
      this.activeComponent[2] = 'basic_score'
    },
    getStaffInfo () {
      this.$http({
        url: 'score/staff',
        data: {
          quarterId: this.quarterId,
          staffId: this.getUid
        }
      }).then(data => {
        this.user = data.user
        this.score = data.score
      })
    }
  }
}
</script>
