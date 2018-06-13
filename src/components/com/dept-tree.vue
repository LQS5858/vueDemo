<!-- 部门树选择 -->
<style lang='less' scoped>
</style>
<template>
  <div class='dept-tree'>
    <div data-v-6192ddfd=""
         class="el-select"
         @click="showTree = true">
      <div class="el-input el-input--suffix">
        <input type="text"
               autocomplete="off"
               placeholder="请选择"
               :value="selectValue.name"
               readonly="readonly"
               class="el-input__inner">
        <span class="el-input__suffix">
          <span class="el-input__suffix-inner">
            <i class="el-select__caret el-input__icon el-icon-arrow-up"></i>
          </span>
        </span>
      </div>
    </div>
    <el-dialog title="部门选择"
               :modal="modal"
               :visible.sync="showTree"
               width="30%">
      <el-tree :data="[treeData]"
               :props="defaultProps"
               accordion
               node-key="id"
               :default-expand-all="true"
               ref="tree"
               highlight-current
               @node-click="onSelectDept">
      </el-tree>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    },
    select: {
      type: Function,
      default () {
      }
    },
    modal: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      showTree: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectValue: this.value
    }
  },
  computed: {
    treeData () {
      return this.$store.state.basic.departmentTree
    }
  },
  components: {},
  methods: {
    onSelectDept (obj, node, self) {
      this.selectValue = obj
      this.showTree = false
      this.$emit('select', obj)
    }
  },
  mounted () {
  }
}
</script>
