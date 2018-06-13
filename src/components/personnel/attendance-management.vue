<!-- 考勤管理页面 -->
<style lang='less' scoped>
  .attendance-wrap {
    min-height: 100%;
    background-color: @backGroundColor;
    .attendance-table {
      margin-top: 16px;
    }
  }
</style>
<template>
  <div class='attendance-wrap'>
    <crumbs @callback="getData"></crumbs>
    <div class="attendance-search-table prl">
      <att-tab-search :deptId="deptId"
                      :quarterTitle="quarterTitle"
                      @search="onSearch"></att-tab-search>
      <div class="attendance-table">
        <attendance-table :columnTitle="columnTitle"
                          :data="data"
                          :page="page"
                          @sizeChange="sizeChange"
                          @currentChange="currentChange">
        </attendance-table>
      </div>
    </div>
    <el-dialog title="修改考勤"
               :visible.sync="showModifyPanel"
               width="70%">
      <div>
        <el-table :data="modifyList"
                  style="width: 100%">
          <el-table-column label="姓名"
                           width="180">
            <template slot-scope="scope">
              {{scope.row.name }} - {{+scope.row.deptId | getValueById(department, 'id', 'name')}}
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="迟到次数"
            width="120">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.score.data['2']['10000']['number']" :disabled="noModify">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="请假次数"
            width="180">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.score.data['2']['10001']['number']" :disabled="noModify">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="早退次数"
            width="120">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.score.data['2']['10002']['number']" :disabled="noModify">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="旷工次数"
            width="120">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.score.data['2']['10003']['number']" :disabled="noModify">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="分数"
                           width="120">
            <template slot-scope="scope">
              <!--<el-input v-model="scope.row.score.data['2']['fraction']"></el-input>-->
              {{scope.row.score.data['2'] | getAttendanceScore(ruleList)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <template v-if="noModify">
          <el-button @click="showModifyPanel = false"
                     size="medium">关 闭
          </el-button>
        </template>
        <template v-else>
          <el-button type="primary"
                     @click="modifyAttendance"
                     size="medium">保存
          </el-button>
          <el-button @click="showModifyPanel = false"
                     size="medium">取 消
          </el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AttTabSearch from '@/components/com/attendance-table-search'
import Crumbs from '@/components/com/crumbs-com'
import AttendanceTable from '@/components/com/attendance-table'
import util from '../../assets/js/utils'

export default {
  data () {
    return {
      // addType: '添加考勤',
      quarterTitle: {
        name: '姓名',
        state: '部门'
      },
      deptId: 1001,
      list: [],
      modifyList: [],
      noModify: true,
      operationObj: {},
      page: {
        size: 10,
        current: 1
      },
      showModifyPanel: false,
      columnTitle: [
        {
          title: '序号',
          type: 'index',
          width: 50
        },
        {
          title: '姓名',
          row: 'name',
          width: 120
        },
        {
          title: '部门',
          format: (row) => {
            return this.$options.filters.getValueById(+row.deptId, this.department, 'id', 'name')
          }
        },
        {
          title: '职位',
          row: 'workDuty'
        },
        {
          title: '迟到次数',
          format: (row) => {
            return row.score.data['2']['10000']['number']
          },
          sort: (row) => {
            console.log(row)
          },
          width: 100
        },
        {
          title: '请假次数',
          format: (row) => {
            return row.score.data['2']['10001']['number']
          },
          sort: (row) => {
            console.log(row)
          },
          width: 100
        },
        {
          title: '早退次数',
          format: (row) => {
            return row.score.data['2']['10002']['number']
          },
          sort: (row) => {
            console.log(row)
          },
          width: 100
        },
        {
          title: '旷工次数',
          format: (row) => {
            return row.score.data['2']['10003']['number']
          },
          sort: (row) => {
            console.log(row)
          },
          width: 100
        },
        {
          title: '扣分',
          format: (row) => {
            return this.$options.filters.getAttendanceScore(row.score.data['2'], this.ruleList)
          },
          sort: (row) => {
            console.log(row)
          },
          width: 100
        },
        {
          title: '操作',
          type: 'operation',
          callback: this.operationObj,
          width: 100
        }
      ],
      ruleList: {}
    }
  },
  components: {
    AttTabSearch, Crumbs, AttendanceTable
  },
  computed: {
    data () {
      let start = (this.page.current - 1) * this.page.size
      let end = this.page.current * this.page.size
      return this.list.slice(start, end)
    },
    department () {
      return this.$store.state.basic.department
    },
    quarterId () {
      return this.$store.state.common.quarterId
    }
  },
  beforeCreate () {
    let role = this.$store.state.common.user.role
    if (role === 1 || role === 2) {
      // this.columnTitle.splice(this.columnTitle.length - 1, 1)
      this.operationObj = {
        '详情': row => {
          this.showModifyPanel = true
          this.modifyList = [row]
        }
      }
    } else if (role === 4) {
      this.noModify = false
      this.operationObj = {
        '修改': (row) => {
          let data = util.clone(row)
          this.showModifyPanel = true
          this.modifyList = [data]
        }
      }
    }
    this.$http({url: 'score/rules'}).then((data) => {
      this.ruleList = data
    })
  },
  mounted () {
    this.noModify = this.$store.state.common.user.role !== 4
    if (this.$store.state.common.user.role === 1 || this.$store.state.common.user.role === 2) {
      this.$delete(this.columnTitle, this.columnTitle.length - 1)
    }
  },
  methods: {
    getData () {
      let data = {
        quarterId: this.quarterId,
        deptId: this.deptId
      }
      this.$http.post('/attendance/query', data).then((rs) => {
        this.list = rs
        this.page.total = rs.length
      })
    },
    currentChange (pageNo) {
      this.page.current = pageNo
    },
    sizeChange (size) {
      this.page.size = size
    },
    modifyAttendance () {
      let data = {
        quarterId: this.quarterId,
        update: this.modifyList
      }
      this.$http.post('/attendance/update', data).then((rs) => {
        let msg = {
          message: '修改成功',
          type: 'success'
        }
        if (typeof rs === 'number') {
          let newObj = this.modifyList[0]
          this.list.forEach((item, index) => {
            if (item.uid === newObj.uid) {
              item.score.data['2'] = newObj.score.data['2']
            }
          })
        } else {
          msg = {
            message: '修改失败',
            type: 'error'
          }
        }
        this.$message(msg)
        this.showModifyPanel = false
      })
    },
    onSearch (filter) {
      // console.log(filter)
      let data = {
        quarterId: this.quarterId,
        deptId: filter.dept.id
      }
      this.$http.post('/attendance/query', data).then((rs) => {
        let matchList = []
        rs.forEach((item) => {
          if (item.name.indexOf(filter.name) > -1) {
            matchList.push(item)
          }
        })
        this.list = matchList
        this.page.total = matchList.length
      })
    }
  }
}
</script>
