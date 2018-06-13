<style lang="less" scoped>
  .ratings-table{
    margin:10px;
  }
  .el-dropdown{
    .el-button{
      padding:6px 8px 6px 12px;
    }
  }
</style>
<template>
  <div class="container">
    <crumbsCom class="top-nav"></crumbsCom>
    <div class="sub-container">
      <div class="table-part-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="待审核26" name="first">
            <div class="department-member">
              <el-dropdown @command="getData1">
                <el-button type="primary">
                  {{selectVal1}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="UI部">UI部</el-dropdown-item>
                  <el-dropdown-item command="前端设计">前端设计</el-dropdown-item>
                  <el-dropdown-item command="后台">后台</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <ratingsTable class="ratings-table" :tableData="tableData" :isSelectable="true" :isOperateable="true"></ratingsTable>
            </div>
          </el-tab-pane>
          <el-tab-pane label="已审核32" name="second">
            <div class="being-invited">
              <el-dropdown @command="getData2">
                <el-button type="primary">
                  {{selectVal2}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="UI部">UI部</el-dropdown-item>
                  <el-dropdown-item command="前端设计">前端设计</el-dropdown-item>
                  <el-dropdown-item command="后台">后台</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <ratingsTable class="ratings-table" :tableData="tableData" :isSelectable="true" :isOperateable="true"></ratingsTable>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
//  面包屑组件
import crumbsCom from '@/components/com/crumbs-com'
//  表格组件
import ratingsTable from '@/components/com/ratings-table'
export default {
  data () {
    return {
      activeName: 'first',
      selectVal1: '--请选择部门--',
      selectVal2: '--请选择部门--',
      tableData: {
        tableTitle: ['姓名', '所在部门', '职位', '评分项目', '邀请人', '邀请时间', '评分状态', '当前状态', '审核时间'],
        data: [{
          姓名: '刘海',
          所在部门: '产品部',
          职位: '产品经理',
          评分项目: 'erp重构',
          邀请人: '赵建强',
          邀请时间: '2018.04.25',
          评分状态: '89',
          当前状态: '未评分',
          审核时间: '2018.04.28'
        }, {
          姓名: '刘海',
          所在部门: '产品部',
          职位: '产品经理',
          评分项目: 'erp重构',
          邀请人: '赵建强',
          邀请时间: '2018.04.25',
          评分状态: '89',
          当前状态: '未评分',
          审核时间: '2018.04.28'
        }],
        operateArr: ['通过', '不通过']
      }
    }
  },
  components: {
    crumbsCom: crumbsCom,
    ratingsTable: ratingsTable
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    getData1 (val) {
      this.selectVal1 = val
    },
    getData2 (val) {
      this.selectVal2 = val
    }
  }
}
</script>
