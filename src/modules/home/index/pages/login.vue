<template>
   <div class="xpt-login">
       <header class="xpt-login-header">
           <p @click="back"><span class="f16"><i class="icon van-icon-zuo-copy"></i>返回</span></p>
       </header>
       <main class="xpt-login-container">
           <div class="container-img bhpt">

           </div>
           <div class="form">
               <van-cell-group>
                    <van-field class="f14" left-icon="yonghuming" v-model="username" placeholder="请输入账号" />
                    <van-field class="f14" autocomplete="false" left-icon="password-copy" type="password" v-model="password" placeholder="密码" />
               </van-cell-group>
               <div class="remember-password">
                    <van-checkbox v-model="checked">永久记住密码</van-checkbox>
               </div>
               <div class="login-btn-box clear">
                   <button class="login-btn" @click="submit">
                       登录
                   </button>
                   <span class="shadown_l"></span>
                   <span class="shadown_r"></span>
               </div>
               <div class="login-footer">
                   <a href="#" class="f14">忘记密码 ？</a>
                   <a href="#" class="f14">注册新账号</a>
               </div>
           </div>
       </main>
   </div>
</template>

<script>
import Vue from 'vue'
import { Toast, Field, Icon, CellGroup, Checkbox } from 'vant'

import login from '@/fetch/login'
Vue.use(Field)
  .use(Icon)
  .use(CellGroup)
  .use(Checkbox)
export default {
  name: 'xpt-login',

  data () {
    return {
      username: '',
      password: '',
      checked: false,
      tel: '0663-12345678'
    }
  },

  methods: {
    back () {
      this.$router.back()
    },
    submit () {
      if (this.username === '' || this.password === '') {
        Toast('用户名或密码不能为空')
        return
      }
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '正在登录中'
      })
      login({
        user: this.username,
        password: this.password,
        free_login: this.checked ? 1 : 0
      }).then(res => {
        if (res.data === 1) {
          toast.message = '登录成功'
          toast.type = 'success'
          setTimeout(() => {
            toast.clear()
            if (process.env.NODE_ENV === 'development') {
              this.$cookie.set('PHPSESSID', 'PHPSESSID-development')
            }
            this.$router.replace('/index')
          }, 500)
        } else if (res.data === 2) {
          Toast('    抱歉，您的帐号尚未激活，请联系客服处理:' + this.tel)
        } else {
          Toast('用户名密码错误，请重新输入')
        }
      })
    }
  }
}
</script>

<style lang="less">
@import "../../../common/less/vars.less";
.xpt-login {
  height: 100%;
  width: 100%;
  background-color: @bgColor;
  .xpt-login-header {
    width: 0.6rem;
    height: 0.45rem;
    line-height: 0.45rem;
    color: #999;
    text-align: center;
  }
  .container-img {
    height: 2rem;
    width: 80%;
    margin: 30px auto 40px;
    background: url(http://xpt.m.gzjztw.com/picture/app/login/full_logo.jpg)
      center center no-repeat;
    background-size: contain;
    position: relative;
  }
  .bhpt::after {
    content: " ";
    background: url(http://xpt.m.gzjztw.com/picture/app/login/full_logo_i.jpg);
    background-size: 100%;
    width: 50px;
    height: 26px;
    display: block;
    position: absolute;
    right: 0;
    top: -10px;
  }
  .remember-password {
    padding: 0.1rem 0.2rem;
    span {
      font-size: 0.14rem;
      color: #999;
      line-height: 1;
    }
  }
  .login-btn-box {
    margin: 20px 20px 0 20px;
    .login-btn {
      height: 0.5rem;
      line-height: 0.5rem;
      background-color: #00c58d;
      letter-spacing: 0.02rem;
      width: 100%;
      border: 0;
      font-size: 0.24rem;
      color: #fff;
    }
  }
  .login-footer {
    color: #666;
    .layout(row);
    justify-content: space-between;
    padding: 0 0.2rem;
  }
  .shadown_l,
  .shadown_r {
    width: 50%;
    display: block;
    height: 20px;
    float: left;
    background: url(http://xpt.gzjztw.com/picture/app/login/shadow_l.png)
      no-repeat left bottom;
    background-size: auto 20px;
  }
  .shadown_r {
    background: url(http://xpt.gzjztw.com/picture/app/login/shadow_r.png)
      no-repeat right bottom;
    background-size: auto 20px;
  }
  .van-icon {
    color: #ccc;
  }
}
</style>
