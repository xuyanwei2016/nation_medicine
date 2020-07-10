<template style="height:100%">
  <div id="pdfRead">
    <commentHeader v-on:childByValue="childByValue"></commentHeader>

    <div class="pdf_read_content">
      <img src="@/assets/images/medical/emblazonry-left.png" class="emblazonry_left">
      <div class="answer_main">
        <navbar></navbar>
        <!-- <div class="answer_location">
          <img src="@/assets/images/medical/location.png" class="location_img">
          <span>您的当前位置：首页&nbsp;&nbsp;&gt;</span>
          <span>{{searchVal.national}}&nbsp;&gt;</span>
          <span>文章阅读页</span>
        </div> -->

        <div class="answer_sub">
          <!-- 左边的 -->
          <div class="sub_right pdf_read_right" style="margin-right:12px">
            <!-- 阅读器 -->
            <div class="sub_rightLine"></div>
            <div class="" style="padding:0 30px;margin-bottom:20px;background-color:#fff;box-sizing:border-box">

              <div class='pdf_read_btnwrap'>
                <div class='pdf_read_btn'>
                  <span>{{detail.browseNum}}人阅读</span>
                  <span :class="isCollection?'heart_btn':'noheart_btn'" @click="tapCollection">收藏</span>
                  <span><i class="el-icon-share"></i>分享</span>
                  <span @click="correctionBtn"><i class="el-icon-circle-close-outline"></i>纠错</span>
                </div>

              </div>

              <div class="paf_read_edit article_read_content">
                <div class='article_read_content_top pdf_red_top'>
                  <embed width="100%" height="100%" name="plugin" id="plugin" :src="`${uploadUrl}file/?fileName=${detail.pdf}&isOnLine=true`" type="application/pdf" internalinstanceid="17">
                </div>
                <div class="articleOver" v-if="!this.$store.state.userName&&this.$store.state.userName==''">试读结束，
                  <router-link to="/login">登录</router-link>
                  后继续阅读
                </div>
              </div>
            </div>
            <!-- 评论区 -->
            <div class="writeBg">
              <div class="medetails_content_com">
                <div class="medetails_content_comTitle">
                  <div class="medetails_content_comm">评论({{commentTotal}}条)</div>
                </div>
                <div class="medetails_content_rate">
                  <span class="medetails_content_rateCom">星评：</span>
                  <el-rate v-model="value4" :colors="['#F66B20', '#F66B20', '#F66B20']"></el-rate>
                </div>
                <div class="articleTextarea" v-if="userType!=2">
                  <textarea class="medetails_content_textarea" v-model="textCont" name cols="113" rows="10"
                            placeholder="内容这么赞,快来评论吧..." style="width:840px;height:100px;"></textarea>
                  <span>0/300</span>
                </div>

                <div style="width:100%; display: block;height:46px; padding-bottom: 10px;">
                  <div class="medetails_content_btn" @click="saveBtn" v-if="userType!=2">评论</div>
                </div>
                <div class="medetails_content_item" v-for="(val,index1) in commentList" :key="index1"
                     style="margin-top: 26px;">
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
                      <div class="comNum" @click="lookCom(val.id)"><span>{{val.replyNum}}</span></div>
                      <div class="thumbNum" @click="commentAgree(val.id,val)">
                        <img src="@/assets/images/home/agree.png" alt="" v-if="val.isAgree">
                        <img src="@/assets/images/personal/comico2.png" alt="" v-else>
                        <span>{{val.fabulousNum}}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="medetails_content_more" @click="linkHref" v-if="commentList.length>0">更多精彩评论>></div>
              </div>
            </div>
            <!--<div class="pdf_read_com">
              <div class="comLfTop">
                <div class="com_num">
                  <span>评论（120条）</span>
                </div>
                <div class="start_top">
                  <span>星评:</span>
                  <div style="display:inline-block">
                    <el-rate
                      v-model="startNum"
                      :colors="['#F66B20']">
                    </el-rate>
                  </div>
                </div>
                <div class="comInput">
                  <textarea name="" cols="30" rows="10" placeholder="针对这条评论进行回复" style="resize:none"></textarea>
                </div>
                <div class="pdf_read_submit">
                  <el-button size="small" type="warning">评论</el-button>
                </div>
              </div>
              <div class="comLfList">
                <ul>
                  <li class="itemData">
                    <div style="width:100%; display: block; height:130px;">
                      <div class="itemHeader"><img src="../../assets/images/medical/ask.png" alt=""></div>
                      <div class="listCont">
                        <div class="itemTit">
                          <span class="title">陌然乄浅笑</span>
                          <div class="itemStar">
                                            <span><img src="../../assets/images/personal/starty.png" alt="">
                                                <img src="../../assets/images/personal/starty.png" alt=""></span>
                            <ul>
                              <li v-for="(item,index) in startNum" :key="index"></li>
                            </ul>
                          </div>

                          <span>2018-04-03 12:45</span>
                        </div>
                        <div class="itemCont">
                          族地区有着独特的自然条件和生活习俗，长期实践形成了对某些疾病独特的治疗经验。如高寒地区专长于治疗风湿病鄂伦春族对冻伤有独特治疗方法，草原游牧民族则善于治跌打损伤和脑震荡等。民族药的开发涉及的民族和地区...
                        </div>
                        <div class="itemOper">
                          <div class="comNum"><span>3333</span></div>
                          <div class="thumbNum"><span>999000</span></div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="bottom_more">更多精彩评论>></div>
              </div>
            </div>-->

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
                      <div class="hot_listText"><router-link :to="{path:'articleread',query:{id:item.id}}" style="color:#666">{{item.resName}}</router-link></div>
                    </div>

                  </div>
                </el-tab-pane>
                <el-tab-pane label="药物" name="second">
                  <div>
                    <div class="hot_list" v-for="(item,index) in recommendList" :key="index">
                      <div class="hot_listImg"></div>
                      <div class="hot_listText"><router-link :to="{path:'articleread',query:{id:item.id}}" style="color:#666">{{item.resName}}</router-link></div>
                    </div>

                  </div>
                </el-tab-pane>
                <el-tab-pane label="方剂" name="third">
                  <div>
                    <div class="hot_list" v-for="(item,index) in recommendList" :key="index">
                      <div class="hot_listImg"></div>
                      <div class="hot_listText"><router-link :to="{path:'articleread',query:{id:item.id}}" style="color:#666">{{item.resName}}</router-link></div>
                    </div>

                  </div>
                </el-tab-pane>

              </el-tabs>
            </div>

          </div>
        </div>

      </div>
      <img src="@/assets/images/medical/emblazonry-right.png" class="emblazonry_right">
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


  </div>
</template>

<script>
  import myEditor from "@/components/editor"
  // import "@static/css/home/articleread.less"
  import "@static/css/home/pdfread.less"
  // import "@static/css/personal/comments.less"
  // import "@static/css/experts_answer/index.less"
  import commentHeader from '../../components/commentHeader.vue';
  import {articleDetailAPI, commentSaveAPI, getCommentListAPI, resourceAPI,saveCorrectAPI,cancelcollectionAPI,collectionAPI,recommendListAPI} from '../../api/comment/comments';
  import Cookies from 'js-cookie';
  import commentFoot from '../../components/commentFoot.vue';
  import { pdfDetailsAPI } from '@/api/home/mongolia_article'
  import { uploadUrl } from '@/utils/global'
  import navbar from '@/components/navbar.vue';

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
        value4: 0,
        textCont: '',
        userName:'',
        isCollection:false,
        token:'',
        nationalNum:'',
        codeVal:'',
        recommendList:[],
      }
    },
    created() {
      this.id = this.$route.query.id;
      this.resource();
    //   this.articleDetail();
      /*this.rightList();*/
      this.userName=Cookies.get('userName');
      this.token=Cookies.get('Y-Token');
    },
    computed:{
      userId(){
        return this.$store.state.userId;
      },
      userType(){
        return this.$store.state.userType;
      },
    },
    mounted () {
        this.getPdfDetail()
    },
    methods: {
      /*获取资源分类*/
      resource() {
        resourceAPI({isMedia: 0}).then(res => {
          this.resourceList = res.data.data;
          for (let val in this.resourceList) {
            if (this.resourceList[val] == '医著') {
              this.resourceType = val;
              this.getCommentList();
            }else if (this.resourceList[val] == '医家') {
              this.resourceType = val;
              this.getCommentList();
            }else{
              this.resourceType = val;
              this.getCommentList();
              return
            }
          }

        })
      },
      /*接受搜索传过来的值*/
      childByValue(childValue) {
        this.searchVal = childValue;
        this.nationalNum=this.searchVal.nationalNum;
        this.nationalNum<10?this.nationalNum='0'+this.nationalNum:this.nationalNum=this.nationalNum;
        this.codeVal=this.nationalNum+'_YI_AN';
        this.rightList();
      },
      handleClick(tab, event) {
        this.nationalNum=this.searchVal.nationalNum;
        this.nationalNum<10?this.nationalNum='0'+this.nationalNum:this.nationalNum=this.nationalNum;
        if (tab.index == "0") {//医案
          this.codeVal=this.nationalNum+'_YI_AN';

        }else if(tab.index == "1"){//药物
          this.codeVal=this.nationalNum+'_YAO_WU';

        }else{//方剂
          this.codeVal=this.nationalNum+'_FANG_JI';
        }
        this.rightList();

      },
      /*获取右侧列表*/
      rightList(){
        recommendListAPI({
          code:this.codeVal,
          num:10,
        }).then(res=>{
          console.log(res);

          this.recommendList=res.data.data.recommendResourceList;
          console.log("推荐位",res.data)
        })

      },
      /*获取文章详情*/
    //   articleDetail() {
    //     articleDetailAPI({
    //       id: this.id
    //     }).then(res => {
    //       this.detail = res.data.data;
    //       this.isCollection=this.detail.isCollection;
    //       console.log("文章详情", res.data)
    //     })
    //   },
    //   获取pdf文章详情
      getPdfDetail() {
          pdfDetailsAPI(this.id).then(res => {
              console.log("111111111111111111",res);
              this.detail = res.data.data;
          })
      },
      /*纠错按钮*/
      correctionBtn() {
        this.isShowError = !this.isShowError;
        this.textBig = '';
      },
      /*保存评论*/
      saveBtn() {

        if (this.textCont == '') {
          /* this.isShowtextCont=true;*/
        } else {
          commentSaveAPI({
            content: this.textCont,//评论内容
            fatherId: 0,//父级评论id：0资源，其他评论id
            fatherName: '',//父级评论用户名
            id: '',//评论id
            mainId: 0,// 所属主评论id：0资源主评论，其他主评论id
            resourceClass: this.resourceType,//资源类型 0全部1理论 2药物 3方剂 4临床 5医案 6文化 7机构 8医论 9其他 10医著 注：1-9与文章类型一致
            resourceId: this.id,//资源id
            resourceName: this.detail.name,//资源名称
            score: this.value4,
          }).then(res => {
            if (res.data.status) {

              this.getCommentList();
            }

          })

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
        this.$router.push({path: '/comments', query: {id: this.id, type: detail.resourceType}})
      },
      /*保存纠错*/
      submitBtn(){
        console.log("拿到当前时间",new Date())
        let time=new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()+' '+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();
        saveCorrectAPI({
          "content": this.textBig,
          "title": this.detail.bookName,
          "type": this.detail.nationsType,
        }).then(res=>{
          if(res.data.status){
            this.isShowError=false;
            this.$message.success("纠错内容提交成功！")
          }else{
            this.$message.error(res.data.msg)
          }
        })

      },
      /*收藏*/
      tapCollection(){
        /*console.log(Cookies.get('Y-Token'))*/
        let data={goodsList:[{
          id:this.id,
          type:this.detail.goodsType
        }],
          memberType :1,
        }

        if(this.detail.isCollection){//收藏了
          cancelcollectionAPI(data).then(res=>{
            if(res.data.status){
              this.isCollection=false;
              this.$message.success("取消收藏")
            }
          })
        }else{
          collectionAPI(data).then(res=>{
            if(res.data.status){
              this.isCollection=true;
              this.$message.success("收藏成功")
            }
            console.log("收藏成功")
          })
        }

      },

    },

    components: {
      commentHeader,
      commentFoot,
      myEditor,
      navbar
    }
  }
</script>

<style scoped lang="less">
  #pdfRead {
    .pdf_read_btn {
      span {
        cursor: pointer
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
            font-size: 12px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(182, 199, 207, 1);
            line-height: 24px;
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
      height: 40px;
      line-height: 20px;
      width: 100%;
      text-align: center;
      font-size: 14px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(119, 119, 119, 1);
      padding-bottom: 20px;
      a {
        color: #F2444A;
        text-decoration: none;
      }
    }
    .writeBg {
      background: #fff;
      padding: 30px;
      box-shadow: 0px 2px 8px 0px rgba(1, 2, 2, 0.04);
      margin-bottom: 20px;
      .articleTextarea{
        position: relative;
        textarea{
          resize: none;
        }
        span{
          position: absolute;
          right:8px;
          bottom:5px;
          font-size:12px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(170,170,170,1);
          line-height:28px;
        }
      }
    }
    .medetails_content_com {
      .medetails_content_comTitle {
        font-size: 16px;
        color: #2B72D5;
        border-bottom: 1px solid #ddd;
        .medetails_content_comm {
          width: 86px;
          padding-bottom: 8px;
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
          width: 738px;
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
