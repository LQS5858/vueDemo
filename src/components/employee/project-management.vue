<!--项目管理页-->
<style lang="less" scoped>
  .employee-management {
    min-height: 100%;
    background-color: @backGroundColor;
  }
</style>
<template>
  <div class="employee-management">
    <ProjectManagement></ProjectManagement>
  </div>
</template>

<script>
import ProjectManagement from '@/components/program-ex/manage-project'

export default {
  components: {ProjectManagement}
}
</script>
