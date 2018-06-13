<!-- 考勤管理页面 -->
<style lang='less' scoped>
  .director-behavior {
    min-height: 100%;
    background-color: @backGroundColor;
  }
</style>
<template>
  <div class="director-behavior">
    <AttendanceManager></AttendanceManager>
  </div>
</template>

<script>
import AttendanceManager from '@/components/personnel/attendance-management'

export default {
  data () {
    return {

    }
  },

  components: {
    AttendanceManager
  },

  computed: {},
  beforeMount () {
    this.$store.commit('HIDEN_BEHAVIOR_BTN')
  },
  mounted () { },
  destroyed () {
    this.$store.commit('SHOW_BEHAVIOR_BTN')
  },
  methods: {}
}
</script>
