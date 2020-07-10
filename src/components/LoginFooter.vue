<template>
  <div class="page">
    <div class="footer">
      <div class="aboutUs">

          <span v-for="(item,index) in footerList" :key="item.id"><router-link :to="{path:'/aboutUs',query:{id:item.id}}">{{item.title}}</router-link><i v-if="index != footerList.length-1">|</i></span>
      </div>
      <div class="footerText" style="cursor: auto" v-html="dictionaryText"></div>
      <div class="indexText"><span> 地　　址  ：</span>北京市东直门内南小街16号<span>电　　话：</span>010-64089446</div>
    </div>
  </div>
</template>
<script>
  import {footerAPI,dictionaryAPI } from '@/api/common'
export default {
  data() {
    return {
      footerList:[],
      footerQuery: {
        pageNum:1,
        pageSize:4
      },
      dictionaryText: null,
    }
  },
  created(){
    this.getFooter();
    this.getdictionary();
  },
  methods: {
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

  }

}
</script>
<style lang="less" scoped>

.page{
  width: 100%;
}
.footer{
  height: 200px;
  background-image: url(../../src/assets/images/login/bottom-bg.png);
  overflow: hidden;
}
.footerText,.aboutUs{
  text-align: center;
  margin: 20px 0;
  color:#333;
  span{
    /*margin:0 15px 0 0;*/
    color:#666;
    a{
      margin:0 15px;
      color: #333;
      /*i{padding-left: 10px;}*/
    }
  }
  span:first-child{
    margin-left: 0;
  }
  span:last-child{
    margin-right: 0;
  }
}
.aboutUs{
  margin-top: 50px;
}
.indexText{
  text-align: center;
  margin: 20px 0;
  color:#333333;
  margin-bottom: 50px;
  span{
    margin-left: 30px;
  }
}
</style>

