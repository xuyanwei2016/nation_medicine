<template>
  <div class="epidemicRead">
    <div class="medical_main">
      <epidemicNavbar></epidemicNavbar>
      <div class="medical_sub">
        <div class="sub_left">
          <div class="subleft_top">
            <div class="subline_left"></div>
            <router-link :to="{path: 'epidemicMessage',query:{type:'中医抗疫纪实'}}">
              <div class="subline_leftMedical" :class="index == 1 ? 'bgColor' : ''">中医抗疫纪实</div>
            </router-link>
            <router-link :to="{path: 'epidemicMessage',query:{type:'中医诊疗方案'}}">
              <div class="subline_leftMedical" :class="index == 2 ? 'bgColor' : ''">中医诊疗方案</div>
            </router-link>
            <router-link :to="{path: 'epidemicMessage',query:{type:'中医防护知识'}}">
              <div class="subline_leftMedical" :class="index == 3 ? 'bgColor' : ''">中医防护知识</div>
            </router-link>
          </div>
        </div>
        <div class="sub_right" >
          <div class="medical_wrap_title">{{resourceForm.title}}</div>
          <div class="other">
            <span v-if="resourceForm.releaseTime">发布时间：{{resourceForm.releaseTime.slice(0,10)}}</span>
            <span v-if="resourceForm.source">来源：{{resourceForm.source}}</span>
          </div>
          <!--<div class="medical_wra_source">
            <span style="margin-right:20px">来源：《{{resourceForm.source}}》</span>分享:
            <div class="bdsharebuttonbox share_box"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣网"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
            </div>
          </div>-->
          <div class="medical_wra" v-html="resourceForm.content"></div>
          <div ref='share_wrap' class="hhhhh"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import epidemicNavbar from '../../components/epidemicNavbar.vue';
  import "@static/css/medical_information/index.less"
  import { medicalDetailsAPI } from '@/api/medical/medical'
  import Cookies from 'js-cookie'

  export default {
    data () {
      return {
        dataList:[],
        index:null,
        resourceForm: {
          title: null,
          source: null,
          content: null,

        },
      }
    },
    components: { epidemicNavbar },
    mounted () {

      if (!this.index) {
        this.index = Number(this.$route.query.pageType)+1;
      } else {
        this.index = 1
      }
      /*if (Cookies.get('medical')) {
        this.index = Cookies.get('medical')
      }*/
      window._bd_share_main ? window._bd_share_main.init() : this.setShare()
      this.details();
    },
    methods: {
      // 详情页
      details() {
        const id = this.$route.query.id;
        medicalDetailsAPI(id).then(res => {
          this.resourceForm = res.data.data;
        })
      },
      setShare(){
        window._bd_share_config={
          "common":{
            "bdSnsKey":{},
            "bdText":"",
            "bdMini":"2",
            "bdMiniList":false,
            "bdPic":"",
            "bdStyle":"0",
            "bdSize":"16"
          },
          "share":{},
          // "selectShare":{
          //     "bdContainerClass":null,
          //     "bdSelectMiniList":["weixin","tsina","douban","qzone"]
          // }
        };
        //const $el = document.querySelector('#baiduShare')
        //console.log($el,"$elllllllll")
        //$el&&this.$refs.share_wrap.removeChild($el)
        const shareDome = document.createElement('script');
        shareDome.type = 'text/javascript';
        shareDome.src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5);
        //console.log(shareDome,"document.body")
        this.$refs.share_wrap.appendChild(shareDome);
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.path == "/epidemicMessage") {
        to.meta.keepAlive = true;
      } else {
        to.meta.keepAlive = false;
      }
      next();
    }
  }
</script>

<style lang="less" scoped>
  .epidemicRead{
    width: 100%;
    min-width: 1200px;
    background: url("../../assets/images/epidemic/bg_top.png") no-repeat;
    .medical_main{
      margin: 0 auto;
    }

    .subline_leftMedical {
      padding: 0 !important;
      background: url(../../../src/assets/images/epidemic/wenli_nor.png) no-repeat center !important;
      text-align: center;
      height: 30px;
      line-height: 28px;
      font-size: 18px;
      font-family:Microsoft YaHei;
      color: #333333;
      cursor: pointer;
      font-weight: bold;
      &:hover {
        background: url(../../../src/assets/images/epidemic/wenli_sel.png) no-repeat center !important;
        color: #9A2B34 !important;
      }
    }
    .bgColor {
      background: url(../../../src/assets/images/epidemic/wenli_sel.png) no-repeat center !important;
      color: #9A2B34 !important;
      font-weight: bold;
    }
    .subleft_top{
      background: url("../../assets/images/epidemic/bg_zuo.png") no-repeat #fff;
    }
    .sub_right{
      background: url("../../assets/images/epidemic/bg_zuo.png") repeat-x #fff;
      .other{
        display: flex;
        justify-content: center;
        padding-bottom: 30px;
        span{
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(102,102,102,1);
          padding: 0 10px;
        }
      }

    }
    .subleft_top  a {
      margin-top: 26px;
      display: inherit;
      text-decoration: none;
    }
  }


</style>
