<template>
  <div id="medetails_wrap" class="epidemicCss">
    <div class='userother_content_bg' style="background: none">

      <div class="medetails_wrap">
        <!--面包屑-->
        <navbar></navbar>
        <div class="medetails_top">
          <div class="mecontent_main_left">
            <div class="meDetailOut" v-if="detail.messageCode==0">已下架</div>
            <img :src=fileUrl(detail.bookCover)  :onerror="errorImg()">
          </div>
          <div class="mecontent_main_right">
            <div class="mecon_main_title" style="margin-bottom: 35px;">《{{detail.name}}》</div>

            <div class="mecon_main_text" style="height: 170px;">
              <div class="mecon_main_left">
                <div class="mecon_main_author">作者：
                  <span class="mecon_main_name epidemic" v-if="detail.authorId" :title="detail.author">
                    <router-link :to="{path:'/medicalother',query:{id:detail.authorId}}">{{detail.author}}</router-link>
                  </span>
                  <span class="mecon_main_name epidemic" v-if="!detail.authorId" :title="detail.author">{{detail.author}}</span>
                </div>
                <div class="mecon_main_isbn">ISBN：<span>{{detail.isbn}}</span></div>
                <div class="mecon_main_isbn">出版时间：<span>{{detail.publishTime }}</span></div>
                <div class="mecon_main_isbn">字数：<span>{{detail.fontCount}}</span>万字</div>
              </div>
              <div class="mecon_main_right">
                <div class="mecon_main_author">译者：
                  <span class="mecon_main_name epidemic" v-if="detail.translatorId">
                    <router-link :to="{path:'/medicalother',query:{id:detail.translatorId}}">{{detail.translator }}</router-link></span>
                  <span class="mecon_main_name epidemic" v-if="!detail.translatorId">{{detail.translator}}</span>
                </div>
                <div class="mecon_main_isbn">出版社：<span>{{detail.publisher}}</span></div>
                <div class="mecon_main_isbn">版本：<span>{{detail.revision }}</span></div>
              </div>
            </div>
            <!--<div class="mecon_main_price">
              &lt;!&ndash;<span class="mecon_main_money">{{detail.price?'￥'+detail.price:'免费'}}</span>&ndash;&gt;
              &lt;!&ndash;<span
                class="mecon_main_dis">￥{{detail.pricing}}{{detail.discount?`(${detail.discount}折)`:''}}</span>&ndash;&gt;
            </div>-->
            <div class="mecon_mainNew"  v-if="detail.messageCode==0">资源更新中，敬请期待~</div>
            <div class="mecon_main_btn">
              <div class="mecon_mainBuy"  @click="readBook(detail)" v-if="detail.message==''||!detail.message">阅读</div><!--阅读-->
              <div class="mecon_main_aca" @click="readBook(detail)" v-if="detail.messageCode==3||detail.messageCode==2||detail.messageCode==4">试读</div>
              <div class="mecon_main_gou"  v-if="detail.messageCode==4||detail.messageCode==2" @click="immediatelyBuy">立即购买</div>
              <div class="mecon_main_car"  v-if="detail.messageCode==4||detail.messageCode==2"><img src="@/assets/images/home/cart.png">
                <div class="mecon_wrap_car" @click="addShop">加入购物车</div>
              </div>
            </div>
            <div class="mecon_mainTip" v-if="detail.messageCode==3||detail.messageCode==1">温馨提示：{{detail.messageCode==1?detail.message:'阅读全文请通过个人账号购买整本，或者联系管理员'}}</div>


          </div>
        </div>
        <div class="medetails_content">
          <div class="userother_content_left">

            <div class="medetails_content_list">
              <span class="medetails_content_li active"  @click="goAnchor('#anchor-'+1)">简介</span>
              <span class="medetails_content_li"  @click="goAnchor('#anchor-'+2)">
               <!-- <a :href="`javascript:scroll(0,${refData.cata})`">-->目录</span>
              <!--<span class="medetails_content_li"  @click="goAnchor('#anchor-'+3)">
                评论{{commentTotal>0?`(${commentTotal}条)`:''}}


                &lt;!&ndash;({{commentTotal}}条&ndash;&gt;</span>-->

            </div>

            <div class="medetails_content_img"><img src="@/assets/images/medical/userother_left-tab-line.png"></div>

            <div class="medetails_content_brief" style="display: block;overflow: hidden" id="anchor-1">
              <div class="medetails_content_jie">简介</div>
              <div class="medetails_content_tex" v-html="detail.summary">
              </div>
            </div>
            <div class="medetails_content_cata" id="anchor-2">
              <div class="medetails_content_jie">目录</div>

              <div class="medetails_content_catali" :style="{marginBottom: 0,height:isShowOpen?'174px':isShowHeight}"><!---->
                <!--height:isShowOpen?'160px':isShowHeight-->
                <!--<img src="@/assets/images/home/cata-li.png">-->
                <div class="medetails_content_cataText textP" v-if="detail.chapterList" ref="aaaa">
                  <p  v-for="item in detail.chapterList" :key="item.id"  @click="goEbook(item)">{{item.chapterName}}</p>
                </div>
                <span class="medetails_content_cataText textP" v-else v-html="detail.bookCatalog" ref="aaaa"></span>
              </div>

              <div class="medetails_content_extends" style="margin-top: 0" v-if="detail.bookCatalog&&isShowOpen">
                <img class="medetails_content_imge" src="../../../static/img/icon_zhankai.png" @click="openBtn">
                <span class="medetails_content_extend" @click="openBtn">展开</span>
              </div>

              <div class="medetails_content_extends" style="margin-top: 0" v-if="detail.bookCatalog&&!isShowOpen">
                <img class="medetails_content_imge" src="../../../static/img/icon_zhankai.png" style="transform:rotate(180deg)" @click="openBtn">
                <span class="medetails_content_extend" @click="openBtn">收起</span>
              </div>

            </div>
            <!--<div class="medetails_content_com"  id="anchor-3" >
              <div class="medetails_content_comTitle">
                <div class="medetails_content_comm">评论{{commentTotal>0?`(${commentTotal}条)`:''}}</div>
              </div>
              <div class="medetails_content_rate">
                <span class="medetails_content_rateCom">星评：</span>
                <el-rate v-model="value4" :colors="['#F66B20', '#F66B20', '#F66B20']"></el-rate>
              </div>
              <div class="medetails_content_text" v-if="userType!=2">
                <textarea class="medetails_content_textarea" v-model="textCont" name cols="113" rows="10" placeholder="内容这么赞,快来评论吧..." style="width:795px;height:100px;" maxlength="300"></textarea>
                <div class="medetails_content_textNum">{{textCont.length}}/300</div>
              </div>

              <div style="width:100%; display: block;height:46px; padding-bottom: 10px;">
                <div class="medetails_content_btn" @click="saveBtn" v-if="userType!=2">评论</div>
              </div>

              <div class="medetails_content_item" v-for="(val,index1) in commentList" :key="index1" style="margin-top: 26px;" v-if="index1<6&&userType!=2">
                <div class="itemHeader">
                  <img :src=fileUrl(val.userImg) alt="" v-if="val.userImg&&val.userImg!=''">
                  <img src='../../assets/images/personal/defoult.png' alt="" v-else>
                </div>
                <div class="listCont">
                  <div class="itemTit">
                    <span class="title">{{val.userName}}</span>
                    <div class="itemStar">
                      <span>

                        <img src="@/assets/images/personal/starty.png" alt="" v-for="(star,ind) in val.score" :key="ind">
                      </span>
                      <ul>
                        <li v-for="(item,index) in startNum" :key="index"></li>
                      </ul>
                    </div>
                    <span>{{val.releaseTime}}</span>
                  </div>

                  <div class="itemCont">
                    {{val.content}}
                  </div>
                  <div class="itemOper">
                    <div class="comNum" @click="lookCom(val.id)" v-if="userType!=2"><span v-if='val.replyNum!=0'>{{val.replyNum}}</span></div>
                    <div class="thumbNum"  @click="commentAgree(val.id,val)">
                      <img src="@/assets/images/home/agree.png" alt="" v-if="val.isAgree">
                      <img src="@/assets/images/personal/comico2.png" alt="" v-else>
                      <span>{{val.fabulousNum}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <router-link  class="medetails_content_more" :to="{path: '/comments', query: { id:this.$route.query.id,type:detail.resourceType,arr:[{meta: { title: '医著详情' },path:'/medetails'}]}}"  v-if="commentTotal>5">
                <div class="medetails_content_more" >更多精彩评论>></div>
              </router-link>
            </div>-->
          </div>
          <div class="commentRight">
            <div class="subleft_bot1">
              <div class="subleft_botTitle">同类图书排行</div>
              <div class="subleft_botLine"></div>
              <div class="meDetail_textbookList" v-for="(book, index2) in sameList" :key="index2" @mouseenter.prevent='mousemove(index2)'>
                <div  v-if="isShowBook!=index2" class="meDetail_textbookTitle">
                  <div class="textbookList_num" >{{index2+1}}</div>
                  <div class="commentRight_tip" @click="linkDetail(book.id)">
                    <div class="textbookList_text">《{{book.name}}》</div>
                  </div>
                </div>
                <div class="meDetail_textbook"  v-if="isShowBook==index2">
                  <div class="textbook_number" >{{index2+1}}</div>
                  <img :src=fileUrl(book.bookCover) class="textbook_img" @click="linkDetail(book.id)">
                  <div class="commentRight_tip" @click="linkDetail(book.id)">
                    <div class="textbook_title">《{{book.name}}》</div>
                    <div class="textbook_author">{{book.author?book.author.length>5?book.author.slice(0,5):book.author:''}}</div>
                    <!--<div class="commentRight_price">{{book.price?'￥'+book.price:'免费'}}</div>-->
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <loginAlert :isShowChild="isShowAlert"  @toFatherData="sendSonData"></loginAlert>
    <!--<commentFoot></commentFoot>-->
  </div>
</template>

<script>
  import commonHeader from '@/components/commonHeader.vue';
  import commentFoot from '@/components/commentFoot.vue';
  import "@static/css/medical_information/userother.less"
  import "@static/css/medical_information/index.less"
  import "@static/css/home/medetails.less"
  // import "@static/css/home/mongolia.less"
  import {ebookDetailAPI, getCommentListAPI, resourceAPI,commentSaveAPI,ebookOtherAPI,relevantArticleAPI,collectionAPI,commentAgreeAPI,cancelcollectionAPI,shopCartAPI} from '@/api/comment/comments';
  import Cookies from 'js-cookie';
  import navbar from '@/components/epidemicNavbar.vue';

  export default {
    name: 'medetails',
    components: {
      commonHeader,
      commentFoot,
      navbar
    },
    data() {
      return {
        value5: 4,
        value4: 5,
        startNum: 5,
        searchVal: {
          searchVal: '',
          national: '',
          nationalNum: '',
        },
        id: '',
        detail: {},
        resourceType: null,
        resourceList: {},
        pageNum: 1,
        pageSize: 5,
        commentList: [],
        commentTotal: 0,
        textCont:'',
        sameList:[],
        articleList:[],
        isShowBook:0,
        isCollection:false,
        isShowAlert:false,
        refData:null,
        isShowOpen:true,
        isShowHeight:0,
      }
    },
    created() {
      this.id = this.$route.query.id;
      this.resource();
      this.getDetail();

    },
    computed:{
      userId(){
        return this.$store.state.userId;
      },
      userType(){
        return this.$store.state.userType;
      },
    },
    mounted() {
      this.refData=this.$refs;
      window._bd_share_main ? window._bd_share_main.init() : this.setShare()
    },
    watch: {
      $route() {
        this.id = this.$route.query.id;
        this.resource();
        this.getDetail();

      },
    },
    methods: {
      goAnchor(selector) {
        var anchor = this.$el.querySelector(selector)
        document.documentElement.scrollTop = anchor.offsetTop+140;
      },
      /*子传父*/
      sendSonData(val){
        let self=this;
        self.isShowAlert=false;
      },
      setShare(){
        //console.log(this.$refs.share_wrap,"666666666")
        window._bd_share_config={
          "common":{
            "bdSnsKey":{},
            "bdText":"",
            "bdMini":"2",
            "bdMiniList":false,
            "bdPic":"",
            "bdStyle":"0",
            "bdSize":"16"
          },
          "share":{}
        };
        //const $el = document.querySelector('#baiduShare')
        //console.log($el,"$elllllllll")
        //$el&&this.$refs.share_wrap.removeChild($el)
        const shareDome = document.createElement('script');
        shareDome.type = 'text/javascript';
        shareDome.src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5);
        //console.log(shareDome,"document.body")
        /*this.$refs.share_wrap.appendChild(shareDome);*/
      },
      /*收藏*/
      tapCollection(){
        /*console.log(Cookies.get('Y-Token'))*/
        if(Cookies.get("Y-Token")){
          let data={goodsList:[{
              id:this.id,
              type:this.detail.goodsType
            }],
            memberType :1,
          }
          if(this.isCollection){//收藏了
            cancelcollectionAPI(data).then(res=>{
              if(res.data.status){
                this.isCollection=false;
                this.$message.success("取消收藏")
              }else{
                this.$message.error(res.data.msg)
              }
            })
          }else{
            collectionAPI(data).then(res=>{
              if(res.data.status){
                this.isCollection=true;
                this.$message.success("收藏成功")
              }else{
                this.$message.error(res.data.msg)
              }
            })
          }
        }else{
          this.isShowAlert=true;
        }


      },
      /*获取资源分类*/
      resource() {
        resourceAPI({isMedia: 0}).then(res => {
          this.resourceList = res.data.data;
          for (let val in this.resourceList) {
            if (this.resourceList[val] == '医著') {
              this.resourceType = val;
              this.getCommentList();
            }
          }

        })
      },
      /*接受搜索传过来的值*/
      /*childByValue(childValue) {
        this.searchVal = childValue;

      },*/
      lookCom(id) {
        this.$router.push({path: '/commentReply', query: {id: id,type:this.detail.resourceType}})
      },
      getDetail() {
        let self=this;
        let heightA=0;
        ebookDetailAPI({
          id: this.id
        }).then(res => {
          this.detail = res.data.data;

          this.isCollection=this.detail.isCollection;
          this.ebookOther();
        }).then(function () {
          self.isShowHeight=self.$refs.aaaa.offsetHeight+'px'
          if(self.$refs.aaaa.offsetHeight>174){
            self.isShowOpen=true;
          }else{
            self.isShowOpen=false;
          }
        })
      },
      // 目录跳转
      goEbook(main) {
        console.log(main,444);
        if(main.bookid && main.markid) {
          this.$router.push({path: '/epidemicEbook', query: {bookid: main.bookid, markid: main.markid, messageCode: main.messageCode,name:main.bookName}})
        }
      },
      /*展开按钮*/
      openBtn(){
        this.isShowOpen=!this.isShowOpen;
      },

      /*获取评论列表*/
      getCommentList() {
        getCommentListAPI({
          resourceId: this.id,
          resourceClass: this.resourceType,
          //资源类型 0全部1理论 2药物 3方剂 4临床 5医案 6文化 7机构 8医论 9其他 10医著 注：1-9与文章类型一致
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }).then(res => {
          this.commentList = res.data.data.list;
          this.commentTotal = res.data.data.total;

        })
      },
      /*跳转到全部评论*/
      // linkHref(){
      //   this.$router.push({path: '/comments', query: {id: this.id, arr:[{meta: { title: '消息' },path:'/message'}]}})
      // },
      /*保存评论*/
      saveBtn() {
        let textCon=this.textCont.replace(/^\s+|\s+$/g,'')
        if(Cookies.get("Y-Token")){
          if (textCon == '') {
            this.$message.warning("请填写评论内容！")
            /* this.isShowtextCont=true;*/
          } else {
            commentSaveAPI({
              content: textCon,//评论内容
              fatherId: 0,//父级评论id：0资源，其他评论id
              fatherName: '',//父级评论用户名
              id: '',//评论id
              mainId: 0,// 所属主评论id：0资源主评论，其他主评论id
              resourceClass: this.resourceType,//资源类型 0全部1理论 2药物 3方剂 4临床 5医案 6文化 7机构 8医论 9其他 10医著 注：1-9与文章类型一致
              resourceId: this.id,//资源id
              resourceName: this.detail.name,//资源名称
              score: this.value4,
            }).then(res => {
              if(res.data.status){
                this.$message.success("评论成功，请耐心等待审核！")
                this.getCommentList();
                this.textCont='';
                this.value4=5;
              }else{
                this.$message.error(res.datas.msg)
              }

            })

          }
        }else{
          this.isShowAlert=true;
        }


      },

      /*同类书排行列表*/
      ebookOther(){
        ebookOtherAPI({
          id:this.id,
          num:6,
          nationsType:8,//民族 1蒙古族 2侗族 3藏族 4朝鲜族 5土家族 6回族 7满族 8汉族
        }).then(res=>{
          this.sameList=res.data.data;
          this.relevantArticle();
        })
      },
      /*跳转*/
      linkDetail(id){
        this.id=id;
        /*this.$router.push({path: '/epidemicBookDetail', query: {id: id}})*/
        let routeUrl = this.$router.resolve({
          path: "/epidemicBookDetail",
          query: {id:id}
        });
        window.open(routeUrl.href, '_blank');

        /*this.$forceUpdate()*/

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
      /*点赞*/
      commentAgree(id,item){
        if(Cookies.get("Y-Token")){
          /*this.$forceUpdate()*/
          if(!item.isAgree){
            commentAgreeAPI({
              commentId:id
            }).then(res=>{
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
      /*添加购物车*/
      addShop(){
        if(Cookies.get("Y-Token")){
          shopCartAPI({
            "goodsId": this.id,
            "goodsType": this.detail.goodsType,
            "num": 1
          }).then(res=>{
            if (res.data.status){
              this.$message.success("商品已加入购物车")
            }else{
              this.$message.error(res.data.msg)
            }

          })
        }else{
          this.isShowAlert=true;
        }

      },
      /*立即购买*/
      immediatelyBuy(){
        if(Cookies.get("Y-Token")){
          this.$router.push({path:'confirmOrder',query:{id:this.id,type:"医著"}});
        }else{
          this.isShowAlert=true;
        }
      },
      // 阅读
      readBook(item) {
        console.log(22222,item)
        if(item.markid != null) {
          this.$router.push({path: '/epidemicEbook', query: {bookid: item.id, markid: item.markid, messageCode: item.messageCode}})
        }
      },
    }

  }
</script>

<style type="text/css" lang="less">
  #medetails_wrap{
    width: 100%;
    min-width: 1200px;
    background: url("../../assets/images/epidemic/bg_top.png") no-repeat top;
    .share_box{
      display: none;
    }
    .share_btn:hover{
      .share_box{
        display: block;
      }
    }
    /*.userother_content_bg{
      position: relative;
    }*/
    .medical_location {
      font-size: 14px;
      color: #999;
      .location_img {
        padding-right: 6px;
        img {
          width: 12px;
          height: 17px;
        }
      }
      span:last-child {
        color: #1F77F2
      }
    }
    .medetails_content_cata .medetails_content_catali{
      .textP{
        p,span{
          background: url("../../assets/images/home/cata-li.png") left center no-repeat;
          padding-left: 15px;
          margin-bottom: 10px;
        }

      }
    }
    .medetails_wrap .medetails_content{
      .subleft_bot1 {
        width: 310px;
        height: auto;
        padding-bottom: 36px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 8px 0px rgba(1, 2, 2, 0.04);
      }

      .subleft_botTitle {
        height: 52px;
        line-height: 52px;
        padding-left: 20px;
        font-size: 16px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(69, 69, 69, 1);
      }

      .subleft_botLine {
        height: 4px;
        background-image: url(../../../src/assets/images/personal/combg.png);
      }

      .meDetail_textbook {
        width: 270px;
        height: 139px;
        display: block;
        overflow: hidden;
        margin: 15px auto 0px;
        border-bottom: 1px dashed #E6E6E6;
        background: #fff;
        img {
          width: 82px;
          height: 110px
        }
        .commentRight_tip {
          width: 140px;
          float: right;
          .textbook_title{
            width: 140px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            cursor: pointer;

          }
          .textbook_author{
            width: 140px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap
          }
        }
        .commentRight_price {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(244, 79, 74, 1);
          line-height: 24px;
          padding-top: 25px;

        }
      }

      .textbook_number {
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        background-color: #F87E7E;
        color: #fff;
        border-radius: 2px;
      }

      .textbook_number, .textbook_img, .textbook_tip {
        float: left;
      }

      .textbook_img {
        margin: 0 12px;
        cursor: pointer;
      }

      .textbook_tip {
        width: 140px;
      }

      .textbook_title {
        color: #555;
        font-weight: bold;
        margin-bottom: 16px;
      }

      .textbook_author {
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #666666;
      }

      .meDetail_textbookList {
        width: 270px;
        height:auto;
        margin: 16px auto 0;

        .meDetail_textbookTitle{
          width: 270px;
          display: block;
          height:18px;line-height: 18px;
        }
      }

      .textbookList_num {
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        background-color: #F3F3F3;
        color: #666666;
        float: left;
        margin-right: 12px;
        border-radius: 2px;
      }

      .textbookList_text {
        color: #333333;
        width:200px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        cursor: pointer;
      }

      .mecom_left {
        background: #fff;
        margin-top: 12px;
        width: 310px;
        height: 450px;
        .subleft_botTitle {
          height: 52px;
          line-height: 52px;
          padding-left: 20px;
          font-size: 16px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          color: rgba(69, 69, 69, 1);
        }

        .subleft_botLine {
          height: 4px;
          background-image: url(../../../src/assets/images/personal/combg.png);
        }
        .hot_list {
          height: 13px;
          margin-left: 14px;
          margin-top: 22px;
          color: #666666;
          cursor: pointer;
          .hot_listImg, .hot_listText {
            float: left;
            width: 265px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            a{
              width: 265px;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;

            }
          }
          .hot_listImg {
            width: 16px;
            height: 13px;
            background-image: url(../../../src/assets/images/medical/information-li.png);
            margin-top: 5px;
            margin-right: 6px;
          }
          &:hover {
            color: #205FC6;
            .hot_listImg {
              background-image: url(../../../src/assets/images/medical/information-li-hover.png);
            }
            .hot_listText a{
              color: #205FC6 !important;
            }
          }

        }

      }

    }
  }

</style>
