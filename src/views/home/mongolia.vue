<template>
  <div id="mongolia">
    <div class="userInfo">
      <div class="mongolia_login">
        <p class="mongolia_cart" v-if="userType != 2">/
          <router-link to="/shoppingCart" style="color: #666"><img src="@/assets/images/homepage/shopping.png"><span>购物车</span></router-link>
        </p>
        <p class="mongolia_loginInfo"><span class="quit" @click="signOut" v-if="this.$store.state.userToken">退出</span>/
          <router-link to="/message"><span class="mongolia_message">消息<i v-if="havMessage"></i></span></router-link>
        </p>
        <div class="mongolia_img" v-if="this.$store.state.userToken">
           <div v-if="userType == 2" style="display: inline-block;">
            <router-link  to="/organizationIndex">
              <img :src=fileUrl(this.$store.state.userImg) v-if="this.$store.state.userImg&&this.$store.state.userImg!=''">
              <img src="@/assets/images/home/avatar.jpg" class="medical_head" v-else>
              <span>{{this.$store.state.userName}}</span>/
            </router-link>
          </div>
          <div v-else style="display: inline-block;">
            <router-link to="/personalIndex">
              <img :src=fileUrl(this.$store.state.userImg)
                  v-if="this.$store.state.userImg&&this.$store.state.userImg!=''">
              <img src="@/assets/images/home/avatar.jpg" class="medical_head" v-else>
              <span>{{this.$store.state.userName}}</span>/
            </router-link>
          </div>
        </div>
        <p class="mongolia_loginInfo" v-if="!this.$store.state.userToken">
          <router-link to="/register">
            <span>注册</span>
          </router-link>
        </p>
        <p class="mongolia_loginInfo" v-if="!this.$store.state.userToken">
          <router-link to="/login">
            <span>登录</span>/
          </router-link>
        </p>
      </div>
       <div class="mongolia_banner" :style="{backgroundImage: 'url(' + (`${uploadUrl}file/?fileName=${form.backgroundImg}&isOnline=true`) + ')', backgroundSize:'cover'}">
        <div class="answer_log">
          <div class="answer_left">
            <router-link to="/index"><img src="@/assets/images/login/logo.png"></router-link>
            <span class="nation_line"></span>
            <div class="nation_select" @click.stop="selectNa">
              {{passObj.national}}
              <img src="@/assets/images/medical/nation-select.png">
            </div>
            <div class="nationBg" v-if="isShowNation" @click.stop="selectNa">
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
            <el-input style="width: 270px;" placeholder="输入疾病，药方，医书等" v-model="passObj.searchVal" @input="inputVal" maxlength="30" @keyup.enter.native="searchBtn(id)"></el-input>
            <img src="@/assets/images/login/search_icon.png" class="answer_imge" @click="searchBtn(id)">
            <!--蒙文汉文-->
            <div class="answerLanguages" v-if="isShowlanguage">
              <ul class="answerUl">
                <li v-for="(item,index) in languagesList" :key="index" @click="languagesBtn(item)">{{item}}</li>
              </ul>
            </div>
          </div>
          <!--自动补全列表-->
          <div class="automaticCompletionList" v-if="isShowcompletion">
            <ul>
              <li v-for="(item,index) in completionList" :key="index"><a @click="searchCont(item)">{{item?item.length>20?item.substring(0,20)+'...':item:''}}</a></li>
            </ul>
          </div>
        </div>
        <div class="mongolia_bcon">
          <div class="mongolia_wrap">
            <div class="mongolia_bleft">
              <div class="mongolia_list">
                <div class="mongolia_lis" @click="retrieve(31)">
                  <img src="@/assets/images/home/theory-ico.png">
                  <div class="mongolia_liText">理论</div>
                </div>
                <div class="mongolia_lis" @click="retrieve(32)">
                  <img src="@/assets/images/home/drug-ico.png">
                  <div class="mongolia_liText">药物</div>
                </div>
                <div class="mongolia_lis" @click="retrieve(34)">
                  <img src="@/assets/images/home/clinic-ico.png">
                  <div class="mongolia_liText">临床</div>
                </div>
                <div class="mongolia_lis" @click="retrieve(1)">
                  <img src="@/assets/images/home/medical-ico.png">
                  <div class="mongolia_liText">医著</div>
                </div>
              </div>

              <div class="mongolia_recueillir">
                <div class="mongolia_text">
                  <div class="content_text" v-if="form.resourceStatistics">{{form.resourceStatistics}}</div>
                </div>


                <!-- <div class="mongolia_text">
                  <div class="mon_text">汇集了</div>
                  <div class="mon_num">4</div>
                  <div class="mon_num">9</div>
                  <div class="mon_num">7</div>
                  <div class="mon_num">6</div>
                  <div class="mon_text">本医药图书，</div>
                  <div class="mon_num">5</div>
                  <div class="mon_num">4</div>
                  <div class="mon_num">1</div>
                  <div class="mon_num">3</div>
                  <div class="mon_num">5</div>
                  <div class="mon_text">个经典病案，</div>
                </div>
                <div class="mongolia_text">
                  <div class="mon_num">1</div>
                  <div class="mon_num">9</div>
                  <div class="mon_num">.</div>
                  <div class="mon_num">6</div>
                  <div class="mon_num">4</div>
                  <div class="mon_num">万</div>
                  <div class="mon_text">条药物信息，</div>
                  <div class="mon_num">8</div>
                  <div class="mon_num">.</div>
                  <div class="mon_num">5</div>
                  <div class="mon_num">0</div>
                  <div class="mon_num">万</div>
                  <div class="mon_text">个验方。</div>
                </div> -->
              </div>
            </div>
            <div class="mongolia_bright" v-html="form.synopsis"></div>
          </div>
        </div>
      </div>
      <!-- 方剂 -->
      <div class="mongolia_prescription">
        <div class="mongolia_main">
          <div class="mongolia_mainLeft">
            <div class="mongolia_fang" @click="retrieve(33)">
              <img src="@/assets/images/home/view_check.png">
            </div>
            <div class="mongolia_fmain">
              <div class="mongolia_fLeft" v-for="(item,index) in list" :key="item.id">
                <div class="mongolia_fTop">
                  <img src="@/assets/images/home/li-one.png" v-if="index % 2 == 0">
                  <img src="@/assets/images/home/li-two.png" v-else>
                  <div class="mon_right">
                    <router-link :to="{path: '/articleread', query: {id: item.id}}">
                      <div class="mon_rightTitle">{{item.title?item.title.length > 15?item.title.substring(0,15)+'...':item.title:''}}</div>
                    </router-link>
                    <div class="mon_rightLi">
                      <div class="mon_drugMong" v-for="info in item.keyword" :key="info">
                        <a @click="searchCont(info,33)">
                          {{info}}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mongolia_fBot">{{item.synopsis}}</div>
              </div>
            </div>
          </div>
          <div class="mongolia_mainRight">
            <div class="mongolia_rTitle">
              <span class="mon_adv" :class="cancel == true ? 'active' : '' " @click="tab">优势病种</span>
              <span>/</span>
              <span class="mon_adv" :class="cancel == true ? '' : 'active'" @click="handleClick">特色疗法</span>
            </div>
            <div class="mongolia_rlis" v-if="cancel">
              <div class="mongolia_brea" v-for="item in form.advantagesDisease" :key="item">
                <a @click="searchCont(item,35)">{{item}}</a>
              </div>
            </div>
            <div class="mongolia_rlis" v-else>
              <div class="mongolia_brea" v-for="(item,index) in form.particularTherapy" :key="index">
                <a @click="searchCont(item,31)">{{item}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mongolia_doctor">
        <!-- 名医 -->
        <div class="mon_doctor">
          <div class="mon_docImg" @click="retrieve(2)">
            <img src="@/assets/images/home/view_check.png">
          </div>
          <div class="mon_main">
            <div class="mon_mdoctor" v-for="item in doctorList" :key="item.id">
              <div class="mon_mLeft">
                <router-link :to="{path: '/medicalother', query: {id: item.id}}">
                  <img :src="`${uploadUrl}file/?fileName=${item.faceImg}&isOnLine=true`" v-if="item.faceImg"
                       class="mon_img">
                  <div class="mon_mName">{{item.name}}</div>
                </router-link>
              </div>
              <div class="mon_mRight">
                <router-link :to="{path: '/medicalother', query: {id: item.id}}">
                  <div class="mon_mTitle">{{item.name}}</div>
                </router-link>
                <div class="mon_post">
                  <div class="mon_circle"></div>
                  <div class="mon_postname">{{item.post}}</div>
                  <!-- <div class="mon_postname">医药学家 / 研究生导师</div> -->
                </div>
                <div class="mon_posttext"
                     v-html="item.description.length > 100 ? item.description.substr(0,100) + '...' : item.description"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 医案 -->
        <div class="mon_drug">
          <div class="mon_drugLeft">
            <div class="mon_drugTitle">特色药物</div>
            <div class="mon_drugLis">
              <div class="drugDong" v-for="item in form.characteristicsDrugs" :key="item.id">
                <a @click="searchCont(item,32)">{{item}}</a>
              </div>
            </div>
          </div>
          <div class="mon_drugRight">
            <div class="mon_drugRightbg" @click="retrieve(35)">
              <img src="@/assets/images/home/view_check.png">
            </div>
            <div class="mon_drugmain">
              <div class="mon_drugcontent" v-for="(item,index) in yianList" :key="item.id">
                <div class="mon_drugconTitle">
                  <img src="@/assets/images/home/one.png" v-if="index % 2 == 0">
                  <img src="@/assets/images/home/two.png" v-else>
                  <router-link :to="{path: '/articleread', query: {id: item.id}}">
                    <div class="mon_drugTitle">{{item.title&&item.title.length>15?item.title.substring(0,15)+'...':item.title}}</div>
                  </router-link>
                </div>
                <div class="mon_drugList">
                  <div class="mon_drugMong" v-for="info in item.keyword" :key="info">
                    <a @click="searchCont(info,35)">
                      {{info}}
                    </a>
                  </div>
                </div>
                <div class="mon_drugText">{{item.synopsis}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 医著 -->
      <div class="mongolia_mains">
        <div class="mongolia_mainyizhu">
          <div class="mongolia_mainyizhubg" @click="retrieve(1)">
            <img src="@/assets/images/home/view_check.png">
          </div>

          <div class="mongolia_mainList">
            <div :class="isShowBook == index ? 'mon_mainli' : 'mon_mainLi'" v-for="(item,index) in yizuList"
                 :key="index" @mousemove.prevent='mousemove(index)'>
              <router-link :to="{path: '/medetails', query: {id: item.id}}">
                <img :src="`${uploadUrl}file/?fileName=${item.bookCover}&isOnLine=true`"
                     :class="isShowBook == index ? 'mon_img' : ''" v-if="isShowBook == index && item.bookCover != null">
                <img src="@/assets/images/home/no-cover.jpg" class="mon_img"
                     v-if="isShowBook == index && item.bookCover == null">
              </router-link>
              <div class="mon_mainText">
                <div v-if="isShowBook == index" class="mon_mainTitle">
                  <router-link :to="{path: '/medetails', query: {id: item.id}}">《{{item.name&&item.name.length>10?item.name.substring(0,10)+'...':item.name}}》</router-link>
                </div>
                <div v-else class="mon_wrapTitle" style="text-align: center;">《{{item.name&&item.name.length>5?item.name.substring(0,5)+'...':item.name}}》</div>
                <div :class="isShowBook == index ? 'mon_mainName' : ''" v-if="isShowBook == index">{{item.author}}   著
                </div>
                <div :class="isShowBook == index ? 'mon_maintext' : ''" v-if="isShowBook == index"
                     v-html="item.summary&&item.summary.length > 80 ? item.summary.substr(0,80)+'...' : item.summary"></div>
                <div class="mon_mainliImg" v-else>
                  <img :src="`${uploadUrl}file/?fileName=${item.bookCover}&isOnLine=true`" v-if="item.bookCover"
                       class="mon_img">
                  <img src="@/assets/images/home/no-cover.jpg" v-else>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <commentFoot></commentFoot>
    </div>
  </div>
</template>

<script>
  import "@static/css/medical_information/index.less"
  import "@static/css/home/mongolia.less"
  import "@static/css/index.less"
  import commentFoot from '@/components/commentFoot'
  import {checkNationAPI, commonAPI} from '@/api/home/mongolia'
  import {uploadUrl} from '@/utils/global'
  import {loginOutAPI, searchListAPI, nationalListAPI} from '@/api/comment/comments';
  import Cookies from 'js-cookie';
  import { messageAPI } from '@/api/common'

  export default {
    name: 'mongolia',
    components: {commentFoot},
    data() {
      return {
        isShowNation: false,
        isShowcompletion: false,
        uploadUrl: uploadUrl,
        form: {},
        cancel: true,
        activeName: 'first',
        list: [],
        yianList: [],
        yizuList: [],
        doctorList: [],
        passObj: {
          searchVal: '',
          national: '',
          nationalNum: null,
          languageValue: '',
        },
        languagesList: ["汉文", "蒙文"],
        languageValue: '汉文',
        isShowlanguage: false,
        natList: {},
        num: null,
        isShowBook: 0,
        keyword: [],
        code: null,
        userType: null,
        havMessage: null,
      }
    },
    created() {
      this.num = this.$route.query.id;
      this.nationalList(this.$route.query.id)
      if(Cookies.get("userType")) {
        this.userType = Cookies.get("userType")
      }

    },
    mounted() {
      this.getCheckNation()
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
      // 查询详情信息
      getCheckNation() {
        const id = this.$route.query.id;
        checkNationAPI(this.$route.query.code).then(res => {
          console.log("民族详情", res);
          if (res.data.code == 0) {
            console.log(res.data.data,8888899)
            this.form = res.data.data;
            let regex = /,|，|\\s+/;
            this.form.advantagesDisease = res.data.data.advantagesDisease ? res.data.data.advantagesDisease.split(regex) : res.data.data.advantagesDisease
            this.form.particularTherapy = res.data.data.particularTherapy ? res.data.data.particularTherapy.split(regex) : res.data.data.particularTherapy
            this.form.characteristicsDrugs = res.data.data.characteristicsDrugs ? res.data.data.characteristicsDrugs.split(regex) : res.data.data.characteristicsDrugs
            if(this.form.advantagesDisease && this.form.advantagesDisease.length > 10) {
              this.form.advantagesDisease = this.form.advantagesDisease.slice(0,10);
            }
            if(this.form.particularTherapy && this.form.particularTherapy.length > 10) {
              this.form.particularTherapy = this.form.particularTherapy.slice(0,10);
            }
            if(this.form.characteristicsDrugs && this.form.characteristicsDrugs.length > 10) {
              this.form.characteristicsDrugs = this.form.characteristicsDrugs.slice(0,10);
            }
            this.form.synopsis = res.data.data.synopsis && res.data.data.synopsis.length > 200 ? res.data.data.synopsis.substr(0, 200) + '...' : res.data.data.synopsis;
          }
        })
        this.getRecommend()
      },

      // 推荐位
      getRecommend() {
        const code = 'NATION_' + (Number(this.$route.query.code)>9?this.$route.query.code:'0'+this.$route.query.code);
        commonAPI({
          code: code,
          num: 10
        }).then(res => {

          let regex = /,|，|\\s+/;
          if (res.data.data.recommendResourceList != null) {
            res.data.data.recommendResourceList.map(node => {
              // 方剂

              if (node.resType == 33) {
                if(node.resList.length > 2) {
                  node.resList = node.resList.slice(0,2)
                  this.list = node.resList;

                  this.list.map(el => {
                    el.synopsis = el.synopsis && el.synopsis.length > 100 ? el.synopsis.substring(0, 100) + '...' : el.synopsis;
                    if (el.keywords == null || el.keywords == '') {
                      return
                    } else {
                      return el.keyword = el.keywords.split(regex)
                    }
                  })
                } else {
                  this.list = node.resList
                  this.list.map(el => {
                    el.synopsis = el.synopsis && el.synopsis.length > 100 ? el.synopsis.substring(0, 100) + '...' : el.synopsis;
                    if (el.keywords == null || el.keywords == '') {
                      return
                    } else {
                      return el.keyword = el.keywords.split(regex)
                    }
                  })
                }

              }
              // 医著
              if (node.resType == 1) {
                this.yizuList = node.resList
              }
              // 医案
              if (node.resType == 35) {
                if(node.resList.length > 2) {
                  node.resList = node.resList.slice(0,2)
                  this.yianList = node.resList
                  this.yianList.map(el => {
                    el.synopsis = el.synopsis && el.synopsis.length > 100 ? el.synopsis.substring(0, 100) + '...' : el.synopsis;
                    if (el.keywords == null || el.keywords == '') {
                      return
                    } else {
                      return el.keyword = el.keywords.split(regex);
                    }
                  })
                } else {
                  this.yianList = node.resList
                  this.yianList.map(el => {
                    el.synopsis = el.synopsis && el.synopsis.length > 100 ? el.synopsis.substring(0, 100) + '...' : el.synopsis;
                    if (el.keywords == null || el.keywords == '') {
                      return
                    } else {
                      return el.keyword = el.keywords.split(regex);
                    }
                  })
                }
              }
              // 名医
              if (node.resType == 2) {
                // if(node.resList.length > 2) {
                //   node.resList = node.resList.slice(0,2)
                  this.doctorList = node.resList
                // }

              }
            })
          } else {
            this.list = []
            this.yizuList = []
            this.yianList = []
            this.doctorList = []
          }
        })
      },

      // 理论
      retrieve(value) {
        console.log(value,'bbaa');

        this.$router.push({path: '/theory', query: {id: value, type: 1, nationalNum: this.passObj.nationalNum}})
        Cookies.set('resourceType',value);
      },

      /*医著*/
      mousemove(index) {
        this.isShowBook = index;
      },

      // 优势病种/特色疗法切换
      tab() {
        this.getCheckNation()
        this.cancel = true
      },
      handleClick() {
        this.getCheckNation()
        this.cancel = false
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
              userType: '',
            };
            this.$store.commit('increment', userObj)
            this.$router.push({path: '/login'})
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      /*获取民族*/
      nationalList() {
        nationalListAPI().then(res => {
          this.natList = res.data.data;
          console.log(23232222,res.data.data)
          for (let val in this.natList) {
            this.code = val;
            if (val == this.$route.query.id) {
              this.passObj.national = this.natList[val];
              this.passObj.nationalNum = val;
            }
          }
        })
      },
      searchBtn(id) {

        if (this.passObj.searchVal != '') {
          let obj = {
            language: this.passObj.languageValue,
            content: this.passObj.searchVal,
          };
          if (obj.language == 50) {
            this.$router.push({path: '/mongoliaArticle'})
          } else {
            this.$store.commit('searchFun', obj)
            if (id) {
              // Cookies.set('resourceType',2);
              this.$router.push({path: '/theory', query: {type: 1, nationalNum: this.passObj.nationalNum}})
            } else {
              this.$router.push({path: '/theory', query: { type: 1, nationalNum: this.passObj.nationalNum}})
            }
          }
        }
      },
      /*选择民族*/
      selectNa() {
        this.isShowNation = !this.isShowNation;
        this.getCheckNation()
      },
      selectNation(item) {
        this.isShowNation = !this.isShowNation;
        this.passObj.national = item;
        for (let val in this.natList) {
          if (item == this.natList[val]) {
            this.passObj.nationalNum = val;
            this.$router.push({path: '/mongolia', query: {id: this.passObj.nationalNum,code:val}})
          }
        }

        this.getRecommend()
        this.getCheckNation();
      },
      selectAll() {
        this.passObj.national = '全部';
        this.isShowNation = false
        this.$router.push({path: '/theory'})
      },
      /*搜索输入框*/
      inputVal() {
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
          this.isShowcompletion = false;

        }
      },
      /*点击自动补全内容*/
      searchCont(val, id) {
        console.log(id, 'pppppppp');
        this.isShowcompletion = false;
        this.passObj.searchVal = val;
        this.searchBtn(id);
      },
      /*语言*/
      languagesBtn(item) {
        this.languageValue = item;
        this.passObj.languageValue = item == "蒙文" ? '50' : '';
        this.isShowlanguage = false;
      },
      languageIS() {
        this.isShowlanguage = !this.isShowlanguage;
      },
    }
  }
</script>

<style lang="less">
  .answerLanguages .answerUl {
    background-color: #fff;
    width: 68px;
    text-align: center;
    padding: 0 !important;
    margin: 0 !important;
    li {
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

  .mongolia_banner .answer_log {
    position: relative;
    .automaticCompletionList {
      position: absolute;
      right: 0;
      top: 77px;
      z-index: 111;
      width: 364px;
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
          a:hover {
            color: #2473D6;
          }
        }
      }
    }
  }

  #mongolia .el-input__inner {
    border: none !important;
  }



  #mongolia  input::-webkit-input-placeholder{/*Webkit browsers*/
    color:#92B4E8;
    font-size:14px;
}
#mongolia  input:-moz-placeholder{/*Mozilla Firefox 4 to 8*/
   color:#92B4E8;
   font-size:14px;
}
#mongolia  input::moz-placeholder{/*Mozilla Firefox 19+*/
   color:#92B4E8;
   font-size:14px;
}
#mongolia  input:-ms-input-placeholder{/*Internet Explorer 10+*/
    color:#92B4E8;
    font-size:14px;
}
</style>
