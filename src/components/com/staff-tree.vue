<style lang='less' scoped></style>
<style lang="less">
  .staff-tree {
    .tree-btn {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
  }
</style>
<template>
  <div class="staff-tree">
    <el-dialog
      title="成员选择"
      :modal="modal"
      :visible.sync="showTree"
      :before-close="handleClose"
      width="30%">
      <el-tree :data="[ectypeTree]"
               :props="defaultProps"
               accordion node-key="id"
               :default-expand-all="false"
               ref="tree" highlight-current
               @node-click="switchStaff"
               :show-checkbox="showCheck">
      </el-tree>
      <div class="tree-btn">
        <el-button type="primary" size="small" @click="confirm">确认</el-button>
        <el-button size="small" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showTree: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      ectypeTree: {},
      singleData: {}
    }
  },
  props: {
    showCheck: {
      type: Boolean
    },
    modal: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    showCheck (val) {
      this.ectypeTree = ''
      setTimeout(() => {
        this.getStaffTree()
      }, 0)
    }
  },
  computed: {
    departmentTree () {
      return this.$store.state.basic.departmentTree
    },
    department () {
      return this.$store.state.basic.department
    },
    staff () {
      return this.$store.state.basic.staff
    }
  },
  created () {
    this.getStaffTree()
  },
  methods: {
    getStaffTree () {
      this.ectypeTree = JSON.parse(JSON.stringify(this.departmentTree))
      this.iterator(this.ectypeTree)
    },
    checkStaff (deptId, targetArr) {
      this.staff.forEach((val) => {
        if (+val.deptId === +deptId) {
          targetArr.push({
            name: val.name,
            deptId: val.deptId,
            id: val.uid,
            directLeader: val.directLeader,
            workDuty: val.workDuty,
            iterator: false
          })
        }
      })
    },
    iterator (treeObj) {
      if (treeObj.iterator === false) {
        return
      }
      if (!treeObj.children) {
        treeObj.children = []
      } else {
        // 设置部门禁选
        treeObj.disabled = true
        treeObj.children.forEach((val) => {
          val.disabled = true
        })
      }
      this.checkStaff(treeObj.id, treeObj.children)
      treeObj.children.forEach((val) => {
        this.iterator(val)
      })
    },
    // 确认按钮点击事件
    confirm () {
      if (this.showCheck === true) {
        // 过滤掉部门节点
        let checkedNodes = this.$refs.tree.getCheckedNodes()
        checkedNodes = checkedNodes.filter((val) => {
          return !val.disabled
        })
        this.$emit('addStaff', checkedNodes)
        this.$refs.tree.setCheckedKeys([])
      } else {
        this.$emit('addStaff', this.singleData)
      }
      this.showTree = false
    },
    // 取消按钮点击事件
    cancel () {
      this.$refs.tree.setCheckedKeys([])
      this.showTree = false
    },
    handleClose (done) {
      this.$refs.tree.setCheckedKeys([])
      done()
    },
    triggerComponents () {
      this.showTree = true
    },
    switchStaff (data) {
      if (this.showCheck === false) {
        this.singleData = data
      }
    }
  }
}
</script>
