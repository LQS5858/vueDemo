<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  html {
    height: 100%;
    body {
      height: 100%;
      #app {
        height: 100%;
        .app {
          height: 100%;
          .el-header {
            height: 60px;
            /*line-height: 60px;*/
            background: @mainColor;
            color: #ffffff;
            .header {
              height: 60px;
              position: relative;
              .logo-show {
                position: absolute;
                width: 36px;
                height: 36px;
                top: 50%;
                left: 20px;
                transform: translateY(-50%);
                border-radius: 50%;
              }
              .title {
                text-align: left;
                font-size: 24px;
                line-height: 60px;
                font-weight: bold;
                padding-left: 68px;
              }
              .right {
                position: absolute;
                top: 0;
                right: 0;
                .el-icon-caret-top:before {
                  line-height: 60px;
                }
                .el-input {
                  width: 160px;
                  line-height: 60px;
                  float: left;
                  &__inner {
                    height: 36px;
                    width: 160px;
                    border-radius: 18px;
                    border: 2px solid #4d4d4d;
                    background: transparent;
                    color: #f1f1f1;
                  }
                }
                .photo {
                  float: right;
                  margin-left: 40px;
                  cursor: pointer;
                  .pic,
                  .info {
                    display: inline-block;
                  }
                  .pic {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    margin-top: 12px;
                    background: #9595ca url("../../assets/images/avatar.jpg")
                      center/100% 100% no-repeat;
                  }
                  .info {
                    margin: 15px 0 0 8px;
                    .name {
                      line-height: 14px;
                      font-size: 14px;
                      font-weight: 700;
                      color: #fff;
                    }
                    .role {
                      line-height: 12px;
                      font-size: 12px;
                      margin-top: 3px;
                      color: #fff;
                    }
                  }
                  .icon {
                    margin-left: 2px;
                    font-size: 14px;
                    color: #fff;
                    transform: rotate(180deg);
                  }
                }
                .message-num {
                  position: relative;
                  width: 24px;
                  height: 24px;
                  float: left;
                  margin: 18px 0 18px 40px;
                  background: url("../../assets/images/message.svg") center/100%
                  100% no-repeat;
                  &:before {
                    content: "";
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    width: 10px;
                    height: 10px;
                    border-radius: 5px;
                    background: #ffaa00;
                  }
                }
              }
            }
          }
          .el-container {
            height: 100%;
            .el-main {
              padding: 0;
              position: relative;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div class="app">
    <el-container>
      <el-header>
        <div class="header">
          <img src="./user-avatar.png"
               class="logo-show"/>
          <div class="title">绩效管理平台</div>
          <div class="right">
          <!--  <el-input placeholder="按回车键查找"
                      v-model="keyword">
              <i slot="prefix"
                 class="el-input__icon el-icon-search"></i>
            </el-input>-->
            <!--<div class="message-num"></div>-->
            <el-dropdown @command="userOperate">
              <div class="el-dropdown-link">
                <div class="photo">
                  <div class="pic fl"></div>
                  <div class="info fl">
                    <div class="name">{{user.name}}</div>
                    <div class="role">{{user.title}}</div>
                  </div>
                  <div class="icon fl">
                    <i class="el-icon-caret-top"></i>
                  </div>
                </div>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="0">修改密码</el-dropdown-item>
                <el-dropdown-item command="1">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <ResetPwdDialog @submit="modifyPassword"
                            :is-must="isMust"
                            @close="close"
                            :dialogTableVisible="dialogTableVisible"></ResetPwdDialog>
          </div>
        </div>
      </el-header>
      <el-container>
        <side-bar></side-bar>
        <div class="el-main">
          <router-view/>
        </div>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import SideBar from './side-bar'
import ResetPwdDialog from './reset-password-dialog'

export default {
  components: {
    SideBar,
    ResetPwdDialog
  },
  data () {
    return {
      dialogTableVisible: false,
      keyword: '',
      isMust: false
    }
  },
  computed: {
    user () {
      let user = this.$store.state.common.user
      user.photo = 'user-avatar.png'
      user.title = [
        '',
        '中心总监',
        '中心管理层',
        user.workDuty,
        'HR管理员',
        '项目管理员'
      ][user.role]
      return user
    }
  },
  methods: {
    close () {
      this.dialogTableVisible = false
    },
    userOperate (command) {
      switch (command) {
        case '1':
          localStorage.clear()
          this.$router.push('/login')
          break
        case '0':
          this.dialogTableVisible = true
          break
      }
    },
    modifyPassword (formData) {
      if (!formData) {
        this.dialogTableVisible = false
        return
      }
      this.$http({
        url: 'staff/update-password',
        data: {
          password: formData.newPassword,
          oldPassword: formData.password
        }
      }).then(() => {
        this.$message.success('密码修改成功')
        let userInfo = this.$utils.getLocalUser()
        userInfo.isFirstLogin = 0
        this.$store.dispatch('setUser', userInfo)
        this.dialogTableVisible = false
      })
    }
  },
  beforeCreate () {
    this.$store.dispatch('getBasicData')
    this.$store.dispatch('setUser', this.$utils.getLocalUser())
  },
  created () {
    if (this.user.isFirstLogin) {
      this.isMust = true
      this.dialogTableVisible = true
    }
  }
}
</script>
