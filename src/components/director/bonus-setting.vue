<style lang="less" scoped>
  .bonus-setting {
    // margin: 10px;
    background-color: @backGroundColor;
    .basic-set-wrap {
      height: 32px;
      background: #f1f1f5;
      display: flex;
      align-items: center;
      .dept-peformance {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
        line-height: 14px;
        padding-left: 15px;
        li {
          display: inline-block;
        }
      }
      p {
        line-height: 32px;
        margin-left: 12px;
      }
    }
    .setting-title {
      font-size: 16px;
      font-weight: bold;
    }
    .setting-content {
      margin-top: 13px;
      .btn-cancel {
        display: flex;
        justify-content: center;
        margin: 40px 0;
      }
      .setting-unit {
        display: inline-block;
        margin: 0 8px 16px 0;
        .setting-name {
          font-size: 12px;
          margin: 0 20px 6px 0;
        }
        .el-input {
          width: auto;
        }
        .reward-unit {
          font-size: 1px;
        }
      }
    }
  }

  .department-settings {
    // margin: 10px;
    .setting-title {
      font-size: 16px;
      font-weight: bold;
    }
    .setting-content {
      margin-top: 12px;
      .table-container {
        display: flex;
        width: 100%;
        justify-content: center;
        .i-input {
          display: flex;
          align-items: center;
          i {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #ff5555;
            margin-right: 4px;
          }
        }
        .table-column {
          flex: 0 1 auto;
          width: 100%;
          .table-title {
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            background: #f5f5f8;
            text-align: center;
            border-bottom: 1px solid #e4e4e4;
          }
          .table-content {
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #e4e4e4;
            .el-input {
              max-width: 80%;
            }
            span {
              display: inline-block;
              width: 100%;
              height: 100%;
              font-size: 14px;
              line-height: 60px;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
<style lang="less">
  .bonus-setting {
    .el-button--primary {
      background: #7352BF;
      border-radius: 4px;
    }
    .sub-container {
      border-top: 80px solid #f2f2f2;
      border-bottom: 0;
    }
    .el-row {
      margin-top: 20px;
      .el-button {
        padding: 8px 13px;
      }
    }
  }

  .setting-content {
    .el-input__inner {
      font-family: ArialMT;
      font-size: 12px;
      color: #333333;
      line-height: 14px;
      height: 32px;
      background: #ffffff;
      border: 1px solid #dcdae2;
      border-radius: 4px;
    }
  }

  .table-container {
    .el-table th {
      padding: 9px 0;
    }
    .el-table td {
      padding: 7.5px 0;
    }
  }
</style>
<template>
  <div class="container bonus-setting">
    <crumbs class="top-nav" :showQuarter="false"></crumbs>
    <div class="sub-container">
      <div class="table-part-container">
        <div class="basic-settings">
          <div class="setting-title basic-set-wrap mt">
            <p>基础设置</p>
          </div>
          <div class="setting-content">
            <div class="setting-unit">
              <div class="setting-name">考核季度</div>
              <template>
                <el-select v-model="bonus.quarterId">
                  <el-option v-for="item in options"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id">
                  </el-option>
                </el-select>
              </template>
            </div>
            <div class="setting-unit">
              <div class="setting-name">季度奖金(万元)</div>
              <el-input-number style="width: 156px;" v-model="bonus.totalBonus"
                               placeholder="请输入内容"></el-input-number>
              <span class="reward-unit">万元</span>
            </div>
          </div>
        </div>
        <div class="department-settings">
          <div class="basic-set-wrap">
            <p class="setting-title">部门设置</p>
            <div class="dept-peformance">
              <li>(绩效等级占比规则:</li>
              <li>A 50%</li>
              <li>B 50%</li>
              <li>C 0%</li>
              <li>D 0%)</li>
            </div>
          </div>
          <div class="setting-content">
            <div class="table-container">
              <el-table :data="bonus.data"
                        style="width: 100%">
                <el-table-column label="考核对象" fixed>
                  <template slot-scope="scope">
                    {{+scope.row.deptId | getValueById(department, 'id', 'name')}}
                  </template>
                </el-table-column>
                <el-table-column prop="staffNumber" label="考核人数" fixed></el-table-column>
                <el-table-column prop="probation" label="试用期人数" fixed></el-table-column>
                <el-table-column label="奖金占比" width="150">
                  <template slot-scope="scope">
                    <span class="i-input">
                      <i>*</i>
                      <el-input-number v-model="scope.row.accounting"/>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="绩效A人数" width="150">
                  <template slot-scope="scope">
                    <span class="i-input">
                      <i>*</i>
                      <el-input-number v-model="scope.row.ratA"/>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="绩效B人数" width="150">
                  <template slot-scope="scope">
                    <span class="i-input">
                      <i>*</i>
                      <el-input-number v-model="scope.row.ratB"/>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="绩效C人数" width="150">
                  <template slot-scope="scope">
                    <span class="i-input">
                      <i>*</i>
                      <el-input-number v-model="scope.row.ratC"/>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="绩效D人数"
                                 width="150">
                  <template slot-scope="scope">
                    <span class="i-input">
                      <i>*</i>
                      <el-input-number v-model="scope.row.ratD"/>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="绩效E人数"
                                 width="150">
                  <template slot-scope="scope">
                    <span class="i-input">
                      <i>*</i>
                      <el-input-number v-model="scope.row.ratE"/>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="绩效F人数"
                                 width="150">
                  <template slot-scope="scope">
                    <span class="i-input">
                      <i>*</i>
                      <el-input-number v-model="scope.row.ratF"/>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="奖金额度(万元)" width="150" fixed="right">
                  <template slot-scope="scope">
                    <span class="i-input">
                      <i>*</i>
                      <el-input-number v-model="scope.row.ratM"/>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="btn-cancel">
              <el-row>
                <el-button type="primary"
                           @click="submit">确定
                </el-button>
                <el-button @click="cacel">取消</el-button>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import crumbs from '@/components/com/crumbs-com'

export default {
  data () {
    return {
      bonus: {
        quarterId: this.$store.state.common.quarterId,
        totalBonus: '',
        data: []
      }
    }
  },
  computed: {
    options () {
      return this.$store.state.basic.quarter
    },
    department () {
      return this.$store.state.basic.department
    }
  },
  methods: {
    cacel () {
      this.$router.push('review-quarterly')
    },
    getData () {
      let user = this.$utils.getLocalUser()
      this.$http
        .post('/bonus/query', {quarterId: this.bonus.quarterId, uid: user.uid})
        .then(rs => {
          this.bonus.data = rs.data
          this.bonus.totalBonus = rs.totalBonus
        })
    },
    submit () {
      let ok = true
      let msg = ''
      for (let i = 0, l = this.bonus.data.length; i < l; i++) {
        let bonus = this.bonus.data[i]
        if (bonus.accounting < 0 || bonus.accounting > 100) {
          ok = false
          msg = this.$options.filters.getValueById(bonus.deptId, this.department, 'id', 'name') + '奖金占比超出范围'
          break
        }
        if (bonus.ratA + bonus.ratB + bonus.ratC + bonus.ratD + bonus.ratE + bonus.ratF > bonus.staffNumber) {
          ok = false
          msg = this.$options.filters.getValueById(bonus.deptId, this.department, 'id', 'name') + '的绩效人数超出该部门总人数'
          break
        }
      }
      if (ok) {
        this.$http.post('/bonus/update', this.bonus).then(rs => {
          this.$message({
            message: rs ? '修改成功' : '修改失败,请稍后再试',
            type: rs ? 'success' : 'warning'
          })
        })
      } else {
        this.$message({
          message: msg,
          type: 'warning'
        })
      }
    }
  },
  components: {
    crumbs: crumbs
  },
  mounted () {
    this.getData()
    this.$watch('bonus.quarterId', () => {
      this.getData()
    })
  }
}
</script>
