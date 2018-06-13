<style lang="less" scoped>
  .container{
    height: 50px;
    background: #fff;
    vertical-align: middle;
    font-size: 0;
    position: relative;
    .get-more{
      position:absolute;
      right: 20px;
      top:50%;
      transform: translateY(-50%);
      font-size: 12px;
      color: #9875EA;
      cursor: pointer;
    }
    .title{
      float:left;
      height:100%;
      line-height: 50px;
      font-size: 16px;
      color: #333333;
      margin-left: 20px;
    }
    .sub-title{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height:100%;
      font-size: 14px;
      color: #666666;
      padding-left: 20px;
      .sub-data{
        font-size: 24px;
        color: #F5A623;
        margin-left: 12px;
      }
    }
  }
</style>
<template>
  <div class="container">
    <router-link :to="navData.path || ''" class="get-more" v-show="navData.showMore">更多&nbsp;&nbsp;&gt;</router-link>
    <span class="title">{{navData.title}}</span>
    <span class="sub-title"><span class="sub-name">{{navData.subTitle}}</span> <span class="sub-data">{{navData.number}}</span></span>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    navData: {
      type: Object,
      required: true,
      default: () => {
        return {
          title: '绩效状况',
          isSubTitleShow: true,
          subTitle: '已审核人数',
          number: 33,
          showMore: false,
          path: ''
        }
      }
    }
  }
}
</script>
