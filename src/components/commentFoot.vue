<template>
  <div class="answer_page">
    <div class="answer_footer">
      <div class="answer_aboutUs">
        <p v-for="(item,index) in footerList" :key="item.id" style="display:inline">
          <router-link :to="{path:'/aboutUs',query:{id:item.id}}">
            <span>{{item.title}}</span>
          </router-link>
          <i v-if="index != footerList.length-1">|</i>
        </p>
      </div>

      <div class="answer_footerText" v-html="dictionaryText"></div>



      <div class="answer_indexText"><span> 地　　址  ：</span>北京市东直门内南小街16号<span>电　　话：</span>010-64089446</div>
    </div>
    <div class="answer_tips">温馨提示，为了获得最佳用户体验，建议您使用Chrome，Firefox，IE9+，360浏览器极速模式</div>
  </div>
</template>

<script>
  import "@static/css/experts_answer/index.less";
  import "@static/css/index.less";
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

</style>
