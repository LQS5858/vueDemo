<style lang='less' scoped>
  .container {
    min-height: 100%;
    background-color: @backGroundColor;
    .table-part-container {
      margin: 10px 0px;
      .item-text {
        min-height: 48px;
        display: flex;
        margin-bottom: 12px;
        margin: 10px;
        align-items: center;
        &-input {
          margin-left: 8px;
        }
      }
      .sub-title {
        background-color: #F5F5FA;;
        font-size: 16px;
        font-weight: bold;
        height: 30px;
        line-height: 30px;
        margin: 3px 0;
        p {
          margin-left: 8px;
        }
      }
      .add-pro-team {
        margin: 17px 0;
      }
      .pro-team {
        margin-top: 21px !important;
      }
      .table-filters {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .filter-item {
          display: flex;
          flex: 0 0 auto;
          margin: 10px;
          white-space: nowrap;
          align-items: center;
          .leader-show {
            width: 100px;
            height: 32px;
            margin-left: 10px;
            color: #B9BDC6;
            font-size: 14px;
            line-height: 32px;
            text-align: center;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            &.active {
              color: #595B5F;
            }
          }
        }
      }
      .btn-group {
        display: flex;
        justify-content: center;
        margin: 10px 0;
      }
    }
    .add-btn {
      height: 57px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid @borderColor;
      border-top: none;
      color: @linkColor;
      font-size: 14px;
      cursor: pointer;
    }
  }
</style>
<style lang="less">
  .add-project {
    .table-filters {
      .el-input {
        margin-left: 8px;
      }
      .el-range-editor {
        margin-left: 8px;
      }
      .el-input__inner {
        height: 32px;
        .el-range-separator, .el-range__icon {
          line-height: 24px;
        }
      }
      .el-button--mini {
        height: 28px;
        margin-left: 10px;
      }
    }
    .notice-message {
      font-weight: normal;
      font-size: 14px;
      margin-left: 20px;
    }
    .el-progress-bar, .el-slider__runway {
      width: 200px;
    }
    .el-table {
      .el-input__inner {
        height: 32px;
        line-height: 32px;
      }
      .el-date-editor .el-range__icon {
        line-height: 25px;
      }
      .el-date-editor .el-range-separator {
        width: 22px;
        line-height: 25px;
      }
    }
    .el-date-editor .el-range-separator {
      width: 22px;
    }
  }
</style>
<template>
  <div class="container add-project">
    <crumbs class="top-nav">
      <span slot="notice-part"></span>
      <!--<span class="notice-message" slot="notice-part">(注：带*号的必须填写)</span>-->
    </crumbs>
    <div class="sub-container">
      <div class="table-part-container">
        <div class="sub-title"><p>项目基本信息</p></div>
        <div class="table-filters">
          <div class="filter-item">项目名称:
            <el-input v-model="projectData.name" placeholder="请输入项目名称"></el-input>
          </div>
          <div class="filter-item">项目等级:
            <el-select v-model="projectData.level" placeholder="请选择">
              <el-option
                v-for="item in projectLevel"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="filter-item">负责人:
            <span class="leader-show" :class="{active:projectData.leader}" @click="chooseLeader">{{projectData.leaderName}}</span>
            <!--<el-select-->
            <!--v-model="projectData.leader"-->
            <!--filterable-->
            <!--remote-->
            <!--reserve-keyword-->
            <!--placeholder="请输入关键词"-->
            <!--:remote-method="getLeader"-->
            <!--:loading="false">-->
            <!--<el-option-->
            <!--v-for="item in leaderOptions"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
            <!--</el-option>-->
            <!--</el-select>-->
          </div>
          <div class="filter-item">项目周期:
            <el-date-picker
              v-model="projectData.circle"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="filter-item">项目进度:
            <el-select v-model="projectData.status" placeholder="请选择">
              <el-option
                v-for="item in statusArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="filter-item">
            <el-slider
              :step="10"
              show-stops
              v-model="projectData.schedule">
            </el-slider>
          </div>
        </div>
        <div class="item-text">
          <div>项目目标</div>
          <div class="item-text-input">
            <el-input type="textarea" v-model="projectData.target" placeholder="请输入项目目标"></el-input>
          </div>
        </div>
        <div class="item-text">
          <div>项目简介</div>
          <div class="item-text-input">
            <el-input type="textarea" v-model="projectData.intro" placeholder="请输入项目简介"></el-input>
          </div>
        </div>
        <div class="sub-title pro-team"><p>项目成员</p></div>
        <div class="add-pro-team">
          <el-button @click="triggerStaffTree" size="small" type="primary">添加成员</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="department"
            label="部门">
          </el-table-column>
          <el-table-column
            prop="workDuty"
            label="职位">
          </el-table-column>
          <el-table-column
            prop="leader"
            label="直属领导">
          </el-table-column>
          <el-table-column
            prop="role"
            label="项目角色">
          </el-table-column>
          <el-table-column
            width="230"
            label="*负责内容">
            <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-model="scope.row.content" v-show="scope.row.show"></el-input>
              <span v-show="!scope.row.show">{{scope.row.content}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="380"
            label="*参与时间">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.joinTime"
                type="daterange"
                v-show="scope.row.show"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <span v-show="!scope.row.show">{{scope.row.joinTime[0]}}</span>
              <span v-show="!scope.row.show">-</span>
              <span v-show="!scope.row.show">{{scope.row.joinTime[1]}}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="modifyTable(scope.$index)">修改</el-button>
              <el-button type="text" size="small" @click="deleteLine(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--<div class="add-btn" slot="add-btn" @click="triggerStaffTree"><i class="iconfont icon-add"></i>添加成员</div>-->
        <staffTree ref="staffTree" :showCheck="isStaffChoose" @addStaff="addStaff"></staffTree>
        <div class="btn-group">
          <el-button type="primary" size="small" @click="submitProject">确定</el-button>
          <el-button size="small" @click="cancelProject">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import crumbs from '@/components/com/crumbs-com'
import ratingsTable from '@/components/com/ratings-table'
import staffTree from '@/components/com/staff-tree'

export default {
  data () {
    return {
      projectLeader: '',
      leaderOptions: [],
      ectypeTree: [],
      statusArr: [{
        label: '未开始',
        value: 0
      }, {
        label: '进行中',
        value: 1
      }, {
        label: '已完成',
        value: 2
      }],
      projectLevel: [{
        label: 'A',
        value: 1
      }, {
        label: 'B',
        value: 2
      }, {
        label: 'C',
        value: 3
      }, {
        label: 'D',
        value: 4
      }],
      projectData: {
        name: '',
        level: '',
        circle: [],
        status: '',
        leaderName: '请选择负责人',
        leader: '',
        target: '',
        intro: '',
        schedule: 10,
        member: []
      },
      tableData: [],
      // 是否是选择项目成员
      isStaffChoose: true
    }
  },
  computed: {
    staff () {
      return this.$store.state.basic.staff
    },
    department () {
      return this.$store.state.basic.department
    }
  },
  methods: {
    // 修改按钮点击
    modifyTable (index) {
      this.tableData[index].show = !this.tableData[index].show
    },
    // 删除按钮点击
    deleteLine (index) {
      this.tableData.splice(index, 1)
    },
    // 添加项目成员
    addStaff (data) {
      if (this.isStaffChoose === true) {
        if (data.length) {
          // 生成默认时间
          let time = new Date()
          let formatTime = time.getFullYear() + '-' + ((time.getMonth() > 9) ? time.getMonth() : ('0' + time.getMonth())) +
            '-' + ((time.getDate() > 9) ? time.getDate() : ('0' + time.getDate()))
          data.forEach((val) => {
            // 查询directLeader
            for (let i = 0; i < this.staff.length; i++) {
              if (this.staff[i].uid === val.directLeader) {
                val.directName = this.staff[i].name
                break
              }
            }
            // 查询部门名称
            for (let i = 0; i < this.department.length; i++) {
              if (+this.department[i].id === +val.deptId) {
                val.deptName = this.department[i].name
                break
              }
            }
            this.tableData.push({
              name: val.name,
              department: val.deptName,
              workDuty: val.workDuty,
              leader: val.directName || '无',
              role: (this.projectData.leader === val.id) ? '项目负责人' : '成员',
              uid: val.id,
              content: '',
              joinTime: [formatTime, formatTime],
              show: false,
              isNew: true
            })
          })
        }
      } else {
        this.projectData.leaderName = data.name
        this.projectData.leader = data.id
      }
    },
    // 提交项目信息
    submitProject () {
      console.log(this.projectData)
      let data = {
        name: this.projectData.name,
        schedule: this.projectData.schedule,
        target: this.projectData.target,
        beginTime: this.projectData.circle[0],
        endTime: this.projectData.circle[1],
        status: this.projectData.status,
        intro: this.projectData.intro,
        level: this.projectData.level,
        ownerUUID: this.projectData.leader,
        users: []
      }
      this.tableData.forEach((val) => {
        data.users.push({
          ownerUUID: val.uid,
          beginTime: val.joinTime[0],
          endTime: val.joinTime[1],
          name: val.content
        })
      })
      this.$http({
        url: 'project/add',
        data: data
      }).then((res) => {
        console.log(res)
        this.$router.push('/manage-project')
      })
    },
    // 取消项目提交
    cancelProject () {
      this.$router.push('/manage-project')
    },
    // 触发staffTree显示
    triggerStaffTree () {
      this.isStaffChoose = true
      this.$refs.staffTree.triggerComponents()
    },
    // 触发选择项目负责人树控件
    chooseLeader () {
      this.isStaffChoose = false
      this.$refs.staffTree.triggerComponents()
    }
  },
  components: {
    crumbs: crumbs,
    ratingsTable: ratingsTable,
    staffTree: staffTree
  },
  mounted () {}
}
</script>
