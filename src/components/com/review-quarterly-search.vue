<!-- 考核季度新建编辑组件 -->
<style lang='less' scoped>
.wrap-quarter {
  height: 84px;
  width: 100%;
  position: relative;
  background-color: @backGroundColor;
  box-shadow: 0 1px 0 0 #dcdae2;
  display: flex;
  font-family: ArialMT;
  margin-bottom: 1px ;
  p {
    padding-bottom: 6px;
    font-size: 12px;
    color: #333333;
    line-height: 12px;
  }

  .select,
  .quarter-input {
    height: 52px;
    width: 200px;
    .com-mg();
  }
  .quarter-btn {
    height: 32px;
    width: 68px;
    .com-mg(@mt:36px, @mr:0);
  }
}
// 混合
.com-pg(@mb:16px,@ml:12px) {
  padding: 0 0 @mb @ml;
}
.com-mg(@mt:16px,@mr:12px) {
  margin: @mt @mr 0 0;
}
</style>
<template>

  <div class="wrap-quarter">
    <div class="select">
      <p>考核季度</p>
      <el-select @change="changeQuarter"
                 v-model="quarterValue"
                 placeholder="请选择">
        <el-option v-for="item in quarter"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
    </div>
    <slot name='bonus-input'>
      <div class="quarter-input">
        <p>季度奖金(万元)</p>
        <el-input placeholder="请输入内容"
                  v-model="input10"
                  clearable>
        </el-input>
      </div>
    </slot>
    <slot name='bonus-search-btn'>
      <div class="quarter-btn">
        <el-button class='iconfont icon-sousuo'
                   type="primary">查询</el-button>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      input10: '',
      isClass: true,
      quarterValue: 1,
      crumbsData: []
    }
  },
  computed: {
    quarter () {
      return this.$store.state.basic.quarter
    },
    quarterId () {
      return this.$store.state.common.quarterId
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
    }
  },
  created () {
    this.quarterValue = this.quarterId
  }
}
</script>
