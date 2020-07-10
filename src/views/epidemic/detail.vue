<template>
    <div class="epidemicDetail"  id="articleRead">
      <div style="width:1200px;margin:0 auto"><navbar></navbar></div>
      <div class="detail article_read_content" style="width: 1100px;">
        <div class="tit">{{detail.title}}</div>
        <!--音频-->
        <div class="article_read_content_audio audio_bg" v-if="detail.audio" style="width: 692px;">
          <div class="article_read_content_audiono" v-if="detail.audio=='无权限'" @click="videoNo"></div>

          <aplayer
            :music="{
                      title: ' ',
                      artist: ' ',
                      src: `${uploadUrl}file/?fileName=${detail.audio}`,
                      pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
                    }"
          />
        </div>


        <div class="video" v-if="detail.video">
          <!--<img src="" alt="">-->
          <!--<video :src="fileUrl(detail.video)" controls></video>-->
          <div class="article_read_content_video">
            <div class="article_read_content_videono" v-if="!token" @click="videoNo"></div>
            <video :src="fileUrl(detail.video)" controls controlsList="nodownload"></video>
          </div>
          <div class="articleOver" v-if="!token">
            <a @click="loginIn">登录</a>后观看视频
          </div>
        </div>
        <!--<div class="info" v-if="detail.synopsis&&detail.resourceType!=36">
          <div class="comTit">
            <span>简介</span>
          </div>
          <p v-html="detail.synopsis"></p>
        </div>-->

        <div class="info" v-if="detail.text">
          <div class="comTit">
            <span>正文</span>
          </div>
          <p class="infoP" v-html="detail.text"></p>
        </div>
        <div class="articleOver" v-if="detail.messageCode==2">试读结束，
          <a @click="loginIn">登录</a>
          后继续阅读
        </div>
        <div class="articleOver" v-if="detail.messageCode==3">{{detail.message}}</div>
        <div class="articleOver" v-if="detail.messageCode==1">{{detail.message}}</div>
        <div class="articleOver" v-if="detail.messageCode==0">{{detail.message}}</div>
        <div class="articleOver" v-if="detail.messageCode==4">
          <div>继续阅读，请先通过以下方式获得阅读权限</div>
          <ul>
            <li @click="immediatelyBuy(detail.id,'文章')">购买本篇：<span>￥{{detail.realPrice}} <del>￥{{detail.price}}</del></span>
            </li>
            <li v-if="detail.bookId&&detail.bookId!=''" @click="immediatelyBuy(detail.bookId,'医著')">
              购买整书：<span>￥{{detail.bookRealPrice}} <del>￥{{detail.bookPrice}}</del></span></li>
          </ul>
        </div>
      </div>
      <loginAlert :isShowChild="isShowAlert" @toFatherData="sendSonData"></loginAlert>
    </div>
</template>

<script>
  import "../../../static/css/home/articleread.less";
  import { uploadUrl } from '@/utils/global'
  import aplayer from 'vue-aplayer'
  import {getActicleDetialAPI,getActicleDetialAPI1} from '../../api/epidemic/index';
  import Cookies from 'js-cookie'
  import navbar from '@/components/epidemicNavbar.vue';
  export default {
    name: 'HelloWorld',
    data () {
      return {
        uploadUrl: uploadUrl,
        detail:{title:''},
        isShowAlert:false,
      }
    },
    created () {
      this.getDetial();
    },
    watch: {
      token(n,o){
        this.getDetial();
      },
    },
    components:{aplayer,navbar},
    computed: {
      token () { // 当前登录用户是否是机构用户
        return this.$store.state.userToken;
      },
    },
    methods: {
      getDetial(){
        getActicleDetialAPI(this.$route.query.id).then(res=>{
          if(res.data.status){
            this.detail=res.data.data;
          }
        })

      },
      /*视频无权限*/
      videoNo(){
        this.$message.warning("您尚未登录，暂无播放权限！")
        /*if (Cookies.get("Y-Token")) {
          this.$message.warning("您尚未购买，暂无播放权限")
        }else{
          this.isShowAlert = true;
        }*/
      },
      loginIn() {
        if (Cookies.get("Y-Token")) {
          this.isShowAlert = false;
        }
        else {
          this.isShowAlert = true;
        }
      },
      /*子传父*/
      sendSonData(val) {
        let self = this;
        self.isShowAlert = false;
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.epidemicDetail{
  width: 100%;
  min-width: 1200px;
  padding-top: 0px;
  background: url("../../assets/images/epidemic/bg_top.png") no-repeat;
  .detail{
    width: 1100px;
    min-height: calc( 100vh - 552px);
    margin: 0 auto;
    box-shadow:0px 2px 8px 0px rgba(1,2,2,0.04);
    background: url("../../assets/images/epidemic/bg_zuo.png") repeat-x top #fff;
    padding:0 50px 80px 50px;
    .tit{
      width: 100%;
      text-align: center;
      height: 99px;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 30px;
      font-size:24px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(0,0,0,1);
      padding-top: 15px;
    }
    .comTit{
      width: 100%;
      display: flex;
      align-items: center;
      height: 29px;
      margin-top: 50px;
      margin-bottom: 15px;
      span{
        display: block;
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height: 29px;
      }
      span:before{
        width: 12px;
        height: 29px;
        content: url("../../assets/images/epidemic/pic_fuhao.png");
        padding-right: 7px;
        float: left;
      }
    }
    .video{
      width: 500px;
      height: 304px;
      margin: 0 auto;
      video{
        width: 500px;
        height: 304px;
      }
    }
    .info{
      .infoP{
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(85,85,85,1);
        line-height:34px;
        text-indent:2em;
        img{
          text-align: center;
          text-indent: 0;
          display: inline-block;
        }
      }
      .wscnph{
        text-align: center;
        text-indent: 0;
      }
    }
    .articleOver {
      padding-top: 0px;
      height: auto;
      line-height: 20px;
      width: 100%;
      text-align: center;
      font-size: 14px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(119, 119, 119, 1);
      /*padding-bottom: 20px;*/
      a {
        color: #F2444A;
        text-decoration: none;
        cursor: pointer;
      }
      ul, li {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      ul {
        padding-top: 10px;
        li:last-child {
          margin-left: 10px;
        }
        li {
          cursor: pointer;
          font-weight: 400;
          display: inline-block;
          padding: 8px 15px;
          border: 1px solid #ccc;
          border-radius: 4px;

          span {
            color: #F44F4A;
            del {
              padding-left: 10px;
              color: #777;
            }
          }
        }
      }
    }
  }
}
</style>
