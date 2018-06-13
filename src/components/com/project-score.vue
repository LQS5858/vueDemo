<!--项目评分组件
 参数：表格数组/权重比字符串/项目数量数字/统计得分数字
按ui更改样式-->
<style lang='less' scoped>
.project-score {
  background-color: white;
  width: 100%;
}
</style>
<template>
  <div>
    <!-- 项目评分容器 -->
    <div class="project-score">
      <slot></slot>
      <!-- element表格插件 -->
      <div class='element-class'>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column align="left" prop="project" label="项目名称">
          </el-table-column>
          <el-table-column align="left" prop="task" label="负责内容">
          </el-table-column>
          <el-table-column align="left" width="220" prop="beginTime" label="参与时间">
            <template slot-scope="scope">
              {{scope.row.beginTime | date}} - {{scope.row.endTime | date}}
            </template>
          </el-table-column>
          <el-table-column align="left" prop="ownerUUID" label="项目负责人">
            <template slot-scope="scope">
              {{scope.row.ownerUUID | getValueById(staff, 'uid', 'name')}}
            </template>
          </el-table-column>
          <el-table-column align="left" prop="score" label="项目进度">
            <template slot-scope="scope">
              {{scope.row.score ? scope.row.score[100].evaluateScore : '-'}}
            </template>
          </el-table-column>
          <el-table-column align="left" prop="score" label="项目满意度">
            <template slot-scope="scope">
              {{scope.row.score ? scope.row.score[101].evaluateScore : '-'}}
            </template>
          </el-table-column>
          <el-table-column align="left" prop="score" label="协作执行">
            <template slot-scope="scope">
              {{scope.row.score ? scope.row.score[102].evaluateScore : '-'}}
            </template>
          </el-table-column>
          <el-table-column align="left" prop="score" label="综合得分">
            <template slot-scope="scope">
              {{scope.row.scoreCount || '-'}}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /*
   项目评分组件
   参数：表格数组/权重比字符串/项目数量数字/统计得分数字
   */
  props: {
    // 表格数据参数
    tableData: {
      type: Array,
      default: () => {
        return [
        ]
      }
    }
  },

  computed: {
    staff () {
      return this.$store.state.basic.staff
    }
  }
}
</script>
