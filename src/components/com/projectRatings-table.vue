<template>
  <div class="container">
    <div class="project-title">
      <span class="project-name">ERP重构</span>
      <span class="project-content"><span class="sub-title">负责内容：</span><span class="sub-content">CRM模块原型设计</span></span>
      <span class="project-content"><span class="sub-title">参与时间：</span><span class="sub-content">2018.03.02-2018.04.20</span></span>
    </div>
    <el-table
      :data="tableData"
      border
      @selection-change="handleSelectionChange">
      style="width: 100%">
      <el-table-column
        v-if="isSelectable"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="category"
        label="类目">
      </el-table-column>
      <el-table-column
        prop="subweight"
        label="子权重">
      </el-table-column>
      <el-table-column
        prop="pgroupscore"
        current-row-key
        label="项目组评分">
        <template slot-scope="scope" current-row-key>
          <span>{{scope.row.pgroupscore[0]}}</span>
          <span>{{scope.row.pgroupscore[1]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="isOperateable"
        fixed="right"
        label="最终评分">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">采纳评分项目</el-button>
          <el-button @click="handleClickFail(scope.row)" type="primary" size="small">不采纳，重新评分</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="项目重新评分"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <div class="restart-rating">
        <div class="project-title">所在项目：<span class="project-name">ERP系统重构</span></div>
        <div class="project-title"></div>
        <el-table
          :data="tableData"
          border
          @selection-change="handleSelectionChange">
          style="width: 100%">
          <el-table-column
            v-if="isSelectable"
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="category"
            label="类目">
          </el-table-column>
          <el-table-column
            prop="subweight"
            label="子权重">
          </el-table-column>
          <el-table-column
            prop="pgroupscore"
            current-row-key
            label="项目组评分">
            <template slot-scope="scope" current-row-key>
              <span>{{scope.row.pgroupscore[0]}}</span>
              <span>{{scope.row.pgroupscore[1]}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="isOperateable"
            fixed="right"
            label="最终评分">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="primary" size="small">采纳评分项目</el-button>
              <el-button @click="handleClickFail(scope.row)" type="primary" size="small">不采纳，重新评分</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">保存</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        category: '完成质量',
        subweight: '50%',
        pgroupscore: ['超预期完成任务', '90分']
      }, {
        category: '完成进度',
        subweight: '50%',
        pgroupscore: ['超预期完成任务', '90分']
      }],
      // 弹出框显示
      dialogVisible: false
    }
  },
  props: {
    isSelectable: {
      type: Boolean,
      default: false
    },
    isOperateable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleSelectionChange () {
      console.log(22)
    },
    handleClick () {
      console.log(33)
    },
    handleClickFail (i) {
      this.dialogVisible = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style lang="less">
  .project-title{
    background: #fff;
    height:36px;
    padding:8px 0;
    .project-name{
      display: inline-block;
      height:100%;
      font-size: 14px;
      font-weight:bold;
    }
    .project-content{
      display: inline-block;
      height:100%;
      margin-left:30px;
      .sub-content{
        display: inline-block;
        height:100%;
        font-size: 14px;
        color:#000;
      }
      .sub-title{
        display: inline-block;
        height:100%;
        font-size: 12px;
        color:#b89398;
        line-height: 20px;
      }
    }
  }
  .el-table{
    td,th{
      .cell{
        display: flex;
        justify-content: space-around;
        text-align: center;
        font-size: 14px;
      }
    }
    tr{
      .is-leaf{
        background: #f0f0f0;
      }
    }
  }
</style>
