<!-- 项目评分组件 -->

<style lang="less" scoped>
.rating-table {
  background: #f5f6f8;
  .column-desc {
    display: inline-block;
    margin: 15px 0 10px 20px;
    color: #818181;
    .dec-detail {
      color: #000;
    }
  }
  .el-table {
    .is-leaf {
      background: #f5f6f8;
    }
    .cell {
      text-align: center;
    }
  }
}
</style>
<template>
    <div class="rating-table">
        <el-table :data="tableData"  style="width: 100%">
            <el-table-column v-for="(item, index) in tableTitle"
                             align="left"
                             :key="index" :prop="item.id"
                             :label="item.title">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  data () {
    return {
      tableTitle: [
        {
          id: 'name',
          title: '考核事项'
        },
        {
          id: 'radio',
          title: '子权重'
        },
        {
          id: 'text',
          title: '考核评价'
        },
        {
          id: 'score',
          title: '具体评分'
        }
      ]
    }
  },
  props: {
    tableData: {
      type: Array,
      required: true
    }
  }
}
</script>
