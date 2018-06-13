<style lang="less" scoped>
  .being-invited{
    margin:10px;
  }
  .department-member{
    .performance-level{
      height:50px;
      margin: 0 10px;
      background:#f3f3f7;
      .level-detail{
        display: inline-block;
        height:100%;
        margin-left:30px;
        line-height: 50px;
        color:#878788;
        .level-show{
          color:#000;
        }
        .level-count-success{
          color:#9d5dff;
          margin:0 2px;
        }
        .level-count-fail{
          color:#878788;
          margin-left:4px;
        }
      }
      .level-title{
        display: inline-block;
        height:100%;
        line-height: 50px;
        margin:0 15px;
        color:#7b7b96;
        font-size: 14px;
      }
    }
    .ratings-table{
      margin:10px;
    }
  }
</style>
<template>
  <div class="container">
    <crumbsCom class="top-nav"></crumbsCom>
    <div class="sub-container">
      <div class="table-part-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="部门成员" name="first">
            <div class="department-member">
              <div class="performance-level">
                <div class="level-title">绩效级别名额:</div>
                <div class="level-detail">
                  <span class="level-show">A</span>（可评:<span class="level-count-success">3</span>;已评:<span class="level-count-fail">1</span>）
                </div>
                <div class="level-detail">
                  <span class="level-show">B</span>（可评:<span class="level-count-success">3</span>;已评:<span class="level-count-fail">1</span>）
                </div>
                <div class="level-detail">
                  <span class="level-show">C</span>（可评:<span class="level-count-success">3</span>;已评:<span class="level-count-fail">1</span>）
                </div>
                <div class="level-detail">
                  <span class="level-show">D</span>（可评:<span class="level-count-success">3</span>;已评:<span class="level-count-fail">1</span>）
                </div>
              </div>
              <ratingsTable class="ratings-table" :tableData="tableData" :isOperateable="true"></ratingsTable>
            </div>
          </el-tab-pane>
          <el-tab-pane label="项目评分" name="second">
            <div class="being-invited">
              <ratingsTable class="ratings-table" :tableData="tableData" :isOperateable="true"></ratingsTable>
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
      crumbsData: ['绩效管理', '评分管理'],
      contentTitle: '评分管理',
      activeName: 'first',
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
        operateArr: ['去评分', '详情']
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  components: {
    crumbsCom: crumbsCom,
    ratingsTable: ratingsTable
  },
  mounted () {
  }
}
</script>
