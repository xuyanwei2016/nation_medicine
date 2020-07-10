<template>
  <div>
    <div class="account_title">账户安全</div>
    <div class="account_info">
      <div class="account_list">
        <i class="account_icon account_icon_active"></i>
        <span class="account_text">登录密码</span>
        <span class="account_tips">互联网账号存在被盗风险，建议您定期更改密码以保护账户安全。</span>
        <span class="account_btn" @click="changePass('accountForm')">修改密码</span>
      </div>
      <div v-if="userType!='2'">
        <div class="account_list">
          <i class="account_icon" :class="[dataStatus.phone?'account_icon_active':'account_icon_no']"></i>
          <span class="account_text">手机验证</span>
          <span class="account_tips">手机{{ dataStatus.phone | hidePhone}}，已通过验证。若手机更换或停用，请立即修改，避免账户被盗。</span>
          <span class="account_btn" @click="dialogPhoneVisible=true">更换手机号</span>
        </div>
        <div class="account_list">
          <i class="account_icon" :class="[dataStatus.qqKey?'account_icon_active':'account_icon_no']"></i>
          <span class="account_text">QQ绑定账号</span>
          <span class="account_tips"
                v-if="!dataStatus.qqKey==null || !dataStatus.qqKey=='' ||!dataStatus.qqKey==undefined">您已绑定账号QQ账号{{dataStatus.qqKey}}。</span>
          <span class="account_tips" v-else>绑定QQ账号后，可以使用此账号登录。</span>
          <span class="account_btn" v-if="!dataStatus.qqKey==null || !dataStatus.qqKey=='' ||!dataStatus.qqKey==undefined"
                @click="unbindAccount(1)">解绑</span>
          <span class="account_btn account_wx" v-else>立即绑定</span>
        </div>
        <div class="account_list">
          <i class="account_icon" :class="[dataStatus.wechatKey?'account_icon_active':'account_icon_no']"></i>
          <span class="account_text">微信绑定账号</span>
          <span class="account_tips"
                v-if="!dataStatus.wechatKey==null || !dataStatus.wechatKey=='' ||!dataStatus.wechatKey==undefined">您已绑定账号微信账号{{dataStatus.wechatKey}}。</span>
          <span class="account_tips" v-else>绑定微信账号后，可以使用此账号登录。</span>
          <span class="account_btn"
                v-if="!dataStatus.wechatKey==null || !dataStatus.wechatKey=='' ||!dataStatus.wechatKey==undefined"
                @click="unbindAccount(2)">解绑</span>
          <span class="account_btn account_wx" v-else>立即绑定</span>
        </div>
      </div>
    </div>
    <div class="may_account_wrap">
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="460px" @close="closeEmpty('accountForm')">
        <el-form :model="accountForm" :rules="rules" ref="accountForm" label-width="80px">
          <el-form-item  label="旧密码" prop="oldPassword">
            <el-input show-password v-model="accountForm.oldPassword" autocomplete="off" placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item  label="新密码" prop="newPassword1">
            <el-input show-password v-model="accountForm.newPassword1" autocomplete="off" placeholder="建议使用至少两种字符组合"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="newPassword2">
            <el-input show-password v-model="accountForm.newPassword2" autocomplete="off" placeholder="再次输入新密码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button style="width: 80px; height: 32px; text-align: center;  border-radius: 3px;" type="primary" size="small" @click="submitForm('accountForm')">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog title="更换手机号" :visible.sync="dialogPhoneVisible" width="460px" @close="closeEmpty('phoneForm')">
        <el-form :model="phoneForm" :rules="rulesPhone" ref="phoneForm" label-width="80px">
          <el-form-item label="新手机号" prop="phone">
            <el-input v-model="phoneForm.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="phoneForm.code" autocomplete="off" placeholder="请输入验证码">
              <el-button slot="append" @click='getCode' v-if="times == 60">获取验证码</el-button>
              <el-button slot="append" v-else>{{times}}</el-button>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" :loading='loadBtn' size="small" @click="changePhone('phoneForm')" style="width:80px">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="dialogUnbindVisible"
        width="360px">
        <span>确定要解除已绑定账户吗？</span>
        <span slot="footer" class="dialog-footer unbind_footer" style="display:inline-block;padding-top:20px">
        <el-button size="small" type="primary" @click="unbindAccountSubmite(unbindType)">解除</el-button>
        <el-button size="small" @click="dialogUnbindVisible = false">不解除</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import "@static/css/personal/set.less";
  import {countSafeAPI, countChangePassAPI, countChangePhoneAPI, countUnbindAPI} from '@/api/personal/accountSafe'
  import {phoneCodeAPI} from '@/api/login/register'
  import md5 from 'js-md5';
  import Cookies from 'js-cookie';
  var timerInterval = null;
  export default {
    name: 'set',
    data() {
      var oldPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          if (this.accountForm.oldPassword !== '') {
            //this.$refs.accountForm.validateField('checkPass');
          }
          callback();
        }
      };
      var newPassword1 = (rule, value, callback) => {
        let regs = /^[0-9a-zA-Z\W_]+$/;
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.accountForm.newPassword1 == this.accountForm.newPassword) {
            callback(new Error('新密码不能与旧密码重复'));
          }else if(value.length<6 || value.length>20) {
            callback(new Error('长度必须在6-20个字符之间!'));
          } else if(!regs.test(value)) {
            callback(new Error('请输入数字、字母、符号的密码'));
          }
          callback();
        }
      };
      var newPassword2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else {
          if (this.accountForm.newPassword2 !== this.accountForm.newPassword1) {
            //this.$refs.accountForm.validateField('newPassword2');
            callback(new Error('新密码输入不一致'));
          }
          callback();
        }
      };
      var phone = (rule, value, callback) => {
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
        loadBtn:false,
        userType:null,//判断用户类型
        times: 60,//倒计时
        status: null,
        activeName: 'first',
        content: null,
        dataStatus: {
          phone: '',
        },
        dialogFormVisible: false,
        dialogPhoneVisible: false,//手机弹框
        dialogUnbindVisible: false,//解绑弹框
        unbindType: null,
        accountForm: {
          oldPassword: '',
          newPassword1: '',
          newPassword2: ''
        },
        rules: {
          oldPassword: [
            {validator: oldPassword, trigger: 'blur'}
          ],
          newPassword1: [
            {validator: newPassword1, trigger: 'blur'}
          ],
          newPassword2: [
            {validator: newPassword2, trigger: 'blur'}
          ]
        },
        phoneForm: {
          phone: '',
          code: ''
        },
        rulesPhone: {
          phone: [
            {validator: phone, trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入手机验证码', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      //console.log(111);
    },
    mounted() {
      this.userType=Cookies.get('userType');//获取用户类型
      //console.log(this.userType,'this.userType')
      this.getAccountSafe();
    },
    filters: {
      hidePhone(phone) {//修饰手机号
        if (!phone == null || !phone == undefined || !phone == '') {
          return phone.replace(phone.substr(3, 4), "****")
        }

      }
    },
    methods: {
      closeEmpty(formName){
        this.accountForm= {
          oldPassword: '',
          newPassword1: '',
          newPassword2: ''
        };
        this.phoneForm={
          phone: '',
          code: ''
        };
        this.times=60;
        window.clearInterval(timerInterval);
        this.$refs[formName].resetFields();
      },
      getAccountSafe() {//获取安全列表
        countSafeAPI().then(res => {
          if (res.data.code == 0) {
            this.dataStatus = res.data.data;
            // Vue.comment.map(function(item,index,arr){
            //     Vue.allId.push(Vue.comment[index]['id']);
            // })
          } else if (res.data.code < 0) {
            this.$message('请求失败');
          }
        })
      },
      changePass(formName) {//点击修改密码，出弹框
        this.dialogFormVisible = true;
      },
      submitForm(formName) {//修改密码
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              oldPassword: md5(this.accountForm.oldPassword).toUpperCase(),
              newPassword1: md5(this.accountForm.newPassword1).toUpperCase(),
              newPassword2: md5(this.accountForm.newPassword2).toUpperCase()
            }
            countChangePassAPI(data).then(res => {//提交修改数据
              let code = res.data.code;
              let Vue = this;
              if (code > 0) {
                this.$message.warning(res.data.msg)
              } else if (code < 0) {
                this.$message.error(`修改失败`)
              } else {
                this.$message.success(`修改成功`);
                this.dialogFormVisible = false;
                setTimeout(function () {
                  Vue.$router.push('login')//跳转登录
                }, 2000)
              }
            });
            return false;
            // alert('submit!');
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },
      changePhone(formName) {//修改手机号
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loadBtn=true;
            countChangePhoneAPI(this.phoneForm).then(res => {//提交手机修改数据
              let code = res.data.code;
              let Vue = this;
              if (code > 0) {
                this.$message.warning(res.data.msg)
              } else if (code < 0) {
                this.$message.error(`修改失败`)
              } else {
                this.$message.success(`修改成功`);
                this.dialogPhoneVisible = false;
                this.getAccountSafe();//成功后重新获取列表
                let myphone = this.phoneForm.phone.substr(3, 4);
                let setNewPhone = this.phoneForm.phone.replace(myphone, "****")
                this.$store.commit("setPhone", setNewPhone)
              }
              this.loadBtn=false;
            });
            return false;
          } else {
            return false;
          }
        });
      },
      unbindAccount(type) {//解绑第三方
        this.dialogUnbindVisible = true;
        this.unbindType = type;//qq或微信
      },
      unbindAccountSubmite() {
        let Vue = this;
        countUnbindAPI(this.unbindType).then(res => {//提交解绑
          let code = res.data.code;
          let Vue = this;
          if (code > 0) {
            this.$message.warning(res.data.msg)
          } else if (code < 0) {
            this.$message.error(`解除失败`)
          } else {
            this.$message.success(`已解除绑定`);
            this.dialogUnbindVisible = false;
            setTimeout(function () {
              Vue.getAccountSafe();
            }, 2000)
          }
        });
      },
      handleClose() {
        this.dialogUnbindVisible = false;//点叉关闭

      },
      getCode() {//获取验证码
        let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
        if (!regs.test(this.phoneForm.phone)) {
          this.$message.error('请输入正确的手机号')
        } else {//获取验证码
          phoneCodeAPI({phone: this.phoneForm.phone}).then(res => {
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
    }
  }
</script>
<style lang="less">
  .account_icon_no {
    background-image: url(../../assets/images/personal-center/account-warn.png);
    background-repeat: no-repeat;
  }

  .account_icon_active {
    background-image: url(../../assets/images/personal-center/account.png);

    background-repeat: no-repeat;
  }

  .may_account_wrap {
    .el-dialog__header {
      border: none;
      background-color: #F4F4F4;
    }
    .el-dialog__body {
      padding: 30px 40px 0px 20px
    }
    .el-button--primary {
      background-color: #F07C7D;
      border-color: #F07C7D
    }
    .unbind_footer {
      .el-button--default {
        background: #EEEEEE;
        border-color: #EEEEEE;
        color: #bbb;
      }
    }
  }
  .may_account_wrap .el-dialog__footer{
    text-align: center !important;
  }
</style>
