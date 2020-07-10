<template>
  <div class="comment">
    <commentHeader  v-on:childByValue="childByValue"></commentHeader>
    <div class="comments_content">
      <div class="commentsRightBg"></div>
      <div class="comments_main">
        <!-- <navbar></navbar> -->
        <div class="medical_location" style="margin-bottom: 25px">
          <img src="@/assets/images/medical/location.png" class="location_img">
          <span>您的当前位置：</span>
          <router-link to="/index">首页&nbsp;&nbsp;&gt;</router-link>
          <router-link to="/theory">{{resourceType}}&nbsp;&nbsp;&gt;</router-link>
          <span>{{resourceType}}评论</span>
        </div>
        <div class="commentLeft">
          <div class="replyArticle">
            <p style="cursor: pointer" @click="goBack"><< 返回评论列表</p>
          </div>
          <div class="comLfList">
            <ul>
              <li class="itemData"  style="border-bottom: none">
                <div style="width:100%; display: block; height:auto;">
                  <div class="itemHeader">
                    <img :src=fileUrl(detail.userImg) alt="" v-if="detail.userImg&&detail.userImg!=''">
                    <img src='../../assets/images/personal/defoult.png' alt="" v-else>
                  </div>
                  <div class="listCont">
                    <div class="itemTit">
                      <span class="title">{{detail.userName}}</span>
                      <div class="itemStar">
                      <span><img src="../../assets/images/personal/starty.png" alt="" v-for="(val,index) in detail.score" :key="index">
                        </span>
                        <ul>
                          <li v-for="(item,index) in startNum" :key="index"></li>
                        </ul>
                      </div>
                      <span>{{detail.releaseTime}}</span>
                    </div>
                    <div class="itemCont">
                      {{detail.content}}
                    </div>
                    <div class="itemOper">
                      <div class="comNum" @click="lookCom(detail.id)"><span>{{detail.replyNum}}</span></div>
                      <div class="thumbNum" @click="commentAgree(detail.id,detail)">
                        <img src="@/assets/images/home/agree.png" alt="" v-if="detail.isAgree">
                        <img src="@/assets/images/personal/comico2.png" alt="" v-else>
                        <span>{{fabulousNum}}</span></div>
                    </div>
                  </div>
                </div>
                <div class="commentList">
                  <div class="comInput" v-if="userId!=detail.userId">
                    <div class="triangle"></div>
                    <textarea name=""  cols="30" rows="10" placeholder="针对这条评论进行回复" style="resize:none" v-model="textReplyCont"></textarea>
                  </div>
                  <div v-if="userId!=detail.userId" class="btn3" @click="saveBtn" style="cursor: pointer">回复</div>
                  <ul class="itemUl"><!-- v-if="replyVoList.length>0"-->
                    <li class="itemData" v-for="(item,index2) in replyVoList" :key="index2">

                      <div class="listCont">
                        <div class="itemTit">
                          <span class="title">{{item.userName}} <b v-if="item.fatherId!=detail.id"> <b style="color:#468BEC">回复</b> {{item.fatherName}}</b></span>
                          <span>{{item.releaseTime}}</span>
                        </div>
                        <div class="itemCont">
                          {{item.content}}
                        </div>
                        <div class="itemOper">
                          <div class="comNum" v-if="item.userId" @click="isShowBtn(item.id)"></div>
                        </div>
                        <div class="replyReply" v-if="item.isShow">
                          <div class="triangle"></div>
                          <textarea name=""  cols="30" rows="10" :placeholder='"针对"+item.userName+"的评论进行回复"' style="resize:none" v-model="textReplyReply"></textarea>
                        <div class="btn5" @click="replyBtn(item.id)">回复</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="commentRight">
          <div class="subleft_bot1">
            <div class="subleft_botTitle">同类图书排行</div>
            <div class="subleft_botLine"></div>



            <!--<div :class="isShowBook==index2?'subleft_textbook':'subleft_textbookList'" v-for="(book, index2) in sameList" :key="index2">
              <div :class="isShowBook==index2?'textbook_number':'textbookList_num'" >{{index2+1}}</div>
              <img :src=fileUrl(book.bookCover) class="textbook_img" v-if="isShowBook==index2">
              <div class="commentRight_tip" @click="linkDetail(book.id)">
                <div :class="isShowBook==index2?'textbook_title':'textbookList_text'" @mousemove.prevent='mousemove(index2)'>《{{book.name}}》</div>
                <div class="textbook_author" v-if="isShowBook==index2">{{book.author?book.author.length>5?book.author.slice(0,5):book.author:''}}</div>
                <div class="commentRight_price" v-if="isShowBook==index2">￥{{book.price?book.price:'0'}}</div>
              </div>
            </div>-->

            <div class="subleft_textbookList" v-for="(book, index2) in sameList" :key="index2" @mousemove.prevent='mousemove(index2)'>
              <div  v-if="isShowBook!=index2" class="meDetail_textbookTitle">
                <div class="textbookList_num" >{{index2+1}}</div>
                <div class="commentRight_tip" @click="linkDetail(book.id)">
                  <div class="textbookList_text">《{{book.name}}》</div>
                </div>
              </div>

              <div class="subleft_textbook"  v-if="isShowBook==index2" @mouseout="mouseoutItem">
                <div class="textbook_number" >{{index2+1}}</div>
                <img :src=fileUrl(book.bookCover) class="textbook_img"  :onerror="errorImg()" @click="linkDetail(book.id)">
                <div class="commentRight_tip" @click="linkDetail(book.id)">
                  <div class="textbook_title">《{{book.name}}》</div>
                  <div class="textbook_author">{{book.author?book.author.length>5?book.author.slice(0,5):book.author:''}}</div>
                  <div class="commentRight_price">￥{{book.price?book.price:'0'}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="com_left" v-if="articleList.length>0">
            <div class="subleft_botTitle">相关文章</div>
            <div class="subleft_botLine"></div>
            <div class="hot_list" v-for="(item,index) in articleList" :key="index">
              <div class="hot_listImg"></div>
              <div class="hot_listText">{{item.synopsis}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="commentsLeftBg"></div>
    </div>
    <loginAlert :isShowChild="isShowAlert"  @toFatherData="sendSonData"></loginAlert>
    <commentFoot></commentFoot>
  </div>
</template>

<script>
  import "@static/css/personal/comments.less"
  import Cookies from "js-cookie";
  import commentHeader from '../../components/commentHeader.vue';
  import commentFoot from '../../components/commentFoot.vue';
  import navbar from '@/components/navbar.vue';
  import {getCommentDetailAPI,commentAgreeAPI,ebookOtherAPI,relevantArticleAPI,commentSaveAPI,resourceAPI } from '../../api/comment/comments';

  export default {
    name: 'mongolia',
    data() {
      return {
        startNum: 5,
        listData: [],
        textCont:'',
        comStatus:false,
        type:null,
        id:null,
        detail:{},
        sameList:[],
        articleList:[],
        isShowBook:null,
        isShowText:false,
        replyVoList:[],
        fabulousNum:0,
        textReplyCont:'',
        resourceList:{},
        resourceType:null,
        textReplyReply:'',
        searchVal:{
          searchVal:'',
          national:'',
          nationalNum:'',
        },
        isShowAlert:false,
      }
    },
    components: {
      commentHeader,
      commentFoot,
      //navbar
    },
    created() {
      this.type = this.$route.query.type;
      this.id = this.$route.query.id;
      this.resource();
      this.getCommentDetail();
    },
    computed:{
      userId(){
        return this.$store.state.userId;
      },
      userType(){
        return this.$store.state.userType;
      },

    },
    methods: {
      /*子传父*/
      sendSonData(val){
        let self=this;
        self.isShowAlert=false;
      },
      /*获取资源分类*/
      resource(){
        if(this.$route.query.type==1){
          this.resourceType='医著';
        }else{
          this.resourceType='文章';
        }
        /*resourceAPI({isMedia:0}).then(res=>{
          console.log("音频视频",res.data)
          this.resourceList=res.data.data;
          for(let val in this.resourceList){
            if(val== 1){
              this.resourceType=''this.resourceList[val]'';
            }
          }

        })*/
      },
      /*返回*/
      goBack(){
        this.$router.go(-1);
      },

      /*查看评论下的回复*/
      lookCom(id){
        this.$router.push({path: '/commentReply', query: {id: id,type:this.detail.resourceClass}})
      },
      /*获取评论详情及回复列表*/
      getCommentDetail(){
        getCommentDetailAPI({
          oid:this.id
        }).then(res=>{
          this.detail=res.data.data;
          this.fabulousNum=res.data.data.fabulousNum;
          this.replyVoList=res.data.data.replyVoList;
          for(let i=0;i<this.replyVoList.length;i++){
            this.$set(this.replyVoList[i], 'isShow', false)
          }
          console.log("获取评论详情及列表",res.data)

        })
      },
      /*点赞*/
      commentAgree(id,item){
        if(Cookies.get("Y-Token")){
          if(!item.isAgree){
            commentAgreeAPI({
              commentId:id
            }).then(res=>{
              console.log("!!!!!!!!!!!",res.data)
              if(res.data.status){
                /*detail.isAgree*/
                this.$set(this.detail, 'isAgree', !this.detail.isAgree)
                this.fabulousNum=this.fabulousNum+1;
                this.$message.success('点赞成功')
              }


            })
          }else{//不可以取消点赞
            this.$message.warning('已点赞成功')
          }
        }else{
          this.isShowAlert=true;
        }


      },
      /*接受搜索传过来的值*/
      childByValue(childValue) {
        this.searchVal = childValue;
        this.ebookOther();
      },
      /*同类书排行列表*/
      ebookOther(){
        ebookOtherAPI({
          id:this.id,
          num:8,
          nationsType:this.searchVal.nationalNum,//民族 1蒙古族 2侗族 3藏族 4朝鲜族 5土家族 6回族 7满族 8汉族
        }).then(res=>{
          this.sameList=res.data.data;
          console.log('同类书排行列表',res.data)
          this.relevantArticle();
        })
      },
      /*同类书*/
      mousemove(index){
        this.isShowBook=index;
      },
      /*移出*/
      mouseoutItem(){
        this.isShowBook=null;
      },
      /*相同文章*/
      relevantArticle(){
        relevantArticleAPI({
          bookId:this.id,
          num:10,
        }).then(res=>{
          this.articleList=res.data.data;

        })
      },

      /*保存评论*/
      saveBtn() {
        let textCon=this.textReplyCont.replace(/^\s+|\s+$/g,'')
        if(Cookies.get("Y-Token")){
          if (textCon == '') {
            this.$message.warning("请填写评论内容！")
          } else {
            let data={
              content: textCon,//评论内容
              fatherId: this.detail.id,//父级评论id：0资源，其他评论id
              fatherName: this.detail.userName ,//父级评论用户名
              id: '',//评论id
              mainId: this.detail.id ,// 所属主评论id：0资源主评论，其他主评论id
              resourceClass: this.type,//资源类型 0全部1理论 2药物 3方剂 4临床 5医案 6文化 7机构 8医论 9其他 10医著 注：1-9与文章类型一致
              resourceId: this.detail.resourceId,//资源id
              resourceName: this.detail.resourceName,//资源名称
              score: 5,
            };
            this.commentSave(data)

          }
        }else{
          this.isShowAlert=true;
        }


      },
      /*评论借口*/
      commentSave(data){
        commentSaveAPI(data).then(res=>{
          if (res.data.status){
            this.$message.success("评论成功，请耐心等待审核！")
            this.getCommentDetail()
            this.textReplyCont='';
          }else{
            this.$message.error(res.data.msg)
          }
        })
      },
      /*点击回复中评论图标*/
      isShowBtn(id){
        this.textReplyReply='';
        for(let i=0;i<this.replyVoList.length;i++){
          if(this.replyVoList[i].id==id){
            this.$set(this.replyVoList[i], 'isShow', !this.replyVoList[i].isShow)
          }else{
            this.$set(this.replyVoList[i], 'isShow', false)
          }

        }
      },
      /*针对于回复回复*/
      replyBtn(id){
        let textCon=this.textReplyReply.replace(/^\s+|\s+$/g,'')
        if(Cookies.get("Y-Token")){
          if (textCon == '') {
            this.$message.warning("请填写评论内容！")
            /*this.isShowtextCont=true;*/
          } else {
            let data={
              content: textCon,//评论内容
              fatherId: id,//父级评论id：0资源，其他评论id
              fatherName: this.detail.userName ,//父级评论用户名
              id: '',//评论id
              mainId: this.detail.id ,// 所属主评论id：0资源主评论，其他主评论id
              resourceClass: this.type,//资源类型 0全部1理论 2药物 3方剂 4临床 5医案 6文化 7机构 8医论 9其他 10医著 注：1-9与文章类型一致
              resourceId: this.detail.resourceId,//资源id
              resourceName: this.detail.resourceName,//资源名称
              score: 5,
            };
            this.commentSave(data)

          }
        }else{
          this.isShowAlert=true;
        }


      },
      /*跳转*/
      linkDetail(id){
        this.id=id;
        this.$router.push({path: '/medetails', query: {id: id}})

        /*this.$forceUpdate()*/

      },
    },
  }
</script>

<style>

</style>
