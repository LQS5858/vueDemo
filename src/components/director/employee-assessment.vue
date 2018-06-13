<!-- 下属考核页面 -->
<style lang='less' scoped>
  .examination-step {
    .dept-wrap {
      height: 32px;
      margin: 16px 0 16px 11px;
      font-family: ArialMT;
      font-size: 12px;
      letter-spacing: 0;
      line-height: 14px;
      display: flex;
      .leader-information {
        margin-left: 254px;
      }
      .dept-name {
        width: 60px;
        margin-right: 4px;
      }

      li {
        display: inline-block;
        padding-top: 4px;
      }
      .dept-name {
        color: #999999;
      }
    }
  }

  .attendance-wrap {
    min-height: 100%;
    background-color: @backGroundColor;
    .attendance-table {
      margin-top: 12px;
    }
    .assessment-title {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      display: flex;
      align-items: center;
      background: #f8f8fa;
      height: 40px;
      color: #666666;
      div:not(:last-child) {
        padding-right: 40px;
      }
      .group-title {
        padding-left: 12px;
      }
    }
  }
</style>
<template>
  <div class='attendance-wrap'>
    <crumbs @callback="getData"></crumbs>

    <div class="attendance-search-table prl">
      <attendance-table-search v-if="user.role === 1"
                               @search="getData">
        <template slot="filter">
          <div class="left-input">
            <p class='com-padding-top'>姓名</p>
            <el-input v-model="filter.name"
                      placeholder="请输入内容"></el-input>
          </div>
          <div class="middle-select">
            <p class="com-padding-top">状态</p>
            <el-select v-model="filter.status"
                       placeholder="请选择">
              <el-option v-for="item in scoreStatus"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </div>
        </template>
      </attendance-table-search>
      <template v-else>
        <div>
          <div class="examination-step attendance-search-table">
            <el-steps :active="2"
                      align-center>
              <el-step title="部门考核"
                       icon="iconfont icon-yuan"></el-step>
              <el-step title="领导审核"
                       icon="iconfont icon-yuan1"></el-step>
              <el-step title="完成审核"
                       icon="iconfont icon-yuan1"></el-step>
            </el-steps>
            <div class="dept-wrap">
              <div class="dept-information ">
                <li class="dept-name">部门名称</li>
                <li>产品部</li>
              </div>
              <div class="leader-information">
                <li class="dept-name">部门领导</li>
                <li>陈大力</li>
              </div>
            </div>
          </div>
        </div>
        <div class="assessment-title">
          <div class="group-title">绩效等级名额</div>
          <div>A (可评:5 ; 已评: 1）</div>
          <div>B (可评:5 ; 已评: 1）</div>
          <div>C (可评:5 ; 已评: 1）</div>
          <div>D (可评:5 ; 已评: 1）</div>
        </div>
      </template>
      <div class="attendance-table">
        <attendance-tab :columnTitle="columnTitle"
                        :data="staffData"
                        :isShow='isTrue'>
          <template slot="table-header">
            <span></span>
          </template>
          <template slot="slot-pagination">
            <span></span>
          </template>
        </attendance-tab>
      </div>
    </div>
  </div>
</template>

<script>
import AttentabSearch from '@/components/com/attendance-table-search'
import Crumbs from '@/components/com/crumbs-com'
import AttendanceTab from '@/components/com/attendance-table'
import SearchBtn from '@/components/com/search-btn'
import filters from '@/assets/js/filters'

export default {
  data () {
    return {
      operationTitile: {},
      scoreStatus: [
        {
          id: 0,
          name: '全部'
        },
        {
          id: 1,
          name: '未评分'
        },
        {
          id: 2,
          name: '评分中'
        },
        {
          id: 3,
          name: '已评分'
        }
      ],
      isTrue: false,
      staffData: [],
      filter: {
        name: '',
        status: ''
      },
      columnTitle: [
        {
          title: '序号',
          type: 'index',
          width: 100
        },
        {
          title: '姓名',
          row: 'name'
        },
        {
          title: '部门',
          row: 'deptId',
          format: (row) => {
            return filters.getValueById(+row.deptId, this.$store.state.basic.department, 'id', 'name')
          }
        },
        {
          title: '职位',
          row: 'workDuty'
        },
        {
          title: '绩效等级',
          row: 'lazycount',
          format: (row) => {
            let val = '-'
            let performanceScore = row.score.performanceScore
            if (!row.score || !row.score.data || !row.score.performanceScore) return val
            this.scoreLevel.map(item => {
              if (item.maxScore > performanceScore && item.minScore < performanceScore) {
                val = item.name
              }
            })
            return val
          }
        },
        {
          title: '绩效得分',
          row: 'scoreCount',
          format: (row) => {
            if (!row.score || !row.score.data) return '-'
            return row.score.performanceScore || '-'
          }
        },
        {
          title: '考核状态',
          row: 'scoreStatus',
          format: (row) => {
            let assessmentStatus = null
            let status = +row.score.status || 1
            let scoreStatus = this.$options.filters.getValueById(+row.score.status || 1, this.scoreStatus, 'id', 'name')
            console.log(scoreStatus, status)
            switch (status) {
              case 1:
                assessmentStatus = `<span style="color: #FF5555" >${scoreStatus}</span>`
                break
              case 2:
                assessmentStatus = `<span style="color: #FF9300">${scoreStatus}</span>`
                break
              case 3:
                assessmentStatus = `<span>${scoreStatus}</span>`
                break
            }
            // return this.$options.filters.getValueById(+row.score.status || 1, this.scoreStatus, 'id', 'name')
            return assessmentStatus
          }
        },
        {
          title: '操作',
          type: 'operation',
          flag: 'assessment',
          format: row => {
            return this.$options.filters.getValueById(+row.score.status || 1, this.scoreStatus, 'id', 'name')
          },
          callback: {
            '修改': (row) => {
              this.$router.push(`/score-page/${row.uid}?name=绩效管理&subname=绩效详情`)
            }
          }
        }
      ]
    }
  },
  components: {
    AttendanceTableSearch: AttentabSearch,
    Crumbs,
    AttendanceTab,
    SearchBtn
  },
  computed: {
    quarterId () {
      return this.$store.state.common.quarterId
    },
    user () {
      return this.$store.state.common.user
    },
    scoreLevel () {
      return this.$store.state.basic.scoreLevel
    }
  },
  methods: {
    getData () {
      this.$http({
        url: 'score/dept-leader',
        method: 'post',
        data: {
          staffId: this.user.uid,
          quarterId: this.quarterId,
          filter: this.filter
        }
      }).then(data => {
        this.staffData = data
      })
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>
