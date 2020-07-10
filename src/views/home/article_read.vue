<template style="height:100%">
  <div id="articleRead">
    <commonHeader :nationsType="this.nationsType"></commonHeader>
    <div class="pdf_read_content" style="min-height: 600px;position: relative;">
      <img src="@/assets/images/medical/emblazonry-left.png" class="emblazonry_left" style="z-index:100;position:absolute;bottom:0;">
      <div class="answer_main" style="position:realtive;z-index: 10000">
        <div class="answer_location">
          <img src="@/assets/images/medical/location.png" class="location_img">
          <span>您的当前位置：</span>
          <router-link to="/index"><span class="answer_index">首页&nbsp;&nbsp;&gt;</span></router-link>
          <router-link to="/theory"><span class="answer_index">全文检索&nbsp;&gt;</span></router-link>
          <span><span>{{detail.title}}</span></span>
        </div>
        <div class="answer_sub">
          <!-- 左边的 -->
          <div class="sub_right pdf_read_right" style="margin-right:12px">
            <!-- 阅读器 -->
            <div class="sub_rightLine"></div>
            <div class="" style="padding:0 30px;margin-bottom:20px;background-color:#fff;box-sizing:border-box">

              <div class='pdf_read_btnwrap'>
                <div class='pdf_read_btn'>
                  <span>{{detail.browseNum}}人阅读</span>
                  <span :class="isCollection?'heart_btn':'noheart_btn'"
                        @click="tapCollection">{{isCollection ? '取消收藏' : '收藏'}}</span>
                  <span class="hover_btn" style="position:relative;">
                    <div style="display:inline-block"><i class="el-icon-share"></i>分享</div>
                    <div class="bdsharebuttonbox share_box" style="width:100px;right:0px;position:absolute;"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣网"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
                    </div>
                  </span>
                  <span @click="correctionBtn" v-if="userType!=2"><i class="el-icon-circle-close-outline"></i>纠错</span>
                </div>
                <div ref='share_wrap'></div>
              </div>
              <div class="paf_read_edit article_read_content" style="height: auto">
                <div class='article_read_content_top'>
                  <div class="title">{{detail.title}}</div>
                  <div class="sub_title" v-if="detail.bookName||detail.source">来源：
                    <span v-if="detail.bookName&&detail.bookName!=''"><router-link
                    :to="{path:'/medetails',query:{id:detail.bookId}}"
                    :class="detail.bookId?'sub-title-a':''">《{{detail.bookName}}》</router-link></span>
                    <span v-if="detail.source&&detail.source!=''">《{{detail.source}}》</span>
                  </div>
                </div>
                <div class="article_read_content_audio audio_bg" v-if="detail.audio">
                  <div class="article_read_content_audiono" v-if="detail.audio=='无权限'" @click="videoNo"></div>
                  <!-- <audio  v-if="detail.audio" :src="`${uploadUrl}?fileName=${detail.audio}&isOnLine=true`" controls>
                    抱歉，您的浏览器不支持内嵌音频，你可以<a :href="`${uploadUrl}?fileName=${detail.audio}&isOnLine=true`" >点击下载</a>查看
                  </audio> -->
                  <!-- <audio controls>
                    <source src='http://192.168.2.231/2019/04/10/f8a5f3eec18f4f5eba33c8cf1a4e950b.mp3'/>
                  </audio> -->
                  <!--` `http://192.168.2.231/2019/04/10/f8a5f3eec18f4f5eba33c8cf1a4e950b.mp3`-->
                 <aplayer
                    :music="{
                      title: ' ',
                      artist: ' ',
                      /*src: `http://192.168.2.231/2019/04/10/f8a5f3eec18f4f5eba33c8cf1a4e950b.mp3`,*/
                      src: `${uploadUrl}file/?fileName=${detail.audio}`,
                      pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
                    }"
                  />
                </div>
                <div class="article_read_content_inner">
                  <!-- <div class="article_read_content_block" v-if="detail.previewText||detail.synopsis">
                    <div class="tilte">简介</div>
                    <p class="txt" v-html="detail.text" v-if="detail.message!=null"></p>
                    <p class="txt" v-html="detail.synopsis" v-if="detail.message==null">
                    </p>
                  </div> -->
                  <!-- <div class="article_read_content_block" v-if="detail.previewText">
                     <div class="tilte">主治</div>
                     <p class="txt" v-html="detail.previewText ">
                     </p>
                   </div>
                   <div class="article_read_content_block" v-if="detail.synopsis">
                     <div class="tilte">相关配方</div>
                     <p class="txt" v-html="detail.synopsis">
                     </p>
                   </div>-->

                  <div class="article_read_content_block" v-if="detail.text">
                    <div class="tilte">正文</div>
                    <p class="txt" v-html="detail.text">
                    </p>
                  </div>

                </div>
                <div class="article_read_content_video" v-if="detail.video">
                  <div class="article_read_content_videono" v-if="detail.video=='无权限'" @click="videoNo"></div>
                  <video :src="fileUrl(detail.video)" controls controlsList="nodownload"></video>
                </div>
                <div class="articleOver" v-if="detail.messageCode==2">试读结束，
                  <a @click="loginIn">登录</a>
                  后继续阅读
                </div>
                <div class="articleOver" v-if="detail.messageCode==3">{{detail.message}}</div>
                <div class="articleOver" v-if="detail.messageCode==1">{{detail.message}}</div>
                <div class="articleOver" v-if="detail.messageCode==0">{{detail.message}}</div>
                <div class="articleOver" v-if="detail.messageCode==4">
                  <div>继续阅读，请先通过以下方式获得阅读权限</div>
                  <ul>
                    <li @click="immediatelyBuy(detail.id,'文章')">购买本篇：<span>￥{{detail.realPrice}} <del>￥{{detail.price}}</del></span>
                    </li>
                    <li v-if="detail.bookId&&detail.bookId!=''" @click="immediatelyBuy(detail.bookId,'医著')">
                      购买整书：<span>￥{{detail.bookRealPrice}} <del>￥{{detail.bookPrice}}</del></span></li>
                  </ul>
                </div>

              </div>
            </div>
            <!-- 评论区 -->
            <div class="writeBg" v-if="commentList.length>0||userTypeR!=2">
              <div class="medetails_content_com">
                <div class="medetails_content_comTitle">
                  <div class="medetails_content_comm">评论{{commentTotal > 0 ? `(${commentTotal}条)` : ''}}</div>
                </div>
                <div v-if="userTypeR!=2">
                  <div class="medetails_content_rate">
                    <span class="medetails_content_rateCom">星评：</span>
                    <el-rate v-model="value4" :colors="['#F66B20', '#F66B20', '#F66B20']"></el-rate>
                  </div>
                  <div class="articleTextarea" v-if="userType!=2">
                    <textarea class="medetails_content_textarea" v-model="textCont" name cols="113" rows="10"
                            placeholder="内容这么赞,快来评论吧..." style="width:840px;height:100px;" maxlength="300"></textarea>
                    <span>{{textCont.length}}/300</span>
                  </div>

                  <div style="width:100%; display: block;height:46px; padding-bottom: 10px;">
                    <div class="medetails_content_btn" @click="saveBtn" v-if="userType!=2">评论</div>
                  </div>
                </div>
                <div class="medetails_content_item" v-for="(val,index1) in commentList" :key="index1"
                     style="margin-top: 26px;" v-if="index1<6&&userType!=2">
                  <div class="itemHeader"><img :src=fileUrl(val.userImg) alt=""></div>
                  <div class="listCont">
                    <div class="itemTit">
                      <span class="title">{{val.userName}}</span>
                      <div class="itemStar">
                      <span>

                        <img src="@/assets/images/personal/starty.png" alt="" v-for="(star,ind) in val.score"
                             :key="ind">
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
                      <div class="comNum" @click="lookCom(val.id)" v-if="userId!=val.userId&&userType!=2">
                        <span>{{val.replyNum}}</span></div>
                      <div class="thumbNum" @click="commentAgree(val.id,val)">
                        <img src="@/assets/images/home/agree.png" alt="" v-if="val.isAgree">
                        <img src="@/assets/images/personal/comico2.png" alt="" v-else>
                        <span>{{val.fabulousNum}}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="medetails_content_more" @click="linkHref" v-if="commentList.length>5">更多精彩评论>></div>
              </div>
            </div>


          </div>
          <!-- 右侧列表切换 -->
          <div class="sub_left pdf_read_left" style="height: max-content;padding-bottom:40px;">
            <div class="subline_left"></div>
            <div>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="医案" name="first">
                  <div>
                    <div class="hot_list" v-for="(item,index) in recommendList" :key="index">
                      <div class="hot_listImg"></div>
                      <div class="hot_listText">
                        <router-link :to="{path:'articleread',query:{id:item.resId}}" style="color:#666">{{item.resName&&item.resName.length>14?item.resName.substring(0,14)+'...':item.resName}}</router-link>
                      </div>
                    </div>
                    <div class="hot_list" v-if="recommendList.length==0"  style="text-align: center;width: 87%;height:20px;">
                      暂无内容
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="药物" name="second">
                  <div>
                    <div class="hot_list" v-for="(item,index) in recommendList" :key="index">
                      <div class="hot_listImg"></div>
                      <div class="hot_listText">
                        <router-link :to="{path:'articleread',query:{id:item.resId}}" style="color:#666">{{item.resName&&item.resName.length>14?item.resName.substring(0,14)+'...':item.resName}}</router-link>
                      </div>
                    </div>
                    <div class="hot_list" v-if="recommendList.length==0"  style="text-align: center;width: 87%;height:20px;">
                      暂无内容
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="方剂" name="third">
                  <div>
                    <div class="hot_list" v-for="(item,index) in recommendList" :key="index">
                      <div class="hot_listImg"></div>
                      <div class="hot_listText">
                        <router-link :to="{path:'articleread',query:{id:item.resId}}" style="color:#666">{{item.resName&&item.resName.length>14?item.resName.substring(0,14)+'...':item.resName}}</router-link>
                      </div>
                    </div>

                    <div class="hot_list" v-if="recommendList.length==0"  style="text-align: center;width: 87%;height:20px;">
                      暂无内容
                    </div>

                  </div>
                </el-tab-pane>

              </el-tabs>
            </div>

          </div>
        </div>
      </div>
      <img src="@/assets/images/medical/emblazonry-right.png" class="emblazonry_right" style="z-index:100;position:absolute;top:0;">
    </div>
    <commentFoot></commentFoot>
    <!--纠错弹出框-->
    <div class="errorAll" v-if="isShowError">
      <div class="errorAlert">
        <div class="errorTop">
          <span>纠错</span>
          <img src="../../assets/images/personal/close.png" alt="" @click="isShowError=false">
        </div>
        <div class="errorText">
          <textarea name="" id="" cols="30" rows="10" placeholder="请在此处填写纠错内容. . ." maxlength="300"
                    v-model="textBig"></textarea>
          <span>{{this.textBig.length}}/300</span>
        </div>
        <div class="btn">
          <button class="submit" @click="submitBtn">提交</button>
        </div>
      </div>
    </div>

    <loginAlert :isShowChild="isShowAlert" @toFatherData="sendSonData"></loginAlert>
  </div>
</template>

<script>
  import aplayer from 'vue-aplayer'
  import myEditor from "@/components/editor"
  import "@static/css/home/articleread.less"
  import commonHeader from '@/components/commonHeader.vue';
  import {
    articleDetailAPI,
    commentSaveAPI,
    getCommentListAPI,
    resourceAPI,
    saveCorrectAPI,
    cancelcollectionAPI,
    collectionAPI,
    recommendListAPI,
    commentAgreeAPI
  } from '@/api/comment/comments';
  import Cookies from 'js-cookie';
  import commentFoot from '@/components/commentFoot.vue';
  import { uploadUrl } from '@/utils/global'
  export default {
    name: 'pdfread',
    data() {
      return {
        uploadUrl: uploadUrl,
        searchVal: {
          searchVal: '',
          national: '',
          nationalNum: '',
        },
        startNum: 5,
        activeName: 'first',
        id: '',
        detail: {},
        isShowError: false,
        textBig: '',
        resourceList: [],
        resourceType: null,
        pageNum: 0,
        pageSize: 10,
        commentList: [],
        commentTotal: 0,
        value4: 5,
        textCont: '',
        userName: '',
        isCollection: false,
        token: '',
        nationalNum: '',
        codeVal: '',
        recommendList: [],
        isShowAlert: false,
        userTypeR: null,
        nationsType: null
      }
    },
    computed: {
      userId() {
        return this.$store.state.userId;
      },
      userType() {
        return this.$store.state.userType;
      },
    },
    created() {
      this.id = this.$route.query.id;
      this.userName = Cookies.get('userName');
      this.token = Cookies.get('Y-Token');
      this.userTypeR = Cookies.get('userType');
      /*this.resource();*/
      this.articleDetail();

      // this.rightList();
      // this.nationsType = detail.nationsType

    },
    mounted() {
      window._bd_share_main ? window._bd_share_main.init() : this.setShare()
      // this.nationsType = detail.nationsType
      // console.log(detail.nationsType,'bbbbbbbb');
      // this.rightList()
    },
    watch: {
      $route() {
        this.articleDetail();
      },
      userId() {
        this.articleDetail();
      },
    },
    methods: {
      /*视频无权限*/
      videoNo(){
        //console.log(1111111111111)
        if (Cookies.get("Y-Token")) {
          this.$message.warning("您尚未购买，暂无播放权限")
        }else{
          this.$message.warning("您尚未登录，暂无播放权限")
        }

      },
      loginIn() {
        if (Cookies.get("Y-Token")) {
          this.isShowAlert = false;
        }
        else {
          this.isShowAlert = true;
        }
      },
      /*子传父*/
      sendSonData(val) {
        let self = this;
        self.isShowAlert = false;
      },
      /*获取资源分类*/
      /*resource() {
        resourceAPI({isMedia: 0}).then(res => {
          this.resourceList = res.data.data;
          for (let val in this.resourceList) {
            if (this.resourceList[val] == '医著') {
              this.resourceType = val;
              this.getCommentList();
            }else if (this.resourceList[val] == '医家') {
              /!*this.resourceType = val;*!/
              this.getCommentList();
            }else{
              /!*this.resourceType = val;*!/
              this.getCommentList();
              return
            }
          }

        })
      },*/
      /*接受搜索传过来的值*/
      // childByValue(childValue) {
      //   this.searchVal = childValue;
      //   this.nationalNum = this.searchVal.nationalNum;
      //   this.nationalNum < 10 ? this.nationalNum = '0' + this.nationalNum : this.nationalNum = this.nationalNum;
      //   this.codeVal = this.nationalNum + '_YI_AN';
      //   this.rightList();
      // },



      /*获取文章详情*/
      articleDetail() {
        this.id = this.$route.query.id;
        articleDetailAPI({
          id: this.id
        }).then(res => {
          this.detail = res.data.data;
          console.log(this.detail,5451056)
          this.nationsType = this.detail.nationsType;
          this.isCollection = this.detail.isCollection;
          this.resourceType = res.data.data.resourceType;
          console.log("文章详情", res.data)
          this.getCommentList();
          this.rightList()
        })
      },
      /*获取右侧列表*/
      rightList() {
        console.log(this.detail.nationsType,'oooo');

        this.nationsType < 10 ? this.codeVal = '0' + this.detail.nationsType : this.codeVal = this.detail.nationsType;
        this.codeVal = this.codeVal + '_YI_AN';
        recommendListAPI({
          code: this.codeVal,
          num: 10,
        }).then(res => {
          this.recommendList = res.data.data ? res.data.data.recommendResourceList : [];
        })
      },
      // 右侧切换
      handleClick(tab, event) {
        this.nationsType < 10 ? this.codeVal = '0' + this.detail.nationsType : this.codeVal = this.detail.nationsType;
        if (tab.index == "0") {//医案
          this.codeVal = this.codeVal + '_YI_AN';
        } else if (tab.index == "1") {//药物
          this.codeVal = this.codeVal + '_YAO_WU';
        } else {//方剂
          this.codeVal = this.codeVal + '_FANG_JI';
        }
        recommendListAPI({
          code: this.codeVal,
          num: 10,
        }).then(res => {
          this.recommendList = res.data.data ? res.data.data.recommendResourceList : [];
        })
      },
      /*纠错按钮*/
      correctionBtn() {
        if (Cookies.get("Y-Token")) {
          this.isShowError = !this.isShowError;
          this.textBig = '';
        } else {
          this.isShowAlert = true;
        }

      },
      /*保存评论*/
      saveBtn() {
        let textCon = this.textCont.replace(/^\s+|\s+$/g, '')
        console.log(Cookies.get("Y-Token"))
        if (Cookies.get("Y-Token")) {
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
              resourceName: this.detail.title,//资源名称
              score: this.value4,
            }).then(res => {
              if (res.data.status) {
                this.$message.success("评论成功，请耐心等待审核！")
                this.getCommentList();
                this.textCont = '';
                this.value4 = 5;
              } else {
                this.$message.error(res.datas.msg)
              }

            })

          }
        } else {
          this.isShowAlert = true;
        }


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
          /*this.ebookOther();*/
          console.log("获取评论列表", res.data.data.list)
        })
      },
      /*跳转到全部评论*/
      linkHref() {
        this.$router.push({path: '/comments', query: {id: this.id, type: this.detail.resourceType}})
      },
      /*保存纠错*/
      submitBtn() {
        let time = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        let textCon = this.textBig.replace(/^\s+|\s+$/g, '')
        if (textCon == '') {
          this.$message.warning("请填写纠错内容！")
        } else {
          saveCorrectAPI({
            "content": textCon,
            "title": this.detail.title,
            "type": this.detail.nationsType,
          }).then(res => {
            if (res.data.status) {
              this.isShowError = false;
              this.$message.success("纠错内容提交成功！")
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }


      },
      /*收藏*/
      tapCollection() {
        if (Cookies.get('Y-Token')) {
          let data = {
            goodsList: [{
              id: this.id,
              type: this.detail.goodsType
            }],
            memberType: 1,
          }

          if (this.isCollection) {//收藏了
            cancelcollectionAPI(data).then(res => {
              if (res.data.status) {
                this.isCollection = false;
                this.$message.success("取消收藏")
              }
            })
          } else {
            collectionAPI(data).then(res => {
              if (res.data.status) {
                this.isCollection = true;
                this.$message.success("收藏成功")
              }
              console.log("收藏成功")
            })
          }
        } else {
          this.isShowAlert = true;

        }


      },

      lookCom(id) {
        this.$router.push({path: '/commentReply', query: {id: id, type: this.detail.resourceType}})
      },

      /*点赞*/
      commentAgree(id, item) {
        if (Cookies.get("Y-Token")) {
          this.$forceUpdate()
          if (!item.isAgree) {
            commentAgreeAPI({
              commentId: id
            }).then(res => {
              if (res.data.status) {
                this.$message.success("点赞成功！")
                for (let i = 0; i < this.commentList.length; i++) {
                  if (this.commentList[i].id == id) {

                    this.$set(this.commentList[i], 'isAgree', !this.commentList[i].isAgree);
                    this.commentList[i].fabulousNum++;

                  }
                }
              } else {
                this.$message.error(res.data.msg)
              }


            })
          } else {//不可以取消点赞
            this.$message.warning('已点赞成功')
          }
        } else {
          this.isShowAlert = true;
        }


      },
      /*立即购买*/
      immediatelyBuy(id,type) {
        if (Cookies.get("Y-Token")) {
          this.$router.push({path: 'confirmOrder', query: {id: id, type: type}});
        } else {
          this.isShowAlert = true;
        }
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
            "share":{},
            // "selectShare":{
            //     "bdContainerClass":null,
            //     "bdSelectMiniList":["weixin","tsina","douban","qzone"]
            // }
        };
        //const $el = document.querySelector('#baiduShare')
        //console.log($el,"$elllllllll")
        //$el&&this.$refs.share_wrap.removeChild($el)
        const shareDome = document.createElement('script');
        shareDome.type = 'text/javascript';
        shareDome.src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5);
        //console.log(shareDome,"document.body")
        this.$refs.share_wrap.appendChild(shareDome);
      }
    },
    components: {
      commonHeader,
      commentFoot,
      myEditor,
      aplayer
    }
  }
</script>

<style scoped lang="less">
  #articleRead {
    .pdf_read_btn {
      span {
        cursor: pointer
      }
      .share_box{
        display: none;
      }
      .hover_btn:hover .share_box{
        display: block
      }
    }
    .pdf_read_left {
      .hot_list:hover .router-link-active {
        color: #205FC6 !important;
      }
    }
    .answer_location {
      .answer_index {
        cursor: pointer;
      }
      a span {
        color: #999999;
      }
      span:last-child {
        span:last-child {
          color: #2473D6
        }
      }
    }
    .errorAll {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: center;
      .errorAlert {
        width: 402px;
        height: 262px;
        background: rgba(249, 251, 252, 1);
        border: 1px solid rgba(191, 204, 216, 1);
        border-radius: 2px;
        box-shadow: 0px 2px 8px 0px rgba(1, 2, 2, 0.2);
        .errorTop {
          color: #46515A;
          height: 42px;
          line-height: 42px;
          width: 368px;
          padding: 0 17px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #BFCCD8;
          span {
            font-size: 16px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(70, 81, 90, 1);
            line-height: 48px;
          }
          img {
            cursor: pointer;
            width: 14px;
            height: 14px;
            opacity: 0.5;
          }
        }
        .errorText {
          position: relative;
          textarea {
            border: none;
            height: 144px;
            width: 368px;
            padding: 15px 17px;
            resize: none;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            line-height: 24px;
            color: #46515a;
          }
          span {
            position: absolute;
            right: 8px;
            bottom: 5px;
            color: rgba(153, 153, 153, 1);
            font-size: 12px;
            font-family: MicrosoftYaHei;
          }

        }

        .btn {
          width: 100%;
          padding-top: 6px;
          border-top: 1px solid #BFCCD8;
          .submit {
            float: right;
            display: block;
            margin-right: 12px;
            border: none;
            width: 66px;
            height: 25px;
            background: rgba(24, 173, 184, 1);
            border-radius: 2px;
            font-size: 12px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 24px;
          }
        }
      }

    }
    .articleOver {
      height: auto;
      line-height: 20px;
      width: 100%;
      text-align: center;
      font-size: 14px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(119, 119, 119, 1);
      padding-bottom: 50px;
      a {
        color: #F2444A;
        text-decoration: none;
        cursor: pointer;
      }
      ul, li {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      ul {
        padding-top: 10px;
        li:last-child {
          margin-left: 10px;
        }
        li {
          cursor: pointer;
          font-weight: 400;
          display: inline-block;
          padding: 8px 15px;
          border: 1px solid #ccc;
          border-radius: 4px;

          span {
            color: #F44F4A;
            del {
              padding-left: 10px;
              color: #777;
            }
          }
        }
      }
    }
    .writeBg {
      background: #fff;
      padding: 30px;
      box-shadow: 0px 2px 8px 0px rgba(1, 2, 2, 0.04);
      margin-bottom: 20px;
      .articleTextarea {
        position: relative;
        textarea {
          resize: none;
        }
        span {
          position: absolute;
          right: 8px;
          bottom: 5px;
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(170, 170, 170, 1);
          line-height: 28px;
        }
      }
    }
    .medetails_content_com {
      .medetails_content_comTitle {
        font-size: 16px;
        color: #2B72D5;
        border-bottom: 1px solid #ddd;
        .medetails_content_comm {
          display: inline-block;
          padding: 0 5px 8px;
          border-bottom: 1px solid #2B72D5;
          cursor: pointer;
        }

      }
      .medetails_content_rate {
        margin-top: 32px;
        margin-bottom: 18px;
        overflow: hidden;
        span {
          float: left;
        }
        .el-rate {
          float: left;
        }
      }

      .medetails_content_textarea {
        background-color: #F4F4F4;
        outline: none;
        border-radius: 3px;
        border: none;
        padding: 16px 10px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
      }

      .medetails_content_btn {
        width: 80px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        float: right;
        color: #fff;
        background-image: url(../../../src/assets/images/personal/writebg.png);
        cursor: pointer;
        margin-top: 16px;
      }

      .medetails_content_item {
        overflow: hidden;
        margin-top: 60px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
        .itemHeader {
          width: 54px;
          height: 54px;
          background: #f5f5f5;
          border-radius: 50%;
          float: left;
          display: block;
          img {
            width: 54px;
            height: 54px;
            border-radius: 50%;
          }
        }
        .listCont {
          width: 785px;
          float: right;
          display: block;
          .itemTit {
            width: 100%;
            height: 32px;
            overflow: hidden;
            span.title {
              font-family: MicrosoftYaHei-Bold;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
              line-height: 24px;
              float: left;
              display: block;
            }
            .itemStar {
              float: left;
              position: relative;
              width: 120px;
              height: 30px;
              left: 20px;
              top: 0;
              span {
                position: absolute;
                top: 5px;
                z-index: 3;
                img {
                  float: left;
                  display: block;
                  width: 13px;
                  height: 13px;
                  overflow: hidden;
                  margin-right: 5px;
                }
              }
              ul {
                position: absolute;
                z-index: 2;
                top: 5px;
                overflow: hidden;
                li {
                  float: left;
                  display: block;
                  width: 13px;
                  height: 13px;
                  overflow: hidden;
                  margin-right: 5px;
                  background: url("../../../src/assets/images/personal/startk.png") no-repeat;
                }
              }
            }

            span:last-child {
              font-size: 12px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(183, 183, 183, 1);
              line-height: 24px;
              margin: 0;
              padding: 0;
            }
          }
          .itemCont {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(85, 85, 85, 1);
            line-height: 26px;
          }
          .itemOper {
            height: 30px;
            display: flex;
            justify-content: flex-end;
            align-content: center;
            font-size: 12px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(170, 170, 170, 1);
            margin-top: 5px;
            padding-bottom: 22px;
            .comNum {
              padding-left: 20px;
              background: url("../../../src/assets/images/personal/comico1.png") no-repeat center left;
              margin-right: 23px;
              cursor: pointer;
              span {
                line-height: 26px;
              }

            }
            .thumbNum {
              img {
                margin-top: -3px;
              }
              /*padding-left: 20px;*/
              /*background: url("../../../src/assets/images/personal/comico2.png") no-repeat;*/
              background-position: 0px 4px;
              cursor: pointer;
              span {
                line-height: 26px;
              }
            }
          }

        }
        ul, li {
          list-style: none;
          margin: 0;
          padding: 0;
        }
      }

      .medetails_content_more {
        color: #2B72D5;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        margin: 42px auto;
      }
    }

  }

</style>
