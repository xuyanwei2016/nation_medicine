<template style="height:100%;background:#fff">
  <div id="login">
    <div class="login_content">
      <div class="login_outside">
        <div class="login_box">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="账号登录" name="first">
              <div class="login_account">
                <el-input type="text" placeholder="账号" v-model="account" @input="changeTip" clearable @keyup.enter.native="loginBtn" @blur="havError"></el-input>
              </div>
              <div class="login_password">
                <el-input type="password" placeholder="密码" v-model="password" @input="changeTip" clearable @keyup.enter.native="loginBtn"></el-input>
              </div>
              <div class="login_code" v-if="errorTimes == 1">
                <input type="text" placeholder="验证码" v-model="code" @input="changeTip"/>
                <img :src="codeImage" class="login_codeImg" @click="changeCode">
              </div>
              <div class="login_tip">
                <span class="login_error_tips" v-if="errorTpye = 1">{{tipText}}</span>
                <router-link to='/password'>
                  <span class="login_forget_password">忘记密码</span>
                </router-link>
              </div>
              <div class="login_btn" @click="loginBtn">登录</div>
              <div class="login_bottom">
                <a href="https://graph.qq.com/oauth2.0/authorize?client_id=appid&redirect_uri=url&state=state&response_type=code&state=1"><img src="@/assets/images/login/qq.png"></a>
                <a href="https://open.weixin.qq.com/connect/qrconnect?appid=APPID&redirect_uri=http://218.245.4.93:8090/fg/mall/index.html&response_type=code&scope=snsapi_login&state=2"><img src="@/assets/images/login/wx.png"></a>
                <span class="login_register" @click="registerPage">立即注册</span>
              </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="扫码登录" name="second">

            </el-tab-pane> -->
          </el-tabs>
        </div>
      </div>
    </div>
    <LoginFooter></LoginFooter>
  </div>
</template>

<script>
import "@static/css/login/index.less";
import LoginFooter from '@/components/LoginFooter.vue'
import { loginAPI, codeAPI, errorAPI } from '@/api/login/index'
import Cookies from 'js-cookie';
import md5 from 'js-md5';
var data = '';

export default {
  name: 'login',
  data(){
    return {
      status:null,
      activeName:'first',
      content:null,
      resourceForm:{
        title:11
      },
      account:'',
      password:'',
      code:'',
      errorTpye: 0,
      tipText: null,
      errorTimes: null,
      codeImage:null,
      uuid: null,
    }
  },
  components:{
    LoginFooter
  },
  methods:{
    handleClick(tab, event) {
      console.log(tab.index);
      console.log(this.activeName);
    },
    changeTip( ){//更改错误提示
      this.tipText = null
    },
    havError() {
      errorAPI({account:this.account}).then(res => {
        if(res.data.data>5){
          this.errorTimes = 1
          this.changeCode()
        }
      })
    },
    loginBtn() {//登录
      this.errorTpye = 0
      this.tipText = null
      //判断账号
      if (this.account == null || this.account.replace(/(^\s*)|(\s*$)/g, "") == "") {
        this.errorTpye = 1
        this.tipText = '请输入账号'
        return
      } else if(this.account.length<4 || this.account.length>20) {
        this.tipText = '请输入4-20字符以内的账号!'
        this.errorTpye = 1
        return
      }
      //判断密码
      if (this.password == null || this.password.replace(/(^\s*)|(\s*$)/g, "") == "") {
        this.errorTpye = 1
        this.tipText = '请输入密码'
        return
      }
      if(this.errorTimes == 1){//判断验证码
        //判断code
        if (this.code == null || this.code.replace(/(^\s*)|(\s*$)/g, "") == "") {
          this.errorTpye = 1
          this.tipText = '请输入验证码'
          return
        }
        data = {
          account: this.account,
          password: md5(this.password).toUpperCase(),
          uuid: this.uuid,
          code: this.code
        }
      } else{
        data = {
          account: this.account,
          password: md5(this.password).toUpperCase()
        }
      }
      loginAPI(data).then(res => {
        if(res.data.code >0 && res.data.code != 4) {
          this.errorTpye = 1
          this.tipText = res.data.msg
        } else if (res.data.code <0) {
          this.errorTpye = 1
          this.tipText = '登录失败，请稍后再试'
        } else if(res.data.code == 0){
          this.$message.success('登录成功')
          Cookies.remove('uuid')
          Cookies.remove('codeImg')
          Cookies.set('Y-Token',res.data.data.token);
          Cookies.set('userName',res.data.data.nickName?res.data.data.nickName:res.data.data.account);
          Cookies.set('userId',res.data.data.id);
          Cookies.set('userPhone',res.data.data.phone);
          Cookies.set("authorId",res.data.data.authorId );
          if(res.data.data.img=='null'||!res.data.data.img){
            Cookies.set('userImg','');
          }else{
            Cookies.set('userImg',res.data.data.img);
          }
          Cookies.set('userType',res.data.data.level);
          let userObj={
            userName:res.data.data.nickName?res.data.data.nickName:res.data.data.account,
            userImg:res.data.data.img,
            userToken:res.data.data.token,
            userType:res.data.data.level,
          };
          this.$store.commit('increment',userObj);
          this.$store.commit('setUserId',res.data.data.id);
          /*this.$store.commit('userType',userObj)*/
          this.$router.push({path:'/'})
        } else if(res.data.code == 4){//密码错误-五次以上需要输入验证码
          this.errorTpye = 1
          this.tipText = '账号密码不匹配！'

          if (res.data.msg >= 5) {//次数
            this.errorTimes = 1
            this.changeCode()
          }
        } else if(res.data.code == 3) {//验证码错误
          this.changeCode()
        }
      })
    },
    changeCode() {//更改图形验证码
      codeAPI().then(res => {
        this.codeImage = res.data.img
        this.uuid = res.data.uuid
      })
    },
    registerPage() {//跳转注册页面
      this.$router.push('/register');
    },
    /*QQ登录*/
    QQlogin(){

    },
    /*wx登录*/
    WXlogin(){

    },

  }
}
</script>
