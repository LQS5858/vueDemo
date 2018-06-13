<!--项目评分组件表格标题组件-->
<style lang='less' scoped>
  .pro-score-header {
    // height: 60px;
    padding-left: 21px;
    background-color: @backGroundColor;
    .composite-scores-wrap {
      line-height: 32px;
      height: 32px;
      border-radius: 4px;
      span {
        display: inline-block;
      }
      .score-weight-com {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
      }
      .self-color {
        color: #f5a623 !important;
      }
      .per-score-com {
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #23aef5;
        margin: 0 50px 0 12px;
      }
    }
    .content-score {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      border-radius: 4px;
      height: 50px;
      line-height: 50px;
      .more {
        float: right;
        margin-right: 20px;
        /*z-index:99;*/
      }
      .link {
        list-style-type: none;
        display: inline-block;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #9875EA;
        text-align: right;
      }
    }
  }
</style>
<template>
  <div class="pro-score-header">
    <div class='content-score'>{{title}}
      <!-- 插槽接受父组件html内容参数 -->
      <slot></slot>
      <slot name="moreTitle">
        <div class="more" v-show="path">
          <router-link class="link" :to="path">更多<i class="el-icon-arrow-right"></i></router-link>
        </div>
      </slot>
    </div>
    <!-- 具名插槽决定下面是否显示 -->
    <slot name='composite-scores-wrap'>
      <div class='composite-scores-wrap'>
        <span class='score-weight-com'>综合得分</span>
        <span class='per-score-com self-color'>90</span>
        <span class='score-weight-com'> 权重</span>
        <span class='per-score-com'>50%</span>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '项目评分'
    }

  }
}
</script>
