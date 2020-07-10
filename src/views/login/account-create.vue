<template style="height:100%">
  <div id="create">
    <div class="create_con">
      <div class="create_bg">
        <div class="create_box">
          <div class="create_top">
            <img src="@/assets/images/login/account-head.png" class="create_boxHeader">
            <div class="create_tip">Hi，小公子绑定个人账号，方便一键登录哦~</div>
          </div>
          <div class="create_input">
            <el-form :model="userForm" :rules="rules" ref="userForm" class="demo-ruleForm">
              <div class="create_account">
                <el-form-item prop="account">
                  <input type="text" placeholder="请输入用户名" v-model="userForm.account" @input="userName">
                </el-form-item>
              </div>
              <div class="create_password">
                <el-form-item prop="password">
                  <input type="text" placeholder="设置密码，至少两种字符组合" v-model="userForm.password">
                </el-form-item>
              </div>
              <div class="create_phone">
                <el-form-item prop="phone">
                  <input type="text" placeholder="请输入手机号，建议使用常用手机" v-model="userForm.phone">
                </el-form-item>
              </div>
              <div class="create_code">
                <el-form-item prop="code">
                  <input type="text" placeholder="请输入手机验证码" v-model="userForm.code">
                  <span class="textTip" v-if="times == 60" @click="getCode">获取验证码</span>
                  <span class="textTip" v-else>{{times}}s</span>
                </el-form-item>
              </div>
            </el-form>
            <div class="create_rules">
              <el-checkbox v-model="guideType"></el-checkbox>
              我已阅读并同意《数字民族医药用户注册协议》
            </div>
            <div class="create_loginbtn" @click="register">立即注册</div>
            <div class="create_create" @click="bound">已有账号，立即绑定</div>
          </div>
        </div>
      </div>
    </div>
    <div class="create_page">
      <div class="create_bottom">
        <div class="aboutUs">
                  <span v-for="(item,index) in footerList" :key="item.id">
                    <router-link :to="{path:'/aboutUs',query:{id:item.id}}">
                      {{item.title}}
                    </router-link>
                    <i v-if="index != footerList.length-1">|</i>
                </span><!--|<span>版权声明</span>|<span>联系我们</span>|<span>购买须知</span>--></div>
        <div class="footerText" v-html="dictionaryText"></div>
        <div class="indexText"><span> 地　　址  ：</span>北京市东直门内南小街16号<span>电　　话：</span>010-58130660<span>邮　　编：</span>10070
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import "@static/css/login/account-create.less"
  import {bindAPI} from '@/api/login/bind'
  import {repeatNameAPI, phoneCodeAPI} from '@/api/login/register';
  import {footerAPI, dictionaryAPI} from '@/api/common';

  var timerInterval = null

  export default {
    name: 'create',
    data() {
      var account = (rule, value, callback) => {
        if (value == null || value.replace(/(^\s*)|(\s*$)/g, "") == "") {
          callback(new Error('请输入用户名'));
        } else if (this.isExist == 1) {
          callback(new Error('用户名重复!'));
        } else if (value.length < 4 || value.length > 20) {
          callback(new Error('请输入4-20字符以内的用户名!'));
        } else {
          callback();
        }
      };
      var phoneValidator = (rule, value, callback) => {
        let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
        if (value == null || value.replace(/(^\s*)|(\s*$)/g, "") == "") {
          callback(new Error('请填写手机号'));
        } else {
          if (!regs.test(value)) {
            callback([new Error('手机号输入不合法')]);
          } else {
            callback();
          }
        }
      };
      return {
        guideType: null,
        isExist: null,
        times: 60,
        userForm: {
          account: null,
          password: null,
          phone: null,
          code: null
        },
        rules: {
          account: [
            {validator: account, trigger: 'change'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          phone: [
            {validator: phoneValidator, trigger: 'blur'},
          ],
          code: [
            {required: true, message: '请输入手机验证码', trigger: 'blur'},
          ],
        },
        footerList: [],
        footerQuery: {
          pageNum: 1,
          pageSize: 4
        },
        dictionaryText: null,
      }
    },
    created() {
      this.getFooter();
      this.getdictionary();
    },
    destroyed () {
      window.clearInterval(timerInterval)
    },
    methods: {
      userName() {//名字改变--判断是否重复
        repeatNameAPI({account: this.userForm.account}).then(res => {
          if (res.data.code != 0) {
            this.isExist = 1
          } else {
            this.isExist = 0
          }
        })
      },
      getCode() {//获取验证码
        let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
        if (!regs.test(this.userForm.phone)) {
          this.$message.error('请输入正确的手机号')
        } else {//获取验证码
          phoneCodeAPI({phone: this.userForm.phone}).then(res => {
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
      register() {//注册
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            if (this.guideType) {//是否同意条款
              bindAPI(this.userForm).then(res => {
                if (res.data.code > 0) {
                  this.$message.warning(res.data.msg)
                } else if (res.data.code < 0) {
                  this.$message.error('绑定失败，请稍后再试')
                } else if (res.data.code == 0) {
                  this.$message.success('绑定成功')
                  this.$router.push({path: '/'})
                  //需要返回token
                  //Cookies.set('X-Token',res.data.data.token)
                }
              })
            } else {
              this.$message.error('请阅读并同意用户注册条款')
            }
          }
        });
      },
      bound() {
        this.$router.push({path: 'number'})
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

<style scoped>

</style>
