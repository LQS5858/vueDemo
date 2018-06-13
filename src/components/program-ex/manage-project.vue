<style lang="less" scoped>
  .manage-project {
    background-color: @backGroundColor;
    min-height: 100%;
    min-width: 100%;
  }

  .table-part-container {
    margin: 0 10px;
    .table-filters {
      background: rgba(255, 255, 255, 0.00);
      box-shadow: 0 1px 0 0 #DCDAE2;
      margin-bottom: 16px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .filter-item {
        display: flex;
        flex: 0 0 auto;
        margin: 10px;
        white-space: nowrap;
        align-items: center;
      }
    }
  }
</style>
<style lang="less">
  .manage-project {
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
    .manage-project-add-project {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
    }
    .el-date-editor .el-range-separator {
      width: 22px;
    }
    .dialog-footer .el-button--default {
      padding: 9px 15px;
    }
    .dialog-footer .el-button--default span {
      padding: 0 10px;
      font-size: 14px !important;
    }
    .rating-1 {
      color: #FF5555;
    }
    .rating-2 {
      color: #FF9300;
    }
    .rating-3 {
      color: #333;
    }
  }

  .table-part-container {
    .el-table th {
      background: #F1F1F5;
      box-shadow: inset 0 -1px 0 0 #DCDAE2;
    }
    .el-table_1_column_7 {
      border-left: 1px solid #dcdae2;
    }
  }
</style>
<template>
  <div class="container manage-project">
    <crumbs class="top-nav">
      <el-button class="manage-project-add-project" type="primary" size="small" @click="addProject">新建项目</el-button>
    </crumbs>
    <div class="sub-container">
      <div class="table-part-container">
        <div class="table-filters">
          <div class="filter-item">
            <p>项目名称</p>
            <el-input v-model="filterCondition.name"
                      placeholder="请输入项目名称"></el-input>
          </div>
          <div class="filter-item">
            <p>负责人</p>
            <el-input v-model="filterCondition.leaderName"
                      placeholder="请输入项目负责人"></el-input>
          </div>
          <div class="filter-item">
            <p>项目周期</p>
            <el-date-picker v-model="filterCondition.filterTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="filter-item">
            <p>项目状态</p>
            <el-select v-model="filterCondition.status"
                       placeholder="请选择">
              <el-option v-for="(item, key) in projectStatus"
                         :key="key"
                         :label="item"
                         :value="key">
              </el-option>
            </el-select>
          </div>
          <div class="filter-item">
            <p>考核状态</p>
            <el-select v-model="filterCondition.ratingStatus"
                       placeholder="请选择">
              <el-option v-for="(item, key) in checkStatus"
                         :key="key"
                         :label="item"
                         :value="key">
              </el-option>
            </el-select>
          </div>

          <div class='search-btn'>
            <el-button type="primary"
                       size="mini"
                       @click="submitCondition">查询
            </el-button>
            <el-button size="mini"
                       type='text'
                       class='iconfont icon-reset'
                       @click="resetCondition">重置
            </el-button>
          </div>
        </div>
        <el-table :data="tableData"
                  stripe
                  style="width: 100%">
          <el-table-column prop="pname"
                           label="项目名称">
          </el-table-column>
          <el-table-column prop="pleader"
                           label="负责人">
          </el-table-column>
          <el-table-column prop="pcircle"
                           label="项目周期">
          </el-table-column>
          <el-table-column prop="pstatus"
                           label="项目状态">
          </el-table-column>
          <el-table-column sortable
                           sort-by="pprogress"
                           label="项目进度">
            <template slot-scope="scope">
              <el-progress :percentage="Number(scope.row.pprogress)"></el-progress>
            </template>
          </el-table-column>
          <el-table-column prop="checkStatus"
                           label="考核状态">
            <template slot-scope="scope">
              <span :class="{'rating-1': scope.row.checkStatus === 0,
              'rating-2': scope.row.checkStatus === 1,
              'rating-3': scope.row.checkStatus === 2}">{{checkStatus[scope.row.checkStatus]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="goProjectDetail(scope.row)"
                         v-if="scope.row.ownerUUID === staffInfo.uid"
                         type="text"
                         size="small">评分
              </el-button>
              <el-button v-show="scope.row.checkStatus !== 2" @click="editProject(scope.row)"
                         type="text"
                         size="small">编辑
              </el-button>
              <el-button @click="deleteProject(scope.row)"
                         type="text"
                         size="small">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="Number(projectList.total)>1"
                       class="pagination-container"
                       background
                       layout="prev, pager, next"
                       :total=projectList.total>
        </el-pagination>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%">
          <span>确认删除项目：{{deleteName}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="confirmDelete">确 定</el-button>
            <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import crumbs from '@/components/com/crumbs-com'

export default {
  components: {
    crumbs: crumbs
  },
  data () {
    return {
      // 查询条件
      filterCondition: {
        name: null,
        // 负责人
        leaderName: null,
        filterTime: null,
        status: null,
        ratingStatus: null
      },
      // 数据列表
      projectList: [],
      // 项目状态数组
      projectStatus: ['未开始', '进行中', '已完成'],
      // 考核状态数组
      checkStatus: ['未评分', '评分中', '已评分'],
      tableData: [],
      deleteName: '',
      deleteId: '',
      dialogVisible: false
    }
  },
  computed: {
    staffInfo () {
      return this.$store.state.common.user
    }
  },
  methods: {
    // 根据后台数据转换生成表格数据
    getTableData (data) {
      this.tableData = []
      if (data && data.length) {
        data.forEach(val => {
          this.tableData.push({
            pname: val.name,
            pleader: val.leaderName,
            pcircle:
            val.beginTime + '  ' + (val.endTime ? val.endTime : '至今'),
            pstatus: this.projectStatus[val.status],
            pprogress: val.schedule,
            checkStatus: val.ratingStatus,
            id: val.id
          })
        })
      }
    },
    getProjectList (data) {
      this.$http.post('project/project-list', data).then(res => {
        this.projectList = res
        this.getTableData(res)
      })
    },
    submitCondition () {
      this.getProjectList(this.filterCondition)
    },
    resetCondition () {
      for (let [key] of Object.entries(this.filterCondition)) {
        this.filterCondition[key] = null
      }
      this.getProjectList()
    },
    editProject (data) {
      this.$router.push({path: '/modify-project', query: {pid: data.id}})
    },
    goProjectDetail (row) {
      this.$router.push({
        path: '/project-rating-detail',
        query: {pid: row.id, name: '项目详情'}
      })
    },
    deleteProject (data) {
      console.log(data)
      this.deleteName = data.pname
      this.deleteId = data.id
      this.dialogVisible = true
    },
    confirmDelete () {
      this.$http.post('project/delete', {id: this.deleteId})
        .then((res) => {
          this.getProjectList(this.filterCondition)
          this.dialogVisible = false
        })
    },
    addProject (data) {
      this.$router.push({path: '/add-project', query: {pid: data.id}})
    }
  },
  mounted () {
    this.getProjectList()
  }
}
</script>
