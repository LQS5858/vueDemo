 <!--
 基本评分/行为规范/简报评分三个公共组件
 参数：table数据数组/权重百分比/统计得分
 -->
<template>
  <div>
    <!-- 评分容 -->
    <div class="scoreWrap">
      <div class="basicScoreWrap">
        <div class="basicHeader">
          <li>基本评分</li>
          <li>权重:</li>
          <li>10%</li>
          <div>
            <li>统计得分</li>
            <li>93</li>
          </div>
        </div>
        <!-- 基本评分表格插件 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>

      </div>
      <div class="behaviorWrap">
        <div class="behaviorHeaderWrap">
          <li>行为规范</li>
          <li>权重:</li>
          <li>10%</li>
          <div>
            <li>统计得分</li>
            <li>-10</li>
          </div>

        </div>
        <!-- 行为评分表格插件 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>

      </div>
      <!-- 简报评分容器 -->
      <div class="briefReportWrap">
        <div class="briefHeader">
          <li>简报评分</li>
          <li class='iconfont icon-gantanhaozhong'>简报规则</li>
          <div>
            <li>统计得分</li>
            <li>-30</li>
          </div>
        </div>
        <!-- 简报评分插件 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>

</template>
<style lang='less' scoped>
.scoreWrap {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  .basicScoreWrap {
    flex-grow: 1;
    order: 0;
    margin: 10px 0px 0px 16px;
    padding-left: 5px;
    .basicHeader {
      background-color: white;
      height: 60px;
      list-style-type: none;
      border-bottom: 1px solid pink;
      div {
        float: right;
        margin-right: 20px;
      }
      li {
        display: inline-block;
        padding-left: 10px;
        line-height: 60px;
      }
      li:nth-child(1) {
        font-weight: 500;
      }
      li:not(:nth-child(1)) {
        font-weight: 400;
        color: #868686;
      }
    }
  }
  .behaviorWrap {
    flex-grow: 1;
    order: 1;
    margin: 10px 0px 0px 15px;
    .behaviorHeaderWrap {
      background-color: white;
      height: 60px;
      list-style-type: none;
      border-bottom: 1px solid pink;
      div {
        float: right;
        margin-right: 20px;
      }
      li {
        display: inline-block;
        padding-left: 10px;
        line-height: 60px;
      }
      li:nth-child(1) {
        font-weight: 500;
      }
      li:not(:nth-child(1)) {
        font-weight: 400;
        color: #868686;
      }
    }
  }
  .briefReportWrap {
    flex-grow: 1;
    order: 2;
    margin: 10px 0px 0px 15px;
    .briefHeader {
      background-color: white;
      height: 60px;
      list-style-type: none;
      border-bottom: 1px solid pink;
      div {
        float: right;
        margin-right: 20px;
        li:nth-child(2) {
          color: red;
        }
      }
      li {
        display: inline-block;
        padding-left: 10px;
        line-height: 60px;
      }
      li:nth-child(1) {
        font-weight: 500;
      }
      li:nth-child(2) {
        font-weight: 400;
        color: blueviolet;
      }
    }
  }
}
</style>
<script>
export default {
  // 参数：三个属性basicScore代表基本评分数据，table数据数组/权重百分比/统计得分
  props: {
    basicScore: {
      tableData: {
        type: String,
        default: () => {
          return [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }
          ]
        }
      },
      weightPer: {
        type: String,
        default: '10%'
      },
      allScore: {
        type: Number,
        default: 93
      }
    },
    behavior: {
      tableData: {
        type: String,
        default: () => {
          return [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }
          ]
        }
      },
      weightPer: {
        type: String,
        default: '10%'
      },
      allScore: {
        type: Number,
        default: 93
      }
    },
    briefing: {
      tableData: {
        type: String,
        default: () => {
          return [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }
          ]
        }
      },
      weightPer: {
        type: String,
        default: '10%'
      },
      allScore: {
        type: Number,
        default: 93
      }
    }
  }
}
</script>
