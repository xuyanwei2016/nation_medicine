<template style="height:100%">
  <div id="register">
    <div class="register_content">
      <div class="register_outside">
        <div class="register_box">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="个人用户注册" name="first">
              <el-form :model="userForm" :rules="rules" ref="userForm" class="demo-ruleForm" autocomplete="off">
                <div class="register_account">
                  <el-form-item prop="account">
                    <input style="display:none" type="password" name="fakepasswordremembered"/>
                    <el-input v-model="userForm.account" placeholder="请输入用户名" @input="userName" clearable @keyup.enter.native="register" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
                <div class="register_password">
                  <el-form-item prop="password">
                    <input style="display:none" type="password" name="fakepasswordremembered"/>
                    <el-input v-model="userForm.password" placeholder="设置密码，至少两种字符组合" type="password" clearable @keyup.enter.native="register"></el-input>
                  </el-form-item>
                </div>
                <div class="register_code">
                  <el-form-item prop="phone">
                    <el-input v-model="userForm.phone" placeholder="请填写手机号，建议使用常用手机" clearable @keyup.enter.native="register"></el-input>
                  </el-form-item>
                </div>
              <!--  <div class="register_phone_code" style="padding-bottom:2px">
                  <el-form-item prop="code">
                    <el-input v-model="userForm.code" placeholder="手机验证码" class="phone_code" clearable @keyup.enter.native="register"></el-input>
                    <span class="register_text" @click="getCode" v-if="times == 60">获取验证码</span>
                    <span class="register_tips" v-else>{{times}}s</span>
                  </el-form-item>
                </div>-->
              </el-form>
              <div class="register_rules" @click="chooseReg"><el-checkbox v-model="guideType"></el-checkbox>我已阅读并同意《数字民族医药用户注册协议》</div>
              <!--疫情更改 5.22-->
              <!--<div class="register_rules" @click="chooseReg"><el-checkbox v-model="guideType"></el-checkbox>我已阅读并同意《用户注册协议》</div>-->
              <div class="register_btn" @click="register">立即注册</div>
              <div class="register_bottom">已有账号，<router-link :to="{path:'/login'}"><span>去登录</span></router-link></div>
            </el-tab-pane>
            <!--疫情专题 注销 4.26-->
            <el-tab-pane label="机构用户注册" name="second">
              <el-form :model="organizaForm" :rules="organization" ref="organizaForm" class="demo-ruleForm">
                <el-form-item prop="account">
                  <div class="register_account">
                    <input style="display:none" type="password" name="fakepasswordremembered"/>
                    <el-input type="text" placeholder="请输入用户名" v-model="organizaForm.account" @change="organizaName" clearable @keyup.enter.native="organizaRegister"></el-input>
                  </div>
                </el-form-item>
                <el-form-item prop="password">
                  <div class="register_password">
                    <input style="display:none" type="password" name="fakepasswordremembered"/>
                    <el-input type="password" placeholder="设置密码，至少两种字符组合" v-model="organizaForm.password" clearable @keyup.enter.native="organizaRegister"></el-input>
                  </div>
                </el-form-item>
                <el-form-item prop="organCode">
                  <div class="register_code">
                    <el-input type="text" placeholder="您的机构注册码" v-model="organizaForm.organCode" clearable @keyup.enter.native="organizaRegister"></el-input>
                  </div>
                </el-form-item>
              </el-form>
              <div class="register_rules" @click="chooseReg"><el-checkbox v-model="organizaGuide"></el-checkbox>我已阅读并同意《数字民族医药用户注册协议》</div>
              <div class="register_btn" @click="organizaRegister">立即注册</div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <LoginFooter></LoginFooter>
    <el-dialog
      title="用户注册协议"
      @close="cancelReg"
      :visible.sync="centerDialogVisible"
      width="720px"
      center>
      <div class='agreement_content'>
          <div class="content">
            <p> 第一条 为加强对互联网用户账号名称的管理，保护公民、法人和其他组织的合法权益，根据《国务院关于授权国家互联网信息办公室负责互联网信息内容管理工作的通知》和有关法律、行政法规，制定本规定。</p>
            <p>第二条 在中华人民共和国境内注册、使用和管理互联网用户账号名称，适用本规定。
            本规定所称互联网用户账号名称，是指机构或个人在博客、微博客、即时通信工具、论坛、贴吧、跟帖评论等互联网信息服务中注册或使用的账号名称。</p>
            <p>第三条 国家互联网信息办公室负责对全国互联网用户账号名称的注册、使用实施监督管理，各省、自治区、直辖市互联网信息内容主管部门负责对本行政区域内互联网用户账号名称的注册、使用实施监督管理。</p>
            <p>第四条 互联网信息服务提供者应当落实安全管理责任，完善用户服务协议，明示互联网信息服务使用者在账号名称、头像和简介等注册信息中不得出现违法和不良信息，配备与服务规模相适应的专业人员，对互联网用户提交的账号名称、头像和简介等注册信息进行审核，对含有违法和不良信息的，不予注册；保护用户信息及公民个人隐私，自觉接受社会监督，及时处理公众举报的账号名称、头像和简介等注册信息中的违法和不良信息。</p>
          </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false" class="my_cancle">取 消</el-button>
        <el-button type="primary" @click="agreeTo" class="my_sure" style="width:102px">同意并继续</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<style>
.el-form-item__error{
  z-index: 1000;
}
</style>


<script>
import "@static/css/login/register.less";
import LoginFooter from '@/components/LoginFooter.vue'
import { repeatNameAPI, phoneCodeAPI, registerAPI, organizaRegisterAPI } from '@/api/login/register'
import { clearInterval } from 'timers';
import md5 from 'js-md5';
var timerInterval = null;

export default {
  name: 'bookshelf',
  data(){
    var account = (rule, value, callback) => {//账号
      this.userName(rule, value, callback)
    };
    var phoneValidator = (rule, value, callback) => {//手机号
      let regs =  /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
      if (value == null || value.replace(/(^\s*)|(\s*$)/g, "")=="") {
        callback(new Error('请填写手机号'));
      } else {
        if(!regs.test(value)){
            callback([new Error('手机号输入不合法')]);
        }else{
            callback();
        }
      }
    };
    var password = (rule, value, callback) => {//密码
      let regs = /^[0-9a-zA-Z\W_]+$/;
      if (value == null || value.replace(/(^\s*)|(\s*$)/g, "")=="") {
        callback(new Error('请输入密码'));
      } else if(value.length<6 || value.length>20) {
        callback(new Error('长度必须在6-20个字符之间!'));
      } else if(!regs.test(value)) {
        callback(new Error('请输入数字、字母、符号的密码'));
      }else{
        callback();
      }
    }
    var organizaAccount = (rule, value, callback) => {//账号
      this.organizaName(rule, value, callback)
    };
    return {
      centerDialogVisible:false,//协议弹框
      isExist:0,
      isExistOrganiza:0,
      status:null,
      activeName:'first',
      content:null,
      userForm:{
        account:null,
        password:null,
        phone:null,
        code:null,
      },
      tipsText: null,
      times: 60,
      guideType:false,
      rules:{
        account: [
          { validator: account, trigger: 'change' },
        ],
        password: [
          { validator: password, trigger: 'change' },
        ],
        phone: [
          { validator: phoneValidator, trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入手机验证码', trigger: 'change' },
        ],
      },
      organizaForm:{
        account: null,
        organCode: null ,
        password: null
      },
      organizaGuide:false,
      organization:{
        account: [
          { validator: organizaAccount, trigger: 'change' },
        ],
        password: [
          { validator: password, trigger: 'change' },
        ],
        organCode: [
          { required: true, message: '请输入机构注册码', trigger: 'change' },
        ]
      }
    }
  },
  created(){
    //
  },
  components:{
    LoginFooter
  },
  destroyed () {
    window.clearInterval(timerInterval)
  },
  methods:{
    cancelReg(){
      //this.guideType=false;
      //this.organizaGuide=false;
    },
    chooseReg(){
      if(this.activeName=="first"){
        if(this.activeName=="first"){
          this.guideType=true;
        }else{
          this.organizaGuide=true;
        }
      }
      this.centerDialogVisible=true;
    },
    agreeTo(){
      this.centerDialogVisible = false;
      if(this.activeName=="first"){
        this.guideType=true;
      }else{
        this.organizaGuide=true;
      }
    },
    handleClick(tab, event) {
      console.log(tab.index);
      console.log(this.activeName);
    },
    userName(rule, value, callback) {//普通-名字改变--判断是否重复
      repeatNameAPI({account:this.userForm.account}).then(res => {
        if(res.data.code !== 0){
          this.isExist = 1
        } else{
          this.isExist = 0
        }
        let regs = /^[0-9a-zA-Z_-]+$/;
        if (value == null || value.replace(/(^\s*)|(\s*$)/g, "")=="") {
          callback(new Error('请输入用户名'));
        } else if (this.isExist == 1) {
          callback(new Error('账号已存在!'));
        } else if(value.length<4 || value.length>20) {
          callback(new Error('请输入4-20字符以内的账号!'));
        } else if(!regs.test(value)) {
          callback(new Error('请输入字母、数字、“-”、“_”的组合账号!'));
        } else {
          callback();
        }
      })
    },
    getCode() {//获取验证码
      let regs =  /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
      if(!regs.test(this.userForm.phone)){
        // this.$message.error('请输入正确的手机号')
      } else {//获取验证码
        phoneCodeAPI({phone:this.userForm.phone}).then(res => {
          if(res.data.code >0) {
            this.$message.warning(res.data.msg)
          } else if (res.data.code <0) {
            this.$message.error('发送失败，请稍后再试')
          } else if(res.data.code == 0){
            if(res.data.msg == "6") {
              this.$message.warning('该手机号还可以验证4次，请尽快验证')
            } else if(res.data.msg == "10") {
              this.$message.warning('请勿频繁操作')
            } else{
              this.$message.success('发送成功，请注意查收')
            }
            this.timesDown()
          }
        })
      }
    },
    timesDown() {//倒计时
      const that = this
      timerInterval = setInterval(that.intervalFun, 1000);
    },
    intervalFun() {
      const that = this
      if(that.times == 0){
        that.times = 60
        window.clearInterval(timerInterval)
      } else{
        that.times = that.times-1
      }
    },
    organizaName(rule, value, callback) {//机构名字change
      repeatNameAPI({account:this.organizaForm.account}).then(res => {
        if(res.data.code != 0){
          this.isExistOrganiza = 1
        } else{
          this.isExistOrganiza = 0
        }
        let regs = /^[0-9a-zA-Z_-]+$/;
        if (value == null || value.replace(/(^\s*)|(\s*$)/g, "")=="") {
          callback(new Error('请输入用户名'));
        } else if (this.isExistOrganiza == 1) {
          console.log(this.isExistOrganiza);
          callback(new Error('账号已存在!'));
        } else if(value.length<4 || value.length>20) {
          callback(new Error('请输入4-20字符以内的账号!'));
        } else if(!regs.test(value)) {
          callback(new Error('请输入字母、数字、“-”、“_”的组合账号!'));
        } else {
          callback();
        }
      })
    },
    register() {//个人注册
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          if(this.guideType){//是否同意条款
            let newPassword = md5(this.userForm.password).toUpperCase()
            let  { password, ...rest } = this.userForm
            let data = { ...rest, password: newPassword }
            registerAPI(data).then(res => {
              if(res.data.code >0) {
                this.$message.warning(res.data.msg)
              } else if (res.data.code <0) {
                this.$message.error('注册失败，请稍后再试')
              } else if(res.data.code == 0){
                this.$message.success('注册成功')
                this.$router.push({path:'/'})
              }
            })
          } else{
            this.centerDialogVisible=true;
          }
        }
      });
    },
    organizaRegister() {//机构注册
      this.$refs['organizaForm'].validate((valid) => {
        if (valid) {
          if(this.organizaGuide){//是否同意条款
            let newPassword = md5(this.organizaForm.password).toUpperCase()
            let  { password, ...rest } = this.organizaForm
            let data = { ...rest, password: newPassword }
            organizaRegisterAPI(data).then(res => {
              if(res.data.code >0) {
                this.$message.warning(res.data.msg)
              } else if (res.data.code <0) {
                this.$message.error('发送失败，请稍后再试')
              } else if(res.data.code == 0){
                this.$message.success('注册成功')
                this.$router.push({path:'/'})
              }
            })
          } else{
            this.centerDialogVisible=true;
            //this.$message.error('请阅读并同意用户注册条款')
          }
        }
      });
    },
  }
}
</script>
