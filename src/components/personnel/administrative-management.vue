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
      <el-dialog title="修改行政记录" :visible.sync="showModifyPanel" width="70%">
        <div>
          <p>{{modifyList[0].name}} - {{+modifyList[0].deptId | getValueById(department,'id','name')}}</p>
          <el-table :data="itemList"
                    style="width: 100%">
            <el-table-column prop="date"
                             label="内容">
              <template slot-scope="scope">
                <el-select v-model="modifyList[0].score.data['2']['10004'][scope.$index]['evaluateId']"
                           placeholder="请选择" :disabled="noModify">
                  <el-option
                    v-for="item in selectObj.options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="name"
                             label="违规次数">
              <template slot-scope="scope">
                <el-input-number v-model="modifyList[0].score.data['2']['10004'][scope.$index]['number']"
                                 :disabled="noModify"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="分数">
              <template slot-scope="scope">
                <el-input-number v-model="modifyList[0].score.data['2']['10004'][scope.$index]['evaluateScore']"
                                 :disabled="noModify"></el-input-number>
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
          title: '违规次数',
          format: row => {
            return this.$options.filters.getAdminTime(row.score.data['2']['10004'])
          },
          sort: row => {
            console.log(row)
          },
          width: 120
        },
        {
          title: '分数',
          format: row => {
            return this.$options.filters.getAdminScore(row.score.data['2']['10004'], this.selectObj)
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
      selectObj: {}
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
      this.noModify = false
      this.operationObj = {
        '修改': (row) => {
          let data = util.clone(row)
          this.showModifyPanel = true
          this.modifyList = [data]
        }
      }
    }
    this.$http({url: '/score/rules'}).then(rs => {
      let data = rs['2']
      if (data) {
        data['class'].forEach(item => {
          if (item.id === 10004) {
            this.selectObj = item
          }
        })
      }
      // console.log(this.selectObj)
    })
  },
  computed: {
    itemList () {
      let rs = []
      if (this.modifyList.length && this.modifyList[0].score) {
        rs = this.modifyList[0].score.data['2']['10004']
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
      let ok = true
      this.modifyList[0].score.data['2']['10004'].forEach((item) => {
        if (!item.evaluateId || !item.evaluateScore || !item.number) {
          this.$message({
            message: '请补全信息',
            type: 'warning'
          })
          ok = false
        }
      })
      if (!ok) {
        return
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
    sizeChange (size) {
      this.page.size = size
    },
    addItem () {
      this.modifyList[0].score.data['2']['10004'].push({
        evaluateId: '',
        evaluateScore: '',
        number: 0
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
