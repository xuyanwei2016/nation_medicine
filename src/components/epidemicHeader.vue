<template>
    <div class="epidemicHeader">
      <div class="title">
        <div class="titCenter">
          <router-link to="/"><img src="../assets/images/epidemic/logo.png" alt=""></router-link>
          <div class="search" v-if="$route.name=='epidemicSearch'">
            <input type="text" placeholder="中医药数据海量查询" v-model="content">
            <div class="button" @click="searchBtn">
              <img src="../assets/images/epidemic/fdj.png" alt="">
              <span>搜索</span>
            </div>
          </div>
          <div class="right" v-if="!token"><h1 @click="$router.push('/login')">登录</h1><h2 @click="$router.push('/register')">注册</h2></div>
          <div class="right" v-if="token">
            <h1>{{userName}}</h1>
            <h2  @click="signOut">退出</h2>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { loginOutAPI } from '@/api/comment/comments';
  import Cookies from 'js-cookie';
  export default {
    name: 'HelloWorld',
    data () {
      return {
        content:'',
      }
    },
    created () {
      this.content=this.$route.query.val||'';
    },
    watch: {},
    computed: {
      token () {  //通过方法访问
        return this.$store.state.userToken;
      },
      userName () {  //通过方法访问
        return Cookies.get('userName');
      },
      userName () {  //通过方法访问
        return Cookies.get('userName');
      },
    },
    methods: {
      /*搜索*/
      searchBtn(){
        /*if(this.content.trim()==''){
          console.log(222222)*/
          this.$router.push({name:'epidemicSearch',query:{val:this.content.trim()||null,type:this.$route.query.type||null}});
        /*}else{
          this.$router.push({name:'epidemicSearch',query:{val:this.content.trim(),type:this.$route.query.type}});
        }*/
      },
      /*退出*/
      signOut() {
        loginOutAPI().then(res => {
          if (res.data.status) {
            this.$message.success("退出登录！")
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
          } else {
            this.$message.error(res.data.msg)
          }
        })

      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  ul,li,h1,h2,h3,h4,h5,p,span,div{margin: 0;padding: 0;list-style: none}
.epidemicHeader{
  width: 100%;
  .title{
    width: 100%;
    background: url("../assets/images/epidemic/top-bg.png") no-repeat;
    height: 86px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    min-width: 1200px;
    .titCenter{
      width: 1200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img{width: 496px;height: 64px;}

      .search{
        background: url("../assets/images/epidemic/bg_search.png") no-repeat;
        width: 455px;
        height: 50px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 30px;
        input{
          margin-left: 20px; width:280px;
          height: 30px;
          line-height: 30px;
          border: none;
          outline:0px;
        }
        input::-webkit-input-placeholder { /* WebKit browsers */
          color: #9E7B4B;
        }

        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #9E7B4B;
        }

        input::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #9E7B4B;
        }

        input:-ms-input-placeholder { /* Internet Explorer 10+ */
          color: #9E7B4B;
        }

        .button{
          background: url("../assets/images/epidemic/bg.png") no-repeat center;
          width: 123px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          cursor: pointer;
          border-left:1px solid #D7CBBB;
          border-image: -webkit-linear-gradient(rgba(255,255,255,0), #D7CBBB, rgba(255,255,255,0))1 10 1;
          border-image: -moz-linear-gradient(rgba(255,255,255,0), #D7CBBB, rgba(255,255,255,0))1 10 1;
          border-image: linear-gradient(rgba(255,255,255,0), #D7CBBB, rgba(255,255,255,0))1 10 1;
          padding-left: 13px;
          margin-right: 7px;
          img{
            width: 15px;
            height: 13px;
            margin-left: 11px;
            margin-right: 7px;
          }
          span{
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(248,244,244,1);
            height: 18px;
            line-height: 18px;
          }

        }
      }

      .right{
        display: flex;
        align-items: center;
        font-family:Microsoft YaHei;
        color:rgba(252,242,235,1);
        h1,h2{font-size:14px;font-weight:400;height: 14px; line-height: 14px;cursor: pointer}
        h1{border-right: 1px solid #FCF2EB;padding-right: 13px;margin-right: 13px;}
      }
    }
  }
}
</style>
