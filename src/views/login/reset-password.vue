<template style="height:100%">
  <div id="password">
    <div class="password_con">
      <div class="password_bg">
        <div class="password_box">
          <div class="password_title">重置密码</div>
          <div class="password_status">
            <!-- 验证身份 -->
            <img src="@/assets/images/login/step1.png" class="password_setstatus" v-if="step == 1">
            <!-- 设置新密码 -->
            <img src="@/assets/images/login/step2.png" class="password_setstatus" v-else-if="step == 2">
            <!-- 修改成功 -->
            <img src="@/assets/images/login/step3.png" class="password_setstatus" v-else>

            <div class="password_text">
              <div class="verify">验证身份</div>
              <div :class="step >= 2 ?'setpassword':'setpasswordColor'">设置新密码</div>
              <div :class="step>= 3 ? 'alter':'alterColor'">修改成功</div>
            </div>
          </div>

          <div class="password_verify" v-if="step == 1">
            <div class="password_phone">
              <el-input type="text" placeholder="手机号" v-model="phone" clearable></el-input>
            </div>
            <div class="password_code">
              <el-input type="text" placeholder="短信验证码" v-model="code" clearable></el-input>
              <span class="line"></span>
              <span @click="getCode" v-if="times == 60">获取验证码</span>
              <span v-else>{{times}}s</span>
            </div>
          </div>

          <div class="password_setpassword" v-else-if="step == 2">
            <div class="set_newpassword">
              <el-input type="password" placeholder="设置新密码 至少两种字符组合" v-model="newPassword1" clearable></el-input>
            </div>
            <div class="repeat_password">
              <el-input type="password" placeholder="请再次输入密码" v-model="newPassword2" clearable></el-input>
            </div>
          </div>

          <div class="set_success" v-else>
            <img src="@/assets/images/login/success.png" class="password_success">
            <div class="password_tip">恭喜您新的登录密码已设置成功！</div>
            <div class="password_tips">请一定要牢记哦，
              <router-link to="/">
                <a href="javascript:;">点击此处</a>
              </router-link>
              ，立即返回登录界面
              <span>3秒钟后，自动返回</span>
            </div>
          </div>

          <div class="password_submit" v-if="step <= 2" @click="submit">提交</div>
        </div>
      </div>
    </div>
    <div class="password_page">
      <div class="password_bottom">
        <div class="aboutUs">
          <span v-for="(item,index) in footerList" :key="item.id" >
            <router-link :to="{path:'/epidemicAbout',query:{id:item.id}}">
            <span>{{item.title}}</span>
          </router-link>
          <i v-if="index != footerList.length-1">|</i>
          </span>
        </div>
        <div class="footerText" v-html="dictionaryText"></div>
        <div class="indexText"><span> 地　　址  ：</span>北京市东直门内南小街16号<span>电　　话：</span>010-58130660<span>邮　　编：</span>10070
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import "@static/css/login/reset-password.less"
  import Cookies from 'js-cookie';
  import {phoneAPI, checkPhoneAPI, passwordAPI} from '@/api/login/reset';
  import {footerAPI, dictionaryAPI} from '@/api/common';
  import md5 from 'js-md5';

  var timerInterval = null;
  export default {
    name: 'password',
    data() {
      return {
        step: 1,
        times: 60,
        phone: null,
        code: null,
        newPassword1: null,
        newPassword2: null,
        footerList: [],
        footerQuery: {
          pageNum: 1,
          pageSize: 4
        },
        dictionaryText: null,
      }
    },
    created() {
      if (Cookies.get('resetStep')) {
        this.step = Cookies.get('resetStep')
      }
      this.getFooter();
      this.getdictionary();
    },
    destroyed() {
      Cookies.remove('resetStep')
      Cookies.remove('editPhone')
    },
    methods: {
      getCode() {//获取短信验证码
        let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
        if (!regs.test(this.phone)) {
          this.$message.error('请输入正确的手机号')
        } else {//获取验证码
          phoneAPI({phone: this.phone}).then(res => {
            if (res.data.code > 0) {
              this.$message.warning(res.data.msg)
            } else if (res.data.code < 0) {
              this.$message.error('发送失败，请稍后再试')
            } else if (res.data.code == 0) {
              this.$message.success('发送成功，请注意查收')
              this.timesDown()
            }
          })
        }
      },
      timesDown() {//倒计时
        timerInterval = setInterval(this.intervalFun, 1000);
      },
      intervalFun() {
        if (this.times == 0) {
          this.times = 60
          window.clearInterval(timerInterval)
        } else {
          this.times = this.times - 1
        }
      },
      submit() {//提交
        let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
        if (this.step == 1) {//第一步
          //判断账号
          if (this.phone == null || this.phone.replace(/(^\s*)|(\s*$)/g, "") == "") {
            this.$message.error('请输入手机号')
            return
          } else if (!regs.test(this.phone)) {
            this.$message.error('请输入正确的手机号')
            return
          } else if (this.code == null || this.code.replace(/(^\s*)|(\s*$)/g, "") == "") {
            this.$message.error('请输入验证码')
            return
          }
          checkPhoneAPI({phone: this.phone, code: this.code}).then(res => {
            if (res.data.code > 0) {
              this.$message.warning(res.data.msg)
            } else if (res.data.code < 0) {
              this.$message.error('身份验证失败，请稍后再试')
            } else if (res.data.code == 0) {
              this.$message.success('身份验证成功')
              Cookies.set('resetStep', 2)
              Cookies.set('editPhone', this.phone)
              this.step = 2
            }
          })
        } else if (this.step == 2) {//第二步
          let regs = /^[0-9a-zA-Z\W_]+$/;
          if (this.newPassword1 == null || this.newPassword1.replace(/(^\s*)|(\s*$)/g, "") == "") {
            this.$message.error('请输新密码')
            return
          } else if (this.newPassword2 == null || this.newPassword2.replace(/(^\s*)|(\s*$)/g, "") == "") {
            this.$message.error('请再次输入新密码')
            return
          } else if (this.newPassword2 != this.newPassword1) {
            this.$message.error('两次密码输入不一致')
            return
          } else if(this.newPassword1.length<6 || this.newPassword1.length>20) {
            this.$message.error('长度必须在6-20个字符之间!')
            return
          } else if(!regs.test(this.newPassword1)) {
            this.$message.error('请输入数字、字母、符号的密码!')
            return
          }

          const password1 = md5(this.newPassword1).toUpperCase()
          const password2 = md5(this.newPassword2).toUpperCase()

          passwordAPI({phone: Cookies.get('editPhone'), newPassword1: password1, newPassword2: password2}).then(res => {
            if (res.data.code > 0) {
              this.$message.warning(res.data.msg)
            } else if (res.data.code < 0) {
              this.$message.error('设置密码失败，请稍后再试')
            } else if (res.data.code == 0) {
              this.$message.success('设置密码成功')
              setTimeout(() => {
                this.$router.push({path: '/login'})
              }, 3000)
              this.step = 3
            }
          })
        }
      },
      getFooter() {//页脚
        footerAPI(this.footerQuery).then(res => {
          this.footerList = res.data.data.list
        })
      },
      getdictionary() {//底部版权
        dictionaryAPI().then(res => {
          this.dictionaryText = res.data.data.value
        })
      },
    },
  }
</script>

