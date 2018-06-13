<style lang="less" scoped>
  .container {
    .chart-container {
      height: 290px;
      display: flex;
      background: #fff;
      .sub-title {
        height: 32px;
        font-size: 14px;
        color: #666666;
        margin-left: 20px;
        margin-top: 12px;
      }
      .left-chart {
        width: 66.6%;
      }
      .right-chart {
        flex: 1 0 320px;
      }
      .chart-content {
        height: 258px;
        .crown-img {
          height: 32px;
          vertical-align: middle;
        }
      }
    }
  }
</style>
<style lang="less">
  .performance-general {
    .el-table td, .el-table th {
      padding: 0;
      .cell {
        height: 32px;
        line-height: 32px;
      }
    }
  }
</style>
<template>
  <div class="container performance-general">
    <chartNav :navData="{title: '绩效概况', number: totalNum}"></chartNav>
    <div class="chart-container">
      <div class="left-chart">
        <div class="sub-title">绩效分布</div>
        <div class="chart-content" ref="targetDom2">
        </div>
      </div>
      <div class="right-chart">
        <div class="sub-title">绩效排名TOP 5</div>
        <div class="chart-content">
          <el-table
            :data="tableData">
            style="width: 100%">
            <el-table-column
              label="排名">
              <template slot-scope="scope">
                <img v-if="scope.row.ranking === 1" class="crown-img" src="../../assets/images/first.png" alt="">
                <img v-else-if="scope.row.ranking === 2" class="crown-img" src="../../assets/images/second.png" alt="">
                <img v-else-if="scope.row.ranking === 3" class="crown-img" src="../../assets/images/third.png" alt="">
                <span v-else>{{scope.row.ranking}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="department"
              label="部门">
            </el-table-column>
            <el-table-column
              prop="score"
              label="分数">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import chartNav from '@/components/com/chart-nav'
// 按需引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/pie')
require('echarts/lib/component/grid')
require('echarts/lib/component/legend')

export default {
  data () {
    return {
      pieData: [],
      legendData: []
    }
  },
  props: {
    tableData: {
      type: Array,
      required: true
    },
    chartData: {
      type: Object,
      required: true
    },
    chartNum: {
      type: Object,
      required: true
    },
    totalNum: {
      type: Number,
      required: true
    }
  },
  methods: {
    initChart (chartData, chartNum) {
      this.$refs.targetDom2.setAttribute('id', this.id)
      this.pieData = []
      this.legendData = []
      for (let [key, val] of Object.entries(chartData)) {
        this.pieData.push({name: key + '    ' + chartNum[key] + '人    ' + val + '%', value: val})
        this.legendData.push({name: key + '    ' + chartNum[key] + '人    ' + val + '%', icon: 'circle'})
      }
      this.$nextTick(function () {
        //   创建echat实例
        let echartsPie = echarts.init(document.getElementById(this.id))
        // 图表数据option
        let option = {
          legend: {
            show: true,
            orient: 'vertical',
            data: this.legendData,
            right: '10%',
            top: 'middle'
          },
          series: [
            {
              type: 'pie',
              radius: ['30%', '50%'],
              center: ['25%', '50%'],
              avoidLabelOverlap: false,
              // 设置颜色
              itemStyle: {
                // 通常情况下：
                normal: {
                  // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function (params) {
                    var colorList = ['#8FC1FF', '#5EB1CE', '#7289E2', '#B9A8F5', '#98D27B', '#D18282']
                    return colorList[params.dataIndex]
                  }
                }
              },
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  formatter: (params) => {
                    return params.name.slice(0, 1) + '\n' + params.value + '%'
                  },
                  fontSize: 16
                }
              },
              data: this.pieData
            }
          ]
        }
        echartsPie.setOption(option)
      })
    }
  },
  watch: {
    chartData () {
      this.initChart(this.chartData, this.chartNum)
    }
  },
  components: {
    chartNav: chartNav
  },
  mounted () {
    this.initChart(this.chartData, this.chartNum)
  }
}
</script>
