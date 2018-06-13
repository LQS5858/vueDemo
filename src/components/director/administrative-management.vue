<!-- 考勤管理页面 -->
<style lang='less' scoped>
  .director-behavior {
    min-height: 100%;
    background-color: @backGroundColor;
  }
</style>
<template>
  <div class="director-behavior">
    <AdministrativeManager></AdministrativeManager>
  </div>
</template>

<script>
import AdministrativeManager from '@/components/personnel/administrative-management'

export default {
  data () {
    return {}
  },

  components: {
    AdministrativeManager
  },

  computed: {},

  mounted () {
  },
  beforeMount () {
    this.$store.commit('HIDEN_BEHAVIOR_BTN')
  },
  destroyed () {
    this.$store.commit('SHOW_BEHAVIOR_BTN')
  },
  methods: {}
}
</script>
