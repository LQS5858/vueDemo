<!-- 组织架构模块 -->
<style lang='less' scoped>
  .organizationa-wrap {
    .organizationa-content {
      height: 755px;
      margin: 20px 20px 0;
      background-color: @backGroundColor;
      position: relative;
      display: flex;
      flex-direction: row;
      .left-nav {
        width: 218px;
        height: 755px;
        border: 1px solid @borderColor;
        overflow: scroll;
        .nav-search {
          margin: 20px 10px 0;
        }
      }
      .right-table {
        flex-grow: 1;
        // 加滚动条
        overflow-y: auto;
      }
    }
  }
</style>
<template>
  <div class="organizationa-wrap ">
    <!-- 面包屑组件 -->
    <crumbs :showQuarter="false"></crumbs>
    <!-- 下内容容器 -->
    <div class="organizationa-content">
      <!-- 左侧导航固定宽度布局 -->
      <div class="left-nav">
        <div class="nav-search">
          <el-input placeholder="搜索姓名/工号"
                    v-model="keyword">
            <i slot="prefix"
               class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="nav-menu">

          <el-col :span="12">
            <el-tree :data="[treeData]"
                     :props="defaultProps"
                     accordion
                     node-key="id"
                     :default-expand-all="true"
                     ref="tree"
                     highlight-current
                     @node-click="onSelectDept">
            </el-tree>
          </el-col>
        </div>
      </div>
      <!-- 右边表格容器 -->
      <div class="right-table prl">
        <OrganizationalSearchTitle></OrganizationalSearchTitle>
        <el-table :data="staffData"
                  stripe
                  style="width: 100%">
          <el-table-column v-for="(item,index) in tableTitle"
                           :key="index"
                           :prop="item.prop"
                           :formatter="item.format"
                           :label="item.title">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import Crumbs from './crumbs-com'
import OraganizationalTable from './invite-score-table'
import OrganizationalSearchTitle from './organizational-search-title'

export default {
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },

      deptIDName: {},
      levelFisrt: [],
      levelTwo: [],
      levelThree: [],
      //   树所有数据
      treeAllData: '',
      keyword: '',
      tableTitle: [
        {
          title: '工号',
          prop: 'jobNumber'
        },
        {
          title: '姓名',
          prop: 'name'
        },
        {
          title: '职位',
          prop: 'workDuty'
        },
        {
          title: '部门',
          format: row => {
            return this.$options.filters.getValueById(+row.deptId, this.$store.state.basic.department, 'id', 'name')
          }
        },
        {
          title: '联系方式',
          prop: 'qq'
        },
        {
          title: '入职时间',
          format: row => {
            console.log(row)
            return this.$options.filters.date(row.entryDate)
          }
        }
        // {
        //   title: '参与项目',
        //   prop: 'name'
        // },
        // {
        //   title: '绩效得分',
        //   prop: 'entryDate'
        // },
        // {
        //   title: '绩效等级',
        //   prop: 'entryDate'
        // },
        // {
        //   title: '考核状态',
        //   prop: 'entryDate'
        // }
      ],
      staffData: []
    }
  },
  computed: {
    treeData () {
      let data = this.$store.state.basic.departmentTree
      this.handleOpen(data.id)
      return data
    }
  },
  components: {
    crumbs: Crumbs,
    oraganizational_table: OraganizationalTable,
    OrganizationalSearchTitle
  },
  mounted () {
    // this.$http({
    //   url: 'dept/tree',
    //   method: 'get'
    // }).then(data => {
    //   this.treeAllData = data
    //   if (this.treeAllData instanceof Object) {
    //     this.deptIDName.deptId = this.treeAllData.id
    //     this.deptIDName.deptName = this.treeAllData.name
    //     this.levelFisrt.push(this.deptIDName)
    //     this.treeAllData.children.forEach(element => {
    //       this.levelTwo.push(element)
    //       element.children.forEach(element => {
    //         this.levelThree.push(element)
    //       })
    //     })
    //   } else {
    //     this.data.JSON.parse(this.treeAllData)
    //     this.levelFisrt.push(this.treeAllData.name)
    //     this.treeAllData.children.forEach(element => {
    //       this.levelTwo.push(element.name)
    //       element.children.forEach(element => {
    //         this.levelThree.push(element.name)
    //       })
    //     })
    //   }
    // })
  },

  methods: {
    onSelectDept (obj, node, self) {
      this.handleOpen(obj.id)
    },
    handleOpen (key) {
      let params = {
        deptId: key
      }
      this.$http({
        url: 'dept/staff',
        method: 'post',
        data: params
      }).then(data => {
        this.staffData = data
        // console.log(this.staffData)
      })
      // console.log(key)
    }
  }
}
</script>
