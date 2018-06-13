<!--基本评分/行为规范/简报/技术创新组件
 参数：表格标题对象/表格data数组
重写element样式-->
<style lang='less' scoped>
.wrap {
  position: relative;
  width: 100%;
  background-color: @backGroundColor;
  .msg {
    background-color: @backGroundColor;
    width: 100%;
    padding-left: 20px;
    position: absolute;
    z-index: 99;
    height: 47px;
    .item {
      line-height: 47px;
      font-size: 14px;
      color: @linkColor;
    }
  }
  .element-class {
    padding: 10px 20px 0 20px;
  }
}
</style>
<template>
  <div class='wrap'>
    <slot></slot>
    <div class='element-class'>
      <!-- 基本评分表格插件 -->
      <el-table :data="tableData" >
        <el-table-column :prop="item.row"
                         v-for='(item, index) in tableTitle'
                         :key="index"
                         :width="item.width"
                         :formatter="item.format"
                         :label="item.title">
        </el-table-column>
      </el-table>
    </div>
    <slot name='basic-msg'>
      <div class='msg'>
        <el-badge :value='12'
                  class="item">数据查询</el-badge>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  // 参数：表格标题对象/表格data数组
  props: {
    // 表格标题对象
    tableTitle: {
      type: Array,
      default: () => []
    },
    // 表格数据参数
    tableData: {
      type: Array,
      default: () => []
    }
  }
}
</script>
