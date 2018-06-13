<style lang='less'>
  .ratings.container{
    .el-input__inner{
      height: 32px;
      line-height: 32px;
    }
    .el-table td, .el-table th{
      padding: 7px 0;
    }
    .el-select{
      width: 100%;
    }
  }
</style>
<template>
  <div class="container ratings">
    <el-table :data="ratingRules"
              stripe
              style="width: 100%">
      <el-table-column prop="name"
                       label="考核事项" min-width="100">
      </el-table-column>
      <el-table-column prop="ratio"
                       label="子权重" min-width="100">
      </el-table-column>
      <el-table-column prop="evaluation"
                       label="考核评价" min-width="200">
        <template slot-scope="scope">
          <el-select v-if="isEditable" placeholder="请选择"
                     @change="initInputVal(scope.$index)"
                     v-model="selectArr[scope.$index]">
            <el-option v-for="(item, index) in scope.row.options"
                       :key="index"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
          <span v-else>{{staticsRules[scope.row.id] && staticsRules[scope.row.id][ratingDetails[scope.row.id].evaluateId].name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="score"
                       label="综合评分"
                       min-width="80">
        <template slot-scope="scope">
          <!--{{ratingRules[scope.$index]}}-->
          <!--{{ratingRules[scope.$index][selId].maxScore}}-->
          <el-input v-if="isEditable" type="number"
                    v-model="inputValArr[scope.$index]"
                    @change="rangeInputVal(scope.$index)"></el-input>
          <span v-else>{{ratingDetails[scope.row.id].evaluateScore}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectArr: [],
      inputValArr: [],
      staticsRules: {}
    }
  },
  props: {
    ratingRules: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    isEditable: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    ratingDetails: {
      type: Object,
      default: () => {
        return {}
      }
    },
    ratingScore: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    totalScore () {
      let totalScore = this.ratingRules.map((val, i) => {
        if (this.inputValArr[i]) {
          return this.inputValArr[i] * val.ratio / 100
        } else {
          return 0
        }
      })
      return totalScore.reduce((total, current) => {
        return total + current
      }, 0)
    }
  },
  watch: {
    ratingRules () {
      this.getTableData()
    }
  },
  methods: {
    getTableData () {
      // 添加统计规则数据
      // 添加选项选中字段
      this.selectArr = []
      this.inputValArr = []
      this.ratingRules.forEach((val, index) => {
        if (this.ratingScore && Object.keys(this.ratingScore).length) {
          this.selectArr.push(this.ratingScore[val.id].evaluateId)
          this.inputValArr.push(this.ratingScore[val.id].evaluateScore)
        } else {
          this.selectArr.push('')
          this.inputValArr.push('')
        }
        this.staticsRules[val.id] = {}
        val.options.forEach(option => {
          this.staticsRules[val.id][option.id] = {
            name: option.name,
            maxScore: option.maxScore,
            minScore: option.minScore
          }
        })
      })
    },
    // 重置评分
    initInputVal (index) {
      this.inputValArr.splice(index, 1, this.staticsRules[this.ratingRules[index].id][this.selectArr[index]].minScore)
      this.getTotalScore()
    },
    // 根据评价改变评分范围
    rangeInputVal (index) {
      let max = 0
      let min = 0
      // 做是否有点击下拉框判断
      if (this.selectArr[index] !== '') {
        max = this.staticsRules[this.ratingRules[index].id][this.selectArr[index]].maxScore
        min = this.staticsRules[this.ratingRules[index].id][this.selectArr[index]].minScore
      } else {
        this.inputValArr.splice(index, 1, '')
        return this.$message({
          message: '请先选择评价类型！',
          type: 'warning'
        })
      }
      if (this.inputValArr[index] > max) {
        this.inputValArr.splice(index, 1, max)
      } else if (this.inputValArr[index] < min) {
        this.inputValArr.splice(index, 1, min)
      }
      this.getTotalScore()
    },
    getTotalScore () {
      // 检查是否存在未评分项
      if (this.inputValArr.indexOf('') !== -1) return false
      // 进行提交数据处理
      let scoreData = {}
      this.ratingRules.forEach((val, i) => {
        Object.assign(scoreData, {
          [val.id]: {
            evaluateId: this.selectArr[i],
            evaluateScore: this.inputValArr[i]
          }
        })
      })
      this.$emit('scoreDetail', {data: scoreData, totalScore: this.totalScore})
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>
