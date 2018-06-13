<!---->
<style lang='less'>
.wrap {
  .element-class {
    width: 100%;
    background-color: @backGroundColor;
  }
}
</style>
<template>
  <div class='wrap'>
    <div class='element-class'>
      <slot></slot>
      <el-table :data="tableData" style="width: calc(100%-40px)">
        <el-table-column label="类目" width='275px' height='41px'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="子权重" width='275px' height='41px'>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.per }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.per }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="项目组评分" width='calc(100%-240px)' height='41px'>
          <template slot-scope="scope">
            <span class='first-select'>
              <el-select v-model="value" placeholder="超预期完成">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </span>
            <span class='second-select '>
              <el-select v-model="value" placeholder="90">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: {
        test: 1
      },
      options: [
        {
          value: 6
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          title: '完成质量',
          name: '<input />',
          address: '上海市普陀区金沙江路 1518 弄',
          per: '50%'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          per: '50%',
          title: '完成质量'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          per: '50%',
          title: '完成质量'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          per: '50%',
          title: '完成质量'
        }
      ]
    }
  }
}
</script>
