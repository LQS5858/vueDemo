<!-- 考勤搜索组件 -->
<style lang='less' scoped>
.attendance-tab-title-wrap {
  width: 100%;
  height: 84px;
  background-color: @backGroundColor;
  display: flex;
  flex-direction: row;
  align-items: center;
  // background: rgba(255, 255, 255, 0);
  box-shadow: 0 1px 0 0 #dcdae2;
  .left-input,
  .middle-select {
    width: 200px;
    height: 52px;
  }
  .left-input {
    .com-margin-fl();
  }
  .middle-select {
    .com-margin-fl(@mr:16px);
  }
  .attendance-btn {
    width: 68px;
    height: 32px;
    margin-top: 26px;
  }
  .com-padding-top {
    padding-bottom: 6px;
    font-size: 12px;
  }
  .com-margin-fl(@mr:8px,@mb:0) {
    margin: 0 @mr @mb 0;
  }
}
</style>
<template>

  <div class='attendance-tab-title-wrap'>
    <slot name='filter'>
      <div class="left-input">
        <p class='com-padding-top'>{{quarterTitle.name}}</p>
        <el-input v-model="filter.name"
                  placeholder="请输入内容"></el-input>
      </div>
      <div class="middle-select">
        <p class='com-padding-top'>{{quarterTitle.state}}</p>
        <dept-tree :value="filter.dept"
                   @select="onSelect"></dept-tree>
      </div>
    </slot>
    <slot name="attendance-btn">
      <div class="attendance-btn">
        <el-button class='iconfont icon-sousuo'
                   @click="onSearch"
                   type="primary">查询</el-button>
      </div>
    </slot>

  </div>

</template>

<script>
import deptTree from './dept-tree'

export default {
  data () {
    return {
      filter: {
        name: '',
        dept: this.dept
      }
    }
  },
  props: {
    quarterTitle: {
      type: Object,
      default () {
        return {
          name: '姓名', state: '部门'
        }
      }
    },
    dept: {
      type: Object,
      default () {
        return {
          id: 1001,
          name: 'IT中心'
        }
      }
    }
  },
  components: {
    deptTree
  },
  computed: {},
  methods: {
    onSelect (obj) {
      this.deptVal = obj
      this.filter.dept = obj
    },
    onSearch () {
      this.$emit('search', this.filter)
    }
  },
  mounted () { }
}
</script>
