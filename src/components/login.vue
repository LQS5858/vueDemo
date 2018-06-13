<style lang="less" scoped>
  .page-login {
    min-height: 100%;
    background: #352959 url("../assets/images/login.jpg") no-repeat 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    .bottom-instructions {
      opacity: 0.8;
      position: absolute;
      bottom: 51px;
      font-family: PingFangSC-Regular;
      font-size: @fontSize;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .group-top {
        li:not(:last-child) {
          .com-mlr(@pl:0, @pr:38px, @pb:0, @pt:0);
        }
      }
      li {
        list-style-type: none;
        display: inline-block;
      }
    }
    .titele-content {
      font-family: PingFangSC-Medium;
      font-size: 36px;
      color: #ffffff;
      letter-spacing: 0;
      top: 160px;
      text-align: center;
    }
    .content {
      // position: absolute;
      border-radius: 4px;
      margin-top: 70px;
      // top: 50%;
      // left: 50%;
      width: 472px;
      height: 429px;
      // /*transform: translate(-50%, -50%);*/
      // margin-top: -200px;
      // margin-left: -15%;
      background-color: @backGroundColor;

      // padding: 40px;
      /*
      h3 {
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;
        margin-bottom: 20px;
        text-align: center;
      }
      */
      .longin-title {
        font-family: PingFangSC-Medium;
        font-size: @fontSize+10;
        color: #7352bf;
        .com-plr();
      }
      .news {
        width: 70px;
        margin-top: 5px;
        font-size: 24px;
        padding-right: 10px;
        text-align: right;
      }
      .input-login {
        .com-mlr(@pl:61px, @pr:61px,@pt:0,@pb:0);
        .auto-login {
          .com-mlr(@pl:0, @pr:0, @pb:32px, @pt:12px);
          font-family: PingFangSC-Regular;
          font-size: @fontSize;
        }
        .btn-login {
          .com-mlr(@pl:0, @pr:0, @pb:72px, @pt:0);
          display: flex;
          justify-content: center;
        }
      }
    }
    // 混合函数
    .com-mlr(@pl: 61px,@pr:0,@pb:32px, @pt: 64px) {
      margin: @pt @pr @pb @pl;
    }
    .com-plr(@pl: 61px,@pr:0,@pb:32px, @pt: 64px) {
      padding: @pt @pr @pb @pl
    }
  }
</style>
<template>
  <div class="page-login">
    <div class="login">logi
      <p class='titele-content'>KYE绩效管理平台</p>
      <div class="content">
        <!-- <p>KYE绩效管理平台</p> -->
        <p class='longin-title'>登录</p>
        <div class="input-login">
          <el-form :model="form"
                   :rules="rules"
                   label-width="70px"
                   ref="loginForm">
            <!-- <el-form-item label="用户名" prop="number"> -->
            <el-input v-model="form.number"
                      placeholder="请输入用户名"
                      :maxlength="11">
              <i slot="prefix"
                 class='iconfont icon-login-user'>
              </i>
            </el-input>
            <!-- </el-form-item> -->
            <!-- <el-form-item label="密码" prop="password"> -->

            <el-input v-model="form.password"
                      type="password"
                      placeholder="请输入密码"
                      :maxlength="20">
              <i slot="prefix"
                 class='iconfont icon-mima1'>
              </i>
            </el-input>
            <!-- </el-form-item> -->
            <div class="auto-login">
              <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
            </div>
            <div class='btn-login'>
              <i class="el-icon-news news"
                 @click="show = true"></i>
              <el-button type="primary"
                         @click="handleLogin">登录
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog title="选择账号"
               :visible.sync="show"
               width="500px">
      <el-table :data="accountList">
        <el-table-column property="type"
                         label="角色"></el-table-column>
        <el-table-column property="number"
                         label="账号"></el-table-column>
        <el-table-column label="操作"
                         width="65">
          <template slot-scope="scope">
            <el-button type="text"
                       class="btn-text"
                       @click="selectAccount(scope.row)">选用
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <div class="bottom-instructions">
      <div class="group-top">
        <li>帮助</li>
        <li>隐私</li>
        <li>条款</li>
      </div>
      <!--<div class="group-bottom">-->
      <!--<li>Copyright</li>-->
      <!--<li>©</li>-->
      <!--<li>跨越速运UED出品</li>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      autoLogin: false,
      accountList: [
        {
          type: '中心总监',
          number: '086484',
          password: '123456'
        },
        {
          type: '中心管理层',
          number: '089933',
          password: '123456'
        },
        {
          type: '普通职员',
          number: '097117',
          password: '123456'
        },
        {
          type: 'HR',
          number: '088505',
          password: '123456'
        },
        {
          type: '项目专员',
          number: '097668',
          password: '123456'
        }
      ],
      form: {
        number: '086484',
        password: '123456',
        type: ''
      },
      rules: {
        number: [
          {required: true, message: '用户名不能为空', trigger: 'change'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.$http.post('session', this.form).then(rs => {
            if (rs.code === 200) {
              localStorage.setItem('token', rs.data.token)
              localStorage.setItem('user', JSON.stringify(rs.data.info))
              // 初始化面包屑组件
              this.$store.dispatch('setNavList', ['首页'])
              location.replace('/index')
            } else {
              this.$message({
                message: rs.msg,
                type: 'warning'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    selectAccount (row) {
      this.show = false
      this.form = row
    }
  }
}
</script>
