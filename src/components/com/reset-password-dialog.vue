<!-- 密码修改dialog -->
<style lang='less'>
  .pwd-btn {
    display: flex;
    justify-content: flex-end;
  }
</style>
<template>
  <div class="password attendance-add-dialog">
    <el-dialog title="修改密码"
               width="360px"
               :show-close="!isMust"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               @close="close"
               :visible="dialogTableVisible">
      <div class="password-input">
        <el-form label-position="top"
                 size="mini"
                 :model="formData"
                 status-icon
                 show-message
                 :rules="rules2"
                 ref="formData"
                 label-width="100px"
                 class="demo-ruleForm">
          <div class="pwd-item">
            <el-form-item label="原密码"
                          size="mini"
                          prop="password">
              <el-input type="password"
                        v-model="formData.password"
                        auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="pwd-item">
            <el-form-item label="新密码"
                          prop="newPassword">
              <el-input type="password"
                        v-model="formData.newPassword"
                        auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="pwd-item">
            <el-form-item label="确认密码"
                          prop="checkPassword">
              <el-input type="password"
                        v-model="formData.checkPassword"
                        auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <div class="pwd-btn">
              <el-button type="primary"
                         size="small"
                         @click="submitForm('formData')">确认
              </el-button>
              <el-button @click="resetForm('formData')"
                         size="small">重置
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false
    },
    isMust: {
      type: Boolean,
      default: false
    }
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formData.checkPassword !== '') {
          this.$refs.formData.validateField('checkPassword')
        }
        callback()
      }
    }
    var validateNewPass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入新密码'))
      } else if (value.length < 6) {
        return callback(new Error('请输入大于6位密码'))
      }
      callback()
    }
    var checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      formData: {
        password: '',
        checkPassword: '',
        newPassword: ''
      },
      rules2: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPassword: [{ validator: checkPassword, trigger: 'blur' }],
        newPassword: [{ validator: validateNewPass, trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  methods: {
    close () {
      this.$emit('close')
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('submit', this.formData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    onClose () {
      this.$emit('submit', false)
    }
  }
}
</script>
