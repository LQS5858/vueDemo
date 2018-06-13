<style lang="less" scoped>
  .container {
    min-height: 100%;
    background-color: @backGroundColor;
    .sub-container {
      // border-top: 0;
      border-top: 80px solid #f2f2f2;
    }
    .table-part-container {
      margin: 0 10px;
      .table-filters {
        display: flex;
        flex-wrap: wrap;
        // align-items: center;
        justify-content: flex-start;
        box-shadow: 0 1px 0 0 #dcdae2;
        margin-bottom: 16px;
        .search-btn {
          margin-top: 39px;
        }
        p {
          margin: 17px 0 6px 0;
        }
        .filter-item {
          display: flex;
          flex: 0 0 auto;
          flex-direction: column;
          margin-bottom: 16px;
          // margin: 10px;
          white-space: nowrap;
          // align-items: center;
          align-items: flex-start;
        }
      }
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
</style>
<style lang="less">
  .manage-project {
    .table-filters {
      .search-btn {
        .el-button--mini {
          height: 32px;
        }
        .el-button--primary {
          background-color: #7352BF;
        }
      }
      .el-icon-arrow-up:before {
        margin-left: 20px !important;
      }
      .el-input {
        // margin-left: 8px;
        margin-right: 8px;
      }
      .el-range-editor {
        // margin-left: 8px;
      }
      .el-input__inner {
        height: 32px;
        width: 200px;
        &.el-range-editor {
          width: auto;
        }
        .el-range-separator,
        .el-range__icon {
          line-height: 24px;
        }
      }
      .el-button--mini {
        height: 28px;
        margin-left: 10px;
      }
      .el-date-editor .el-range__close-icon {
        line-height: 24px;
      }
      .el-date-editor .el-range-separator {
        width: auto;
      }
      .el-range-editor.el-input__inner {
        margin-right: 8px;
      }
    }
  }
</style>
<template>
  <div class="container manage-project">
    <crumbs class="top-nav" @callback="onChangeQuarter">
      <template slot='is-select'></template>
    </crumbs>
    <div class="sub-container">
      <div class="table-part-container">
        <div class="table-filters">
          <div class="filter-item">
            <p>项目名称</p>
            <el-input v-model="filterCondition.name"
                      placeholder="请输入项目名称"></el-input>
          </div>
          <div class="filter-item" v-show="staffInfo.role === 1">
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
                       icon="el-icon-search"
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
          <el-table-column prop="checkStatus">
            <template slot-scope="scope">
              <span :class="{'rating-1': scope.row.checkStatus === 0,
              'rating-2': scope.row.checkStatus === 1,
              'rating-3': scope.row.checkStatus === 2}">{{checkStatus[scope.row.checkStatus]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="goProjectDetail(scope.row)"
                         v-if="!(scope.row.ownerUUID === staffInfo.uid && scope.row.checkStatus !== 2)"
                         type="text"
                         size="small">详情
              </el-button>
              <el-button @click="goProjectDetail(scope.row)"
                         v-else
                         type="text"
                         size="small">评分
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
      </div>
    </div>
  </div>
</template>
<script>
import crumbs from '@/components/com/crumbs-com'

export default {
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
      tableData: []
    }
  },
  computed: {
    staffInfo () {
      return this.$store.state.common.user
    }
  },
  components: {
    crumbs: crumbs
  },
  methods: {
    onChangeQuarter () {
      this.getProjectList()
    },
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
            id: val.id,
            ownerUUID: val.ownerUUID
          })
        })
      }
    },
    getProjectList (data = {}) {
      if (this.staffInfo.role !== 1) {
        data.ownerUUID = this.staffInfo.uid
      }
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
    goProjectDetail (row) {
      this.$router.push({
        path: '/project-rating-detail',
        query: {pid: row.id, name: '项目考核', subname: '项目详情'}
      })
    }
  },
  mounted () {
  }
}
</script>
