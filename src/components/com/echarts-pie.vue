<!-- echarts 饼图组件 -->
<style lang='less' scoped>
  .echarts-tatal-wrap {
    position: relative;
    height: 100%;
    .chart-nav {
      position: absolute;
      width: 100%;
    }
    .pie-wrap {
      padding-top: 50px;
      height: 100%;
    }
  }
</style>
<template>
  <div class='echarts-tatal-wrap'>
    <chartNav class="chart-nav" :navData="navData"></chartNav>
    <div ref="targetDom2"
         class='pie-wrap'>
    </div>
  </div>
</template>

<script>
import chartNav from '@/components/com/chart-nav'
// 按需引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/pie')
require('echarts/lib/component/legend')
export default {
  data () {
    return {
      pieData: [],
      legendData: [],
      titleArr: {
        review: '已完成',
        unreview: '进行中'
      }
    }
  },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartNum: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    navData: {
      type: Object,
      required: true
    }
  },
  methods: {
    initChart (chartData) {
      this.pieData = []
      this.legendData = []
      this.$refs.targetDom2.setAttribute('id', this.id)
      for (let [key, val] of Object.entries(chartData)) {
        this.pieData.push({name: this.titleArr[key] + ' ' + this.chartNum[key] + '个 ' + val + '%', value: val})
        this.legendData.push({name: this.titleArr[key] + ' ' + this.chartNum[key] + '个 ' + val + '%', icon: 'circle'})
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
            bottom: '5%'
          },
          series: [
            {
              type: 'pie',
              radius: ['30%', '50%'],
              avoidLabelOverlap: false,
              // 设置颜色
              itemStyle: {
                // 通常情况下：
                normal: {
                  // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function (params) {
                    var colorList = ['#97C0FF', '#B5A8EE']
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
                    return params.name.slice(0, 3) + '\n' + params.value + '%'
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
  components: {
    chartNav: chartNav
  },
  mounted () {
    this.initChart(this.chartData)
    // console.log(this.chartData)
  }
}
</script>
