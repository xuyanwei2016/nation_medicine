<template>
  <div class="loginAlert" v-if="isShowAlertCom"><!-- @click="isShowNation=false"-->
    <div class="loginAlertCont">
      <div class="loginAlertTit">
        <span>登录</span>
        <span @click="cancelBtn"><img src="../assets/images/personal/close.png" alt=""></span>
      </div>
      <div class="loginAlertCenter">
        <ul>
          <li><span>用户名：</span><input type="text" v-model="account" placeholder="请输入用户名"></li>
          <li><span>密码：</span><input type="password" v-model="password" placeholder="请输入密码"></li>
          <li v-if="errorTimes == 1">
            <span>验证码：</span>
            <div class="login_code" >
              <input type="text" placeholder="验证码" v-model="code">
              <img :src="codeImage" class="login_codeImg" @click="changeCode">
            </div>
          </li>
        </ul>
      </div>
      <div class="loginAlert_error_tips" v-if="errorTpye = 1">{{tipText}}</div>
      <div class="loginAlertBtn">

        <button class="alertButton" @click="loginBtn">登录</button>
        <span><router-link to="/register">注册</router-link></span>
      </div>
    </div>
  </div>
</template>

<script>
  import { loginAPI, codeAPI } from '@/api/login/index';
  import Cookies from 'js-cookie';
  import md5 from 'js-md5';
  var data = '';
  export default {
    props: {
      isShowChild: Boolean
    },
    data() {
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
        tipText: '',
        errorTimes: null,
        codeImage:null,
        isShowAlertCom:false,

      }
    },
    created(){
      if (Cookies.get('errorLogin') == 1) {
        this.errorTimes = 1;
        this.changeCode()
      } else{
        this.errorTimes = 0
      }

    },
    watch:{
      isShowChild(val,oldVal){
        if(val){
          this.isShowAlertCom=true;
        }
      }
    },

    methods: {
      changeCode() {//更改图形验证码
        codeAPI().then(res => {
          this.codeImage = res.data.img
          Cookies.set('uuid',res.data.uuid,{expires:5/1440})
          Cookies.set('codeImg',res.data.img,{expires:5/1440})
        })
      },


      loginBtn() {//登录

        this.errorTpye = 0
        this.tipText = null
        //判断用户名
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
        if(Cookies.get('errorLogin')){
          //判断code
          if (this.code == null || this.code.replace(/(^\s*)|(\s*$)/g, "") == "") {
            this.errorTpye = 1
            this.tipText = '请输入验证码'
            return
          }
          data = {
            account: this.account,
            password: md5(this.password).toUpperCase(),
            uuid: Cookies.get('uuid'),
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
            this.isShowAlertCom=false;
            this.$emit('toFatherData', this.isShowAlertCom)
            this.$message.success('登录成功')
            Cookies.remove('errorLogin')
            Cookies.remove('uuid')
            Cookies.remove('codeImg')
            Cookies.set('Y-Token',res.data.data.token);
            Cookies.set('userName',res.data.data.account);
            Cookies.set('userImg',res.data.data.img);
            Cookies.set('userType',res.data.data.level);
            Cookies.set('userId',res.data.data.id);
            Cookies.set('authorId',res.data.data.authorId);
            let userObj={
              userName:res.data.data.account,
              userImg:res.data.data.img,
              userToken:res.data.data.token,
              userType:res.data.data.level,
            };
            this.$store.commit('increment',userObj)
            this.$store.commit('tokenFn',res.data.data.token)
            this.$store.commit('setUserId',res.data.data.id)
            /*this.$router.push({path:'/index'})*/
          } else if(res.data.code == 4){//密码错误-五次以上需要输入验证码
            this.errorTpye = 1
            this.tipText = '账号密码不匹配！'
            if (res.data.msg >= 5) {
              this.errorTimes = 1
              Cookies.set('errorLogin',1,{expires:5/1440})
              this.changeCode()
            }
          } else if(res.data.code == 3) {//验证码错误
            this.changeCode()
          }
        })
      },
      cancelBtn(){
        this.isShowAlertCom=false;
        this.$emit('toFatherData', this.isShowAlertCom)
      },

    }
  }
</script>

<style lang="less" scoped>
  .loginAlert{
    position: fixed;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.3);
    top:0;
    left:0;
    z-index:11;
    display: flex;
    justify-content: center;
    align-items: center;
    .loginAlertCont{
      width:460px;
      height:auto;
      background: #fff;
      .loginAlertTit{
        width:430px;
        padding: 0 15px;
        background: #F4F4F4;
        height:36px;
        line-height: 36px;
        display: flex;
        justify-content: space-between;
        font-size:14px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(69,69,69,1);
        span:last-child{
          img{
            width:12px;
            height:12px;
            opacity: 0.7;
          }

        }
      }
      .loginAlertCenter{
        padding: 18px 52px 0px 52px;
        ul,li{list-style: none; padding: 0; margin: 0}
        ul{
          li{
            height:40px;
            line-height: 40px;
            margin-top: 12px;
            display: flex;
            justify-content: space-between;
            span{
              width:70px;
              text-align: right;
              font-size: 14px;
              color:#666666;
            }
            input{
              width:270px;
              height:38px;
              background:rgba(255,255,255,1);
              border:1px solid rgba(220,223,230,1) !important;
              border-radius:3px;
              padding-left: 5px;
            }
            .login_code{
              width:277px;
              input{
                width:130px;
                height:38px;
                padding:0 0 0 5px;
                margin: 0;
              }
            }
          }
        }
      }
      .loginAlert_error_tips{ width: 330px;color: #F40303; padding-left: 130px;height: 30px;line-height: 30px;
      }
      .loginAlertBtn{
        width:100%;
        padding-bottom: 26px;
        text-align: center;
        position:relative;
        .alertButton{
          width:76px;
          height:30px;
          background:rgba(240,124,125,1);
          border-radius:2px;
          border: none;
          color:#fff;
        }
        span{
          position: absolute;
          right:53px;
          top:0;
          font-size: 12px;
          line-height:30px;
          height:30px;
          color: #333;
          cursor: pointer;
          a{color: #333;line-height:30px;
            height:30px;}
        }
      }

    }

  }
</style>
