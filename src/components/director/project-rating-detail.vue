<style lang="less" scoped>
  .container {
    background-color: @backGroundColor;
    height: auto;
    .sub-container {
      border-top: 80px solid #f2f2f2;
      border-bottom: 0;
    }
    .table-part-container {
      background: @bgColor;
      .project-information,
      .project-member {
        background: #fff;
        overflow: hidden;
        /*
        &.project-member {
          margin-top: 10px;
        }
        */
      }
    }
    .title-part {
      // height: 50px;
      height: 32px;
      font-size: 14px;
      margin-top: 20px;
      font-family: Arial-BoldMT;
      font-weight: bold;
      padding-left: 12px;
      // line-height: 50px;
      line-height: 32px;
      background: #f1f1f5;
      margin-bottom: 12px;
      // border-bottom: 1px solid @borderColor;
    }
    .sum-score {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #9a9aa6;
      line-height: 14px;
      margin-left: 14px;
    }
    .score {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #f5a623;
      line-height: 14px;
      margin-left: 8px;
    }
    .content-part {
      .infor-line {
        margin: 25px 0;
        display: flex;
        justify-content: flex-start;
        .infor-item {
          flex: 0 1 25%;
          color: @subtitleColor;

          .infor-detail {
            margin-left: 10px;
            color: #000;
          }
          .infor-progress {
            color: @linkColor;
            display: inline-block;
            .inline-el {
              display: inline-block;
              width: 130px;
            }
          }
        }
      }
      .item-self {
        margin: 18px 0 30px;
      }
      .infor-single-item {
        margin: 25px 0;
        color: @subtitleColor;
        .infor-detail {
          color: #000;
        }
      }
    }
    .restart-rating .infor-item {
      flex: 0 1 33% !important;
    }
  }
</style>
<template>
  <div class="container">
    <crumbs class="top-nav">
      <i slot="backIcon"
         @click="back"
         class="iconfont icon-back back-icon"></i>
    </crumbs>
    <div class="sub-container">
      <div class="table-part-container">
        <div class="project-information">
          <div class="title-part">项目基本信息</div>
          <div class="content-part">
            <div class="infor-line">
              <span class="infor-item">项目名称：
                <span class="infor-detail">{{projectData.name}}</span>
              </span>
              <span class="infor-item">项目级别：
                <span class="infor-detail">{{projectLevel[projectData.level]}}级</span>
              </span>
              <span class="infor-item">项目负责人：
                <span class="infor-detail">{{projectData.ownerUUID|getValueById(staffList, 'uid').name}}</span>
              </span>
              <div class="infor-item">项目进度：
                <div class="infor-progress">
                  {{(projectData.schedule===0||projectData.schedule===100)?scheduleArr[projectData.schedule]:'进行中'}}：
                  <el-progress :percentage="projectData.schedule"
                               class="inline-el"></el-progress>
                </div>
              </div>
            </div>
            <div class="infor-line">
              <span class="infor-item">项目周期：
                <span
                  class="infor-detail">{{projectData.createTime|date}}-{{projectData.endTime|date}}</span>
              </span>
              <span class="infor-item">评分状态：
                <span class="infor-detail">{{ratingsArr[projectData.ratingStatus]}}</span>
              </span>
            </div>
            <p class="infor-single-item">项目目标：
              <span class="infor-detail">{{projectData.target}}</span>
            </p>
            <p class="infor-single-item">项目简介：
              <span class="infor-detail">{{projectData.intro}}</span>
            </p>
          </div>
        </div>
        <div class="project-member">
          <div class="title-part">项目成员</div>
          <div class="content-part">
            <ratingsTable @tableOperate="tableOperate"
                          :tableData="tableData"
                          :isOperateable="true"
                          :totalPage="pageData.total">
              <template slot="index">
                <el-table-column label="序号"
                                 type="index">
                </el-table-column>
              </template>
            </ratingsTable>
          </div>
        </div>
      </div>
    </div>
    <div class="pro-dialog">
      <el-dialog title="项目成员评分详情"
                 :visible.sync="editDialogVisible"
                 width="60%"
                 :before-close="handleClose">
        <div class="restart-rating">
          <div class="title-part">项目成员基本信息</div>
          <div class="content-part">
            <div class="infor-line">
              <span class="infor-item">评分对象：
                <span class="infor-detail">{{subData['姓名']}}</span>
              </span>
              <span class="infor-item">部门：
                <span class="infor-detail">{{subData['部门']}}</span>
              </span>
              <span class="infor-item">直属领导：
                <span class="infor-detail">{{subData.directId|getValueById(staffList, 'uid', 'name')}}</span>
              </span>
            </div>
            <div class="infor-line">
              <span class="infor-item">职位：
                <span class="infor-detail">{{subData['职位']}}</span>
              </span>
              <span class="infor-item">当前项目：
                <span class="infor-detail">{{projectData.name}}</span>
              </span>
              <span class="infor-item">项目负责人：
                <span class="infor-detail">{{projectData.ownerUUID|getValueById(staffList, 'uid', 'name')}}</span>
              </span>
            </div>
            <div class="infor-line-self">
              <div class="infor-item">参与时间：
                <span class="infor-detail">{{subData.beginTime}}-{{subData.endTime}}</span>
              </div>
              <div class="infor-item item-self">负责内容：
                <span class="infor-detail">{{subData['负责内容']}}</span>
              </div>
            </div>
          </div>
          <div class="title-part">项目成员评分
            <span class="sum-score">综合得分:</span>
            <span class="score">{{synthesizeScore}}</span>
          </div>
          <template>
            <ratings :ratingRules="ratingRules" @scoreDetail="getScoreDetail"></ratings>
          </template>
        </div>
        <span slot="footer">
          <el-button type="primary"
                     size="medium"
                     @click="submitScore">保存</el-button>
          <el-button @click="editDialogVisible = false"
                     size="medium">取消</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="pro-dialog">
      <el-dialog title="项目成员评分详情"
                 :visible.sync="detailDialogVisible"
                 width="60%"
                 :before-close="handleClose">
        <div class="restart-rating">
          <div class="title-part">项目成员基本信息</div>
          <div class="content-part">
            <div class="infor-line">
              <span class="infor-item">评分对象：
                <span class="infor-detail">{{subData['姓名']}}</span>
              </span>
              <span class="infor-item">部门：
                <span class="infor-detail">{{subData['部门']}}</span>
              </span>
              <span class="infor-item">直属领导：
                <span class="infor-detail">{{subData.directId|getValueById(staffList, 'uid', 'name')}}</span>
              </span>
            </div>
            <div class="infor-line">
              <span class="infor-item">职位：
                <span class="infor-detail">{{subData['职位']}}</span>
              </span>
              <span class="infor-item">当前项目：
                <span class="infor-detail">{{projectData.name}}</span>
              </span>
              <span class="infor-item">项目负责人：
                <span class="infor-detail">{{projectData.ownerUUID|getValueById(staffList, 'uid', 'name')}}</span>
              </span>
            </div>
            <div class="infor-line-self">
              <div class="infor-item">参与时间：
                <span class="infor-detail">{{subData.beginTime}}-{{subData.endTime}}</span>
              </div>
              <div class="infor-item item-self">负责内容：
                <span class="infor-detail">{{subData['负责内容']}}</span>
              </div>
            </div>
          </div>
          <div class="title-part">项目成员评分
            <span class="sum-score">综合得分:</span>
            <span class="score">{{projectScore}}</span>
          </div>
          <template>
            <ratings :isEditable="false" :ratingDetails="ratingDetails" :ratingRules="ratingRules"></ratings>
          </template>
        </div>
        <span slot="footer">
          <el-button @click="detailDialogVisible = false"
                     type="primary">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import crumbs from '@/components/com/crumbs-com'
import ratingsTable from '@/components/com/ratings-table'
import projectRating from '@/components/com/invite-score-table'
import ratings from '@/components/com/ratings'

export default {
  data () {
    return {
      // 用户信息
      userInfo: {},
      // 编辑项目评分下拉框绑定数据
      selectArr: [],
      // 评分输入框分值数据
      inputValArr: [],
      // 评分弹窗
      editDialogVisible: false,
      // 详情弹窗
      detailDialogVisible: false,
      // 项目详细数据
      projectData: {},
      // 项目成员分页信息
      pageData: {},
      // 评分列表数组
      ratingsArr: ['未评分', '评分中', '已评分'],
      // 项目级别展示
      projectLevel: {1: 'A', 2: 'B', 3: 'C', 4: 'D'},
      // 项目进度显示
      scheduleArr: {'0': '未开始', '100': '已完成'},
      // 项目评分细则
      ratingRules: [],
      tableData: {
        tableTitle: [
          '姓名',
          '部门',
          '职位',
          '负责内容',
          '综合得分',
          '考核状态'
        ],
        data: [],
        singleOption: true,
        sOperateList: {0: '评分', 1: '详情', 2: ''},
        sortArr: ['考核状态']
      },
      // 单项评分详情
      ratingDetails: [],
      // 单击项目成员显示所需数据
      subData: {},
      // 保存评分数据
      submitData: {},
      // 统计评分规则（快速查找）
      staticsRules: {},
      projectLv: {},
      projectScoreList: {},
      synthesizeScore: 0
    }
  },
  computed: {
    staffList () {
      return this.$store.state.basic.staff
    },
    department () {
      return this.$store.state.basic.department
    },
    quarterId () {
      return this.$store.state.common.quarterId
    },
    projectScore () {
      let totalScore = this.ratingRules.map((val, i) => {
        if (this.ratingDetails[val.id]) {
          return this.ratingDetails[val.id].evaluateScore * val.ratio / 100
        } else {
          return 0
        }
      })
      return totalScore.reduce((total, current) => {
        return total + current
      }, 0)
    }
  },
  watch: {
    quarterId () {
      this.getProjectDetail()
    }
  },
  created () {
    this.getProjectDetail()
    this.userInfo = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    // 获取项目详情
    getProjectDetail () {
      let pid = this.$route.query.pid
      this.$http.post('project/project-detail', {pid: pid, quarterId: this.quarterId}).then(res => {
        this.projectData = res[0]
        this.$http.post('basic/score-project-level', {projectId: pid}).then(rules => {
          this.projectLv = rules
          this.getTableData(this.projectData.projectPersonal)
          this.getRatingRules()
        })
      })
    },
    // 获取评分项细则
    getRatingRules () {
      this.$http.post('project/project-rules', {mid: 3}).then(res => {
        this.ratingRules = res
      })
    },
    getTableData (data) {
      this.tableData.data = []
      if (data && data.length) {
        data.forEach(val => {
          let score = val.scoreData && JSON.parse(val.scoreData)
          let scoreStatus = '未评分'
          let btnType = 0
          // 进行考核状态判断处理
          if (score && score[3] && score[3][val.id]) {
            scoreStatus = '已考核'
            btnType = 1
            // 计算任务得分（不加项目等级）
            val.taskScore = this.$utils.calTaskScore({[val.id]: score[3][val.id]}, {[val.id]: 1})
          } else {
            val.taskScore = ''
            // 判断任务列表按钮类型
            if (this.userInfo.uid !== this.projectData.ownerUUID) {
              btnType = 2
            }
          }
          // 获取直属领导name
          this.staffList.forEach((staff) => {
            if (staff.uid === val.directId) {
              val.leaderName = staff.name
            }
          })
          this.tableData.data.push({
            工号: val.jobNumber,
            姓名: val.sname,
            部门: this.$options.filters.getValueById(+val.deptid, this.department, 'id', 'name'),
            职位: val.workDuty,
            负责内容: val.name,
            综合得分: val.taskScore ? val.taskScore[val.id] : '',
            考核状态: scoreStatus,
            btnType: btnType,
            id: val.id,
            scoreData: JSON.parse(val.scoreData),
            sid: val.ownerUUID,
            directId: val.directId,
            beginTime: val.beginTime,
            endTime: val.endTime
          })
        })
      }
    },
    handleClose (done) {
      done()
    },
    // 详情和评分操作按钮点击
    tableOperate (data) {
      this.subData = data
      if (data.btnType === 0) {
        this.editDialogVisible = true
      } else {
        this.detailDialogVisible = true
        // 成绩展示数据处理
        let scoreData = data.scoreData
        this.ratingDetails = scoreData[3][data.id]
      }
    },
    // 评分提交函数
    submitScore () {
      if (!Object.keys(this.projectScoreList).length) {
        return this.$message({
          message: '评分未完成',
          type: 'warning'
        })
      }
      Object.assign(this.submitData, {
        3: {
          [this.subData.id]: this.projectScoreList
        }
      })
      this.$http
        .post('project/save-score', {
          scoreData: {
            sid: this.subData.sid,
            tid: this.subData.id,
            score: this.submitData
          },
          quarterId: this.quarterId
        })
        .then(res => {
          this.editDialogVisible = false
          this.$message({
            message: '保存成功!',
            type: 'success'
          })
          // 重新获取数据
          this.getProjectDetail()
        })
    },
    // 获取评分详情
    getScoreDetail (data) {
      this.projectScoreList = data.data
      this.synthesizeScore = data.totalScore
    }
  },
  components: {
    crumbs,
    ratingsTable,
    projectRating,
    ratings
  }
}
</script>
