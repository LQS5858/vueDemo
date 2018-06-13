<!--添加考勤弹出框 -->
<style lang='less' scoped>
.attendance-add-dialog {
  .add-btn {
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: @fontSize - 2;
    color: #9571e9;
    line-height: 48px;
    background: #ffffff;
    box-shadow: inset 0 -1px 0 0 #dcdae2;
    height: 48px;
  }
}
</style>
<template>
  <div class="attendance-add-dialog">

    <!-- Table -->

    <el-dialog :title="this.$store.state.addAttendance.boxTitle"
               width="70%"
               @close="close"
               :visible.sync="this.$store.state.addAttendance.dialogTableVisible">
      <div class="table-data">
        <el-table stripe
                  :data="tableData"
                  style="width: 100%">
          <el-table-column v-for="(item,index) of columnTitle"
                           :key="index"
                           :type="item.title=='序号'?'index':'none'"
                           :index='indexMethod'
                           :prop="item.row"
                           :label="item.title">

          </el-table-column>
          <el-table-column label='操作'>
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.$index,scope.row)"
                         type="text"
                         size="small">编辑</el-button>

              <el-button v-show="isShow"
                         type="text"
                         size="small">删除</el-button>

            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class='add-btn'>
        <el-button type="text"
                   icon='el-icon-plus'>添加人员</el-button>
      </div>
      <div slot="footer"
           class="dialog-footer attendance-btn">
        <el-button type="primary"
                   @click="dialogFormVisible = false">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    addType: {
      type: String,
      default: '添加考勤'
    },
    boxTitle: {
      type: String,
      default: '添加考勤'
    },
    columnTitle: {
      default: function () {
        return [
          {
            title: '序号',
            row: 'index'
          },
          {
            title: '姓名',
            row: 'name'
          },
          {
            title: '部门',
            row: 'deptId'
          },
          {
            title: '职位',
            row: 'jobNumber'
          },
          {
            title: '迟到次数',
            row: 'lazycount'
          },
          {
            title: '请假次数',
            row: 'lazycount'
          },
          {
            title: '早退次数',
            row: 'lazycount'
          },
          {
            title: '旷工次数',
            row: 'lazycount'
          },
          {
            title: '分数',
            row: 'score'
          }
        ]
      }
    }
  },
  data () {
    return {
      isShow: true,
      dialogTableVisible: false,
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ]
    }
  },
  components: {},

  computed: {},

  mounted () { },

  methods: {

    indexMethod (index) {
      return index
    },
    ...mapActions({
      showDialog: 'dialogShow', hidenDialog: 'hidenDialog' }),
    close () {
      this.hidenDialog()
    }

  }
}

</script>
