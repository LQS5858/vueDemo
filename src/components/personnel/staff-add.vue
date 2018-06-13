<!-- 组织架构模块 -->
<style lang='less' scoped>
  .organizationa-wrap {
    .organizationa-content {
      height: 755px;
      margin: 20px 20px 0;
      background-color: @backGroundColor;
      position: relative;
      display: flex;
      flex-direction: row;
      .left-nav {
        width: 218px;
        height: 755px;
        border: 1px solid @borderColor;
        overflow: scroll;
        .nav-search {
          margin: 20px 10px 0;
        }
      }
      .right-table {
        flex-grow: 1;
        // 加滚动条
        overflow-y: auto;
        position: relative;
        .add-panel {
          position: absolute;
          z-index: 1000;
          top: 35px;
          right: 20px;
        }
      }
    }
  }

  .add {
    width: 100px;
    margin: 10px auto;
    cursor: pointer;
  }
</style>
<template>
  <div class="organizationa-wrap ">
    <!-- 面包屑组件 -->
    <crumbs :showQuarter="false"></crumbs>
    <!-- 下内容容器 -->
    <div class="organizationa-content">
      <!-- 左侧导航固定宽度布局 -->
      <div class="left-nav">
        <div class="nav-search">
          <el-input placeholder="搜索姓名/工号"
                    v-model="keyword">
            <i slot="prefix"
               class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="nav-menu">

          <el-col :span="12">
            <el-tree :data="[treeData]"
                     :props="defaultProps"
                     accordion
                     node-key="id"
                     :default-expand-all="true"
                     ref="tree"
                     highlight-current
                     @node-click="onSelectDept">
            </el-tree>
          </el-col>
        </div>
      </div>
      <!-- 右边表格容器 -->
      <div class="right-table prl">
        <div class="add-panel">
          <el-button class='btn iconfont el-icon-plus' type="primary" @click="showAddPanel">
            新增人员
          </el-button>
        </div>
        <OrganizationalSearchTitle></OrganizationalSearchTitle>
        <el-table :data="staffData"
                  stripe
                  style="width: 100%">
          <el-table-column v-for="item in tableTitle"
                           :key="item.prop"
                           :prop="item.prop"
                           :fixed="item.fixed"
                           :width="item.width"
                           :label="item.title"
                           :formatter="item.format">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="onChangeStatus(scope.row)" type="text" size="small">
                {{scope.row.status === 2 ? '恢复' : '冻结'}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="add-dialog">
      <el-dialog title="新增员工" :visible.sync="showAddDialog" width="90%">
        <div>
          <el-table :data="addList" style="width: 100%">
            <el-table-column label="工号" width="100">
              <template slot-scope="scope">
                <el-input v-model="addList[scope.$index]['jobNumber']"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="姓名" width="120">
              <template slot-scope="scope">
                <el-input v-model="addList[scope.$index]['name']"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="部门" width="120">
              <template slot-scope="scope">
                <dept-tree :modal="false"
                           @select="onSelectDeptOnList($event,scope.$index)"></dept-tree>
              </template>
            </el-table-column>
            <el-table-column label="直属领导" width="120">
              <template slot-scope="scope">
                <div class="add-btn" slot="add-btn" @click="triggerStaffTree">
                  {{addList[scope.$index]['directLeader'] | getStaffNameById(staffList,'+')}}
                </div>
                <staff-tree ref="staffTree" :modal="false"
                            @addStaff="addDirectLeader($event,scope.$index)"></staff-tree>
              </template>
            </el-table-column>
            <el-table-column label="工作职务" width="120">
              <template slot-scope="scope">
                <el-input v-model="addList[scope.$index]['workDuty']"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="性别" width="80">
              <template slot-scope="scope">
                <el-select v-model="addList[scope.$index]['sex']" placeholder="请选择">
                  <el-option label="女" :value="0"></el-option>
                  <el-option label="男" :value="1"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="入职日期">
              <template slot-scope="scope">
                <el-date-picker v-model="addList[scope.$index]['entryDate']" type="date" placeholder="选择日期">
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="是否试用期" width="120">
              <template slot-scope="scope">
                <el-select v-model="addList[scope.$index]['isProbation']" placeholder="请选择">
                  <el-option label="否" :value="0"></el-option>
                  <el-option label="是" :value="1"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="系统角色" width="140">
              <template slot-scope="scope">
                <el-select v-model="addList[scope.$index]['roleId']" placeholder="请选择">
                  <el-option :value="2" label="中心管理层"></el-option>
                  <el-option :value="3" label="普通职员"></el-option>
                  <el-option :value="4" label="HR"></el-option>
                  <el-option :value="5" label="项目专员"></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
          <div class="add main-color" @click="addItem">+ 添加</div>
        </div>
        <div slot="footer">
          <el-button size="medium" type="primary" @click="addStaff">保存</el-button>
          <el-button @click="showAddDialog = false" size="medium">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import deptTree from '../com/dept-tree'
import staffTree from '@/components/com/staff-tree'
import Crumbs from '../com/crumbs-com'
import OraganizationalTable from '../com/invite-score-table'
import OrganizationalSearchTitle from '../com/organizational-search-title'

export default {
  components: {
    crumbs: Crumbs,
    oraganizational_table: OraganizationalTable,
    OrganizationalSearchTitle,
    deptTree,
    staffTree
  },
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      deptIDName: {},
      levelFisrt: [],
      levelTwo: [],
      levelThree: [],
      //   树所有数据
      treeAllData: '',
      keyword: '',
      tableTitle: [
        {
          title: '工号',
          prop: 'jobNumber',
          width: 100,
          fixed: true
        },
        {
          title: '姓名',
          prop: 'name',
          width: 100
        },
        {
          title: '性别',
          prop: 'sex',
          width: 100,
          format: row => {
            return this.$options.filters.getSex(row.sex)
          }
        },
        {
          title: '职位',
          prop: 'workDuty',
          width: 130
        },
        {
          title: '部门',
          format: row => {
            return this.$options.filters.getValueById(+row.deptId, this.$store.state.basic.department, 'id', 'name')
          }
        },
        {
          title: '是否试用期',
          width: 120,
          format: row => {
            return ['否', '是'][row.isProbation]
          }
        },
        {
          title: '入职时间',
          format: row => {
            return this.$options.filters.date(row.entryDate)
          },
          width: 130
        }
      ],
      staffData: [],
      addList: [],
      showAddDialog: false,
      selectedDeptId: ''
    }
  },
  computed: {
    treeData () {
      let data = this.$store.state.basic.departmentTree
      this.handleOpen(data.id)
      return data
    },
    staffList () {
      return this.$store.state.basic.staff
    }
  },
  mounted () {
  },
  methods: {
    onSelectDept (obj, node, self) {
      this.handleOpen(obj.id)
    },
    handleOpen (key) {
      if (key) this.selectedDeptId = key
      this.$http({
        url: 'dept/staff',
        method: 'post',
        data: {
          deptId: this.selectedDeptId
        }
      }).then(data => {
        this.staffData = data
        // console.log(this.staffData)
      })
      // console.log(key)
    },
    showAddPanel () {
      this.showAddDialog = true
      if (this.addList.length === 0) {
        this.addItem()
      }
    },
    addStaff () {
      let ok = true
      for (let i = 0, l = this.addList.length; i < l; i++) {
        let item = this.addList[i]
        if (!this.verifyStaff(item)) {
          this.$message({
            message: '请补全第' + (i + 1) + '行的信息',
            type: 'warning'
          })
          ok = false
          break
        }
      }
      if (ok) {
        this.$http.post('/staff/add', this.addList).then((rs) => {
          let msg = {
            message: '修改失败',
            type: 'error'
          }
          if (typeof rs === 'number') {
            msg = {
              message: '新增成功, 2秒后刷新数据',
              type: 'success'
            }
            setTimeout(() => {
              location.reload()
            }, 2000)
          }
          this.$message(msg)
        })
      }
    },
    verifyStaff (s) {
      return s.jobNumber && s.name && s.deptId && s.directLeader && s.workDuty && s.entryDate
    },
    addItem () {
      this.addList.push(this.getModel())
    },
    getModel () {
      return {
        jobNumber: '',
        name: '',
        deptId: '',
        directLeader: '',
        workDuty: '',
        sex: 1,
        entryDate: '',
        qq: '',
        applyDuty: '',
        roleId: 3,
        status: 0
      }
    },
    onSelectDeptOnList (obj, index) {
      this.addList[index]['deptId'] = obj.id
    },
    triggerStaffTree () {
      this.$refs.staffTree.triggerComponents()
    },
    addDirectLeader (obj, index) {
      this.addList[index]['directLeader'] = obj.id
    },
    onChangeStatus (row) {
      this.$http({
        url: 'staff/update-status',
        data: {
          staffUUID: row.uid,
          status: row.status === 2 ? 0 : 2
        }
      }).then(data => {
        this.handleOpen()
      })
    }
  }
}
</script>
