<template>
  <div class="sub_right">
    <div class="sub_rightLine"></div>
    <div class="sub_ask">
      <div class="sub_askLeft">
        <img :src="createrFaceimg" class="sub_askImg" v-if="detail.createrFaceimg">
        <img src="@/assets/images/personal/defoult.png" class="sub_askImg" v-else>
        <div class="sub_askName">{{detail.userName}}</div>
      </div>
      <div class="sub_askRight">
        <div class="sub_askTitle">
          <img class="sub_askIco" src="@/assets/images/medical/ask-ico.png">
          <div class="sub_askt">{{detail.title}}</div>
        </div>
        <div class="sub_askDescribe">{{detail.content}}</div>
        <div class="sub_askHour">{{detail.releaseTime}}</div>
      </div>
    </div>
    <div class="sub_respond" :class="detail.replyContent == null ? 'hide' : 'sub_respond'">
      <div class="sub_resLeft" v-html="detail.replyContent">
        <!--{{detail.replyContent }}-->
        <!--<div class="sub_resImg"><img src="@/assets/images/home/pic.png"></div>-->
      </div>
      <div class="sub_resRight">
        <img  class="sub-RightAsk" src="@/assets/images/personal/defoult.png" alt="" v-if="!detail.expertImg">
        <img  class="sub-RightAsk" :src=fileUrl(detail.expertImg) v-if="detail.expertImg">
        <div class="sub_resName">{{detail.expertName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import "@static/css/experts_answer/index.less"
  import {proQaAPI} from '../../api/comment/comments';

  export default {
    name: 'leave',
    data() {
      return {
        id: '',
        detail: {},
        createrFaceimg: '',

      }
    },
    created() {
      this.id = this.$route.query.id;
      this.proQa();
    },
    mounted() {

    },
    methods: {
      /*获取问题详情*/
      proQa() {
        proQaAPI({
          oid: this.id
        }).then(res => {
          this.detail = res.data.data;
          if (this.detail.createrFaceimg) {
            this.createrFaceimg = this.fileUrl(this.detail.createrFaceimg);
          }
        })
      },


    }
  }
</script>

<style lang="less">
.sub_right .sub_ask .sub_askLeft .sub_askImg,.sub_right .sub_respond .sub-RightAsk{ width:54px; height:54px; border-radius: 50%; margin: 0; padding: 0}
.sub_right .sub_ask .sub_askLeft,.sub_respond .sub_resRight .sub_resName{ text-align: center}
</style>
