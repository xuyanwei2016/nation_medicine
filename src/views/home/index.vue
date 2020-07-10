<template>
  <div id="app" class="userIndex">
    <div class="userInfo">
      <div class="topCon">
        <p class="loginInfo" v-if="!userName">
          <span class="login"><router-link to="/login" style="color:#1F77F2;">登录</router-link></span>/<span class="resigin"><router-link to="/register" style="color: #1F77F2;">注册</router-link></span></p>
        <p class="loginName" v-else>
          <router-link v-if="userType=='2'" :to="{path:'/organizationIndex'}">
            <img :src="`${uploadUrl}file/?fileName=${userImg}&isOnLine=true`" v-if="userImg&&userImg!=''">
            <img  src="@/assets/images/home/avatar.jpg" v-else>
            <span style="margin-right:20px">{{userName}}</span>
          </router-link >
          <router-link v-else :to="{path:'/personalIndex'}">
            <img :src="`${uploadUrl}file/?fileName=${userImg}&isOnLine=true`" v-if="userImg&&userImg!=''">
            <img  src="@/assets/images/home/avatar.jpg" v-else>
            <span style="margin-right:20px">{{userName}}</span>
          </router-link>
          <span @click="quit" style="color:#666">退出</span>
        </p>
        <p class="message" style="margin-right: 0">
          <span @click="messagePage()" class="index_message">消息<i v-if="havMessage"></i></span>
          <span v-if="userType!='2'" @click="shopping">
            <img src="@/assets/images/homepage/shopping.png">购物车
          </span>
        </p>
      </div>
    </div>
    <div class="banner">
      <el-carousel indicator-position="none" height='537px' style="text-align: center;width:100%;object-fit:cover;">
        <el-carousel-item v-for="item in imgList" :key="item.id" style="cursor: pointer">
          <img :src="`${uploadUrl}file/?fileName=${item.picture}&isOnLine=true`" v-if="item.picture" class="banner_img" @click="openWindow(item.url)">
        </el-carousel-item>
      </el-carousel>
      <div class="bannerCon">
        <img src="@/assets/images/homepage/logo.png" class="logo">
        <div class="search">
          <div class="home_search">
            <el-input placeholder="输入疾病，药方，医书等" v-model="searchValue" @input="inputVal" maxlength="30" @keyup.enter.native="searchBtn"></el-input>
            <img src="@/assets/images/homepage/search_icon.png" class="home_img" @click="searchBtn" style="margin-left: 5px; padding-top: 5px;">
          </div>
          <div class="searchBox" v-if="isShowcompletion">
            <ul style="padding-left: 15px;">
              <li v-for="(item,index) in completionList" :key="index"  @click="searchCont(item)">{{item?item.length>20?item.substring(0,20)+'...':item:''}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="indexContent">
      <div class="natureCon">
        <div class="nav">
          <div class="headerText">民族医库</div>
          <div class="navText">
            <router-link to="/nation">
              <span :class="names == '民族医药' ?'hoverStyle':''" @mouseenter="nationMedicine('HOME_1')">
                民族医药
              </span>
            </router-link>
            <p v-for="item in nationsList" :key="item.id" @click="nationHome(item.id)">
              <img src="@/assets/images/homepage/list.png">
              <span @mouseenter="getNationName(item.nationsName,item.id,item.code)" :class="names == item.nationsName ?'hoverStyle':''">{{item.nationsName}}</span>
            </p>
          </div>
          <router-link to="/nation">
            <div class="nation">
                <span>更多>></span>
            </div>
          </router-link>
        </div>
        <div class="con">
          <div class="conLeft">
            <img :src="`${uploadUrl}file/?fileName=${nationDetailsList.img}&isOnLine=true`"  :onerror="errorImg(detail)">
            <!-- <img src="@/assets/images/home/no-cover.jpg" v-else> -->
          </div>
          <div class="conRight">
            <div class="conTitle">
              <router-link :to="{path:'/mongolia',query:{id:nationId,code:nationDetailsList.nationsType}}">
                <span>{{names}}</span>
              </router-link>
            </div>
            <div class="conInfo"><router-link :to="{path:'/mongolia',query:{id:nationId,code:nationDetailsList.nationsType}}">{{nationDetailsList.descriptions}}</router-link></div>
            <div class="conPhoto">
              <div class="conPhoto_list" v-for="item in nationDetailsList.recommendResourceList" :key="item.id" @click="imgDetails(item.resType,item.resId)">
                <img :src="`${uploadUrl}file/?fileName=${item.resImg}&isOnLine=true`"  :onerror="errorImg()">
                <p></p>
                <span>{{item.resName && item.resName.length>10?item.resName.substr(0,10)+'...':item.resName}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="professor">
      <div class="professorCon">
        <div class="outline">
          <div class="proNav">
            <div class="doctor" @click="typeChange('HOME_2',2)" :class="type == 'HOME_2' ? 'hoverDoctorStyle':''"><span>医家汇集</span></div>
            <div class="case" @click="typeChange('HOME_3',10)" :class="type == 'HOME_3' ? 'hoverCaseStyle':''"><span>典型医案</span></div>
            <div class="recommend" @click="typeChange('HOME_4',5)" :class="type == 'HOME_4' ? 'hoverRecommendHover':''"><span>医著推荐</span></div>
          </div>
          <div class="proContent">
            <div v-if="type == 'HOME_2'">
              <div class="proIntro" v-for="item in detailsList.list" :key='item.id'>
                <router-link :to="{path:'/medicalother',query:{id:item.id}}">
                  <div class="image_box">
                    <img :src="`${uploadUrl}file/?fileName=${item.faceImg}&isOnLine=true`" v-if="item.faceImg">
                    <img v-else src="@/assets/images/home/no-cover.jpg">
                    <p v-if="item.faceImg">{{item.name}}</p>
                  </div>
                </router-link>
                <div class="right">
                  <router-link :to="{path:'/medicalother',query:{id:item.id}}">
                    <div class="proName">{{item.name}}</div>
                  </router-link>
                  <div class="proEducation">
                    {{item.title}}
                    <span v-if="item.post"> / {{item.post}}</span>
                  </div>
                  <p style="color:#666666;font-size:14px;">{{item.description && item.description.length>100?item.description.substr(0,100)+'...':item.description}}</p>
                </div>
              </div>
            </div>
            <div v-if="type == 'HOME_3'">
              <ul class="listContent">
                <li v-for="item in detailsList.list" :key='item.id'>
                  <router-link :to="{path:'/articleread',query:{id:item.id}}">
                    <p>{{item.title}}</p>
                  </router-link>
                  <span v-if="item.uploadTime">{{item.uploadTime.substr(5,5)}}</span>
                </li>
              </ul>
            </div>
            <div v-if="type == 'HOME_4'">
              <div class="index_ebookList" v-for="item in detailsList.list" :key='item.id'>
                <div class="imgBox" @mouseenter="ebookHover(item.id)">
                  <img :src="`${uploadUrl}file/?fileName=${item.bookCover}&isOnLine=true`" :onerror="errorImg()">
                  <!-- <img v-else src="@/assets/images/home/no-cover.jpg"> -->
                </div>
                <p>{{item.name && item.name.length>22?item.name.substr(0,22)+'...':item.name}}</p>
                <div class="ebook_hover" v-if="ebookHoverId == item.id">
                  <router-link :to="{path:'/medetails',query:{id:item.id}}">
                    <div class="article_name">{{item.name && item.name.length>22?item.name.substr(0,22)+'...':item.name}}</div>
                    <div class="article_author"><span class="author_text">{{item.author}}</span><span>著</span></div>
                  </router-link>
                  <div class="article_price">￥{{item.price}}<span v-if="item.pricing">￥{{item.pricing}}</span></div>
                </div>
              </div>

            </div>
            <div :class="hasPreviousPage != true?'index_non_left':''" class="index_left" v-if="type == 'HOME_2' || type == 'HOME_4'" @click="prev()"></div>
            <div :class="hasNextPage != true?'index_non_right':''"  class="index_right"  v-if="type == 'HOME_2' || type == 'HOME_4'" @click="next()"></div>
            <div class="nation" @click="moreDetails">
              <span>更多>></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="menu">
      <div class="menuCon">
        <div class="menuNav" @click="resourcePage(31)">
          <img src="@/assets/images/homepage/theory.png" alt="民族医药-理论">
          <p>理论</p>
        </div>
        <div class="menuNav" @click="resourcePage(32)">
          <img src="@/assets/images/homepage/medicine.png" alt="民族医药-药物">
          <p>药物</p>
        </div>
        <div class="menuNav" @click="resourcePage(33)">
          <img src="@/assets/images/homepage/prescription.png" alt="民族医药-方剂">
          <p>方剂</p>
        </div>
        <div class="menuNav" @click="resourcePage(34)">
          <img src="@/assets/images/homepage/clinic.png" alt="民族医药-临床">
          <p>临床</p>
        </div>
        <div class="menuNav" @click="resourcePage(35)">
          <img src="@/assets/images/homepage/consilia.png" alt="民族医药-医案">
          <p>医案</p>
        </div>
        <div class="menuNav" @click="resourcePage(36)">
          <img src="@/assets/images/homepage/culture.png" alt="民族医药-文化">
          <p>文化</p>
        </div>
      </div>
    </div>
    <div class="medicine">
      <div class="medicineCon">
        <div class="medicineInfo">
          <div class="medicineTitle">{{bulletinQuery.name}}</div>
          <ul>
              <li v-for="item in bulletinList.list" :key="item.id">
                <router-link :to="{path:'/medicalDetails',query:{id:item.id, pageType: pageType}}">
                  {{item.title}}
                </router-link>
              </li>
          </ul>
          <img src="@/assets/images/homepage/examine.png" class="next" @click="nextPage">
        </div>
        <div class="medicalInformation">
          <router-link :to="{path:'/information', query:{pageType:1}}">
            <div class="medicineHover" @mouseenter="medical">
              <p>医药资讯</p>
              <span>最新最热的医药行业资</span>
            </div>
          </router-link>
        </div>
        <router-link :to="{path:'/online', query:{pageType:3}}">
          <div class="onlineConsultant">
            <p style="color:#3D884A">在线咨询</p>
            <span>为您提供最权威的咨询服务</span>
          </div>
        </router-link>
        <div class="examination">
          <router-link :to="{path:'/column', query:{pageType:2}}">
            <div class="medicineHover" @mouseenter="testColumn">
              <p style="color:#6559C4">考试专栏</p>
              <span>最新最热的医药行业考试资讯</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footerCon">
        <div class="link">
          友情链接
          <span class="line">/</span>
          <span v-for="(item,index) in linkList" :key="item.id" @click="linkChange(item.url)">
            <span>{{item.title}}</span>
            <img src="@/assets/images/homepage/point.png" v-if="index != linkList.length-1">
          </span>
        </div>
        <div class="footerText">
          <p v-for="(item,index) in footerList" :key="item.id" style="display:inline">
            <router-link :to="{path:'/aboutUs',query:{id:item.id}}">
              <span>{{item.title}}</span>
            </router-link>
            <i v-if="index != footerList.length-1">|</i>
          </p>
        </div>
        <div class="footerText" v-html="dictionaryText"></div>
        <div class="indexText"><span> 地　　址  ：</span>北京市东直门内南小街16号<span>电　　话：</span>010-64089446</div>
      </div>
    </div>
    <div class="tips">温馨提示，为了获得最佳用户体验，建议您使用Chrome，Firefox，IE9+，360浏览器极速模式</div>
  </div>
</template>

<script>
import '@static/css/index.less'
import { nationsAPI, nationDetailsAPI, nationDetailsPageAPI, bulletinAPI, bannerAPI, logoutAPI } from '@/api/home/index'
import { linksAPI, dictionaryAPI, footerAPI, messageAPI } from '@/api/common'
import {qqLoginAPI,wxLoginAPI} from '@/api/login/index'
import { uploadUrl } from '@/utils/global';
import {searchListAPI} from '@/api/comment/comments';
import Cookies from 'js-cookie';

export default {
  name:'home',
  data() {
    return{
      userType:null,
      listQuery: {
        pageNum:1,
        pageSize:10
      },
      nationsList: [],
      bulletinQuery: {
        pageSize:5,
        pageNum:1,
        name:'医药资讯'
      },
      bulletinList: [],
      type:'HOME_2',
      detailsList:[],
      uploadUrl: uploadUrl,
      nationDetailsList: {},
      names: '民族医药',
      linkList:[],
      dictionaryText: null,
      footerList:[],
      footerQuery: {
        pageNum:1,
        pageSize:4
      },
      imgList:[],
      userName: null,
      userImg: null,
      pageNum: 1,
      pageSize: 2,
      hasNextPage: null,
      hasPreviousPage: null,
      searchValue:'',
      isShowcompletion:false,
      completionList:[],
      nationId: null,
      ebookHoverId: null,
      havMessage: null,
      pageType: null
    }
  },
  created() {
    /*第三方登录*/
    if (this.$route.query.state==1) {
      qqLoginAPI({
        code: this.$route.query.code
      }).then(res=>{
        if(res.data.status){
          this.$message.success('登录成功')
          Cookies.remove('errorLogin')
          Cookies.remove('uuid')
          Cookies.remove('codeImg')
          Cookies.set('Y-Token',res.data.data.token);
          Cookies.set('userName',res.data.data.account);
          Cookies.set('userImg',res.data.data.img);
          Cookies.set('userType',res.data.data.level);
          this.userType=res.data.data.level;//设置登录成功的用户类别
        }else{
          this.$message.error(res.data.msg)
        }
      })

    }else if(this.$route.query.state==2){
      wxLoginAPI({
        code: this.$route.query.code
      }).then(res=>{
        if(res.data.status){
          this.$message.success('登录成功')
          Cookies.remove('errorLogin')
          Cookies.remove('uuid')
          Cookies.remove('codeImg')
          Cookies.set('Y-Token',res.data.data.token);
          Cookies.set('userName',res.data.data.account);
          Cookies.set('userImg',res.data.data.img);
          Cookies.set('userType',res.data.data.level);
          Cookies.set('authorId',res.data.data.authorId);
          this.userType=res.data.data.level;//设置登录成功的用户类别
        }else{
          this.$message.error(res.data.msg)
        }

      })

    }
    this.getBanner()//获取banner
    this.getMessage()
    this.getNations() //民族列表
    this.medical() //医药资讯
    this.typeChange('HOME_2',2);//医家
    this.getLinks() //友情链接
    this.getFooter() //页脚
    this.getdictionary() //底部版权
    this.userName = Cookies.get('userName')
    this.userImg = Cookies.get('userImg')
    this.userType=Cookies.get('userType');
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

    getBanner() {//获取banner
      bannerAPI({signValue:'SY_lb1',num:8}).then(res => {
        this.imgList = res.data.data
      })
    },
    getNations() {//民族列表
      nationsAPI().then(res =>{
        this.nationsList = res.data.data
        if(res.data.data.length>0){
          this.nationChange('HOME_1')
        }
      })
    },
    nationChange(code) {//民族内容更改
      nationDetailsAPI({code:code,num:4}).then(res => {
        this.nationDetailsList = res.data.data
      })
    },
    getNationName(name,id,code) {//切换民族
      this.names = name
      this.nationId = id
      this.nationChange(code)
    },
    nationMedicine(code) {//民族医药的
      this.nationChange(code)
      this.names = '民族医药'
      this.nationId = null
    },
    medical() {//医药资讯
      this.bulletinQuery.name = '医药资讯'
      this.bulletinQuery.pageNum = 1
      this.pageType = 1
      this.getBulletin();
    },
    testColumn() {//考试专栏的划过
      this.bulletinQuery.name = '考试专栏'
      this.bulletinQuery.pageNum = 1
      this.pageType = 2
      this.getBulletin();
    },
    nextPage() {//下一页
      this.bulletinQuery.pageNum = this.bulletinQuery.pageNum+1;
      this.getBulletin();
    },
    getBulletin() {//医药-考试-接口
      bulletinAPI(this.bulletinQuery).then(res => {
        this.bulletinList = res.data.data
      })
    },
    typeChange(code,num) { //医家-医案-医著
      this.type = code
      this.pageNum = 1
      this.pageSize = num
      this.getTypeCon(this.type);
    },
    getTypeCon(code) {//获取内容
      nationDetailsPageAPI({code:code,pageNum:this.pageNum,pageSize:this.pageSize}).then(res => {
        this.detailsList = res.data.data.recommendResourceList||[]
        this.hasNextPage = res.data.data.recommendResourceList.hasNextPage
        this.hasPreviousPage  = res.data.data.recommendResourceList.hasPreviousPage
      })
    },
    prev() {//上一页--医家-医案-医著
      if(this.hasPreviousPage == true){
        this.pageNum = this.pageNum - 1
        this.getTypeCon(this.type)
      }
    },
    next() {//下一页--医家-医案-医著
      if(this.hasNextPage == true){
        this.pageNum = this.pageNum + 1
        this.getTypeCon(this.type)
      }
    },
    getLinks() {//友情链接
      linksAPI({num:5}).then(res =>{
        this.linkList = res.data.data;
      })
    },
    linkChange(url) {//链接跳转
      window.open(url)
    },
    getFooter () {//页脚
      footerAPI(this.footerQuery).then(res => {
        this.footerList = res.data.data.list
      })
    },
    getdictionary() {//底部版权
      dictionaryAPI().then(res => {
        this.dictionaryText = res.data.data.value
      })
    },
    quit() {//退出登录
      logoutAPI().then(res => {
        if(res.data.code >0) {
          this.$message.warning(res.data.msg)
        } else if (res.data.code <0) {
          this.$message.error('退出登录失败，请稍后再试')
        } else if(res.data.code == 0){
          this.$message.success('退出登录成功')
          Cookies.remove('Y-Token');
          Cookies.remove('userName');
          Cookies.remove('userImg');
          Cookies.remove('userType');
          Cookies.remove('userId');
          this.$router.push('/login')
        }
      })
    },
    shopping() {//购物车
      if(this.$store.state.userToken){//判断是否登录
        this.$router.push('/shoppingCart')
      } else{
        this.$router.push('/login')
      }
    },
    messagePage() {//消息
      if(this.$store.state.userToken){//判断是否登录
        this.$router.push('/message')
      } else{
        this.$router.push('/login')
      }
    },
    moreDetails() {//更多
      if (this.type == 'HOME_2') {//医家列表 - 全文检索
        this.$router.push({path:'/theory'});
        Cookies.set('resourceType',2);
      }
      if (this.type == 'HOME_3') {//医案详情 - 全文检索
        this.$router.push({path:'/theory'});
        Cookies.set('resourceType',35);
      }
      if (this.type == 'HOME_4') {//医著详情 - 全文检索
        this.$router.push({path:'/theory'});
        Cookies.set('resourceType',1);
      }
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
    /*点击自动补全内容*/
    searchCont(val){
      this.isShowcompletion=false;
      this.searchValue=val;
      this.searchBtn(id);
    },
    /*搜索按钮*/
    searchBtn(item){
      console.log(item, 'pppooo');

      if(this.searchValue!=''){
        let obj={
          language:'',
          content:this.searchValue,
        };
        this.$store.commit('searchFun',obj)
        this.$router.push({path:'/theory'})
      }
    },
    openWindow(url) {//banner跳转路径
      window.open(url)
    },
    nationHome(id) {//民族主页
      this.$router.push({path:'/mongolia',query:{id:id,code:this.nationDetailsList.nationsType}})
    },
    imgDetails(type,id) {//详情
      if(type == 1) {//医著详情
        this.$router.push({path:'/medetails',query:{id:id}});
      } else if(type == 2) {//医家详情
        this.$router.push({path:'/medicalother',query:{id:id}});
      } else{//文章详情
        this.$router.push({path:'/articleread',query:{id:id}});
      }
    },
    resourcePage(value) {
      this.$router.push({path: '/theory'})
      Cookies.set('resourceType',value);
    },
    ebookHover(id) {//电子书滑过
      this.ebookHoverId = id
    },
  }
}
</script>

