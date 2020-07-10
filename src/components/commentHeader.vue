<template>
  <div class="comments"><!-- @click="isShowNation=false"-->
    <div class="commentHeader_login">
      <div class="commentTop">
        <p class="mongolia_cart">/
          <router-link v-if="userType && userType!='2'" to="/shoppingCart" style="color: #666666;"><img
            src="@/assets/images/homepage/shopping.png"><span>购物车</span></router-link>
        </p>
        <p class="mongolia_loginInfo"><span class="quit" v-if="!this.$store.state.userToken"><router-link to="/login" style="color: #666666;">登录</router-link></span>/<span class="mongolia_message" v-if="!this.$store.state.userToken"><router-link to="/register" style="color: #666666;">注册</router-link></span><span class="mongolia_message" @click="signOut" v-if="this.$store.state.userToken">退出</span>/<span class="mongolia_message"><router-link to="/message"
                                                                                                          style="color: #666666;">消息<i v-if="havMessage"></i></router-link></span>
        </p>

        <p class="mongolia_img" v-if="this.$store.state.userToken">
          <router-link  v-if="userType && userType=='2'" to="/organizationIndex">
            <img :src=fileUrl(this.$store.state.userImg) v-if="this.$store.state.userImg&&this.$store.state.userImg!=''">
            <img src="@/assets/images/home/avatar.jpg" v-else>
            <span>{{this.$store.state.userName}}</span>
          </router-link>
          <router-link v-else to="/personalIndex">
            <img :src=fileUrl(this.$store.state.userImg) v-if="this.$store.state.userImg&&this.$store.state.userImg!=''">
            <img src="@/assets/images/home/avatar.jpg" v-else>
            <span>{{this.$store.state.userName}}</span>
          </router-link>
        </p>
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
          <el-input type="text" placeholder="输入疾病，药方，医书等" v-model="passObj.searchVal" @input="inputVal" maxlength="30" @keyup.enter.native="searchBtn"></el-input>

          <img src="@/assets/images/login/search_icon.png" class="answer_imge" @click="searchBtn">
        </div>
        <!--蒙文汉文-->
        <div class="answerLanguages" v-if="isShowlanguage">
          <ul>
            <li v-for="(item,index) in languagesList" :key="index" @click="languagesBtn(item)">{{item}}</li>
          </ul>
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
  /*  import "@static/css/home/mongolia.less"
    import "@static/css/index.less";*/
  import {nationalListAPI, loginOutAPI, searchListAPI, resourceSearchAPI} from '../api/comment/comments';
  import Cookies from 'js-cookie';
import {messageAPI } from '@/api/common'

  export default {
    data() {
      return {
        isShowNation: false,
        natList: {},
        passObj: {
          searchVal: this.$store.state.search.content,
          national: '',
          nationalNum: null,
          languageValue: '',
        },
        userName: '',
        userImg: '',
        userToken: '',
        searchWord: '',
        completionList: [],
        isShowcompletion: false,
        languagesList: ["汉文", "蒙文"],
        languageValue: '汉文',
        isShowlanguage: false,
        userType: null,
        nationsType: null,
        havMessage: null,
      }
    },
    created() {
      this.selectAll()
      this.nationalList();
      this.getMessage()
      if (Cookies.get('userImg') && Cookies.get('userName') && Cookies.get('Y-Token')) {
        this.userImg = Cookies.get('userImg');
        this.userName = Cookies.get('userName');
        this.userToken = Cookies.get('Y-Token');
        this.userType=Cookies.get('userType');
      }
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
      nationalList() {
        nationalListAPI().then(res => {
          this.natList = res.data.data;
          console.log("00000000000",this.natList);
          let curNum = 0;
          for (let val in this.natList) {
            if(this.$route.query.nationalNum == val){
              this.passObj.national = this.natList[val]
            }
            curNum++;
          }
          this.$emit('childByValue', this.passObj)
        })
      },
      // 搜索
      searchBtn() {
        if (this.passObj.searchVal != '') {
          let obj = {
            language: this.passObj.languageValue,
            content: this.passObj.searchVal,
          };
          if(obj.language == 50) {
            this.$router.push({path: '/mongoliaArticle'})
          } else {
            this.$store.commit('searchFun', obj)
            this.$router.push({path: '/theory'})
            console.log(this.$store.state.search);

          }
        }else if(this.passObj.searchVal == ''&&this.$route.name=='theory'){
          let obj = {
            language: this.passObj.languageValue,
            content: '',
          };
          this.$store.commit('searchFun', obj)

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
        /*this.$emit('childByValue', this.passObj)*/
      },
      selectAll() {
        this.passObj.national = '全部';
        this.isShowNation = false
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
            Cookies.remove('authorId');
            Cookies.remove('userId')
            this.userImg = '';
            this.userName = '';
            this.userToken = '';
            let userObj = {
              userName: null,
              userImg: null,
              userToken: null,
              userType:null,
            };
            this.$store.commit('increment', userObj)
            this.$store.commit('setUserId', '')
            this.$router.push({path: '/login'})
          } else {
            this.$message.error(res.data.msg)
          }
        })

      },
      /*搜索输入框*/
      inputVal() {
        console.log(55555555554444,this.passObj.searchVal )
        if (this.passObj.searchVal != '') {
          searchListAPI({
            content: this.passObj.searchVal
          }).then(res => {
              this.completionList = res.data.data;
              if (res.data.data.length > 0) {
                this.isShowcompletion = true;
              } else {
                this.isShowcompletion = false;
              }
            }
          )
        } else {
          console.log('55555555555555555');

          let obj = {
            language: this.passObj.languageValue,
            content: this.passObj.searchVal,
          };
          this.$store.commit('searchFun', obj)
          this.isShowcompletion = false;
        }
      },
      /*语言*/
      languagesBtn(item) {
        this.languageValue = item;
        this.passObj.languageValue = item == "蒙文" ? '50' : '';
        this.isShowlanguage = false;
      },
      /*点击自动补全内容*/
      searchCont(val){
        this.isShowcompletion=false;
        this.passObj.searchVal=val;
        this.searchBtn();
        /*this.$router.push({path:'/theory'})*/
      },
      languageIS() {
        this.isShowlanguage = !this.isShowlanguage;
      },

    }
  }
</script>

<style lang="less" scoped>
  #answer .comments .commentHeader_login .commentTop .mongolia_img span,#mongolia .comments .commentHeader_login .commentTop .mongolia_img span,#articleRead .comments .commentHeader_login .commentTop .mongolia_img span{ color:#666}
  .comments {
    width: 100%;
    .commentHeader_login {
      width: 100%;
      height: 34px;
      background: rgba(247, 250, 253, 1);
      .commentTop {
        width: 1200px;
        height: 28px;
        margin: 0 auto;
        padding-top: 4px;
        color: #666666;

        .mongolia_cart {
          float: right;
          cursor: pointer;
          img {
            margin-left: 10px;
          }
          span {
            margin-left: 6px;
          }
        }
        .mongolia_img {
          /*width:25px;
          height:25px;*/
          overflow: hidden;
          float: right;
          cursor: pointer;
          img {
            width: 25px;
            height: 25px;
            border-radius: 50%;
          }
          span {
            color: #2473D6;
            margin-left: 5px;
            margin-right: 10px;
          }
        }

        .mongolia_loginInfo {
          float: right;
          margin-left: 10px;
          cursor: pointer;
          span {
            margin-right: 10px;
          }
          .mongolia_message {
            margin-left: 10px;
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
            background-color: #2473D6;
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
            color: #4686D7;
            img {
              cursor: pointer;
            }
          }
          .nationBg {
            cursor: pointer;
            color: #4686D7;
            width: 87px;
            background: #ffffff;
            height: 33px;
            line-height: 24px;
            text-align: center;
            border-top: 1px solid #98BDEC;
            border-left: 1px solid #98BDEC;
            border-right: 1px solid #98BDEC;
            position: absolute;
            top: 38px;
            left: 298px;
            z-index: 13;
            .nationBgdashed {
              width: 85px;
              height: 31px;
              border-top: 1px #4084DA dashed;
              border-left: 1px #4084DA dashed;
              border-right: 1px #4084DA dashed;
            }
          }
          .nationCont {
            color: #4686D7;
            position: absolute;
            width: 169px;
            border: 1px solid #98BDEC;
            background: #fff;
            overflow: hidden;
            z-index: 12;
            top: 70px;
            left: 298px;
            ul, li {
              list-style: none;
              margin: 0;
              padding: 0;
            }
            ul {
              width: 139px;
              border: 1px #4084DA dashed;
              display: block;
              overflow: hidden;
              padding: 5px 14px;

              li {
                float: left;;
                display: block;
                width: 50%;
                line-height: 40px;
                cursor: pointer;
              }
            }
          }

        }

        .answer_right {
          float: right;
          width: 364px;
          height: 42px;
          line-height: 40px;
          margin-top: 30px;
          background: url(../../src/assets/images/login/search.png);
        }
        .answerLanguages {
          position: absolute;
          right: 264px;
          top: 77px;
          background: #fff;
          width: 100px;
          height: auto;
          z-index: 111;
          color: #777;
          ul, li {
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
          right: 23px;
          top: 77px;
          z-index: 111;
          width: 341px;
          height: auto;
          padding-bottom: 20px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 10px 0px rgba(36, 115, 214, 0.2);
          border-radius: 4px;
          ul, li {
            list-style: none;
            margin: 0;
            padding: 0
          }
          ul {
            padding: 20px 27px 0 20px;
            li {
              display: block;
              width: 100%;
              line-height: 34px;
              cursor: pointer;
              a:hover{
                color: #2473D6;}
            }
          }
        }

        .answer_select {
          float: left;
          padding-left: 6px;
          color: #395A99;
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
          background-color: #AEAEAE;
          margin-top: 14px;
          margin-left: 16px;
        }

        .answer_right input {
          height: 22px;
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
          color: #2473D6;
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
