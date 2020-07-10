<template style="height:100%">
  <div id="answer" class="expertLeave">
    <!-- <commentHeader v-on:childByValue="childByValue"></commentHeader> -->
    <commonHeader></commonHeader>

    <div class="answer_content" style="height: auto!important;">
      <img src="@/assets/images/medical/emblazonry-left.png" class="emblazonry_left" style="z-index: -1">
      <div class="answer_main">
        <navbar :message="parentMsg"></navbar>

        <div class="answer_sub" style="margin-bottom: 30px">
          <div class="sub_left">
            <div class="subline_left"></div>
            <div class="hot_issue">热门问题
              <div class="hot_issueLine"></div>
            </div>

            <div class="hot_list" v-for="(item, index) in answerList" :key="index" @click="linkHref(item.id)">
              <div class="hot_listImg"></div>
              <div class="hot_listText">{{item.title?item.title.length>14?item.title.substring(0,14)+'...':item.title:''}}</div>
            </div>

          </div>

          <div class="sub_right">
            <div class="sub_rightLine"></div>
            <div class="sub_ask">
              <div class="sub_askLeft">
                <img :src=fileUrl(detail.createrFaceimg) class="sub_askImg" v-if="detail.createrFaceimg">
                <img src="@/assets/images/personal/defoult.png" class="sub_askImg" v-else>
                <div class="sub_askName">{{detail.userName }}</div>
              </div>
              <div class="sub_askRight">
                <div class="sub_askTitle">
                  <img class="sub_askIco" src="@/assets/images/medical/ask-ico.png">
                  <div class="sub_askt">{{detail.title }}</div>
                </div>
                <div class="sub_askDescribe">{{detail.content }} </div>
                <div class="sub_askHour">{{detail.releaseTime}}</div>
              </div>
            </div>
            <div class="sub_respond" :class="userType != 2 && detail.replyContent == null ? 'disco' : ''">
              <div class="sub_resLeft" style="background:#F4F4F4;" v-html="detail.replyContent"></div>
              <div class="sub_resRight">
                <img :src=fileUrl(detail.expertImg) v-if="detail.expertImg">
                <img src="@/assets/images/personal/defoult.png" class="sub_askImg" v-else>
                <div class="sub_resName">{{detail.expertName}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="@/assets/images/medical/emblazonry-right.png" class="emblazonry_right" style="z-index: -1">
    </div>


    <commentFoot></commentFoot>


  </div>
</template>

<script>
  import commonHeader from '@/components/commonHeader.vue';
  import commentFoot from '@/components/commentFoot.vue';
  import "@static/css/experts_answer/index.less"
  import navbar from '@/components/navbar.vue';
  import { proQaAPI, proQapageAPI } from '@/api/comment/comments';
  import Cookies from "js-cookie";


  export default {
    name: 'answer',
    data() {
      return {
        searchVal: {
          searchVal: '',
          national: '',
          nationalNum: '',
        },
        id: '',
        detail: {},
        answerList: [],
        pageNum: 1,
        pageSize: 10,
        parentMsg: this.$route.query.fatherId,
        userType: null,
        cancel: false
      }
    },
    watch: {
      $route() {
        this.id = this.$route.query.id;
        this.proQa();
      }
    },
    components: {
      commonHeader,
      commentFoot,
      navbar
    },
    mounted() {
    },
    created() {
      this.id = this.$route.query.id;
      this.proQa();
      if(Cookies.get("userType")) {
        this.userType = Cookies.get("userType")
      }
    },
    methods: {
      /*接受搜索传过来的值*/
      childByValue(childValue) {
        this.searchVal = childValue;
      },
      /*获取问题详情*/
      proQa() {
        proQaAPI({
          oid: this.id
        }).then(res => {
          this.detail = res.data.data;
          this.proQapage();
        })
      },
      proQapage() {
        proQapageAPI({
          proId: this.detail.expertId,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }).then(res => {
          this.answerList = res.data.data.list;
        })
      },
      linkHref(id) {
        this.$router.push({path: '/answer', query: {id: id}})
      },
    },
  }
</script>

<style scoped lang="less">
  body, html {
    background: #faf9f9;
    width: 100%;
    height: 100%;
  }

  #answer .answer_content .answer_main .sub_ask {
    .sub_askLeft {
      text-align: center;
      img {
        width: 55px;
        height: 55px;
        border-radius: 50%;
      }
      .sub_askImg {
        margin-left: 0px !important;
      }
      .sub_resName {
        width: 55px;

      }
    }

  }

  #answer .answer_content .answer_main .sub_respond {
    .sub_resRight {
      text-align: center;
      img {
        width: 55px;
        height: 55px;
        border-radius: 50%;
      }
      .sub_resName {
        width: 55px;

      }
    }
  }


  #answer .disco {
    display: none;
  }

</style>
