<!--绩效得分计算公式文案-->
<style lang='less' scoped>
.score-formula {
  height: 67px;
  //padding-left: 45px;
  line-height: 67px;
  .formula-com-color {
    color: @fontColor;
  }
  li {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #666666;
    display: inline-block;
  }
}
</style>
<template>
    <div class='score-formula'>
        <li>综合得分</li>
        <li class='formula-com-color'>78.5=</li>
        <li>项目评分</li>
        <li class='formula-com-color'>30</li>
        <li>+</li>
        <li>基本评分</li>
        <li class='formula-com-color'>60.5</li>
        <li>+</li>
        <li>行为规范</li>
        <li class='formula-com-color'>-10</li>
        <li>+</li>
        <li>简报评分</li>
        <li class='formula-com-color'>-30</li>
        <li>+</li>
        <li>技术创新</li>
        <li class='formula-com-color'>10</li>
    </div>

</template>
<script>
export default {

}
</script>
