<!-- 总分求和组件 -->
<style lang='less' scoped>
.score-formula {
  height: 67px;
  line-height: 67px;
  .composite-scores{
    margin-left: 12px;
  }
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
        <li class="composite-scores">综合得分</li>
        <li class='formula-com-color'>{{count | numToFixed}}=</li>
        <li>项目评分</li>
        <li class='formula-com-color'>{{score.projectScoreCount | numToFixed}}</li>
        <li>+</li>
        <li>基本评分</li>
        <li class='formula-com-color'>{{score.basicsScoreCount | numToFixed}}</li>
        <li>+</li>
        <li>行为规范</li>
        <li class='formula-com-color'>{{score.checkScoreCount | numToFixed}}</li>
        <li>+</li>
        <li>简报评分</li>
        <li class='formula-com-color'>{{score.bulletinCount | numToFixed}}</li>
        <li>+</li>
        <li>技术创新</li>
        <li class='formula-com-color'>{{score.contributionCount | numToFixed}}</li>
    </div>
</template>

<script>
export default {
  props: {
    score: {
      type: Object,
      default () {
        return {
          basicsScoreCount: 0,
          projectScoreCount: 0,
          contributionCount: 0,
          checkScoreCount: 0,
          bulletinCount: 0
        }
      }
    }
  },
  data () {
    return {}
  },

  components: {},

  computed: {
    count () {
      let count = 0
      for (let item in this.score) {
        count += +this.score[item] || 0
      }
      return count
    }
  },

  mounted () {},

  methods: {}
}
</script>
