<!--
用户信息基本信息展示组件
-->
<style lang='less' scoped>
.user-msg-wrap {
  height: 196px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #ffffff;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.05);
  .user-left {
    display: flex;
    align-items: center;
    .left-user-msg {
      padding-left: 20px;
    }
    width: 50%;
    list-style-type: none;
    .sec-dept {
      li.superior-leader {
        padding-left: 60px;
      }
      li.address,
      li.leader-name {
        padding-left: 8px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
      }
      padding: 10px 0 0 15px;
      li {
        display: inline-block;
      }
      li.dept,
      li.superior-leader {
        color: #a1a1a1;
        font-family: PingFangSC-Regular;
        font-size: @fontSize;
        color: #999999;
        letter-spacing: 0;
      }
    }
    li.name,
    li.job,
    li.level {
      display: inline-block;
      font-size: 14px;
      font-weight: 400;
    }
    li.job,
    li.level {
      padding: 0 20px;
      font-family: PingFangSC-Regular;
      font-size: 18px;
      color: #333333;
      letter-spacing: 0;
    }
    li.name {
      padding-left: 15px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #333333;
      letter-spacing: 0;
    }
    #star {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #e0e0e0;
      width: 120px;
      height: 120px;
      border-radius: 100%;
      margin: 38px 0 38px 40px;
    }
  }
  .user-rigt {
    list-style-type: none;
    width: 50%;
    position: relative;
    div.performanceli {
      height: 121px;
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      padding-left: 20px;
      border-left: 1px solid #e0e0e0;
      li {
        display: inline-block;
      }
      .performance-mid-detail {
        font-family: SFProText-Regular;
        margin: 26px 0 12px;
        letter-spacing: 0;
        line-height: 36px;
        .performance-level {
          font-size: 40px;
        }
        .performance-score {
          font-size: 36px;
          color: #f5a623;
        }
        li:not(:last-child) {
          margin: 0 240px 0 106px;
        }
      }
      .grading-state {
        color: #ff6969;
        margin-left: 16px;
      }
      .performance-level-com {
        font-family: PingFangSC-Regular;
        font-size: @fontSize;
        color: #999999;
        letter-spacing: 0;
        line-height: 14px;

        li:not(:last-child) {
          margin: 0 203px 0 106px;
        }
      }
      .com-font {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        letter-spacing: 0;
        color: #333333;
      }
    }
  }
}
</style>
<template>
  <div class="user-msg-wrap">
    <slot name="sco-slot"></slot>
    <div class="user-left">
      <div id="star"><img src="@/assets/images/u18.png" alt=""></div>
      <div class="left-user-msg">
        <li class="name">{{user.name}}</li>
        <li class="job">{{user.workDuty}}</li>
        <div class="sec-dept">
          <li class="dept">部门</li>
          <li class="address">{{+user.deptId | getValueById(department, 'id', 'name')}}</li>
          <li class="superior-leader">上级领导</li>
          <li class="leader-name">{{user.directLeader | getValueById(staff, 'uid', 'name')}}</li>
        </div>
      </div>
    </div>
    <div class="user-rigt">
      <div class="performanceli">
        <div class="performance-result com-font">
          <li class="search-ruslt">绩效结果</li>
          <li class="grading-state">{{scoreStatus[score.status]}}</li>
        </div>
        <div class="performance-mid-detail">
          <li class="performance-level">{{scoreLevel}}</li>
          <li class='performance-score'>{{score.performanceScore || '-'}}</li>
        </div>
        <div class="performance-bottom-level performance-level-com">
          <li>绩效等级</li>
          <li>绩效得分</li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    user: {
      type: Object,
      default () {
        return {
          id: '',
          name: '',
          deptId: '',
          applyDuty: '',
          directLeader: '',
          entryDate: '',
          jobNumber: '',
          photo: '',
          qq: '',
          roleId: '',
          sex: '',
          status: '',
          uid: '',
          workDuty: ''
        }
      }
    },
    score: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      scoreStatus: {
        1: '未评分',
        2: '评分中'
      }
    }
  },
  computed: {
    staff () {
      return this.$store.state.basic.staff
    },
    department () {
      return this.$store.state.basic.department
    },
    scoreLevel () {
      let val = '-'
      if (this.score.performanceScore) {
        this.$store.state.basic.scoreLevel.map(item => {
          if (this.score.performanceScore < item.maxScore && this.score.performanceScore > item.minScore) {
            val = item.name
          }
        })
      }
      return val
    }
  }
}
</script>
