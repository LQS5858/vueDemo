<!--
面包屑公共组件
参数：第一个面包屑数组，第二个标题字符串l
-->
<style lang='less' scoped>
  .tatal-wrap {
    height: 80px;
    width: 100%;
    background-color: @backGroundColor;
    box-shadow: inset 0 -2px 0 0 #dcdae2;
    .crumb-wrap {
      display: flex;
      left: 120px;
      align-items: center;
      height: 30px;
    }
    .com-padding {
      padding-left: 20px;
    }
    .title-select {
      height: 50px;
      display: flex;
      align-items: center;
      position: relative;
      // .el-select {
      //   padding-left: 60px;
      // }

      h1 {
        font-weight: 500;
        line-height: 50px;
        font-size: 16px;
      }
      .select {
        margin-left: 20px;
      }
    }
  }
</style>
<template>
  <div class='tatal-wrap'>
    <slot></slot>
    <div class='crumb-wrap com-padding'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <template v-if="navList.length">
          <el-breadcrumb-item v-for="(item, index) in navList" :key="index">{{item}}
          </el-breadcrumb-item>
        </template>
        <el-breadcrumb-item v-else>首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="title-select com-padding">
      <slot name="backIcon"></slot>
      <h1>{{navList[navList.length-1]?navList[navList.length-1]:'首页'}}
        <slot name="notice-part"></slot>
      </h1>
      <slot v-if="showQuarter" name='is-select'>
        <div class="select">
          <el-select @change="changeQuarter" v-model="quarterValue" placeholder="请选择">
            <el-option v-for="item in quarter" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </slot>
    </div>
    <slot name="operation-log-btn"></slot>
  </div>
</template>

<script>
export default {
  props: {
    showQuarter: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isClass: true,
      quarterValue: 0,
      crumbsData: []
    }
  },
  computed: {
    quarter () {
      return this.$store.state.basic.quarter
    },
    navList () {
      return this.$store.state.common.navList
    }
  },
  watch: {
    quarter (quarter) {
      this.setDefaultQuarter(quarter)
    }
  },
  beforeMount () {
    // 获取路由地址数据
    let queryData = this.$route.query
    for (let val of Object.entries(queryData)) {
      if (val[0] === 'name' || val[0] === 'subname') {
        this.crumbsData.push(val[1])
      }
    }
  },
  methods: {
    changeQuarter (value) {
      this.$store.dispatch('setQuarterId', value)
      this.$emit('callback', value)
    },
    setDefaultQuarter () {
      let value = this.$store.state.common.quarterId
      if (!this.quarterValue && value) this.changeQuarter(value)
      this.quarterValue = value
    }
  },
  mounted () {
    this.setDefaultQuarter()
  }
}
</script>
