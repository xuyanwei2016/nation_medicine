<template>
    <div id="nationList">
        <div class="medical_header">
            <div class="medical_login">
                <div class="medical_lo">
                  <div class="medical_info"><router-link to="/message" style="color: #8399AF;" class="nation_message">消息<i v-if="havMessage"></i></router-link><span class="medical_line"></span></div>
                  <div class="medical_car"><router-link to="/shoppingCart" style="color: #8399AF;">购物车</router-link><span class="medical_line"></span></div>
                  <div class="medical_car" v-if="!this.$store.state.userToken"><router-link to="/login" style="color: #8399AF;">登录</router-link><span class="medical_line"></span></div>
                    <div class="medical_img" v-if="this.$store.state.userToken">
                      <router-link to="/personalIndex" style="color:#8399AF">
                        <img :src=fileUrl(this.$store.state.userImg) style="width: 25px;height:25px; border-radius: 50%; margin-right: 5px;" v-if="this.$store.state.userImg&&this.$store.state.userImg!=''">
                        <img src="@/assets/images/personal/defoult.png" style="width: 25px;height:25px; border-radius: 50%; margin-right: 5px;" v-else>
                        <span>{{this.$store.state.userName}}</span></router-link>
                        <span class="medical_line"></span>
                    </div>
                    <div class="medical_out" v-if="this.$store.state.userToken"  @click="signOut">退出</div>
                    <div class="medical_out" v-if="!this.$store.state.userToken"><router-link to="/register" style="color: #8399AF;">注册</router-link></div>
                </div>
            </div>
        </div>

        <div class="medical_logo">
            <div class="medical_log">
                <div class="medical_left">
                    <router-link to="/index"><img src="@/assets/images/login/logo.png"></router-link>
                </div>
                <div class="medical_right">
                    <el-input type="text" class="input" placeholder="输入疾病，药方，医书等"  v-model="searchValue"  @input="inputVal" maxlength="30" @keyup.enter.native="searchBtn"></el-input>
                    <img src="@/assets/images/login/search_icon.png" style="margin-top: -15px; margin-left: 10px;"  @click="searchBtn">
                    <span class="medical_search"  @click="searchBtn">搜索</span>
                  <div class="automaticCompletionList" v-if="isShowcompletion">
                    <ul>
                      <li v-for="(item,index) in completionList" :key="index"><a @click="searchBtn(item)">{{item}}</a></li>
                    </ul>
                  </div>
                </div>

            </div>
        </div>

        <div class="medical_content" style="position: relative; z-index: 0; padding-bottom: 20px;">
            <img src="@/assets/images/medical/emblazonry-left.png" class="emblazonry_left">
            <div class="medical_main">
                <!--面包屑-->
                <navbar></navbar>

                <div class="nation_con">
                    <div class="nation_conTop">
                        <img src="@/assets/images/home/minzu-list-tit.png">
                    </div>

                    <div class="nation_conBot">
                        <div class="nation_wrap">
                            <div v-if="list.length != 0">
                                <div class="nation_li" v-for="item in list" :key="item.id">

                                    <div class="nation_conliLeft">
                                        <router-link :to="{path: '/mongolia', query: {id: item.nationsType}}">
                                          <img :src="`${uploadUrl}file/?fileName=${item.coverImg}&isOnLine=true`"  :onerror="errorImg()">
                                          <div class="nation_conTip">{{item.nationalName}}医药</div>
                                        </router-link>
                                    </div>

                                    <div class="nation_conlitext">
                                      <router-link :to="{path: '/mongolia', query: {id: item.nationsType}}">
                                        <div class="nation_title">{{item.nationalName}}医药</div>
                                      </router-link>
                                      <div class="nation_line"></div>
                                      <div class="nation_text" v-html="item.synopsis.length > 95 ? item.synopsis.substr(0,95) + '...' : item.synopsis"></div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="nation_wrap_no">
                                <img src="@/assets/images/home/no-content.jpg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img src="@/assets/images/medical/emblazonry-right.png" class="emblazonry_right">
        </div>

        <commentFoot></commentFoot>
    </div>
</template>

<script>
import "@static/css/medical_information/index.less"
import "@static/css/home/nation.less"
import commentFoot from '@/components/commentFoot'
import {searchListAPI,loginOutAPI} from '@/api/comment/comments';
import { getListAPI } from '@/api/home/nation.js'
import { messageAPI } from '@/api/common'
import { uploadUrl } from '@/utils/global';
import Cookies from 'js-cookie';
import navbar from '@/components/navbar.vue';

export default {
    name: 'nation',
    components: { commentFoot, navbar },
    data () {
        return {
          list: [],
          uploadUrl:uploadUrl,
          searchValue:'',
          isShowcompletion:false,
          havMessage: null,
        }
    },
    mounted () {
        this.getList()
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
        // 获取列表
        getList() {
            getListAPI().then(res => {
                console.log(res);
                if(res.data.code === 0) {
                    this.list = res.data.data.list;

                    // this.list.nationalName = res.data.data.list.map(item => {
                    //     // console.log(item);
                    //     this.list.nationalName = item.nationalName + '医药'
                    //     return this.list.nationalName
                    //     console.log(this.list.nationalName);

                    // })
                    // console.log(this.list.nationalName);


                }
            })
        },
      /*搜索输入框*/
      inputVal(){
        if(this.searchValue!=''){
          searchListAPI({
            content:this.searchValue
          }).then(res=>{
              this.completionList=res.data.data;
              if(res.data.data.length>0){
                this.isShowcompletion=true;
              }else{
                this.isShowcompletion=false;
              }
            }
          )
        }else{
          this.isShowcompletion=false;

        }


      },
      /*搜索按钮*/
      searchBtn(item){
        if(this.searchValue!=''){
          let obj={
            language:'',
            content:this.searchValue,
          };
          this.$store.commit('searchFun',obj)
          this.$router.push({path:'/theory'})
        }else if(item&&item!=''){
          this.isShowcompletion=false;
          this.searchVal=item;
          let obj={
            language:'',
            content:item,
          };
          this.$store.commit('searchFun',obj)
          this.$router.push({path:'/theory'})
        }
      },
      /*退出*/
      signOut(){
        loginOutAPI().then(res=>{
          if(res.data.status){
            this.$message.success("退出登录！")
            Cookies.remove('Y-Token');
            Cookies.remove('userName');
            Cookies.remove('userImg');
            Cookies.remove('userType');
            Cookies.remove('userId');
            Cookies.remove('authorId');
            let userObj={
              userName:'',
              userImg:'',
              userToken:'',
              userType:'',
            };
            this.$store.commit('increment',userObj)
          }else{
            this.$message.error(res.data.msg)
          }
        })

      },
    }
}
</script>

<style lang="less" scoped>

.nation_message{
      position: relative;
      i{
        position: absolute;
        right:0;
        top: 8px;
        height: 5px;
        width: 5px;
        border-radius: 50%;
        background: red;
      }
    }
  .medical_right{
    position: relative;
    .automaticCompletionList{
      position: absolute;
      right:23px;
      top:45px;
      z-index: 111;
      width:341px;
      height:auto;
      padding-bottom: 20px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 10px 0px rgba(36,115,214,0.2);
      border-radius:4px;
      ul,li{ list-style: none; margin: 0; padding: 0}
      ul{
        padding: 20px 27px 0 20px;
        li{
          display: block;
          width:100%;
          line-height: 34px;
          cursor: pointer;
          a:hover{
            color: #2473D6;}

        }
      }
    }
  }
</style>
<style>
  #nationList .el-input {
    width: 302px !important;
    height: 24px !important;
    margin-top: 8px !important;
  }

  #nationList .el-input__inner {
    border: none !important;
    float: left;
  }
</style>
