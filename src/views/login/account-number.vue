<template style="height:100%">
  <div id="number">
    <div class="number_content">
      <div class="number_bg">
        <div class="number_box">
          <div class="number_top">
            <img src="@/assets/images/login/account-head.png" class="number_boxHeader">
            <div class="number_tip">Hi，小公子绑定个人账号，方便一键登录哦~</div>
          </div>
          <div class="number_input">
            <el-form :model="userForm" :rules="rules" ref="userForm" class="demo-ruleForm">
              <el-form-item prop="account">
                <div class="number_account">
                  <input type="text" placeholder="用户名或手机号" v-model="userForm.account">
                </div>
              </el-form-item>
              <el-form-item prop="password">
                <div class="number_password">
                  <input type="text" placeholder="请输入密码" v-model="userForm.password">
                </div>
              </el-form-item>
            </el-form>
            <div class="number_loginbtn" @click="bindUser">立即绑定</div>
            <div class="number_create" @click="create">没有账号，立即创建</div>
          </div>
        </div>
      </div>
    </div>
    <div class="number_page">
      <div class="number_bottom">
        <div class="aboutUs"><span v-for="(item,index) in footerList" :key="item.id">
                    <router-link :to="{path:'/aboutUs',query:{id:item.id}}">
                      {{item.title}}
                    </router-link>
                    <i v-if="index != footerList.length-1">|</i></span>
          <!--|<span>版权声明</span>|<span>联系我们</span>|<span>购买须知</span>--></div>
        <div class="footerText" v-html="dictionaryText"></div>
        <div class="indexText"><span> 地　　址  ：</span>北京市东直门内南小街16号<span>电　　话：</span>010-58130660<span>邮　　编：</span>10070
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import "@static/css/login/account-number.less"
  import {bindAPI} from '@/api/login/bind';
  import {footerAPI, dictionaryAPI} from '@/api/common';

  export default {
    name: 'number',
    data() {
      return {
        userForm: {
          account: null,
          password: null
        },
        rules: {
          account: [
            {required: true, message: '请输入用户名或手机号', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
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
    methods: {
      bindUser() {//用户绑定
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            // account (string, optional): 会员账号 ,
            // qqKey (string, optional): qqKey ,
            // wechatKey (string, optional): 微信Key
            bindAPI(this.userForm).then(res => {
              if (res.data.code > 0) {
                this.$message.warning(res.data.msg)
              } else if (res.data.code < 0) {
                this.$message.error('发送失败，请稍后再试')
              } else if (res.data.code == 0) {
                this.$message.success('注册成功')
                this.$router.push({path: '/login'})
              }
            })
          }
        });
      },
      create() {
        this.$router.push({path: 'create'})
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
