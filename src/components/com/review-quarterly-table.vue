<!-- 季度奖金表格组件 -->
<style lang='less' scoped>
  .first-select {
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #ff5555;
      margin-right: 4px;
    }
  }

  .btn-wrap {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }

  .department-set-wrap {
    background: #f1f1f5;
    margin-bottom: 12px;
    height: 32px;
    width: 100%;
    display: flex;
    align-items: center;
    .department-set {
      padding: 0 12px;
      h1 {
        font-size: 14px;
      }
    }
    .dept-peformance {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #999999;
      line-height: 14px;
      li {
        display: inline-block;
      }
    }
  }
</style>
<template>
  <div class='edit-table-wrap'>
    <slot name='dept-set'>
      <div class="department-set-wrap">
        <div class="department-set">
          <h1>部门设置</h1>
        </div>
        <div class="dept-peformance">
          <li>(绩效等级占比规则</li>
          <li>A 50%</li>
          <li>B 50%</li>
          <li>C 0%</li>
          <li>D 0%)</li>
        </div>
      </div>
    </slot>
    <el-table :data="rules">
      <template v-for="(item,index) of columnTitle">
        <el-table-column v-if="item.type=='text'"
                         :width="item.width||''"
                         :key='index'
                         :prop='item.row'
                         :label="item.title">
        </el-table-column>
        <el-table-column v-else-if="item.type=='select'"
                         :key='index'
                         :width="item.width||''"
                         :prop='item.row'
                         :label="item.title">
          <template slot-scope="scope">
            <el-select v-model="data[scope.row.id].evaluateId"
                       placeholder="请选择">
              <el-option v-for="item in scope.row.options"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column v-else
                         align="center"
                         :key='index'
                         :width="item.width||''"
                         :prop='item.row'
                         :label="item.title">
          <template slot-scope="scope">
            <el-input v-model.number="data[scope.row.id].evaluateScore"
                      type="number"
                      :readonly="isReadOnly"
                      @change="checkSelect(scope.row.id)"
                      @focus="checkSelect(scope.row.id)"
                      placeholder="请输入评分"></el-input>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <slot name='confirm-button'>
      <div class="btn-wrap">
        <el-button type="primary">确定</el-button>
        <el-button>取消</el-button>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    rules: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    columnTitle: {
      type: Array,
      default () {
        return [
          {
            title: '考核事项',
            type: 'text',
            row: 'name'
          },
          {
            title: '子权重(%)',
            type: 'text',
            row: 'ratio'
          },
          {
            title: '考核评价',
            type: 'select',
            width: '740px',
            row: ''
          },
          {
            title: '综合评分',
            type: 'input',
            width: '180px',
            row: ''
          }
        ]
      }
    }
  },
  data () {
    return {
      isReadOnly: false,
      tableTitle: [
        {
          title: '考核对象',
          row: 'quarter'
        },
        {
          title: '考核人数',
          row: 'count'
        }
      ]
    }
  },

  components: {},

  methods: {
    checkSelect (row) {
      console.log(this.data[row].evaluateId)
      if (!this.data[row].evaluateId) {
        this.isReadOnly = true
        this.$message({
          showClose: true,
          message: '请先填写考核评价',
          type: 'warning'
        })
      } else {
        this.isReadOnly = false
      }
    }
  }
}
</script>
