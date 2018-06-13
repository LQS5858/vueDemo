<!-- 考核管理操作日志-->
<style lang='less' scoped>
  @border: #42b0f4;
  .log-wrap {
    position: absolute;
    top: 80px;
    bottom: 0;
    right: 0;
    width: 242px;
    background-color: white;
    box-shadow: 0 2px 20px #ccc;
    z-index: 99;
    .log-header {
      height: 50px;
      line-height: 50px;
      align-items: center;
      padding-left: 16px;
      font-size: 16px;
      border-bottom: 1px solid #dddddd;
      overflow: hidden;
      .log-header-title {
        float: left;
        font-weight: bold;
      }
      .log-icon {
        float: right;
        margin: 16px;
        cursor: pointer;
      }
    }
    .log-main {
      position: absolute;
      top: 50px;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-y: auto;
    }
  }
  .audit-log {
    margin: 20px 0 0 20px;
    .audit-log-list {
      position: relative;
      padding: 2px 20px 25px;
      border-left: 2px solid @border;
      &:before {
        position: absolute;
        left: -5px;
        top: 0;
        content: '.';
        width: 8px;
        height: 8px;
        background-color: #ffffff;
        border-radius: 50%;
        border: 2px solid @border;
        text-indent: -999rem;
        overflow: hidden;
        line-height: 1.2;
      }
      &:first-child {
        &:before {
          top: 0;
          left: -6px;
          width: 10px;
          height: 10px;
          background-color: @border;
        }
      }
      &:last-child {
        border-left-color: transparent;
      }
      .audit-log-time {
        margin-top: -4px;
        color: #999999;
        font-size: 12px;
        line-height: 1;
      }
      .audit-log-content {
        margin-top: 6px;
        color: #333333;
        .name {
          color: @linkColor;
        }
      }
      .audit-log-remark {
        margin-top: 10px;
      }
      .audit-log-remark-title {
        color: #ff5455;
      }
    }
  }
</style>

<style lang='less'>
.audit-log-content {
  .name {
    color: @linkColor;
  }
}
</style>

<template>
  <div class="log-wrap">
    <div class="log-header">
      <div class="log-header-title">操作日志</div>
      <div class="icon el-icon-close log-icon"
           @click="closeOperationLog">
      </div>
    </div>
    <div class="log-main">

      <div class="audit-log">
        <div class="audit-log-list"
             v-for="(item, index) of newDeptLogs"
             :key="index">
          <div class="audit-log-time">{{getDate(item.createTime)}}</div>
          <div class="audit-log-content" v-html="getDesc(item)"></div>
          <div class="audit-log-remark" v-if="item.remark && item.scoreStatus === 3">
            <div class="audit-log-remark-title">驳回原因</div>
            <div class="audit-log-remark-content">{{item.remark}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: ['stepActive', 'deptLogs'],
  data () {
    return {
      newDeptLogs: '',
      activeClass: 'iconfont icon-yuan',
      deactivation: 'iconfont icon-yuan1'
    }
  },

  components: {},

  computed: {
    staff () {
      return this.$store.state.basic.staff
    },
    department () {
      return this.$store.state.basic.department
    },
    user () {
      return this.$store.state.common.user
    }
  },
  watch: {
    deptLogs: function (val) {
      this.newDeptLogs = val
    }
  },
  methods: {
    getDate (datetime) {
      let date = this.$options.filters.date(datetime, 'YYYY-MM-DD HH:mm:ss')
      let currentDate = this.$options.filters.date(new Date(), 'YYYY-MM-DD')
      let dateArr = date.split(' ')
      if (currentDate === dateArr[0]) {
        return `今天 ${dateArr[1]}`
      } else {
        return date
      }
    },
    getName (id) {
      if (id === this.user.uid) {
        return '我'
      }
      let staffInfo = this.$options.filters.getValueById(id, this.staff, 'uid')
      return `${staffInfo.workDuty} ${staffInfo.name}`
    },
    getDesc (item) {
      let desc = `<span class="name">${this.getName(item.staffUUID)}</span> `
      switch (item.scoreStatus) {
        case 2:
          desc += `提交考核申请`
          break
        case 3:
          desc += `驳回了${this.$options.filters.getValueById(item.deptId, this.department, 'id', 'name')}的绩效考核申请`
          break
        case 4:
          desc += `通过了${this.$options.filters.getValueById(item.deptId, this.department, 'id', 'name')}的绩效考核申请`
          break
      }
      return desc
    },
    closeOperationLog () {
      this.$emit('closeOperationLog')
    }
  }
}

</script>
