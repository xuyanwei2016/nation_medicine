<template>
  <div id="message-details" class="epidemicDetail">
    <div class="message_content" style="padding-top: 0;background: none">
      <div class="message_wrap">
        <div class="message_wrap_location" style="font-size: 14px;">
          <img src="@/assets/images/medical/location.png" class="location_img">
          <span class="location_tip" style="color: #999999">您的当前位置：<router-link to="/" style="color: #999999">首页</router-link>　&gt;</span>
          <span class="location_text" style="color: #9A2B34">{{list.title}}</span>
        </div>
        <div class="message_wrap_con">
          <div class="message_wrap_s">
            <div class="message_wrap_title">{{list.title}}</div>
            <div class="message_wrap_source">
              <span class="message_wrap_source_tip" v-if="list.source">来源:{{list.source}}</span>
              <span class="message_wrap_source_time">发布于:{{list.createTime}}</span>
            </div>
          </div>
          <div v-html="list.content" class="aboutUs_content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { footerDetailsAPI } from '@/api/common'
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'
  import '@static/css/personal/message.less'

  export default {
    name:'home',
    components: { Header,  Footer },
    data() {
      return{
        id: this.$route.query.id,
        list:{},
      }
    },
    watch: {
      $route() {
        this.getList()
      }
    },
    created() {
      this.getList()
    },
    methods:{
      getList() {
        this.id=this.$route.query.id;
        /*let self=this;
        self.$forceupdate()*/
        footerDetailsAPI(this.id).then(res => {

          console.log(res);
          this.list = res.data.data
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .aboutUs_content{
    min-height: 400px;
    line-height:34px;
    p{
      line-height:34px;
    }
  }
  .epidemicDetail{
    width: 100%;
    min-width: 1200px;
    padding-top: 0px;
    background: url("../../assets/images/epidemic/bg_top.png") no-repeat;
  }
</style>





