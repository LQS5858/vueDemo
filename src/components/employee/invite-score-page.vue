<!--员工邀请评分页面-->
<style lang='less' scoped>
.star {
  float: left;
  width: 62px;
  height: 62px;
  background-repeat: no-repeat;
  border-radius: 100%;
  margin: 38px 0 38px 40px;
}
// 用户信息样式
.user-wrap {
  border-bottom: 1px solid #a1a1a1;
  margin: 15px 15px 0;
  background-color: white;
  height: 120px;
  .quarter {
    float: right;
    margin: 10px 40px 0 0;
  }
  li {
    display: inline-block;
    list-style-type: none;
    line-height: 120px;
  }
  li.first,
  .two,
  .three {
    font-size: 14px;
    font-weight: 400;
    padding-left: 20px;
  }
  .five,
  .seven {
    padding-left: 20px;
  }
  .four,
  .six {
    font-size: 12px;
    padding-left: 40px;
    font-weight: 400;
    color: #a1a1a1;
  }
}
.table-title-wrap {
  height: 80px;
  background-color: white;
  margin: 0 15px;
  list-style-type: none;
  li {
    display: inline-block;
    margin-top: 55px;
  }
  .first {
    font-size: 14px;
    font-weight: 500;
    padding-left: 40px;
  }
  .com-class {
    padding-left: 20px;
  }
  .two,
  .four,
  .six {
    font-size: 12px;
    font-weight: 400;
    color: #949494;
    padding-left: 40px;
  }
  .eight {
    padding-left: 575px;
  }

  .three,
  .five,
  .seven,
  .nine {
    font-size: 13px;
    font-weight: 14px;
    color: #333333;
  }
}
</style>

<template>
  <div>
    <crumbs></crumbs>
    <div class='user-wrap'>
      <div class='star'><img src="@/assets/images/u18.png" alt=""></div>
      <li class='first'>赵坚强</li>
      <li class='two'>高级产品经理</li>
      <li class='three'>M7</li>
      <li class='four'>部门</li>
      <li class='five'> 南山It中心</li>
      <li class='six'>上级领导</li>
      <li class='seven'>陈大力</li>
      <div class='quarter'>第二季度</div>
    </div>
    <div class='table-title-wrap'>
      <span class='wrapli'>
        <li class='first'>ERP重构</li>
        <li class='two'>负责内容:</li>
        <li class='three'>CRM模块原型设计</li>
        <li class='four'>参与时间:</li>
        <li class='five'>2018.03.02-2018.04.20</li>
        <li class='six'>项目负责人:</li>
        <li class='seven com-class'>李永安</li>
        <li class="eight">邀请人:</li>
        <li class="nine com-class">陈强</li>
      </span>
    </div>
    <!-- 邀请评分公共表格组件 -->
    <invitecom></invitecom>
  </div>
</template>

<script>
import InviteCom from '@/components/com/invite-score-table'
import Userinformation from '@/components/com/user-infomation'
import Crumbs from '@/components/com/crumbs-com'
export default {
  components: {
    invitecom: InviteCom,
    user_information: Userinformation,
    crumbs: Crumbs
  }
}
</script>
