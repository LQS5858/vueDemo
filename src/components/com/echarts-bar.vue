<!-- echarts柱状图组件 -->
<style lang='less' scoped>
  .echarts-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    .chart-nav {
      position: absolute;
      width: 100%;
    }
  }

  .echarts_bar {
    width: 100%;
    height: 100%;
    padding-top: 50px;
    background-color: @backGroundColor;
  }
</style>
<template>
  <div class='echarts-wrap'>
    <chartNav class="chart-nav" :navData="navData"></chartNav>
    <div ref="targetDom" :class="{echarts_bar:true}"></div>
  </div>
</template>

<script>
import chartNav from '@/components/com/chart-nav'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
export default {
  data () {
    return {
      keyArr: [],
      valArr: []
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    chartData: {
      type: Object,
      required: true
    },
    navData: {
      type: Object,
      required: true
    }
  },
  mounted () {
    // this.test()
    this.initChart(this.chartData)
  },
  methods: {
    initChart (chartData) {
      this.$refs.targetDom.setAttribute('id', this.id)
      this.keyArr = chartData.keyArr || []
      this.valArr = chartData.valArr || []
      this.$nextTick(function () {
        //   初始化echart实例
        let echartsObject = echarts.init(document.getElementById(this.id))
        // 指定图表配置项和数据
        let echartsOption = {
          xAxis: {
            type: 'category',
            data: this.keyArr,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#666'
            }
          },
          yAxis: {
            type: 'value',
            name: '(单位：人)',
            minInterval: 1,
            nameTextStyle: {
              color: '#666'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#666'
            },
            splitLine: {
              color: '#666',
              lineStyle: {
                opacity: 0.2
              }
            }
          },
          series: [
            {
              data: this.valArr,
              type: 'bar',
              barWidth: '16px',
              label: {
                show: true,
                position: 'top'
              },
              itemStyle: {
                // 通常情况下：
                normal: {
                  // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function (params) {
                    var colorList = [
                      '#B5A8EE',
                      '#7488DA',
                      '#72AED1',
                      '#A4D182',
                      '#97C0FF'
                    ]
                    return colorList[params.dataIndex]
                  }
                }
              }
            }
          ]
        }
        // 绘制图表
        echartsObject.setOption(echartsOption)
      })
    }
  },
  watch: {
    chartData () {
      this.initChart(this.chartData)
    }
  },
  components: {
    chartNav: chartNav
  }
}
</script>
