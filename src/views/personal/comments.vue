<template>
  <div class="comment">
    <commentHeader v-on:childByValue="childByValue"></commentHeader>
    <div class="comments_content">
      <div class="commentsRightBg"></div>
      <div class="comments_main">
        <!-- <div class="medical_location" style="margin-bottom: 25px">
          <img src="@/assets/images/medical/location.png" class="location_img">
          <span>您的当前位置：首页&nbsp;&nbsp;&gt;&nbsp;&nbsp;{{type}}&nbsp;&nbsp;&gt;</span>
          <span>{{type}}评论</span>
        </div> -->
        <navbar></navbar>
        <div class="commentLeft">
          <div class="comLfArticle">
            <div class="comImg" v-if="detail.bookCover">
              <img :src=fileUrl(detail.bookCover) alt="">
            </div>
            <div class="comWord">
              <div class="comTit">{{detail.name?detail.name:detail.title}}</div>
              <div class="comother" v-if="type==1">{{detail.author}} <span>|</span> {{detail.year}}年{{detail.month}}月出版</div>
              <div class="comother" v-if="type!=1&&detail.previewText">{{detail.previewText | limit}}</div>
              <div class="comother" v-if="type!=1&&!detail.previewText">{{detail.synopsis | limit}}</div>
            </div>


            <div class="writeComment" @click="writeCom" v-if="userType!=2">写评论</div>
          </div>
          <div class="comLfList">
            <ul>
              <li class="itemData" v-for="(item,index) in commentList" :key="index">
                <div class="itemHeader">
                  <img :src=fileUrl(item.userImg) alt="" v-if="item.userImg&&item.userImg!=''">
                  <img src='@/assets/images/personal/defoult.png' alt="" v-else>
                </div>
                <div class="listCont">
                  <div class="itemTit">
                    <span class="title">{{item.userName}}</span>
                    <div class="itemStar">
                      <span><img src="../../assets/images/personal/starty.png" alt="" v-for="(val,index1) in item.score" :key="index1">
                      </span>
                      <ul>
                        <li v-for="(item,index) in startNum" :key="index"></li>
                      </ul>
                    </div>

                    <span>{{item.releaseTime}}</span>
                  </div>
                  <div class="itemCont">
                    {{item.content}}
                  </div>
                  <div class="itemOper">
                    <!-- v-if="userId!=item.userId&&userType!=2" -->
                    <div class="comNum" @click="lookCom(item.id)" v-if="userType!=2">
                      <span v-if="item.replyNum!=0">{{item.replyNum}}</span>
                    </div>
                    <div class="thumbNum" @click="commentAgree(item.id,item)">
                      <img src="@/assets/images/home/agree.png" alt="" v-if="item.isAgree">
                      <img src="@/assets/images/personal/comico2.png" alt="" v-else>
                      <span>{{item.fabulousNum}}</span></div>
                  </div>
                </div>


              </li>

            </ul>
          </div>



          <div class="pagination_box">
            <pagination @change="pageChange" :current-page="pageNum" :page-size="pageSize" :total-page="lastPage"></pagination>
            <!-- <el-pagination  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="prev, pager, next, total, jumper" :total="total"></el-pagination> -->
          </div>


        </div>
        <div class="commentRight">
          <div class="subleft_bot1">
            <div class="subleft_botTitle">同类图书排行</div>
            <div class="subleft_botLine"></div>
            <!--<div :class="isShowBook==index2?'subleft_textbook':'subleft_textbookList'" v-for="(book, index2) in sameList" :key="index2">
              <div :class="isShowBook==index2?'textbook_number':'textbookList_num'" >{{index2+1}}</div>
              <img :src=fileUrl(detail.bookCover) class="textbook_img" v-if="isShowBook==index2">
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
                <img :src=fileUrl(book.bookCover) class="textbook_img" @click="linkDetail(book.id)">
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
    <div class="alertCont" v-if="comStatus">
      <div class="alertBg"></div>
      <div class="alertShow">
        <div class="title">
          <span>写评论</span>
          <span  @click="cancelBtn"><img src="../../assets/images/personal/close.png" alt=""></span>
        </div>
        <div class="cont2">
          <div class="itemWord">星评：</div>
          <el-rate v-model="changStar" :colors="['#F66B20', '#F66B20', '#F66B20']"></el-rate>
          <!--<div class="itemStar">

            &lt;!&ndash;<span>
              <img src="../../assets/images/personal/starty.png" alt="">
              <img src="../../assets/images/personal/starty.png" alt="">
            </span>
            <ul>
              <li v-for="(item,index) in startNum" :key="index"></li>
            </ul>&ndash;&gt;
          </div>-->
        </div>
        <div class="cont3">
          <textarea name="" id="" cols="30" rows="10" maxlength="300" style="resize:none" placeholder="商品这么赞，你就不想写点什么吗？"
                    v-model="textCont" @input="inputTextCont"></textarea>
          <span>{{textCont.length}}/300字</span>

        </div>
        <p class="tipMsg" v-if="isShowtextCont">请填写内容</p>
        <div class="cont4">
          <button class="btn1" @click="saveBtn">保存</button>
          <button class="btn2" @click="cancelBtn">取消</button>
        </div>
      </div>

    </div>

    <loginAlert :isShowChild="isShowAlert"  @toFatherData="sendSonData"></loginAlert>

    <commentFoot></commentFoot>

  </div>
</template>

<script>
  import "@static/css/personal/comments.less"
  /*  import "@static/css/index.less";*/
  import Cookies from 'js-cookie';
  import navbar from '@/components/navbar.vue'
  import commentHeader from '@/components/commentHeader.vue';
  import commentFoot from '@/components/commentFoot.vue';
  import {
    getCommentListAPI,
    commentSaveAPI,
    ebookDetailAPI,
    articleDetailAPI,
    authorLibraryDetailAPI,
    resourceAPI,
    commentAgreeAPI,
    ebookOtherAPI,
    relevantArticleAPI
  } from '@/api/comment/comments';

  export default {
    name: 'mongolia',
    data() {
      return {
        startNum: 5,
        listData: [],
        textCont: '',
        comStatus: false,
        searchVal:{
          searchVal:'',
          national:'',
          nationalNum:'',
        },
        changStar: 5,
        type: null,
        id:null,
        detail:{},
        pageNum:1,
        pageSize:15,
        commentList:[],
        resourceList:{},
        resourceType:null,
        sameList:[],
        isShowBook:null,
        articleList:[],
        isShowtextCont:false,
        total:0,
        isShowAlert:false,
        lastPage:0,
      }
    },
    components: {
      commentHeader,
      commentFoot,
      navbar
    },
    computed:{
      userId(){
        return this.$store.state.userId;
      },
      userType(){
        //console.log("1q2qqqqqq",this.$store.state.userId,this.$store.state.userType)
        return this.$store.state.userType;
      },

    },
    created() {
      this.type = this.$route.query.type;
      this.id = this.$route.query.id;
      /*this.resource();*/
      this.gitDetail();


    },
    methods: {
      /*子传父*/
      sendSonData(val){
        let self=this;
        self.isShowAlert=false;
      },
      /*获取资源分类*/
      resource(){
        resourceAPI({isMedia:0}).then(res=>{
          console.log("音频视频",res.data)
          this.resourceList=res.data.data;

          for(let val in this.resourceList){
            console.log("111111111111",this.resourceList[val], this.type,val)
            if(this.resourceList[val]== this.type){

              this.resourceType=val;

            }
          }

        })
      },
      gitDetail() {

        if (this.type == 2) {
          authorLibraryDetailAPI({
            id:this.id
          }).then(res=>{
            console.log("医家详情",res.data.data)
            this.detail=res.data.data;
          })

        }else if (this.type == 1) {
          ebookDetailAPI({
            id:this.id
          }).then(res=>{
            console.log("医著详情",res.data.data)
            this.detail=res.data.data;
            this.timeSub();
          })
        }else{
          articleDetailAPI({
            id:this.id
          }).then(res=>{
            console.log("其他详情",res.data.data)
            this.detail=res.data.data;

          })
        }
        this.getCommentList();



      },
      /*截取时间*/
      timeSub(){
        this.detail.year=this.detail.publishTime.substring(0,4);
        this.detail.month=this.detail.publishTime.substring(5,7);
      },
      /*查询列表 0全部1理论 2药物 3方剂 4临床 5医案 6文化 7机构 8医论 9其他 10医著*/
      getCommentList() {
        getCommentListAPI({
          resourceId: this.$route.query.id,
          resourceClass: this.type,
          //资源类型 0全部1理论 2药物 3方剂 4临床 5医案 6文化 7机构 8医论 9其他 10医著 注：1-9与文章类型一致
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }).then(res => {
          this.commentList=res.data.data.list;
          this.total=res.data.data.total;
          this.lastPage = Math.ceil(Number(res.data.data.total) / Number(this.pageSize));
          console.log("获取评论列表", res.data.data.list)
        })
      },

      /*接受搜索传过来的值*/
      childByValue(childValue) {
        this.searchVal = childValue;
        // childValue就是子组件传过来的值
        console.log("子组件传过来的", childValue)
        this.ebookOther();
      },
      writeCom() {
        if(Cookies.get("Y-Token")){
          this.comStatus = true
        }else{
          this.isShowAlert=true;
        }

      },
      /*点赞*/
      commentAgree(id,item){
        if(Cookies.get("Y-Token")){
          this.$forceUpdate()
          if(!item.isAgree){
            commentAgreeAPI({
              commentId:id
            }).then(res=>{
              console.log("!!!!!!!!!!!",res.data)
              if(res.data.status){
                this.$message.success("点赞成功！")
                for(let i=0;i<this.commentList.length;i++){
                  if(this.commentList[i].id==id){

                    this.$set(this.commentList[i], 'isAgree', !this.commentList[i].isAgree);
                    this.commentList[i].fabulousNum++;

                  }
                }
              }else{
                this.$message.error(res.data.msg)
              }


            })
          }else{//不可以取消点赞
            this.$message.warning('已点赞成功')
          }
        }else{
          this.isShowAlert=true;
        }


      },
      /*跳转*/
      lookCom(id) {
        this.$router.push({path: '/commentReply', query: {id: id,type:this.type}})
      },

      /*保存评论*/
      saveBtn() {
        let textCon=this.textCont.replace(/^\s+|\s+$/g,'')
        if(Cookies.get("Y-Token")){
          if (textCon == '') {
            this.$message.warning("请填写评论内容！")
            /*this.isShowtextCont=true;*/
          } else {
            commentSaveAPI({
              content: textCon,//评论内容
              fatherId: 0,//父级评论id：0资源，其他评论id
              fatherName: '',//父级评论用户名
              id: '',//评论id
              mainId: 0,// 所属主评论id：0资源主评论，其他主评论id
              resourceClass: this.type,//资源类型 0全部1理论 2药物 3方剂 4临床 5医案 6文化 7机构 8医论 9其他 10医著 注：1-9与文章类型一致
              resourceId: this.$route.query.id,//资源id
              resourceName: this.detail.name?this.detail.name:this.detail.title,//资源名称
              score: this.changStar,
            }).then(res => {
              if(res.data.status){
                this.$message.success("评论成功，请耐心等待审核通过！")
                this.getCommentList();
                this.cancelBtn();

              }else{
                this.$message.error(res.data.msg)
              }

            })

          }

        }else{
          this.isShowAlert=true;
        }


      },
      /*取消评论*/
      cancelBtn(){
        this.comStatus=false;
        this.textCont='';
        this.changStar=5;
        this.isShowtextCont=false;
      },
      /*输入验证*/
      inputTextCont(){
        if(this.textCont==''){
          this.isShowtextCont=true;
        }else{
          this.isShowtextCont=false;
        }
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
      // 分页
        pageChange(val) {
          this.pageNum = val
          this.getCommentList()
        },
      // handleCurrentChange(val) {
      //   this.pageNum = val
      //   this.getCommentList()
      // },
      /*跳转*/
      linkDetail(id){
        this.id=id;
        this.$router.push({path: '/medetails', query: {id: id}})

        /*this.$forceUpdate()*/

      },
    },
  }
</script>

<style lang="less">
  .pagination_box {
    background-color: #fff;
    padding: 20px 0;
    width: 100%;
    text-align: center;
  }
  .commentRight_tip{ cursor: pointer}
</style>
