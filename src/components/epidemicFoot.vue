<template>
    <div class="epidemicFoot">
      <div class="foot contCss">
        <div class="seven">
          <div class="sevenO">
            <h1>友情链接 </h1>
            <h2>Friendship link</h2>
            <ul>
              <li v-for="(item,index) in linkList" :key="index" @click="linkChange(item.url)">{{item.title}}</li>
              <!--<li>中图在线</li>
              <li>人民网</li>
              <li>中国图书出版网</li>
              <li>国家新闻出版广电总局（原新闻出版总署网）</li>-->
            </ul>
          </div>
          <ul class="sevenT">
            <li v-for="(it,inx) in footerList" :key="inx"><router-link :to="{path:'/epidemicAbout',query:{id:it.id}}" target="_blank">{{it.title}}</router-link></li>
            <!--<li>免责声明</li>
            <li>版权声明</li>
            <li>购买须知</li>
            <li>联系我们</li>-->
          </ul>
          <p v-html="dictionaryText"></p>
          <p>地址：北京市东直门内南小街16号 电话：010-64089446</p>
        </div>
        <div class="eight">
          温馨提示，为了获得最佳用户体验，建议您使用Chrome，Firefox，IE9+，360浏览器极速模式
        </div>

      </div>
    </div>
</template>

<script>
  import {linksAPI,footerAPI,dictionaryAPI } from '@/api/common'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        linkList:[],
        footerList:[],
        footerQuery: {
          pageNum:1,
          pageSize:4
        },
        dictionaryText: null,
      }
    },
    created () {
      this.getLinks();
      this.getFooter();
      this.getdictionary();
    },
    watch: {},
    methods: {
      getLinks() {//友情链接
        linksAPI({num:5}).then(res =>{
          this.linkList = res.data.data;
        })
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
      linkChange(url) {//链接跳转
        window.open(url,'_blank')
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  ul,li,h1,h2,h3,h4,h5,p,span,div{margin: 0;padding: 0;list-style: none}
.epidemicFoot{
  .contCss{
    width:100%;
    min-width: 1200px;
    .cont{
      width: 1200px;
      padding-top: 0;
      margin-top: 0;
    }
  }
  .foot{
    position: relative;
    z-index: 0;
    height: 292px;
    margin-top: -8px;
    .seven{
      height: 242px;
      background: url("../assets/images/epidemic/link-bg.png") no-repeat;
      color: #4F4133;
      display: flex;
      flex-direction: column;
      align-items: center;
      .sevenO{
        width: 1200px;
        border-bottom: 1px solid #A49881;
        display: flex;
        justify-content: flex-start;
        height: 60px;
        margin-top: 30px;
        h1{
          font-size:24px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(79,65,51,1);
          line-height: 60px;
          padding-right: 11px;
        }
        h2{
          font-size:16px;
          font-family:Arial;
          font-weight:400;
          color:rgba(116,99,81,1);
          padding-top: 20px;
          line-height: 34px;
        }
        ul{
          color: #4F4133;
          padding-left: 51px;
          display: flex;
          align-items: center;
          margin-top: 5px;
          li{
            float: left;
            height: 16px;
            line-height: 16px;
            font-size: 14px;
            cursor:pointer;
          }
          li:after{
            content: '|';
            /*border-right: 1px solid #4F4133;*/
            height: 14px;
            margin:-2px 20px 0 20px;
          }
          li:last-child:after{
            content: '';
            margin: 0;
          }
        }
      }

      .sevenT{
        margin-top: 27px;
        margin-bottom: 3px;
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(79,65,51,1);
        line-height:34px;
        li{
          float: left;
          a{color:rgba(79,65,51,1);}
        }
        li:after{
          content: '|';
          /*border-right: 1px solid #4F4133;*/
          height: 16px;
          margin: 0 26px;
        }
        li:last-child:after{
          content: '';
          margin: 0;
        }

      }
      p{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(79,65,51,1);
        line-height:34px;
      }
    }
    .eight{
      height:50px;
      background: url("../assets/images/epidemic/eight-bg.png") no-repeat;
      text-align: center;
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(253,253,252,1);
      line-height: 50px;
    }
  }
}
</style>
