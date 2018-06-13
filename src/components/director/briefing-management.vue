<!-- 考勤管理页面 -->
<style lang='less' scoped>
  .director-behavior {
    min-height: 100%;
    background-color: @backGroundColor;
  }
</style>
<template>
  <div class="director-behavior">
    <BriefingManager></BriefingManager>
  </div>
</template>

<script>
import BriefingManager from '@/components/personnel/briefing-management'

export default {
  data () {
    return {

    }
  },

  components: {
    BriefingManager
  },

  computed: {},

  mounted () { },
  beforeMount () {
    this.$store.commit('HIDEN_BEHAVIOR_BTN')
  },
  destroyed () {
    this.$store.commit('SHOW_BEHAVIOR_BTN')
  },
  methods: {}
}
</script>
