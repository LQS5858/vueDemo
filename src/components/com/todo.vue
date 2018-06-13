<!-- 待办事项组件-->
<style lang='less' scoped>
  .todo-wrap {
    width: 380px;
    height: 139px;
    background-color: @backGroundColor;
    li {
      list-style-type: none;
    }
    .todo-title {
      font-size: 14px;
      height: 38px;
      display: flex;
      border-bottom: 1px solid @borderColor;
      align-items: center;
      p {
        padding-left: 10px;
      }
    }
    .todo-content {
      display: flex;
      height: 101px;
      flex-direction: row;
      align-items: center;
      .com-font-num {
        font-size: 36px;
      }
      .com-font-content {
        font-size: 12px;
      }

      &-height {
        height: 101px;
      }
      li {
        padding-top: 12px;
      }
      .todo-content-middle {
        text-align: center;
      }
      .todo-com-padding {
        padding: 0 65px 0;
      }
    }
  }
</style>
<template>
  <div class='todo-wrap'>
    <div class="todo-title">
      <p>待办事项</p>
    </div>
    <div class="todo-content">
      <div class="todo-content-height todo-com-padding todo-content-middle">
        <li class='com-font-num'>12</li>
        <li class='com-font-content'> 下属考核</li>
      </div>
      <div class="todo-content-height todo-com-padding todo-content-middle">
        <li class='com-font-num'>5</li>
        <li class='com-font-content'> 项目考核</li>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },

  components: {},

  computed: {},

  mounted () {
  },

  methods: {}
}
</script>