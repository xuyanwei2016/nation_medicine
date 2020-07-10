<template>
  <div class="comments">
    <div class="userother_bg">
      <div class="userother_header">
        <div class="medical_login">
          <div class="medical_lo" v-if="userToken != null">
            <div class="medical_info" @click="messagePage()">消息<i v-if="havMessage"></i>&nbsp;&nbsp;|</div>
            <div v-if="userType!='2'" class="medical_car" @click="shopping">购物车&nbsp;&nbsp;|</div>
            <div class="medical_car" v-if="!this.$store.state.userToken">
              <router-link to="/login" style="color: #8399AF;">登录</router-link>|
            </div>
            <div class="medical_car" v-if="!this.$store.state.userToken">
              <router-link to="/register" style="color: #8399AF;">注册</router-link>
            </div>
            <div class="medical_img" v-if="this.$store.state.userToken">
              <div v-if="userType=='2'" style="display:inline-block">
                <router-link to="/organizationIndex">
                  <img :src="fileUrl(this.$store.state.userImg)" class="medical_head" v-if="this.$store.state.userImg&&this.$store.state.userImg!=''">
                  <img src="@/assets/images/home/avatar.jpg" class="medical_head" v-else>
                  <span>{{this.$store.state.userName}}</span>
                </router-link>|
              </div>
              <div v-else style="display:inline-block">
                <router-link to="/personalIndex">
                  <img :src="fileUrl(this.$store.state.userImg)" class="medical_head" v-if="this.$store.state.userImg&&this.$store.state.userImg!=''">
                  <img src="@/assets/images/home/avatar.jpg" class="medical_head" v-else>
                  <span>{{this.$store.state.userName}}</span>
                </router-link>|
              </div>
            </div>
            <div class="medical_out" @click="signOut" v-if="this.$store.state.userToken">退出</div>
          </div>
        </div>
      </div>
    </div>

    <div class="commentHeader_banner">
      <div class="answer_log">
        <div class="answer_left">
          <router-link to="/index">
            <img src="@/assets/images/login/logo.png">
          </router-link>
          <span class="nation_line"></span>
          <div class="nation_select" @click.stop="selectNa">
            {{passObj.national}}
            <img src="@/assets/images/medical/nation-select.png">
          </div>
          <div class="nationBg" v-if="isShowNation" @click.stop="">
            <div class="nationBgdashed" @click.stop="selectNa">
              {{passObj.national}}
              <img src="@/assets/images/home/nationTop.png">
            </div>
          </div>
          <div class="nationCont" v-if="isShowNation">
            <ul>
              <li @click="selectAll()">全部</li>
              <li @click="selectNation(val)" v-for="(val,ind) in natList" :key="ind">{{val}}</li>
            </ul>
          </div>
        </div>
        <div class="answer_right">
          <div class="answer_select" @click="languageIS">{{languageValue}}</div>
          <img src="@/assets/images/medical/language-select.png" class="language_select" @click="languageIS">
          <div class="select_line"></div>
          <el-input style="border: none;" type="text" placeholder="输入疾病，药方，医书等" v-model="passObj.searchVal" @input="inputVal" maxlength="30" @keyup.enter.native="searchBtn"></el-input>
          <img src="@/assets/images/login/search_icon.png" class="answer_imge" @click="searchBtn">
          <!--蒙文汉文-->
          <div class="answerLanguages" v-if="isShowlanguage">
            <ul>
              <li v-for="(item,index) in languagesList" :key="index" @click="languagesBtn(item)">{{item}}</li>
            </ul>
          </div>
        </div>
        <!--自动补全列表-->
        <div class="automaticCompletionList" v-if="isShowcompletion">
          <ul>
            <li v-for="(item,index) in completionList" :key="index" ><a @click="searchCont(item)">{{item?item.length>20?item.substring(0,20)+'...':item:''}}</a></li>
          </ul>
        </div>
      </div>
      <div class="bannerBg"></div>
    </div>
  </div>
</template>

<script>
import { nationalListAPI, loginOutAPI, searchListAPI,  resourceSearchAPI } from "@/api/comment/comments";
import { messageAPI } from '@/api/common'
import Cookies from "js-cookie";

export default {
  data() {
    return {
      isShowNation: false,
      natList: {},
      passObj: {
        searchVal: this.$store.state.search.content,
        national: "",
        nationalNum: null,
        languageValue: ""
      },
      userName: "",
      userImg: "",
      userToken: "",
      searchWord: "",
      completionList: [],
      isShowcompletion: false,
      languagesList: ["汉文", "蒙文"],
      languageValue: "汉文",
      isShowlanguage: false,
      userType: null,
      havMessage: null,
    };
  },
  props: {
    nationsType:{
      type:Number
    }
  },
  created() {
    this.nationalList();
    this.selectAll()
    if (Cookies.get("userImg") || Cookies.get("userName") && Cookies.get("Y-Token") && Cookies.get("userType")) {
      this.userImg = Cookies.get("userImg");
      this.userName = Cookies.get("userName");
      this.userToken = Cookies.get("Y-Token");
      this.userType = Cookies.get("userType");
      console.log(1132132132);

    }
  },
  mounted () {

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
    /*获取民族*/
    nationalList(num) {
      nationalListAPI().then(res => {
        this.natList = res.data.data;
        let curNum = 0;
        for (let val in this.natList) {
          if (this.$route.query.nationalNum == val) {
            this.passObj.national = this.natList[val];
          }
          else {
            if(this.nationsType){
              this.passObj.national = this.natList[this.nationsType];
            }

          }
          curNum++;
        }
        this.$emit("childByValue", this.passObj);
        console.log(this.passObj.national,'525252525252');

      });
    },
    // 全部
    selectAll() {
      this.passObj.national = '全部';
      this.isShowNation = false
      this.$emit('changeNa',this.passObj.national)
    },
    // 搜索
    searchBtn() {
      if (this.passObj.searchVal != "") {
        let obj = {
          language: this.passObj.languageValue,
          content: this.passObj.searchVal
        };
        if(obj.language == 50) {
          // this.$store.commit("searchFun", obj);
          this.$router.push({path: '/mongoliaArticle'})
        } else {
          this.$store.commit("searchFun", obj);
          this.$router.push({ path: "/theory" });
        }
      } else if(this.passObj.searchVal == '' && this.$route.name == 'theory') {
        let obj = {
          language: this.passObj.languageValue,
          content: '',
        };
        this.$store.commit("searchFun", obj)
      }
    },
    /*选择民族*/
    selectNa() {
      this.isShowNation = !this.isShowNation;
    },
    selectNation(item) {
      this.passObj.national = item;
      for (let val in this.natList) {
        if (item == this.natList[val]) {
          this.passObj.nationalNum = val;
          this.$router.push({path: '/mongolia', query: {id: this.passObj.nationalNum,code:val}})
        }
      }
      // this.$emit("childByValue", this.passObj);
    },
    shopping() {//购物车
      if(this.$store.state.userToken){//判断是否登录
        this.$router.push('/shoppingCart')
      } else{
        this.$router.push('/login')
      }
    },
    // 消息
    messagePage() {
      if(this.$store.state.userToken){//判断是否登录
        this.$router.push('/message')
      } else{
        this.$router.push('/login')
      }
    },
    /*退出*/
    signOut() {
      loginOutAPI().then(res => {
        if (res.data.status) {
          this.$message.success("退出登录！");
          Cookies.remove("Y-Token");
          Cookies.remove("userName");
          Cookies.remove("userImg");
          Cookies.remove("userType");
          Cookies.remove("userId");
          Cookies.remove('authorId');
          this.userImg = "";
          this.userName = "";
          this.userToken = "";
          let userObj = {
            userName: "",
            userImg: "",
            userToken: "",
            userType:'',
          };
          this.$store.commit("increment", userObj);
          this.$store.commit('setUserId', '')
          this.$router.push({ path: "/login" });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    /*搜索输入框*/
    inputVal() {
      if (this.passObj.searchVal != "") {
        searchListAPI({
          content: this.passObj.searchVal
        }).then(res => {
          this.completionList = res.data.data;
          if (res.data.data.length > 0) {
            this.isShowcompletion = true;
          } else {
            this.isShowcompletion = false;
          }
        });
      } else {
        let obj = {
          language: this.passObj.languageValue,
          content: this.passObj.searchVal
        }
        this.$store.commit('searchFun', obj)
        this.isShowcompletion = false;
      }
    },
    /*语言*/
    languagesBtn(item) {
      this.languageValue = item;
      this.passObj.languageValue = item == "蒙文" ? "50" : "";
      this.isShowlanguage = false;
    },
    /*点击自动补全内容*/
    searchCont(val) {
      this.isShowcompletion=false;
      this.passObj.searchVal=val;
      this.searchBtn();
      /*this.$router.push({ path: "/theory", query: { val: val } });*/
    },
    languageIS() {
      this.isShowlanguage = !this.isShowlanguage;
    }
  }
};
</script>

<style lang="less" scoped>
.comments {
  width: 100%;
  .userother_bg {
    background-color: #f7fafd;
    .userother_header {
      .medical_header {
        width: 100%;
        height: 34px;
        line-height: 34px;
        background: #f7fafd;
      }

      .medical_login {
        width: 1200px;
        height: 34px;
        line-height: 34px;
        margin: 0 auto;
        text-align: right;
      }
      .medical_head {
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
      .medical_lo {
        float: right;
        color: #8399AF;
        .medical_line {
          width: 1px;
          height: 16px;
          display: inline-block;
          margin: 4px 8px -3px;
          background: #8399af;
        }
      }

  .topCon{
    width: 1200px;
    height: 38px;
    margin: 0 auto;
    line-height: 38px;
  }
  .loginInfo{
    float: right;
    color: #3D6EE6;
    cursor: pointer;
    span{
      margin: 5px;
    }
  }
  .loginName{
    float: right;
    span{
      float: left;
      cursor: pointer;
    }
    img{
      height: 30px;
      width: 30px;
      object-fit: cover;
      border-radius: 50%;
      margin-right:4px;
      float: left;
      margin-top: 2px;
    }
  }
  .message{
    float: right;
    margin-right: 26px;
    color: #666666;
    cursor: pointer;
    span{
      margin-right: 26px;
    }
    img{
      height: 16px;
      width: auto;
      margin-right: 5px;
      display: inline-block;
      vertical-align: middle;
    }
    .index_message{
      position: relative;
      i{
        position: absolute;
        right:0;
        top: 0;
        height: 5px;
        width: 5px;
        border-radius: 50%;
        background: red;
      }
    }
  }
      .medical_info,
      .medical_car,
      .medical_img,
      .medical_out {
        float: left;
        color: #8399af;
        cursor: pointer;
        margin: 0 5px;
        a {
          margin-right: 6px;
        }
      }

      .medical_info {
        position: relative;
        i {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: red;
          top: 8px;
          right: 10px;
        }
      }

    }
  }

  .commentHeader_banner {
    width: 100%;
    height: 113px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(1, 2, 2, 0.05);
    position: relative;
    .answer_log {
      width: 1200px;
      height: 100px;
      line-height: 100px;
      margin: 0 auto;
      position: relative;
      .answer_left {
        float: left;
        position: relative;

        .nation_line {
          display: inline-block;
          width: 1px;
          height: 35px;
          background-color: #2473d6;
          position: absolute;
          top: 34px;
          left: 284px;
        }
        .nation_select {
          cursor: pointer;
          width: 97px;
          height: 37px;
          line-height: 37px;
          background-image: url(../../src/assets/images/medical/nation-border.png);
          position: absolute;
          top: 34px;
          left: 294px;
          text-align: center;
          color: #4686d7;
          img {
            cursor: pointer;
          }
        }
        .nationBg {
          cursor: pointer;
          color: #4686d7;
          width: 87px;
          background: #ffffff;
          height: 33px;
          line-height: 24px;
          text-align: center;
          border-top: 1px solid #98bdec;
          border-left: 1px solid #98bdec;
          border-right: 1px solid #98bdec;
          position: absolute;
          top: 38px;
          left: 298px;
          z-index: 13;
          .nationBgdashed {
            width: 85px;
            height: 31px;
            border-top: 1px #4084da dashed;
            border-left: 1px #4084da dashed;
            border-right: 1px #4084da dashed;
          }
        }
        .nationCont {
          color: #4686d7;
          position: absolute;
          width: 169px;
          border: 1px solid #98bdec;
          background: #fff;
          overflow: hidden;
          z-index: 12;
          top: 70px;
          left: 298px;
          ul,
          li {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          ul {
            width: 139px;
            border: 1px #4084da dashed;
            display: block;
            overflow: hidden;
            padding: 5px 14px;

            li {
              float: left;
              display: block;
              width: 50%;
              line-height: 40px;
              cursor: pointer;
            }
          }
        }
      }
      .answer_right {
        float: left;
        width: 364px;
        height: 42px;
        line-height: 40px;
        margin-top: 30px;
        margin-left: 564px;
        background: url(../../src/assets/images/login/search.png);
      }
      .answerLanguages {
        position: absolute;
        top: 77px;
        background: #fff;
        width: 72px;
        height: auto;
        z-index: 111;
        color: #777;
        ul,
        li {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        ul {
          padding-left: 20px;
          padding-bottom: 15px;
          li {
            line-height: 30px;
            height: 30px;
            cursor: pointer;
          }
        }
      }
      .automaticCompletionList {
        position: absolute;
        right: 0;
        top: 90px;
        z-index: 111;
        width: 366px;
        height: auto;
        padding-bottom: 20px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 10px 0px rgba(36, 115, 214, 0.2);
        border-radius: 4px;
        ul,
        li {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        ul {
          padding: 20px 27px 0 20px;
          li {
            display: block;
            width: 100%;
            line-height: 34px;
            cursor: pointer;
            a:hover {
              color: #2473d6;
            }
          }
        }
      }

      .answer_select {
        float: left;
        padding-left: 6px;
        color: #395a99;
        font-weight: 400;
        margin-right: 8px;
        cursor: pointer;
      }

      .language_select {
        float: left;
        margin-top: 15px;
        cursor: pointer;
      }

      .select_line {
        float: left;
        width: 1px;
        height: 12px;
        background-color: #aeaeae;
        margin-top: 14px;
        margin-left: 16px;
      }

      .answer_right input {
        height: 24px;
        width: 260px;
        padding-left: 10px;
        background-color: #ffffff;
        border: none;
        color: #2473D6;
      }

      .answer_imge {
        cursor: pointer;
        margin-top: -15px;
      }

      .answer_search {
        width: 29px;
        height: 12px;
        font-weight: bold;
        color: #2473d6;
        cursor: pointer;
      }
    }
    .bannerBg {
      width: 100%;
      height: 13px;
      background: url("../assets/images/login/top-bg.png") bottom repeat-x;
      position: absolute;
      bottom: -4px;
    }

    .mongolia_bcon {
      width: 1551px;
      height: 384px;
      background: rgba(255, 255, 255, 0.63);
      margin-left: 18.5%;
      margin-top: 58px;
    }
  }
}

</style>
<style>
  .comments .el-input {
    width: 270px !important;
    height: 24px !important;
    margin-top: 8px !important;
  }
  .comments .el-input__inner {
    border: none !important;
    float: left;
  }

</style>

