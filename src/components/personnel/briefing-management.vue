<!-- 行政管理页面 -->
<style lang='less' scoped>
  .attendance-wrap {
    min-height: 100%;
    background-color: @backGroundColor;
    .attendance-table {
      margin-top: 16px;
    }
    .add {
      text-align: center;
      line-height: 35px;
      width: 80px;
      margin: 0 auto;
      cursor: pointer;
    }
  }
</style>
<template>
  <div class='attendance-wrap attendance-tab-title-wrap'>
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
    <div class="attendance-dialog">
      <el-dialog title="修改简报" :visible.sync="showModifyPanel" width="70%">
        <div>
          <p>{{modifyList[0].name}} - {{+modifyList[0].deptId | getValueById(department,'id','name')}}</p>
          <el-table :data="itemList"
                    style="width: 100%">
            <el-table-column prop="date"
                             label="内容">
              <template slot-scope="scope">
                <el-input v-model="modifyList[0].score.data['5']['1000'][scope.$index]['evaluateTxt']"
                          :disabled="noModify"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" width="260"
                             label="简报时间">
              <template slot-scope="scope">
                <el-date-picker
                  :disabled="noModify"
                  v-model="modifyList[0].score.data['5']['1000'][scope.$index]['evaluateDate']"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column width="120" label="分数">
              <template slot-scope="scope">
                <el-input-number v-model="modifyList[0].score.data['5']['1000'][scope.$index]['evaluateScore']"
                                 :disabled="noModify"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column width="120" label="操作" v-if="!noModify">
              <template slot-scope="scope">
                <el-button @click="deleteItem(scope.$index)"
                           type="text"
                           size="small">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="!noModify" class="add main-color" @click="addItem">+ 添加</div>
        </div>
        <div slot="footer">
          <template v-if="noModify">
            <el-button @click="showModifyPanel = false"
                       size="medium">关 闭
            </el-button>
          </template>
          <template v-else>
            <el-button type="primary"
                       size="medium"
                       @click="modifyAttendance">保存
            </el-button>
            <el-button @click="showModifyPanel = false"
                       size="medium">取 消
            </el-button>
          </template>
        </div>
      </el-dialog>
    </div>
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
      // addType: '添加行政记录',
      quarterTitle: {
        name: '姓名',
        state: '部门'
      },
      deptId: 1001,
      list: [],
      modifyList: [{name: ''}],
      noModify: true,
      page: {
        size: 10,
        current: 1
      },
      showModifyPanel: false,
      operationObj: {},
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
          format: row => {
            return this.$options.filters.getValueById(
              +row.deptId,
              this.department,
              'id',
              'name'
            )
          },
          width: 140
        },
        {
          title: '职位',
          row: 'workDuty'
        },
        {
          title: '简报次数',
          format: row => {
            return this.$options.filters.getBriefingTime(row.score.data['5']['1000'])
          },
          sort: row => {
            console.log(row)
          },
          width: 120
        },
        {
          title: '分数',
          format: row => {
            return this.$options.filters.getBriefingScore(row.score.data['5']['1000'])
          },
          sort: row => {
            console.log(row)
          },
          width: 120
        },
        {
          title: '操作',
          type: 'operation',
          callback: this.operationObj,
          width: 100
        }
      ],
      scoreRule: {}
    }
  },
  components: {
    AttTabSearch,
    Crumbs,
    AttendanceTable
  },
  beforeCreate () {
    let role = this.$store.state.common.user.role
    if (role === 1 || role === 2) {
      this.operationObj = {
        '详情': row => {
          this.showModifyPanel = true
          this.modifyList = [row]
        }
      }
    } else if (role === 4) {
      this.operationObj = {
        '修改': (row) => {
          let data = util.clone(row)
          this.showModifyPanel = true
          this.modifyList = [data]
        }
      }
    }
  },
  computed: {
    itemList () {
      let rs = []
      if (this.modifyList.length && this.modifyList[0].score) {
        rs = this.modifyList[0].score.data['5']['1000']
      }
      return rs
    },
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
      this.$http.post('/attendance/query', data).then(rs => {
        this.list = rs
        this.page.total = rs.length
      })
    },
    currentChange (pageNo) {
      this.page.current = pageNo
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
              item.score.data['5']['1000'] = newObj.score.data['5']['1000']
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
    sizeChange (size) {
      this.page.size = size
    },
    addItem () {
      this.modifyList[0].score.data['5']['1000'].push({
        evaluateTxt: '',
        evaluateScore: 0,
        evaluateDate: ''
      })
    },
    deleteItem (index) {
      this.modifyList[0].score.data['5']['1000'].splice(index, 1)
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
