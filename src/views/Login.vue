<template>
  <div class="login-container">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="grid-content bg-purple">
        left
      </div>
      </el-col>
      <el-col :span="2">
        <el-divider direction="vertical"></el-divider>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple login-form">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="用户名" prop="username" class="login-label" style="margin-top: 20px" >
              <el-input v-model="form.username" placeholder="username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" class="login-label">
              <el-input v-model="form.password" placeholder="password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code" class="login-label">
              <el-input v-model="form.code" placeholder="code" style="width: 160px; float: left"></el-input>
              <el-image :src="kaptcha" @click="getKaptchaImg"
              style="width: 125px; margin-left: 15px; border-radius: 4px"></el-image>
            </el-form-item>
            <el-form-item prop="enter" style="width: 380px">
              <el-button type="primary" @click="onSubmit" @keyup.enter.native="onSubmit"
              style="margin-top: 10px; margin-right: 60px; width: 260px">登录</el-button>
            </el-form-item>
            <el-form-item>
              <a @click="resetPassword" class="reset-pass">忘记密码?点击重置</a>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getKaptcha, login} from "@/api/authentication";
import router from "@/router";

export default {
  name: "Login",
  data(){
    return {
      form: {
        username: '',
        password: '',
        code: '',
        key: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      },
      kaptcha: ''
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
            login(this.form).then(res => {
              if(res.data.code === '200'){
                localStorage.setItem("token", res.data.data.token)
                localStorage.setItem("username",res.data.data.info.username)
                router.push('/home')
              }else {
                this.resetForm()
                this.$message.error(res.data.message)
              }
            }).catch((e) => {})
        } else {
          this.getKaptchaImg()
          return false
        }
      });
    },
    getKaptchaImg() {
      getKaptcha().then(res => {
        this.form.code = ''
        this.form.key = res.data.data.key
        this.kaptcha = res.data.data.kaptcha
      })
    },
    resetPassword() {
      console.log("clicked!")
    },
    resetForm(){
      this.getKaptchaImg()
      this.form.username = ''
      this.form.password = ''
      this.form.code = ''
    }
  },
  activated() {
    this.resetForm()
  },
  created() {
    this.$store.commit('clearIndexStore')
    this.getKaptchaImg()
  }
}
</script>

<style scoped>
.login-container{
  height: 100%;
  width: 100%;
  background-image: url(~@/assets/img/login_bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 0;
}
.login-form{
  background-color: #faf4f0;
  opacity: 90%;
  width: 400px;
  height: 320px;
  border: solid 1px #faf4f0;
  border-radius: 20px;
}
.login-label{
  width: 380px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.reset-pass{
  font-size: 12px;
  margin-left: 180px;
  margin-bottom:20px;
  padding: 5px;
  text-decoration: none;
  color: black;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.el-row {
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  /*background-color: #fafafa;*/
}
.el-divider {
  height: 400px;
}
</style>
