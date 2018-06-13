<style lang="less" scoped>
  .manage-review {
    width: 100%;
    min-height: 100%;
    background-color: @backGroundColor;
  }

  .department-member {
    position: relative;
    .performance-level {
      height: 40px;
      background: #f3f3f7;
      margin-bottom: 12px;
      .level-detail {
        display: inline-block;
        height: 100%;
        margin-left: 40px;
        // margin-left: 5px;
        // margin-right: 15px;
        line-height: 42px;
        color: #878788;
        .level-show {
          color: #000;
        }
        .level-count-success {
          color: #fd9226;
          margin: 0 2px;
        }
      }
      .level-title {
        display: inline-block;
        height: 100%;
        line-height: 42px;
        margin-left: 12px;
        color: #7b7b96;
        font-size: 12px;
      }
    }
    .filter-items {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      box-shadow: 0 1px 0 0 #dcdae2;
      height: 84px;
      .self {
        margin: 0 12px 0 8px;
      }
      .single-item {
        margin-bottom: 16px;

        p {
          margin: 16px 0 6px;
        }
      }
    }
  }

  .attendance-btn {
    width: 68px;
    height: 32px;
    margin-top: 26px;
  }

  .pagination-wrap {
    float: right;
    margin: 16px 0;
    // font-size: 12px;
    height: 32px;
    background-color: @backGroundColor;
  }

  .clear-both {
    clear: both;
  }

  .pending-class {
    color: #ff5555;
  }
</style>
<style lang="less">
  .manage-review {
    .el-button--text {
      font-size: 12px;
      padding: 0;
    }
  }
</style>
<template>
  <div class="container manage-review attendance-table-wrap">
    <crumbs class="top-nav"
            @callback="getReviewList"></crumbs>
    <div class="sub-container ">
      <div class="table-part-container">
        <div class="department-member">
          <div class="filter-items  attendance-tab-title-wrap">
            <div class="single-item">
              <p>部门名称：</p>
              <el-input v-model="deptName"
                        placeholder="请输入部门名称">
              </el-input>
            </div>
            <div class="single-item self">
              <p>审批状态：</p>
              <el-select v-model="deptStatus"
                         placeholder="审批状态">
                <el-option v-for="(item, key) in reviewStatus"
                           :key="key"
                           :label="item"
                           :value="key">
                </el-option>
              </el-select>
            </div>
            <div class="attendance-btn">
              <el-button class='iconfont icon-sousuo'
                         type="primary"
                         @click="getReviewList">查询
              </el-button>
            </div>
            <!-- <el-button @click="queryReviewList($event, isReset = true)">重置</el-button> -->
          </div>
          <div class="performance-level">
            <div class="level-title">数据统计:</div>
            <div class="level-detail">部门总数:
              <span class="level-count-success">{{page.total}}</span>
            </div>
            <div class="level-detail">已提交:
              <span class="level-count-success">{{page.subNum}}</span>
            </div>
            <div class="level-detail">未提交:
              <span class="level-count-success">{{page.total - page.subNum}}</span>
            </div>
          </div>
          <el-table :data="tableData"
                    stripe
                    style="width: 100%">
            <el-table-column type="index"
                             label="序号">
            </el-table-column>
            <el-table-column prop="department"
                             label="部门">
            </el-table-column>
            <el-table-column prop="deptManager"
                             label="部门领导">
            </el-table-column>
            <el-table-column prop="deptNum"
                             label="部门人数">
            </el-table-column>
            <el-table-column prop="date"
                             label="提交时间">
            </el-table-column>
            <el-table-column prop="status"
                             label="审批状态">
              <template slot-scope="scope">
                <span v-if="scope.row.statusCode === 2 || scope.row.statusCode === 3"
                      style="color:#FF5555"
                      v-html="scope.row.status"></span>
                <span v-else
                      v-html="scope.row.status"></span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <router-link class="el-button el-button--text"
                             :to="`./review-detail/${scope.row.deptId}`">
                  <!--<span v-if="scope.row.statusCode === 1">提醒考核</span>-->
                  <span v-if="scope.row.statusCode === 2">审批</span>
                  <!--<span v-else-if="scope.row.statusCode === 3">提醒考核</span>-->
                  <!--<span v-else-if="scope.row.statusCode === 4">详情</span>-->
                  <span v-else>详情</span>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-wrap ">
            <el-pagination :page-size="page.size"
                           background
                           @size-change="sizeChange"
                           @current-change="getReviewList"
                           :current-page.sync="page.index"
                           :page-sizes="page.sizes"
                           layout="sizes,prev,pager,next"
                           :total="page.total"
                           v-show="page.total"
                           prev-text="上一页"
                           next-text='下一页'>
            </el-pagination>
          </div>
          <div class="clear-both"></div>
        </div>
      </div>
      <el-dialog title="不通过"
                 :visible.sync="dialogVisible"
                 width="40%">
        <p>是否确认不通过对'刘海'的审核？</p>
        <p class="refuse-text">不通过原因:</p>
        <el-input type="textarea"></el-input>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import crumbs from '@/components/com/crumbs-com'
import ratingsTable from '@/components/com/ratings-table'
export default {
  data () {
    return {
      // 分页功能
      page: {
        size: 10,
        sizes: [10, 20, 30],
        total: 0,
        index: 1,
        subNum: 0
      },
      // 审批管理列表
      reviewList: [],
      // 审批状态
      reviewStatus: {0: '全部', 1: '未提交', 2: '待审批', 3: '驳回', 4: '已审批'},
      // 提交部门数统计
      subDeptNum: 0,
      dialogVisible: false,
      // 筛选列表参数-部门名称
      deptName: '',
      // 筛选列表参数--部门状态
      deptStatus: '',
      tableData: []
    }
  },
  computed: {
    // 拉取代码
    quarterId () {
      return this.$store.state.common.quarterId
    }
  },
  methods: {
    // 根据状态控制操作列
    examineType (row) {
      let status = +row.statusCode
      switch (status) {
        case 1:
          this.examineTypeTitle = '提醒考核'
          break
        case 2:
          this.examineTypeTitle = '审批'
          this.pendingClass = true
          break
        case 3:
          this.examineTypeTitle = '提醒考核'
          this.pendingClass = true
          break
        case 4:
          this.examineTypeTitle = '详情'
          break
        default:
          this.examineTypeTitle = '提醒考核'
          break
      }
      return true
    },
    // 获取审批管理列表
    getReviewList () {
      let data = {
        quarterId: this.quarterId,
        deptName: this.deptName,
        pageIndex: this.page.index,
        pageSize: this.page.size,
        status: this.deptStatus === '0' ? '' : this.deptStatus
      }
      this.$http.post('review/get-review-list', data)
        .then((res) => {
          this.reviewList = res.data
          this.page.total = res.pageTotal
          this.page.subNum = res.subNum
          // 做表格数据处理
          this.tableData = []
          this.subDeptNum = 0
          this.reviewList.forEach((val) => {
            if (val.scoreStatus === 2 || val.scoreStatus === 4) {
              this.subDeptNum++
            }
            this.tableData.push({
              id: val.id,
              department: val.dname || '-',
              deptManager: val.director || '-',
              deptNum: val.count || '-',
              date: val.createTime || '-',
              status: this.reviewStatus[val.scoreStatus] || '-',
              statusCode: val.scoreStatus,
              deptId: val.deptId
            })
          })
          console.log(this.tableData)
        })
    },
    sizeChange (val) {
      this.page.size = val
      this.getReviewList()
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  mounted () {
  },
  components: {
    crumbs: crumbs,
    ratingsTable: ratingsTable
  }
}
</script>
