<template>
  <div
    :class="[
      'login-wrapper',
      ['', 'login-form-right', 'login-form-left'][direction],
    ]"
  >
    <div class="hb">
      <!-- <img src="~@/assets/login_logo.png" id="logo" /> -->
    </div>
    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      class="login-form"
      size="large"
      @keyup.enter.native="doSubmit"
    >
      <!-- <div class="stration"></div> -->

      <div class="stration">
        <p class="str-login">环境监测系统</p>
        <div class="user">
          <el-form-item prop="username">
            <el-input
              placeholder="请输入登录账号"
              v-model="form.username"
              prefix-icon="el-icon-user"
              clearable
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入登录密码"
              v-model="form.password"
              prefix-icon="el-icon-lock"
              show-password
            />
          </el-form-item>
          <el-form-item prop="captcha">
            <div class="login-input-group">
              <el-input
                placeholder="请输入验证码"
                v-model="form.captcha"
                prefix-icon="el-icon-_vercode"
              />
              <img
                v-if="captcha"
                :src="captcha"
                @click="changeCaptcha"
                class="login-captcha"
                alt=""
              />
            </div>
          </el-form-item>
          <div class="el-form-item">
            <el-checkbox v-model="form.remember">记住密码 </el-checkbox>
          </div>
          <!-- <el-link
              @click="$router.push('/forget')"
              type="primary"
              class="ele-pull-right"
              :underline="false">忘记密码
            </el-link> -->
          <div class="el-form-item">
            <el-button
              @click="doSubmit"
              :loading="loading"
              type="primary"
              class="login-btn"
              size="large"
            >
              {{ loading ? "登录中" : "登录" }}
            </el-button>
          </div>
        </div>
      </div>
      <!-- <div class="imgright">
        <img src="~@/assets/framebk.png" alt="" />
      </div> -->
    </el-form>
    <div class="login-copyright">
      Copyright 2010-2020 大佛寺煤矿 版权所有 All Rights Reserved.
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
export default {
  name: "Login",
  data () {
    return {
      // 登录框方向, 0居中, 1居右, 2居左
      direction: 1,
      // 加载状态
      loading: false,
      // 表单数据
      form: {
        username: "",
        password: "",
        captcha: "",
        remember: true,
        key: "",
      },
      // 表单验证规则
      rules: {
        // 表单验证规则
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      captcha: ""
    }
  },
  computed: {
    ...mapGetters(["theme", "user"])
  },
  mounted () {
    this.changeCaptcha()
  },
  methods: {
    ...mapMutations({
      add: "user/set_dept"
    }),

    /* 提交 */
    async doSubmit () {
      /* eslint-disable*/
      const valid = await this.$refs["loginForm"].validate().catch(e => { })
      if (valid) {
        this.loading = true
        /* from  */
        let formData = new FormData()
        for (let key in this.form) {
          formData.append(key, this.form[key])
        }
        const result = await this.$http.post('/login/login', this.form).catch(e => {
          this.loading = false
          this.$message.error("用户名或密码不正确")
        })
        if (!result) return this.loading = false
        this.loading = false
        if (result.data.code === 0) {
          if (this.$setting.userUrl) {
            this.$message({ type: "success", message: "登录成功" })
            // 保存token
            this.$store.dispatch("user/setToken", "Bearer " + result.data.data.access_token).then(() => {
              this.$router.push("/")
            })
            const useInfo = await this.$http.get(this.$setting.userUrl)
            if (useInfo) {
              /* 用户信息 */
              if (useInfo.data.code !== 0) this.$message.error(useInfo.data.msg)
              else {
                // 接口解析
                if (this.$setting.parseUser) {
                  useInfo.data = this.$setting.parseUser(useInfo.data)
                }
                // 
                let user = useInfo.data.data
                // vuex 保存
                this.add(user.dept_id)
                // userDetail
                this.$store.dispatch("user/setUser", user)
                // roles
                this.$store.dispatch(
                  "user/setRoles",
                  user ? user.roles : null
                )
                // token
                this.$store.dispatch(
                  "user/setAuthorities",
                  user ? user.authorities : null
                )
                // 设置节点权限
                this.$store.dispatch(
                  "user/setPermission",
                  user ? user.permissionList : null
                )
              }
              /*  */
            }
          }
        } else {
          // 用户名密码以及验证码输入错误，刷新验证码
          this.$message.error(result.data.msg)
          this.changeCaptcha()
        }
      }
    },
    /* 更换图形验证码 */
    changeCaptcha () {
      this.$http
        .get("/login/captcha")
        .then(res => {
          if (res.data.code === 0) {
            this.captcha = res.data.data.captcha
            this.form.key = res.data.data.key
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(e => {
          this.$message.error(e.message)
        })
    }
  }
};
</script>

<style scoped>
.login-wrapper {
  padding: 50px 20px;
  position: relative;
  box-sizing: border-box;
  background-image: url("~@/assets/login_bg.png");
  /* background-image: url("~@/assets/login_bg.jpg"); */
  background-repeat: no-repeat;
  height: 100vh;
  background-size: 100% 100%;
  background-size: cover;
  overflow: hidden;
}

.login-wrapper:before {
  content: "";
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* .login-form {
  margin: 0 auto;
  width: 40%;
  max-width: 100%;
  padding: 150px 30px 25px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  border-radius: 4px;
  z-index: 2;
} */

.login-form-right .login-form {
  margin: 0 15% 0 auto;
}

.login-form-left .login-form {
  margin: 0 auto 0 15%;
}

.login-form h4 {
  margin: 0 0 25px 0;
}

.login-form > .el-form-item {
  margin-bottom: 25px;
}

.login-input-group {
  display: flex;
  align-items: center;
}

.login-input-group ::v-deep .el-input {
  flex: 1;
}

.login-captcha {
  height: 38px;
  width: 102px;
  margin-left: 10px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  text-align: center;
  cursor: pointer;
}

.login-captcha:hover {
  opacity: 0.75;
}

.login-btn {
  display: block;
  width: 100%;
}

.login-oauth-icon {
  color: #fff;
  padding: 5px;
  margin: 0 10px;
  font-size: 18px;
  border-radius: 50%;
  cursor: pointer;
}

.login-copyright {
  color: #eee;
  padding-top: 20px;
  text-align: center;
  position: relative;
  z-index: 1;
}

@media screen and (min-height: 550px) {
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -220px;
  }

  .login-form-right .login-form,
  .login-form-left .login-form {
    left: auto;
    right: 25%;
    transform: translateX(0);
    margin: -220px 100px auto auto;
  }

  .login-form-left .login-form {
    right: auto;
    left: 25%;
  }

  .login-copyright {
    position: absolute;
    bottom: 20px;
    right: 0;
    left: 0;
  }
}

@media screen and (max-width: 768px) {
  .login-form-right .login-form,
  .login-form-left .login-form {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    margin-right: auto;
  }
}

#title {
  position: relative;
  font-size: 40px;
  margin-top: 0px;
  letter-spacing: 3px;
  font-weight: bold;
  left: 15px;
  height: 70px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 573px;
  float: left;
  display: none1;
}
#logo {
  width: 45%;
  margin-left: 3%;
}
.stration {
  width: 420px;
  height: 480px;
  position: relative;
  left: 300px;
  background-image: url("~@/assets/login_title.png");
}
.str-login {
  font-size: 22px;
  position: relative;
  left: 37%;
  top: 10px;
  color: #fff;
}
.user {
  margin-top: 20%;
  padding: 0 50px;
}
</style>
