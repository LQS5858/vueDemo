<style lang="less" scoped>
@import "../../assets/style/variable.less";
.table-title {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  padding-left: 10px;
  font-weight: bold;
  border-bottom: 1px solid @borderColor;
}
.table-content {
  margin: 10px;
}
</style>
<template>
  <div class="container manage-ratings">
    <crumbsCom class="top-nav"></crumbsCom>
    <div class="sub-container">
      <div class="table-part-container">
        <div class="table-title">项目考核</div>
        <div class="table-content">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="pname" label="项目名称">
            </el-table-column>
            <el-table-column prop="pleader" label="负责人">
            </el-table-column>
            <el-table-column prop="pcircle" label="项目周期">
            </el-table-column>
            <el-table-column prop="pstatus" label="项目状态">
            </el-table-column>
            <el-table-column sortable sort-by="pprogress" label="项目进度">
              <template slot-scope="scope">
                <el-progress :percentage="Number(scope.row.pprogress)"></el-progress>
              </template>
            </el-table-column>
            <el-table-column prop="checkStatus" label="评分状态">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="pagination-container" background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//  面包屑组件
import crumbsCom from '@/components/com/crumbs-com'
export default {
  data () {
    return {
      tableData: [
        {
          pname: 'EPR系统重构',
          pleader: '王小虎',
          pcircle: '2018.03.20-至今',
          pstatus: '进行中',
          pprogress: '50',
          checkStatus: '未评分'
        },
        {
          pname: 'EPR系统重构',
          pleader: '王小虎',
          pcircle: '2018.03.20-至今',
          pstatus: '进行中',
          pprogress: '60',
          checkStatus: '未评分'
        },
        {
          pname: 'EPR系统重构',
          pleader: '王小虎',
          pcircle: '2018.03.20-至今',
          pstatus: '进行中',
          pprogress: '70',
          checkStatus: '未评分'
        },
        {
          pname: 'EPR系统重构',
          pleader: '王小虎',
          pcircle: '2018.03.20-至今',
          pstatus: '进行中',
          pprogress: '80',
          checkStatus: '未评分'
        }
      ]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  components: {
    crumbsCom: crumbsCom
  }
}
</script>
