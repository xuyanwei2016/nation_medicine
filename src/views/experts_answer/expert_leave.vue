<template style="height:100%;">
  <div id="answer" class="expertLeave">
    <commonHeader></commonHeader>

    <div class="answer_content"  style="height: auto!important;">
      <img src="@/assets/images/medical/emblazonry-left.png" class="emblazonry_left">
      <div class="answer_main">
        <navbar :message="parentMsg"></navbar>
        <div class="answer_sub">
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

          <div class="sub_right" style="margin-bottom: 30px;">
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
                <div class="sub_askDescribe">{{detail.content }}</div>
                <div class="sub_askHour">{{detail.releaseTime}}</div>
              </div>
            </div>
            <div v-show="this.userType==1">
              <div class="sub_respond">
                <div class="sub_resLeft" style="background: none">
                  <my-editor ref="child" @passVal="passVal"></my-editor>
                </div>
                <div class="sub_resRight">
                  <img :src=fileUrl(detail.expertImg) v-if="detail.expertImg">
                  <!--@/assets/images/medical/respond.png-->
                  <img src="@/assets/images/personal/defoult.png" v-else>
                  <!-- class="sub_askImg" -->
                  <!-- <div class="sub_resName">{{this.$store.state.userName}}</div> -->
                  <div class="sub_resName">{{detail.expertName}}</div>
                </div>
              </div>
              <div class="sub_res_btn" @click="submitBtn">提交</div>
            </div>
          </div>
        </div>
      </div>
      <img src="@/assets/images/medical/emblazonry-right.png" class="emblazonry_right" style="z-index: 0">
    </div>
    <loginAlert :isShowChild="isShowAlert"  @toFatherData="sendSonData"></loginAlert>

    <commentFoot></commentFoot>


  </div>
</template>

<script>
  import "@static/css/experts_answer/index.less"
  import commonHeader from '@/components/commonHeader.vue';
  import commentFoot from '@/components/commentFoot.vue';
  import myEditor from "@/components/editor"
  import navbar from '@/components/navbar.vue'
  import {proQapageAPI,answerAPI,proQaAPI,memberMsgAPI} from '../../api/comment/comments';
  import Cookies from "js-cookie";


  export default {
    name: 'answer',
    components: {
      commonHeader,
      commentFoot,
      myEditor,
      navbar
    },
    data() {
      return {
        pageNum:1,
        pageSize:10,
        answerList:[],
        childVal:'',
        id:'',
        detail:{},
        userName:'',
        userImg:'',
        isShowAlert:false,
        parentMsg: this.$route.query.fatherId,
        doctorId: '',
        userType: ''
      }
    },
    created(){
      this.id = this.$route.query.id;
      this.doctorId = this.$route.query.doctorId;
      this.userName=Cookies.get("userName");
      this.userImg=Cookies.get("userImg");
      this.proQa();
      this.proQapage();
      this.getUserType();
      // console.log(Cookies.get('userType'),'********')
    },
    mounted() {

    },
    methods: {
      /*获取用户类型*/
      getUserType() {
        this.userType = Cookies.get('userType')
      },
      /*子传父*/
      sendSonData(val){
        let self=this;
        self.isShowAlert=false;
      },

      /*获取问题详情*/
      proQa(){
        proQaAPI({
          oid:this.id
        }).then(res=>{
          this.detail=res.data.data;
        })
      },
      /*传过来的值*/
      passVal(val){
        this.childVal = val;
      },
      /*热门问题*/
      proQapage(){
        proQapageAPI({
          proId:this.detail.expertId,
          pageNum:this.pageNum,
          pageSize:this.pageSize,
        }).then(res=>{
          console.log(res,'vvvvvv');
          
          this.answerList=res.data.data.list;
        })
      },
      submitBtn(){
        let self=this;
        if(this.$store.state.userToken){
          this.$refs.child.passVal();
          if(this.childVal!=''){
            answerAPI({
              answer: this.childVal,
              messageId: this.id
            }).then(res=>{
              if(res.data.status){
                this.$message.success("回答成功！")
                this.$router.go(-1);
                //this.$router.push({path: '/medicalother', query: {id: this.$route.query.doctorId}})
              }else{
                this.$message.error(res.data.msg)
              }
            })
          }else{
            this.$message.warning("请填写内容！")
          }
        }else{
          self.isShowAlert=true;
        }


      },
      linkHref(id){
        this.$router.push({path: '/answer', query: {id: id}})
      },
    }
  }
</script>

<style lang="less" scoped>

  body,html{
    background: #faf9f9;
    width:100%;
    height:100%;
  }
  #answer .answer_sub{
    z-index: 1;
  }
  .expertLeave .answer_content .answer_main .sub_ask .sub_askLeft,.expertLeave .answer_content .answer_main .sub_respond .sub_resRight {
    text-align: center;
    img{
      width: 55px;
      height: 55px;
      border-radius: 50%;
    }
    .sub_askImg {
      margin-left: 0px!important;
    }
    .sub_resName{
      width:55px;

    }
  }
  .expertLeave .answer_content .answer_main .answer_sub .sub_left,.expertLeave .answer_content .answer_main .answer_sub .sub_right{ position: relative;z-index: 1}
</style>
