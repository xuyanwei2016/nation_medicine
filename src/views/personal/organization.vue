<template>
  <div>
    <div class="header_box">
      <div class="top">
        <router-link to="index">
          <img src="@/assets/images/personal/logo.png">
        </router-link>
        <ul>
          <li><span><router-link to="/message" class="nation_message">消息<i v-if="havMessage"></i></router-link></span>|</li>
          <li v-if="userType=='2'">
            <router-link to="/shoppingCart">购物车</router-link>
          </li>
          <li v-if="this.$store.state.userToken">
              <img :src=fileUrl(this.$store.state.userImg) style="width:30px; height:30px; border-radius: 50%" v-if="this.$store.state.userImg&&this.$store.state.userImg!=''">
              <img  src="@/assets/images/home/avatar.jpg" v-else style="width:30px; height:30px; border-radius: 50%">
              <span>{{this.$store.state.userName}}</span>
              |
          </li>
          <li v-if="!this.$store.state.userToken">
            <router-link to="/login">
              <span>登录</span>
            </router-link>
            |
          </li>
          <li v-if="!this.$store.state.userToken">
            <router-link to="/register">
              <span>注册</span>
            </router-link>
            |
          </li>
          <li v-if="this.$store.state.userToken"><a @click="signOut" style="cursor: pointer">退出</a></li>
          <li :class="{searchInput:isShowInput}"><span><a @click="hidden"><img
            src="@/assets/images/personal/搜索.png"></a></span></li><!-- @click="hidden"-->
          <li><input class="search_input" type="text" ref="input" v-model="searchVal" placeholder="请输入要查询的内容"></li>
        </ul>
      </div>
    </div>
    <div class="center_box">
      <div class="flex_box">
        <div class="left">
          <div class="bottom">
            <div class="main">
              <router-link to="organizationIndex">机构主页</router-link>
            </div>
            <div class="main-set">内容管理</div>

            <router-link to="organizationBookshelf">
              <div class="list">我的书架</div>
            </router-link>
            <router-link to="organizationFavorite">
              <div class="list">我的收藏</div>
            </router-link>
            <router-link to="organizationBrowsing">
              <div class="list">浏览记录</div>
            </router-link>
            <div class="account-set">账户管理</div>
            <router-link to="organizationSet">
              <div class="list">账户安全</div>
            </router-link>
          </div>
        </div>
        <div class="right_box">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '@/components/Footer.vue'
  /*import bus from '@/assets/eventBus.js'  */
  import { messageAPI } from '@/api/common'
  import {informationAPI} from '@/api/personal/personal_information'
  import {log} from 'util';
  import {uploadUrl} from '@/utils/global';
  import {loginOutAPI} from '@/api/comment/comments';
  import Cookies from 'js-cookie';
  export default {
    data() {
      return {
        userType:null,
        uploadUrl: uploadUrl,
        id: null,
        resourceForm: {
          img: null,
          nickName: null,
        },
        isShowInput: false,
        searchVal: '',
        havMessage: null,
      }
    },
    components: {
      Footer
    },
    mounted(){
      this.getMessage()
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

        if (this.$refs.input.style.display == 'block') {
          if (this.searchVal != '') {
            let obj = {
              language: '',
              content: this.searchVal,
            };
            this.$store.commit('searchFun', obj)
            this.$router.push({path: '/theory'})
          } else {
            this.$refs.input.style.display = 'none';
          }
          /*this.$refs.input.style.display = 'none';*/
        } else {
          this.$refs.input.style.display = 'block';
        }
        this.isShowInput = !this.isShowInput;
      },
      /*退出*/
      signOut() {
        loginOutAPI().then(res => {
          if (res.data.status) {
            this.$message.success("退出登录！")
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
            this.$router.push("login")
          } else {
            this.$message.error(res.data.msg)
          }
        })

      },
    }
  }
</script>

<style lang="less">
.nation_message{
      position: relative;
      i{
        position: absolute;
        right:0;
        top: 40px;
        height: 5px;
        width: 5px;
        border-radius: 50%;
        background: red;
      }
    }
  .header_box {
    width: 100%;
    height: 100px;
    background-image: url(../../assets/images/personal/top-bg.png);
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

          &:not(first-child) {
            margin-right: 5px;
          }
          &:nth-child(3) {
            margin-left: 8px;
          }
          &:nth-child(4) {
            margin-right: 10px;
          }
          input.search_input {
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
          img {
            vertical-align: middle;
            line-height: 2px;
          }
          span, a {
            margin-right: 5px;
          }
        }
        .searchInput {
          position: absolute;
          right: 10px;

        }
      }
    }

  }

  .center_box {
    font-size: 14px;
    height: auto;
    margin: 0 auto;
    background-color: #f5f5f5;
  }

  .flex_box {
    display: flex;
    display: -webkit-flex;
    flex-flow: row;
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 12px;
  }

  .right_box {
    flex: 1;
    margin-top: 12px;
    position: relative;
    // background-color: #fff;
  }

  .left {
    width: 210px;
    margin-right: 10px;
    margin-top: 12px;
    .top {
      width: 210px;
      height: 240px;
      background: #fff;
      text-align: center;
      overflow: hidden;
      .header {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        margin: 14px;
        display: inline-block;
      }
      .name {
        font-size: 16px;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        margin-bottom: 10px;
      }
      .phone {
        color: #AAAAAA;
        font-size: 14px;
        padding-bottom: 18px;
        border-bottom: 1px solid #F5F5F5;
      }
    }
    .bottom-icon {
      width: 100%;
      text-align: center;
      span {
        float: left;
        width: 50%;
        color: #666;
        cursor: pointer;
        box-sizing: border-box;
        height: 40px;
        vertical-align: middle;
        margin-top: 10px;
        &:first-child {
          border-right: 1px solid #F5F5F5;
        }
        // &:hover{
        //   color:#1F77F2;
        // }
      }
      img {
        height: 20px;
        width: 20px;
        margin-bottom: 8px;
      }
    }
    .bottom {
      background: #fff;
      margin-top: 8px;
      padding-bottom: 20px;
      // height: 630px;
      a {
        color: #333333;
      }
      .main {
        color: #333333;
        font-size: 16px;
        font-weight: bold;
        height: 60px;
        line-height: 60px;
        padding-left: 36px;
      }
      .main-set, .account-set {
        border-top: 1px solid #F5F5F5;
        font-size: 16px;
        font-weight: bold;
        padding-top: 26px;
        padding-left: 36px;
        padding-bottom: 10px;
      }
      .account-set {
        margin-top: 20px;
      }
      .list {
        margin-left: 36px;
        line-height: 36px;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
</style>

