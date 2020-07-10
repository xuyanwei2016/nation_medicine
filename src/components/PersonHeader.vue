<template>
  <div>
    <div class="header_box">
      <div class="top">
        <router-link to="/index">
          <a><img src="@/assets/images/personal/logo.png"></a>
        </router-link>
        <ul>
          <li><span><router-link to="/message">消息<i v-if="havMessage"></i></router-link></span>|</li>
          <li>
            <router-link v-if="userType!='2'" to="/shoppingCart">购物车</router-link>
          </li>
          <li v-if="this.$store.state.userToken">
            <router-link v-if="userType=='2'" to="/organizationIndex">
              <img :src=fileUrl(this.$store.state.userImg)  v-if="this.$store.state.userImg&&this.$store.state.userImg!=''" style="width:30px; height:30px; border-radius: 50%; line-height: 2px;">
              <img src="@/assets/images/home/avatar.jpg" v-else style="width:30px; height:30px; border-radius: 50%; line-height: 2px;">
              <span>{{this.$store.state.userName}}</span>
            </router-link>
            <router-link v-else to="/personalIndex">
              <img :src=fileUrl(this.$store.state.userImg)  v-if="this.$store.state.userImg&&this.$store.state.userImg!=''" style="width:30px; height:30px; border-radius: 50%; line-height: 2px;">
              <img src="@/assets/images/home/avatar.jpg" v-else style="width:30px; height:30px; border-radius: 50%; line-height: 2px;">
              <span>{{this.$store.state.userName}}</span>
            </router-link>|
          </li>
          <li v-if="!this.$store.state.userToken">
            <router-link to="/login">
              <span>登录</span>
            </router-link>
          </li>
          <li v-if="!this.$store.state.userToken">
            <router-link to="/register">
              <span>注册</span>
            </router-link>
          </li>
          <li  v-if="this.$store.state.userToken"><a @click="signOut" style="cursor: pointer">退出</a></li>
          <li :class="{searchInput:isShowInput}">
            <a @click="hidden"><img src="@/assets/images/personal/搜索.png"></a>
          </li>
          <li><input type="text" ref="input" v-model="searchVal"  placeholder="请输入要查询的内容" @keyup.enter.native="hidden"></li>
        </ul>
      </div>
    </div>
    <div class="center_box">
      <div class="flex_box" style="padding-bottom: 20px;">
        <PersonLeft></PersonLeft>
        <div class="right_box">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import PersonLeft from '@/components/PersonLeft.vue'
  import Footer from '@/components/Footer.vue';
  import {loginOutAPI} from '@/api/comment/comments';
  import { messageAPI } from '@/api/common'
  import Cookies from 'js-cookie';

  export default {
    data() {
      return {
        isShowInput:false,
        searchVal:'',
        userType:null,
        havMessage: null
      }
    },
    components: {
      PersonLeft,
      Footer
    },
    mounted(){

       this.userType=Cookies.get('userType');
       console.log(this.userType,"this.userTypethis.userType")
    },
    methods: {
      getMessage() {//是否有未读消息
      if(this.$store.state.userToken){//判断是否登录
          messageAPI().then(res => {
            if (res.data.data>0) {
              this.havMessage = true
            }
          })
        }
      },
      hidden() {
        console.log('11111111');
        
        if(this.$refs.input.style.display == 'block'){
          if(this.searchVal!=''){
            let obj={
              language:'',
              content:this.searchVal,
            };
            this.$store.commit('searchFun',obj)
            this.$router.push({path:'/theory'})
          }else{
            this.$refs.input.style.display = 'none';
          }
          /*this.$refs.input.style.display = 'none';*/
        }else{
          this.$refs.input.style.display = 'block';
        }
        this.isShowInput=!this.isShowInput;
      },
      /*退出*/
      signOut() {
        loginOutAPI().then(res => {
          if (res.data.status) {
            this.$message.success("退出登录成功！")
            this.$router.push({path: '/login'})
            Cookies.remove('Y-Token');
            Cookies.remove('userName');
            Cookies.remove('userImg');
            Cookies.remove('userType');
            Cookies.remove('userId');
            Cookies.remove('authorId');
            this.userImg = '';
            this.userName = '';
            this.userToken = '';
            let userObj = {
              userName: '',
              userImg: '',
              userToken: '',
              userType:'',
            };
            this.$store.commit('increment', userObj)
            this.$store.commit('setUserId', '')
            this.$router.push("login")
          } else {
            this.$message.error(res.data.msg)
          }
        })

      },
    }
  }
</script>

<style lang="less" scoped>
  .header_box {
    width: 100%;
    height: 100px;
    background-image: url(../../src/assets/images/personal/top-bg.png);
    .top {
      width: 1200px;
      height: 100%;
      line-height: 100px;
      margin: 0 auto;
      a {
        text-decoration: none;
        float: left;
        color: #fff;
        img {
          vertical-align: middle;
        }
      }
      ul {
        float: right;
        margin: 0;
        padding: 0;
        position: relative;
        li {
          list-style: none;
          float: left;
          color: #fff;
          &:first-child {
            position: relative;
            i {
              position: absolute;
              top: 40px;
              right: 14px;
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background-color: red;
            }
          }
          &:not(first-child) {
            margin-right: 5px;
          }
          &:nth-child(3) {
            margin-left: 8px;
          }
          &:nth-child(4) {
            margin-right: 10px;
          }
          &:nth-child(6) {
            // width: 100px;
            // height: 30px;
            // border: 1px solid #ccc;
            // border-radius: 3px;
            input {
              width: 210px;
              line-height: 34px;
              /*outline: none;*/
              // border: none;
              border-radius: 4px;
              height: 34px;
              border: 1px solid #C8DDFB;
              background: none;
              margin-top: 32px;
              color: #7AADF5;
              padding-left: 8px;
              display: none;
            }
          }
          img {
            vertical-align: middle;
          }
          span, a {
            margin-right: 5px;
          }
        }
        .searchInput{
          position: absolute;
          right:10px;

        }
      }
    }

  }

  .center_box {
    font-size: 14px;
    height: auto;
    margin: 0 auto;
    background-color: #f5f5f5;
    .personal_productInfo{
      min-height: 508px;
    }
  }

  .flex_box {
    display: flex;
    display: -webkit-flex;
    flex-flow: row;
    width: 1200px;
    margin: 0 auto;
  }

  .right_box {
    flex: 1;
    margin-top: 12px;
    position: relative;
    // background-color: #fff
  }
</style>
