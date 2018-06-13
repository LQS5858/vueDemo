<style lang="less" scoped>
  .assessment-title {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    display: flex;
    align-items: center;
    background: #f8f8fa;
    height: 40px;
    color: #666666;
    margin-bottom: 12px;
    div:not(:last-child) {
      padding-right: 40px;
    }
    .group-title {
      padding-left: 12px;
    }
  }

  .examination-step {
    .dept-wrap {
      height: 32px;
      margin: 16px 0 16px 11px;
      font-family: ArialMT;
      font-size: 12px;
      letter-spacing: 0;
      line-height: 14px;
      display: flex;
      .leader-information {
        margin-left: 254px;
      }
      .dept-name {
        width: 60px;
        margin-right: 4px;
      }

      li {
        display: inline-block;
        padding-top: 4px;
      }
      .dept-name {
        color: #999999;
      }
    }
  }

  .dir-review-detail {
    background-color: @backGroundColor;
    min-height: 100%;
  }

  .department-member {
    .performance-level {
      height: 50px;
      margin: 0 10px;
      background: #f3f3f7;
      .level-detail {
        display: inline-block;
        height: 100%;
        margin-left: 30px;
        line-height: 50px;
        color: #878788;
        .level-show {
          color: #000;
        }
        .level-count-success {
          color: #9d5dff;
          margin: 0 2px;
        }
        .level-count-fail {
          color: #878788;
          margin-left: 4px;
        }
      }
      .level-title {
        display: inline-block;
        height: 100%;
        line-height: 50px;
        margin: 0 15px;
        color: #7b7b96;
        font-size: 14px;
      }
    }
  }

  .department-intro {
    margin: 20px 10px;
    .intro-item {
      margin-right: 20px;
      font-size: 14px;
      color: #878788;
      .intro-content {
        color: #000;
        margin-left: 7px;
      }
    }
  }

  .table-title {
    font-size: 14px;
    margin: 10px;
  }

  .review-steps {
    margin: 0 10px;
    padding-top: 20px;
  }

  .btn-group {
    margin: 20px 10px 0;
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    // .btn {
    //   margin-left: 10px;
    // }
  }

  .operation-log {
    z-index: 9;
    right: 32px;
    top: 34px;
    position: absolute;
  }
</style>
<style lang="less">
  .dir-review-detail {
    .no-pass {
      .el-textarea {
        padding: 0 16px;
      }
      .el-dialog__header {
        padding: 0;
        height: 52px;
        font-size: 18px;
        background: #FFFFFF;
        box-shadow: inset 0 -1px 0 0 #DCDAE2;
        line-height: 52px;
        padding-left: 16px;
      }
      .el-dialog__body {
        padding: 0;
        color: #606266;
        font-size: 12px;
      }
      .el-dialog__footer {
        padding: 20px;
      }
      .dialog-msg {
        height: 64px;
        padding: 16px 0 0 16px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #333333;
        line-height: 14px;
      }
      .no-pass-why {
        margin: 0 0 8px 16px;
        font-family: ArialMT;
        font-size: 12px;
        color: #666666;
        line-height: 14px;
      }
    }
    .pass {
      .el-dialog__header {
        height: 52px;
        line-height: 52px;
        padding: 0;
        padding-left: 16px;
      }
      .el-dialog__title {
        font-family: Arial-BoldMT;
        font-size: 18px;
        color: #333333;
        letter-spacing: 0;
        line-height: 18px;
        font-weight: bold;
      }
      .dialog-msg {
        color: #000;
        font-size: 12px;
        margin-bottom: 10px;
      }
      .el-dialog__body {
        color: #606266;
        font-size: 12px;
        padding: 0;
        height: 50px;
        padding-left: 16px;
        line-height: 50px;
      }
      .el-dialog__footer {
        display: flex;
        padding: 0;
        margin: 0 16px;
        align-items: center;
        justify-content: flex-end;
        text-align: right;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height: 64px;
      }
    }

    .el-table__row {
      td:last-child {
        .cell {
          color: @linkColor;
        }
      }
    }

    .dialog-footer .el-button--primary, .dialog-footer .el-button--default {
      padding: 9px 15px;
    }
  }
</style>
<template>

  <div class="container dir-review-detail">
    <crumbsCom @callback="getData"
               class="top-nav">
      <i v-if="dirctorRole"
         slot="backIcon"
         @click="back"
         class="iconfont icon-back"></i>
      <div slot="operation-log-btn"
           class="operation-log">
        <el-button type="text"
                   icon="el-icon-document"
                   @click="handleOpenOperation">操作日志
        </el-button>
      </div>
    </crumbsCom>
    <div class="sub-container">
      <div class="table-part-container">
        <div class="department-member ">
          <div class="examination-step attendance-search-table">
            <el-steps :active="stepActive"
                      align-center>
              <el-step title="部门考核"
                       icon="iconfont icon-yuan"></el-step>
              <el-step title="领导审核"
                       icon="iconfont icon-yuan1"></el-step>
              <el-step title="完成审核"
                       icon="iconfont icon-yuan1"></el-step>
            </el-steps>
            <div class="dept-wrap">
              <div class="dept-information ">
                <li class="dept-name">部门名称</li>
                <li>{{deptInfo.name}}</li>
              </div>
              <div class="leader-information">
                <li class="dept-name">部门领导</li>
                <li>{{deptInfo.ownerUUID | getValueById(staff, 'uid', 'name')}}</li>
              </div>
            </div>
          </div>
          <div class="assessment-title">
            <div class="group-title">绩效等级名额</div>
            <div>A (可评:{{distribution.ratA || 0}} ; 已评: 1）</div>
            <div>B (可评:{{distribution.ratB || 0}} ; 已评: 1）</div>
            <div>C (可评:{{distribution.ratC || 0}} ; 已评: 1）</div>
            <div>D (可评:{{distribution.ratD || 0}} ; 已评: 1）</div>
            <div>D (可评:{{distribution.ratE || 0}} ; 已评: 1）</div>
            <div>D (可评:{{distribution.ratF || 0}} ; 已评: 1）</div>
          </div>
          <!-- <div class="performance-level">
            <div class="level-title">绩效级别名额:</div>
            <div class="level-detail">
              <span class="level-show">A</span>（可评:
              <span class="level-count-success">3</span>;已评:
              <span class="level-count-fail">1</span>）
            </div>
            <div class="level-detail">
              <span class="level-show">B</span>（可评:
              <span class="level-count-success">3</span>;已评:
              <span class="level-count-fail">1</span>）
            </div>
            <div class="level-detail">
              <span class="level-show">C</span>（可评:
              <span class="level-count-success">3</span>;已评:
              <span class="level-count-fail">1</span>）
            </div>
            <div class="level-detail">
              <span class="level-show">D</span>（可评:
              <span class="level-count-success">3</span>;已评:
              <span class="level-count-fail">1</span>）
            </div>
          </div> -->
          <!-- <div class="table-title">考核人员</div> -->
          <el-table stripe
                    :data="staffData"
                    style="width: 100%">
            <el-table-column type="index"
                             width="100"
                             label="序号">
            </el-table-column>
            <el-table-column v-for="(item,index) of columnTitle"
                             :key="index"
                             :width="item.width || ''"
                             :prop="item.row"
                             :formatter="item.format"
                             :label="item.title">
            </el-table-column>
            <el-table-column prop="operation"
                             v-if="!deptId && user.role === 2"
                             width="100"
                             label="操作">
              <template slot-scope="scope">
                <router-link v-if="!deptLogs[0] || deptLogs[0].scoreStatus === 1 || deptLogs[0].scoreStatus === 3"
                             :to="'/score-page/' + scope.row.staffId">编辑
                </router-link>
                <router-link v-else
                             :to="'/performance-detail/' + scope.row.staffId">详情
                </router-link>
              </template>
            </el-table-column>
          </el-table>
          <div class="attendance-tab-title-wrap">
            <div class="btn-group attendance-btn"
                 v-if="!deptId && user.role === 2">
              <el-button type="primary"
                         v-show="stepActive === 1"
                         @click="assessCommit">提交考核
              </el-button>
            </div>
            <div class="btn-group attendance-btn"
                 v-else
                 v-show="stepActive === 2">
              <el-button type="primary"
                         size="midum"
                         class="btn"
                         @click="accessDialogVisible = true">通过
              </el-button>
              <el-button class="btn"
                         size="small"
                         @click="denyDialogVisible = true">驳回
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pass">
      <el-dialog title="通过"
                 :visible.sync="accessDialogVisible"
                 width="30%">
        <p class="dialog-msg">是否确认通过对"{{deptInfo.name}}"的绩效考核?</p>
        <span slot="footer">
        <el-button @click="accessDialogVisible = false"
                   size="small">取 消</el-button>
         <el-button type="primary"
                    @click="checkAudit(4)"
                    size="small">确 定</el-button>
      </span>
      </el-dialog>
    </div>
    <div class="no-pass">
      <el-dialog title="驳回"
                 :visible.sync="denyDialogVisible"
                 width="30%">
        <p class="dialog-msg">是否确认驳回对"{{deptInfo.name}}"的审核?</p>
        <p class="no-pass-why">驳回原因:</p>
        <el-input type="textarea"
                  v-model="remark"></el-input>
        <span slot="footer">
        <el-button type="primary"
                   @click="checkAudit(3)"
                   size="small">确 定</el-button>
        <el-button @click="denyDialogVisible = false"
                   size="small">取 消</el-button>
      </span>
      </el-dialog>
    </div>
    <transition name="el-fade-in-linear">
      <audit-log v-show="isShowOperationLog"
                    @closeOperationLog="closeLog"
                    :stepActive="stepActive"
                    :deptLogs="deptLogs"></audit-log>
    </transition>
  </div>

</template>
<script>
//  面包屑组件
import crumbsCom from '@/components/com/crumbs-com'
//  表格组件
import ratingsTable from '@/components/com/ratings-table'
import AuditLog from '@/components/com/audit-log'
export default {
  data () {
    return {
      dirctorRole: false,
      isShowOperationLog: false,
      deptLogs: [],
      distribution: {},
      // 部门成员绩效详情
      performanceData: [],

      accessDialogVisible: false,
      denyDialogVisible: false,
      remark: '',

      staffData: [],
      columnTitle: [
        {
          title: '姓名',
          row: 'name'
        },
        {
          title: '职位',
          row: 'workDuty'
        },
        {
          title: '项目评分',
          row: 'score3',
          format: row => {
            return row.score[3] ? row.score[3].total : '-'
          }
        },
        {
          title: '基本评分',
          row: 'score1',
          format: row => {
            return row.score[1] ? row.score[1].total : '-'
          }
        },
        {
          title: '行政考勤',
          row: 'score2',
          format: row => {
            return row.score[2] ? row.score[2].total : '-'
          }
        },
        {
          title: '简报',
          row: 'score5',
          format: row => {
            return row.score[5] ? row.score[5].total : '-'
          }
        },
        {
          title: '团队贡献',
          row: 'score4',
          format: row => {
            return row.score[4] ? row.score[4].total : '-'
          }
        },
        {
          title: '绩效得分',
          row: 'score',
          format: row => {
            return row.score.performanceScore || '-'
          }
        },
        {
          title: '绩效等级',
          row: 'level',
          format: row => {
            return row.score.performanceLevel || '-'
          }
        }
      ]
    }
  },
  computed: {
    quarterId () {
      return this.$store.state.common.quarterId
    },
    user () {
      return this.$store.state.common.user
    },
    // 部门基本信息
    deptInfo () {
      let deptId = this.$route.params.id || this.user.deptId
      let department = this.$store.state.basic.department
      return this.$options.filters.getValueById(+deptId, department, 'id')
    },
    // 部门基本信息
    staff () {
      return this.$store.state.basic.staff
    },
    deptId () {
      return this.$route.params.id
    },
    ratingRules () {
      return this.$store.state.basic.ratingRules
    },
    stepActive () {
      let deptLog = this.deptLogs[0] || {}
      let status = 1
      // 1, 2, 3, 4
      switch (deptLog.scoreStatus) {
        case 1:
          status = 1
          break
        case 2:
          status = 2
          break
        case 4:
          status = 3
          break
      }
      return status
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    getData () {
      this.$http({
        url: 'score/audit/detail',
        data: {
          quarterId: this.quarterId,
          deptId: this.deptId
        }
      }).then(data => {
        this.staffData = data.staff
        this.deptLogs = data.log
        this.distribution = data.distribution
      })
    },
    checkAudit (status) {
      this.$http({
        url: 'score/audit/check',
        data: {
          quarterId: this.quarterId,
          deptId: this.deptId,
          scoreStatus: status,
          remark: status === 3 ? this.remark : ''
        }
      }).then(data => {
        this.$message.success('审核成功')
        this.getData()
        this.accessDialogVisible = false
        this.denyDialogVisible = false
      })
    },
    handleOpenOperation () {
      this.isShowOperationLog = !this.isShowOperationLog
    },
    closeLog () {
      this.isShowOperationLog = false
    },
    assessCommit () {
      let staffName = []
      this.staffData.map(item => {
        let isGrade = false
        for (let i in item.score[1]) {
          let score = item.score[1][i]
          if (score && score !== 0) {
            isGrade = true
          }
        }
        for (let i in item.score[3]) {
          let score = item.score[3][i]
          if (score && score !== 0) {
            isGrade = true
          }
        }
        if (!isGrade) staffName.push(item.name)
      })
      if (staffName.length) {
        return this.$message.warning(`提交审核需要先完成员工【${staffName.join(',')} 】的考核评分与项目评分`)
      }
      this.$http({
        url: 'score/audit/submit',
        method: 'post',
        data: {
          quarterId: this.quarterId
        }
      }).then(data => {
        this.getData()
        this.$message.success('提交审核成功')
      })
    }

  },
  beforeMount () {
    if (this.$store.state.common.user.role === 1) {
      this.dirctorRole = true
    } else {
      this.dirctorRole = false
    }
  },
  mounted () {
  },
  components: {
    crumbsCom: crumbsCom,
    ratingsTable: ratingsTable,
    auditLog: AuditLog
  }

}
</script>
