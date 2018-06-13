<!-- 团队贡献表格组件 -->
<style lang='less' scoped>
  .team-table-wrap {
    position: relative;
    height: 100%;
    background-color: @backGroundColor;
    .table-title {
      height: 64px;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      .attendance-btn {
        text-align: center;
      }
    }
    .pagination-wrap {
      float: right;
      margin-top: 16px;
      // font-size: 12px;
      height: 32px;
      background-color: @backGroundColor;
    }
    .add-btn {
      font-family: PingFangSC-Regular;
      font-size: @fontSize - 2;
      color: #9571e9;
      line-height: 14px;
      .el-button--text {
        margin: 0 auto;
      }
    }
  }

  .item-input {
    display: flex;
  }

  .add-btn {
    display: flex;
    height: 64px;
    align-items: center;
    justify-content: flex-end;
    background: #ffffff;
    box-shadow: 0 -1px 0 0 #dcdae2;
    border-radius: 0 0 4px 4px;
    margin-top: 16px;
  }

  .item-input {
    .el-form-item {
      margin-right: 16px;
    }
  }

  .item-active {
    .el-form-item {
      margin-bottom: 0;
    }
  }

  .add-btn {
    .el-button--small {
      width: 72px;
    }
    .el-button--primary {
      background: #7352bf;
      border-radius: 4px;
    }
  }
</style>
<template>
  <div class='team-table-wrap'>
    <div class="table-data">
      <el-table stripe
                :data="tableData"
                style="width: 100%">
        <el-table-column v-for="(item, index) of columnTitle"
                         :key="index"
                         :type="item.title=='序号'?'index':'none'"
                         :prop="item.row"
                         :label="item.title">
          <template slot-scope="scope">
            <span v-if="item.row === 'evaluateId'">
              {{scope.row.evaluateId | getValueById(dataOptions, 'id', 'name')}}
            </span>
            <span v-else>
              {{scope.row[item.row]}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label='操作'>
          <template slot-scope="scope">
            <el-button @click="editContribution(scope.row, scope.$index)"
                       type="text"
                       size="small">编辑</el-button>
            <el-button type="text"
                       @click="deleteContribution(scope.$index)"
                       size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <slot name='slot-pagination'>
      <div class='add-btn'>
        <el-button type="text"
                   icon='el-icon-plus'
                   @click="addContribution">添加</el-button>
      </div>
    </slot>
    <div class="add-team-contribution attendance-add-dialog">
      <el-dialog title="添加团队贡献"
                 width="360px"
                 :visible.sync="dialogTableVisible">
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline"
                 label-position="left"
                 size="small">
          <div class="item-input">
            <el-form-item label="贡献类别"
                          label-width="200px">
              <el-select v-model="formInline.evaluateId"
                         placeholder="请选择贡献类别">
                <el-option v-for="(item, index) of dataOptions"
                           :key="index"
                           :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分数"
                          label-width="108px">
              <el-input-number v-model="formInline.evaluateScore"
                        placeholder="99"></el-input-number>
            </el-form-item>
          </div>
        </el-form>
        <div class="item-active">
          <el-form label-position="left">
            <el-form-item label="具体内容"
                          size="medium">
              <el-input type="textarea"
                        v-model="formInline.evaluateTxt"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="add-btn">
          <el-button size="small"
                     type="primary"
                     @click="submitContribution">确认</el-button>
          <el-button size="small"
                     @click="dialogTableVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import AttendanceTable from '@/components/com/basic-score'

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    columnTitle: {
      default: function () {
        return [
          {
            title: '序号',
            row: 'index'
          },
          {
            title: '贡献类别',
            row: 'evaluateId'
          },
          {
            title: '具体内容',
            row: 'evaluateTxt'
          },
          {
            title: '分数',
            row: 'evaluateScore'
          }
        ]
      }
    },
    rules: {
      type: Object,
      default: function () {
        return {}
      }
    },
    tableData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      dialogTableVisible: false,
      formInline: {
        evaluateId: '',
        evaluateTxt: '',
        evaluateScore: ''
      },
      rowIndex: false
    }
  },

  computed: {
    dataOptions () {
      let classObj = this.rules.class ? this.rules.class[0] : {}
      return classObj.options || []
    }
  },

  components: { AttendanceTable },

  mounted () {
  },

  methods: {
    addContribution () {
      this.dialogTableVisible = true
    },
    submitContribution () {
      let row = Object.assign({}, this.formInline)
      this.$emit('callback', row, this.rowIndex)
      this.dialogTableVisible = false
      this.resetVal()
    },
    editContribution (row, index) {
      this.rowIndex = index
      this.formInline = row
      this.dialogTableVisible = true
    },
    deleteContribution (index) {
      this.$emit('callback', false, index)
    },
    resetVal () {
      for (let key in this.formInline) {
        this.formInline[key] = ''
      }
      this.rowIndex = false
    }
  }
}
</script>
