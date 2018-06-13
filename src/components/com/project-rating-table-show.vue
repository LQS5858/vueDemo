
<style lang="less" scoped>
  .rating-table{
    background: #f5f6f8;
    .column-desc{
      display: inline-block;
      margin:15px 0 10px 20px;
      color:#818181;
      .dec-detail{
        color:#000;
      }
    }
    .el-table{
      .is-leaf{
        background: #f5f6f8;
      }
      .cell{
        text-align:center ;
      }
    }
  }
</style>
<template>
  <div class="rating-table">
    <p class="column-desc">项目一：<span class="dec-detail">ERP重构系统</span></p>
    <p class="column-desc">项目得分：<span class="dec-detail">97</span></p>
    <p class="column-desc">项目负责人：<span class="dec-detail">刘琦</span></p>
    <el-table
      :data="tableData.data"
      border
      style="width: 100%">
      <el-table-column
        v-for="(item, index) in tableData.tableTitle"
        :key="index"
        :prop="item"
        :label="item">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    tableData: {
      type: Object,
      required: true
    }
  }
}
</script>
