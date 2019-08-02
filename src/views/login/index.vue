<template>
  <div class='container'>
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt="">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号">
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:236px;margin-right:10px"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
         <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
         <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        <el-form-item>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 申明校验函数 在return之前定义
    const checkMobile = (rulu, value, callback) => {
      // 校验手机号 1开头 第二为3-9 9位数字
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机号格式不对'))
      callback()
    }
    return {
      // 表单对象数据
      loginForm: {
        mobile: '18734397452',
        code: '246810'
      },
      // 表单校验规则数据
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }

        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { length: 6, message: '长度是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // console.log('校验success')
          // 请求登录接口
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(res => {
              console.log(res.data)
              this.$router.push('/')
            })
            .catch(() => {
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container{
  position: absolute;
  width: 100%;
  height: 100%;
  // 背景图定位 / 背景图尺寸 contain 等比缩放完整在容器内显示  cover  等比缩放完全铺面容器
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover
}
.my-card{
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-60%);
  img{
    display: block;
    width: 200px;
    margin: 0 auto 30px;
  }
}
</style>
