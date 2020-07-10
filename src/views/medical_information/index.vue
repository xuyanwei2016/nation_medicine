<template style="height:100%">
    <div id="medical" >
        <div class="medical_header">
            <div class="medical_login">
                <div class="medical_lo">
                  <div class="medical_info"><router-link to="/message" class="index_message">消息<i v-if="havMessage"></i></router-link><span class="medical_line"></span></div>
                  <div class="medical_car" v-if="userType != 2"><router-link to="/shoppingCart" style="margin-top: 0">购物车</router-link><span class="medical_line"></span></div>
                    <div class="medical_car" v-if="!this.$store.state.userToken" @click="linkLogin" style="cursor: pointer">登录<span class="medical_line"></span></div>
                    <div class="medical_img" v-if="this.$store.state.userToken">
                      <div v-if="userType == 2" style="display: inline-block;">
                        <router-link to="/organizationIndex">
                          <img :src=fileUrl(this.$store.state.userImg) style="width:25px; height:25px; border-radius: 50%" v-if="this.$store.state.userImg&&this.$store.state.userImg!=''">
                          <img src="@/assets/images/personal/defoult.png" v-else style="width:25px; height:25px; border-radius: 50%">
                          <span>{{this.$store.state.userName}}</span>
                        </router-link>
                      </div>
                      <div v-else style="display: inline-block;">
                        <router-link to="/personalIndex">
                          <img :src=fileUrl(this.$store.state.userImg) style="width:25px; height:25px; border-radius: 50%" v-if="this.$store.state.userImg&&this.$store.state.userImg!=''">
                          <img src="@/assets/images/personal/defoult.png" v-else style="width:25px; height:25px; border-radius: 50%">
                          <span>{{this.$store.state.userName}}</span>
                        </router-link>
                      </div>
                        <span class="medical_line"></span>
                    </div>
                    <div class="medical_out" @click="signOut">退出</div>
                </div>
            </div>
        </div>
        <div class="medical_logo">
            <div class="medical_log">
              <router-link to="/index">
                <div class="medical_left">
                    <img src="@/assets/images/login/logo.png">
                </div>
              </router-link>
                <div class="medical_right" style="position: relative">
                    <el-input type="text" class="input" placeholder="输入疾病，药方，医书等" @keyup.enter.native="searchBtn" v-model="searchVal" @input="inputVal" maxlength="30"></el-input>
                    <img src="@/assets/images/login/search_icon.png" alt=""  @click="searchBtn">
                    <span class="medical_search" @click="searchBtn">搜索</span>
                  <!--自动补全列表-->
                  <div class="automaticCompletionList"  v-if="isShowcompletion">
                    <ul>
                      <li v-for="(item,index) in completionList" :key="index"><a @click="searchCont(item)">{{item?item.length>20?item.substring(0,20)+'...':item:''}}</a></li>
                    </ul>
                  </div>
                </div>

            </div>
        </div>
        <div class="medical_content" style="position: relative;height: auto;z-index: 0;">
            <img src="@/assets/images/medical/emblazonry-left.png" class="emblazonry_left">
            <div class="medical_main">
                <!--面包屑-->
                <navbar></navbar>
                <div class="medical_sub">
                    <div class="sub_left">
                        <div class="subleft_top">
                            <div class="subline_left"></div>
                                <router-link :to="{path: 'information'}">
                                    <div class="subline_leftMedical" @click="tabColor(1)" :class="index == 1 ? 'bgColor' : ''">医 药 资 讯</div>
                                </router-link>
                                <router-link :to="{path: 'column'}">
                                    <div class="subline_leftMedical" @click="tabColor(2)" :class="index == 2 ? 'bgColor' : ''">考 试 专 栏</div>
                                </router-link>
                                <router-link :to="{path: 'online'}">
                                    <div class="subline_leftMedical" @click="tabColor(3)" :class="index == 3 ? 'bgColor' : ''">在 线 咨 询</div>
                                </router-link>
                        </div>
                        <div class="subleft_bot">
                            <div class="subleft_botTitle">推荐教材</div>
                            <div class="subleft_botLine"></div>
                            <div class="subleft_textbookList" v-for="(book, index) in dataList" :key="index" @mousemove.prevent='mousemove(index)'>
                              <div v-if="isShowBook!=index" class="meDetail_textbookTitle">
                                <div class="textbookList_num">{{index+1}}</div>
                                <div class="commentRight_tip" @click="linkDetail(book.id)">
                                  <div class="textbookList_text">《{{book.name?book.name.length>10?book.name.substr(0,10)+'...':book.name:''}}》</div>
                                </div>
                              </div>

                              <div class="meDetail_textbook" v-if="isShowBook==index">
                                <div class="meDetail_textbook" >
                                  <div class="textbook_number">{{index+1}}</div>
                                  <img v-if="book.bookCover" :src=fileUrl(book.bookCover) class="textbook_img" @click="linkDetail(book.id)">
                                  <img src="@/assets/images/home/no-cover.jpg" class="textbook_img" v-else>
                                  <div class="commentRight_tip" @click="linkDetail(book.id)">
                                    <div class="textbook_title">《{{book.name?book.name.length>12?book.name.substr(0,12)+'...':book.name:''}}》</div>
                                    <div class="textbook_author">{{book.author?book.author.length>5?book.author.substr(0,5)+'...':book.author:''}}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>

                    <router-view></router-view>
                </div>
            </div>
            <img src="@/assets/images/medical/emblazonry-right.png" class="emblazonry_right">
        </div>

        <commentFoot></commentFoot>
    </div>
</template>

<script>
import "@static/css/medical_information/index.less"
import "@static/css/common.less"
import Cookies from 'js-cookie';
import commentFoot from '@/components/commentFoot'
import navbar from '../../components/navbar.vue';
import { messageAPI } from '@/api/common'
import {recommendAPI,searchListAPI,loginOutAPI} from '../../api/comment/comments';


export default {
  name: 'medical',
  components: { commentFoot, navbar },
  data() {
    return {
      index: null,
      dataList:[],
      isShowBook:null,
      searchVal:'',
      isShowcompletion:false,
      completionList:[],
      author: '',
      userType: null,
      userToken: "",
      havMessage: null,
    }
  },
  created() {
    this.getRecommend();
    if(Cookies.get("userType") || Cookies.get("userToken")) {
      this.userType = Cookies.get("userType")
      this.userToken = Cookies.get("userToken")
    }

  },
  mounted() {
    this.getMessage()
    if (!this.index) {
      this.index = this.$route.query.pageType;
    } else {
      this.index = 1
    }
    if (Cookies.get('medical')) {
      this.index = Cookies.get('medical')
    }
  },
  destroyed() {
    Cookies.remove('medical')
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
    tabColor(index) {
      this.isShowcompletion = false;
      this.index = index
      Cookies.set('medical', index)
    },
    /*获取推荐教材*/
    getRecommend(){
      recommendAPI({
        code:'HOME_5',
        num:8
      }).then(res=>{
        this.dataList=res.data.data.recommendResourceList;
      })
    },
    /*跳转*/
    linkDetail(id){
      this.id=id;
      this.$router.push({path: '/medetails', query: {id: id}})
    },
    /*推荐教材*/
    mousemove(index){
      this.isShowBook=index;
      console.log(this.isShowBook,"ooo");
    },
    /*移出*/
    // mouseoutItem(){
    //   this.isShowBook=null;
    //   console.log(this.isShowBook,"ppppp");
    // },
    /*搜索输入框*/
    inputVal(){
      if(this.searchVal!=''){
        searchListAPI({
          content:this.searchVal
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
          this.$router.push({path: '/login'})
        }else{
          this.$message.error(res.data.msg)
        }
      })

    },
    linkLogin(){
      this.$router.push("/login")
    },
    /*点击自动补全内容*/
    searchCont(val){
      this.isShowcompletion = false;
      this.searchVal = val;
      this.searchBtn(id);
    },
    /*搜索按钮*/
    searchBtn(item){
      if(this.searchVal!=''){
        let obj={
          language:'',
          content:this.searchVal,
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
  }
};
</script>

<style lang="less">
    .subline_leftMedical {
        padding: 0 !important;
        background-image: url(../../../src/assets/images/medical/list-li.png);
        text-align: center;
        height: 30px;
        line-height: 28px;
        font-size: 20px;
        font-family:FZFSK--GBK1-0;
        color: #333;
        cursor: pointer;
        &:hover {
            background-image: url(../../../src/assets/images/medical/list-li-hover.png) !important;
            color: #095FCA !important;
        }
    }

    .bgColor {
         background-image: url(../../../src/assets/images/medical/list-li-hover.png) !important;
         color: #095FCA !important;
    }

    .medical_main .sub_left .subleft_bot .subleft_textbookList{ margin-top: 16px !important;}





</style>
<style scoped lang="less">
.index_message{
      position: relative;
      i{
        position: absolute;
        right:0;
        top: 6px;
        height: 5px;
        width: 5px;
        border-radius: 50%;
        background: red;
      }
    }
    .subleft_top  a {
        margin-top: 26px;
        display: inherit;
        text-decoration: none;
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
          li{ display: block;
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
