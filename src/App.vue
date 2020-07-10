<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!--<div class="answer_fixed">
      <div class="answer_phone">
        <div class="answer_phoneImg">
          <img class='index_phone_code' src="@/assets/images/medical/code_index.png" alt="手机二维码">
        </div>
        <div class="answer_phoneText">手机版</div>
      </div>
      <div class="answer_backTop" v-if="isShowBackTop">
        <a href="javascript:scroll(0,0)">
          <img src="@/assets/images/homepage/back_top.png">
          <div class="answer_backtopText">返回顶部</div>
        </a>
      </div>
    </div>-->
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {
        isShowBackTop:false,
      }
    },
    created(){
      let self=this;
      window.onscroll= function(){
        //变量t是滚动条滚动时，距离顶部的距离
        var t = document.documentElement.scrollTop||document.body.scrollTop;
        if(t>0){
          self.isShowBackTop=true
        }else{
          self.isShowBackTop=false
        }

      }

    },
    methods:{

    },
  }
</script>

<style lang="less">
  html,body{
    margin: 0px;
    padding: 0px;
    min-width: 1280px;
    height: 100%;
    /*background-color:#f5f5f5;*/
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  p{
    margin: 0;
  }
  /*分享插件的加号*/
  .share_box .bds_more{
      display: none;
  }
  /*回到顶部样式*/
  .answer_fixed {
    width: 60px;
    height: 60px;
    position: fixed;
    right: 20px;
    bottom: 320px;
    /*display: none;*/
    z-index: 111;
    .index_phone_code{
      width: 200px;
      height: 200px;
      position: absolute;
      left:-200px;
      display: none;
    }
    .answer_phone {
      width: 58px;
      height: 42px;
      padding: 10px 0;
      border: 1px solid #E3E3E3;/*
      border-bottom: none;*/
      border-radius: 3px 3px 0px 0px;
      background-color: #fff;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color:#2272E2;
        .answer_phoneImg {
          background-image: url(assets/images/homepage/qr-code-hover.png);
        }
        .answer_phoneText {
          color: #fff;
        }
        .index_phone_code{
          display: block;
        }

      }

      .answer_phoneImg {
        width: 22px;
        height: 22px;
        margin: 0 auto;
        background-image: url(assets/images/homepage/qr_code.png);

      }

      .answer_phoneText {
        margin-top: 6px;
        color: #666666;
      }
    }

    .answer_backTop {
      width: 60px;
      height: 44px;
      padding: 10px 0;
      border-radius: 0px 0px 3px 3px;
      text-align: center;
      background-color: #2272E2;
      cursor: pointer;
      a{
        display: block;
        color: #fff;
      }
    }

    .answer_backtopText {
      margin-top: 6px;
      color: #fff;
      font-size: 12px;

    }
  }

  /*删除弹出框样式*/
  .el-message-box {
    display: inline-block;
    width: 360px;
    height:200px;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 0px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: left;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    .el-message-box__header {
      position: relative;
      padding: 10px 15px 10px;
      background: #F4F4F4;
      .el-message-box__title {
        padding-left: 0;
        margin-bottom: 0;
        font-size: 14px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        line-height: 1;
        color: #303133;
      }
      .el-message-box__headerbtn {
        position: absolute;
        top: 10px;
        right: 15px;
        padding: 0;
        border: none;
        outline: 0;
        background: 0 0;
        font-size: 16px;
        cursor: pointer;
      }
    }
    .el-message-box__content{
      position: relative;
      padding: 39px 15px 47px 15px;
      color: #454545;
      font-size: 18px;
      text-align: center;
      .el-message-box__status, .el-icon-warning{
        display: none;
      }
      .el-message-box__message{
        padding: 0;
      }
    }
    .el-message-box__btns {
      display: flex;
      justify-content: center;
      flex-direction: row-reverse;
      .el-button--small, .el-button--small.is-round {
        padding: 9px 24px;
      }
      .el-button--primary {
        color: #fff;
        background-color: #F07C7D;
        border-color: #F07C7D;
      }
    }
    .el-message-box__btns button:nth-child(2) {
      float: left;
      margin-right: 50px;
    }
    .el-message-box__btns button:nth-child(1) {
      margin-left: 50px;
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #EEEEEE;
      border: 1px solid #EEEEEE;
      color: #BBBBBB;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      -webkit-transition: .1s;
      transition: .1s;
      font-weight: 500;
      font-size: 14px;
      border-radius: 4px;
    }

  }
// 修改充值tab线
.account_main {
  .el-tabs--top .el-tabs__item.is-top:nth-child(2)::after{
    content:"/";
    color:#CACFD9;
    position: absolute;
    right: -2px;
    font-size: 14px;
  }
  .el-tabs__item:not(.is-active):hover{
    color: #303133 !important;
  }
  .el-tabs__active-bar{
    background-color:transparent;
  }
  .el-tabs__nav-wrap::after{
    background-color: transparent !important;
  }
  .account_main .el-tabs__active-bar{
    background-color: transparent !important;
  }
}
.aplayer-music{
  overflow:auto !important;
}
.aplayer{
  background-color: transparent !important;
  box-shadow:none !important;
  overflow:auto !important;
  // margin-top:20px !important;
  .aplayer-info{
    padding-top:26px !important;
    padding-left:2px !important;
    overflow:auto !important;
  }
  .aplayer-played{
    background-color: #2272E2 !important;
    .aplayer-thumb{
          background-color: #2272E2 !important;
        }
  }
  .inactive{
    display:none !important;
  }
}
.aplayer-pic{
      background-image: none !important;
      background: transparent !important;
      .aplayer-play{
        background-color: transparent !important;
        // border-color:#2B72D5 !important;
        border:none !important;
         width: 28px !important;
          height: 28px !important;
          svg{
            display: none !important;
          }
        .aplayer-icon{
          width: 28px !important;
          height: 28px !important;
          top:-1px !important;
          left:-1px !important;
          background:url(../src/assets/images/medical/play_icon.png) no-repeat center;

        }
      }
      .aplayer-pause{
        border: none !important;
        background-color: transparent !important;
        width: 28px !important;
          height: 28px !important;
          bottom:18px !important;
          right:18px !important;
          background:url(../src/assets/images/medical/playzan_icon.png) no-repeat center !important;
        svg{
            display: none !important;
          }
      }
  }

.aplayer-thumb{
  border-color:#2B72D5 !important;

}
.aplayer-music{
  display: none !important;
}
.epidemicLoad .el-loading-spinner .path{
   stroke: #4F4133;
  }
.epidemicSearch .el-loading-parent--relative,.epidemicBook .el-loading-parent--relative,.forumCss .el-loading-parent--relative,.epidemicList .el-loading-parent--relative,.epidemicRead .el-loading-parent--relative{min-height:600px;}

.forumCss .el-loading-parent--relative .el-loading-mask{background:none}
.epidemicList  .el-loading-parent--relative .el-loading-mask{background:none}
.epidemicRead .el-loading-parent--relative .el-loading-mask{background:none}
.epidemicDetail .detail .info .infoP img{
  display: block;
  margin: 0 auto;
  }


</style>
