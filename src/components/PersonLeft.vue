<template>
  <div class="left">
    <div class="top">
      <img v-if="this.$store.state.userImg&&this.$store.state.userImg!=''" :src="`${uploadUrl}file/?fileName=${this.$store.state.userImg}&isOnLine=true`"  class="header" @click="linkToeditPerson">
      <img v-else src="@/assets/images/home/avatar.jpg" class="header">
      <div class="name">{{this.$store.state.userName}}</div>
      <div class="phone">{{this.$store.state.userPhone?this.$store.state.userPhone:resourceForm.phone}}</div>
      <div class="bottom-icon">
        <router-link to="editPerson">
          <span>
            <p class="bottom-img"></p>
            <p>编辑信息</p>
          </span>
        </router-link>
        <router-link :to="{path: '/set'}">
          <span>
            <p class="bottom_img"></p>
            <p>安全管理</p>
          </span>
        </router-link>
      </div>
    </div>
    <div class="bottom">
      <div class="main"><router-link to="personalIndex">个人主页</router-link></div>
      <div v-if="isShow!=3">
        <div class="main-set">资源管理</div>
        <router-link to="content" :class="routerName=='content'||routerName=='addCont'?'routeName':''"><div class="list">内容管理</div></router-link>
        <router-link to="lesson" :class="routerName=='lesson'||routerName=='addLesson'||routerName=='addContList'?'routeName':''"><div class="list">课程管理</div></router-link>
        <router-link to="video" :class="routerName=='video'||routerName=='addVideo'?'routeName':''"><div class="list">视频管理</div></router-link>
      </div>

      <div class="main-set">内容管理</div>
      <router-link to="order" :class="routerName=='order'?'routeName':''"><div class="list">我的订单</div></router-link>
      <router-link to="bookshelf"  :class="routerName=='bookshelf'?'routeName':''"><div class="list">我的书架</div></router-link>
      <router-link to="favorite" :class="routerName=='favorite'?'routeName':''"><div class="list">我的收藏</div></router-link>
      <router-link to="interest" :class="routerName=='interest'?'routeName':''"><div class="list">我的关注</div></router-link>
      <router-link to="note" :class="routerName=='note'?'routeName':''"><div class="list">我的笔记</div></router-link>
      <router-link to="comment" :class="routerName=='comment'?'routeName':''"><div class="list">我的评论</div></router-link>
      <router-link to="contribute" :class="routerName=='contribute'?'routeName':''"><div class="list" v-if="userType=='1'">我的贡献</div></router-link>
      <router-link to="question" :class="routerName=='question'?'routeName':''"><div class="list">在线提问</div></router-link>
      <router-link to="browsing" :class="routerName=='browsing'?'routeName':''"><div class="list">浏览记录</div></router-link>
      <div class="account-set">账户管理</div>
      <router-link :to="{path:'/editPerson'}" :class="routerName=='editPerson'?'routeName':''"><div class="list">个人信息</div></router-link>
      <router-link to="invoice" :class="routerName=='invoice'?'routeName':''"><div class="list">我的发票</div></router-link>
      <router-link to="account" :class="routerName=='account'?'routeName':''"><div class="list">账户余额</div></router-link>
      <router-link to="set" :class="routerName=='set'?'routeName':''"><div class="list">账户安全</div></router-link>
    </div>
  </div>
</template>
<script>
import { informationAPI } from '@/api/personal/personal_information'
import { log } from 'util';
import { uploadUrl } from '@/utils/global'
import Cookies from 'js-cookie';
import { getAuthenticateAPI } from '@/api/resources.js'
  export default {
      data () {
        return {
          uploadUrl:uploadUrl,
          id: null,
          resourceForm: {
            img: null,
            account: '',
            phone: '',
            id:''
          },
          routerName:'',
          userType:null,
          isShow:null,
        }
      },
      mounted () {
        //console.log("111111111111",this.$route)
        this.routerName=this.$route.name;
        this.getInformation();
        this.userType=Cookies.get('userType');
      },
    watch:{
        $route(){
          this.routerName=this.$route.name;
        },
    },
      methods: {
        linkToeditPerson(){
          //console.log('999999')
          this.$router.push({path:'/editPerson'})
        },
        // 查询个人信息
        getInformation() {
          informationAPI().then(res => {
            let userObj={
              userName:res.data.data.nickName?res.data.data.nickName:res.data.data.account,
              userImg:res.data.data.img,
              userToken:res.data.data.token,
            };
            this.$store.commit('increment',userObj)
            this.resourceForm = res.data.data;
            let myphone = res.data.data.phone.substr(3,4);
            this.resourceForm.phone = res.data.data.phone.replace(myphone, "****");
            this.getAuthenticate(res.data.data.id);
          })
        },
        getAuthenticate(id){
          getAuthenticateAPI(id).then(res=>{
            if(res.data.status){
              this.isShow=res.data.data;
            }
          })
        },
      }
  }
</script>

<style lang="less" scoped>
.left{
  width: 210px;
  margin-right: 10px;
  margin-top: 12px;
  background: #fff;
  .router-link-active{
    .list{
      color: #1F77F2
    }

  }

  .bottom-icon{
    width: 100%;
    text-align: center;
    span{
      float: left;
      width: 50%;
      color: #666;
      cursor: pointer;
      box-sizing: border-box;
      height: 40px;
      vertical-align: middle;
      margin-top: 18px;
      &:first-child{
        border-right: 1px solid #F5F5F5;
        .bottom-img {
          width: 19px;
          height: 19px;
          background-image: url(../assets/images/personal-center/edit.png);
          margin: 0 auto 10px;
        }
        .bottom_img {
          width: 19px;
          height: 19px;
          background-image: url(../assets/images/personal-center/set.png);
          margin: 0 auto 10px;
        }
        p {
          margin-top: 12px;
        }
      }
    }
    img{
      height: 20px;
      width: 20px;
      margin-bottom: 8px;
    }
  }
   .top{
    width: 210px;
    height: 240px;
    background:#fff;
    text-align: center;
    overflow: hidden;
    .header{
      width: 72px;
      height: 72px;
      border-radius: 50%;
      margin: 14px;
      display: inline-block;
      cursor: pointer;
    }
    .name{
      font-size:16px;
      font-weight:bold;
      color:rgba(0,0,0,1);
      margin-bottom: 10px;
    }
    .phone{
      color: #AAAAAA;
      font-size:14px;
      padding-bottom: 18px;
      border-bottom: 1px solid #F5F5F5;
    }

    .router-link-exact-active {
        .bottom-img {
          width: 19px;
          height: 19px;
          background-image: url(../assets/images/personal-center/edit-hover.png) !important;
          margin: 0 auto 10px;
        }
        .bottom_img {
          width: 19px;
          height: 19px;
          background-image: url(../assets/images/personal-center/safety-hover.png) !important;
          margin: 0 auto 10px;
        }
        p {
          color:#1F77F2;
          font-weight: 400;
        }
    }
  }
  .bottom{
    background: #fff;
    margin-top: 8px;
    padding-bottom: 20px;
    .routeName{
      color:#1F77F2;
      font-weight: bold;
    }
    a{
      color: #333333;
    }
    .main{
      color: #333333;
      font-size:16px;
      font-weight:bold;
      height: 60px;
      line-height: 60px;
      padding-left: 36px;
    }
    .main-set,.account-set{
      border-top: 1px solid #F5F5F5;
      font-size:16px;
      font-weight:bold;
      padding-top: 26px;
      padding-left: 36px;
      padding-bottom: 10px;
    }
    .account-set{
      margin-top: 20px;
    }
    .list{
      margin-left: 36px;
      line-height: 36px;
      font-size:14px;
      cursor: pointer;
    }
  }
}
</style>


