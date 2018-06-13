<style lang="less">
  .rating-wrap {
    .el-select {
      position: absolute;
      left: 20px;
    }
    .el-pagination .el-select .el-input {
      margin: 0;
    }
    .el-pagination .el-select .el-input .el-input__inner {
      height: 32px;
      width: 122px;
    }
    .el-table {
      th.is-leaf {
        background: #efeff4;
        .cell {
          text-align: center;
        }
      }
      .odd-row {
        background: #e0fae0;
      }
      .even-row {
        background: #dcf4dd;
      }
      .cell {
        text-align: center;
      }
    }
  }

  .pagination-container {
    display: flex;
    margin: 16px 0 62px 0;
    justify-content: flex-end;
  }
</style>
<template>
  <div class='rating-wrap'>
    <el-table :data="tableData.data"
              stripe
              @selection-change="handleSelectionChange">
      style="width: 100%">

      <el-table-column v-if="isSelectable"
                       type="selection"
                       width="55">
      </el-table-column>
      <!-- <slot name="index"></slot> -->
      <el-table-column type="index"
                       fixed
                       label="序号">
      </el-table-column>
      <el-table-column v-for="val in tableData.tableTitle"
                       fixed
                       :key="val"
                       :prop="val"
                       :sortable="tableData.sortArr&&val.indexOf(tableData.sortArr)!==-1"
                       :label="val">
      </el-table-column>

      <el-table-column v-if="isOperateable"
                       fixed="right"
                       label="操作">
        <template slot-scope="scope">
          <el-button v-if="tableData.singleOption"
                     @click="handleClick(scope.row)"
                     type="text"
                     size="small">{{tableData.sOperateList[scope.row.btnType]}}
          </el-button>
          <template v-else>
            <el-button v-for="op in tableData.operateArr"
                       :key="op"
                       @click="handleClick(scope.row)"
                       type="text"
                       size="small">{{op}}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <slot name="add-btn"></slot>
    <el-pagination :page-sizes="[100, 200, 300, 400]"
                   :page-size="100"
                   prev-text='上一页'
                   next-text='下一页'
                   class="pagination-container"
                   background
                   layout="sizes,prev, pager, next"
                   :total="totalPage">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
      multipleSelection: null
    }
  },
  props: {
    tableData: {
      type: Object,
      required: true
    },
    isSelectable: {
      type: Boolean,
      default: false
    },
    isOperateable: {
      type: Boolean,
      default: false
    },
    totalPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleClick (data) {
      this.$emit('tableOperate', data)
    },
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex % 2 === 1) {
        return 'odd-row'
      } else {
        return 'even-row'
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>
