<!-- 季度设置最新ui -->
<!-- 奖金设置页面 -->
<style lang='less' scoped>
.wrap {
  height: 100%;
  background-color: @backGroundColor;
  .quarter-setwrap {
    font-family: Arial-BoldMT;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    line-height: 18px;
    background: #f1f1f5;
    height: 32px;
    b {
      line-height: 32px;
    }
  }
}
</style>
<template>
    <div class='wrap'>

        <Crumbs></Crumbs>

        <div class="quarter-search prl">
            <div class='quarter-setwrap'>
                <b>基础设置</b>
            </div>
            <ReviewQuarterSearch>
                <span slot='bonus-search-btn'> </span>
            </ReviewQuarterSearch>
            <ReviewQuarter></ReviewQuarter>

        </div>
    </div>
</template>

<script>
import ReviewQuarter from '@/components/com/review-quarterly-table'
import Crumbs from '@/components/com/crumbs-com'
import ReviewQuarterSearch from '@/components/com/review-quarterly-search'
import QuarterTable from '@/components/com/attendance-table'
export default {
  data () {
    return {}
  },

  components: { ReviewQuarter, Crumbs, ReviewQuarterSearch, QuarterTable },

  computed: {},

  mounted () {},

  methods: {}
}
</script>
