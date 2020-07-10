<template>
  <!--疫情专题首页-->
    <div class="epidemic">
      <epidemicHeader></epidemicHeader>
      <div class="banner">
        <el-carousel height='500px'>
          <el-carousel-item v-for="(itemImg,indexImg) in imgList" :key="indexImg">
            <a :href="itemImg.url" class="small"><img :src="fileUrl(itemImg.picture)" alt=""></a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--<div class="ban">
        <img src="../../assets/images/epidemic/Banner-home.png" alt="">
      </div>-->
      <div class="cont1 contCss">
        <div class="cont">
          <div class="cTit">
            <img src="../../assets/images/epidemic/tit.png" alt="">
            <span  @click="toMore('新冠肺炎防控知识')"><img src="../../assets/images/epidemic/morew.png" alt=""></span>
          </div>
          <div class="one">
            <div class="left">
              <div class="lfT">
                <img :src="fileUrl(cont1.img)" alt=""  @click="toDetail(cont1,1)" v-if="cont1.img">
                <img src="../../assets/images/home/no-cover.jpg" alt="" v-else  @click="toDetail(cont1,1)">
                <div class="lfTr">
                  <h1 @click="toDetail(cont1,1)">{{cont1.title}}</h1>
                  <h2>{{cont1.source}}</h2>
                  <p id="cont1Id">{{Ellipsis('cont1Id',4,cont1.synopsis,30)}}</p>
                </div>
              </div>
              <div class="lfB">
                <ul>
                  <li v-for="(itemLf,indexLf) in cont1ListLeft" :key="indexLf"  @click="toDetail(itemLf,1)"><div>{{itemLf.title}}</div></li>
                  <!--<li><div>易感人群</div></li>
                  <li><div>潜伏期和症状特征</div></li>
                  <li><div>病原核酸检测</div></li>
                  <li><div>三个中成药：金花清感、连花清瘟、血必净注射液</div></li>
                  <li><div>御邪气   防控病毒</div></li>
                  <li><div>传播源和传播途径</div></li>-->
                </ul>
              </div>
            </div>
            <div class="right">
              <ul>
                <li v-for="(itemR,indexR) in cont1ListRight" :key="indexR"   @click="toDetail(itemR,1)"><img :src="`../../static/img/text-${indexR+1}.png`" alt=""><span>{{itemR.title}}</span></li>
                <!--<li><img src="../../assets/images/epidemic/text-2.png" alt=""><span>病后康复</span></li>
                <li><img src="../../assets/images/epidemic/text-3.png" alt=""><span>未病先防</span></li>
                <li><img src="../../assets/images/epidemic/text-4.png" alt=""><span>四季养生</span></li>
                <li><img src="../../assets/images/epidemic/text-5.png" alt=""><span>病毒笼罩下的身心对话</span></li>-->
              </ul>
            </div>
          </div>

        </div>
      </div>
      <div class="cont2 contCss">
        <div class="cont">
          <div class="cTit"><img src="../../assets/images/epidemic/tit1wengu.png" alt=""></div>
          <div class="two">
            <ul>
              <li v-for="(item2,index2) in cont2List" :key="index2">
                <div class="cover"  @click="toDetail(item2,3)">
                  <img :src="fileUrl(item2.bookCover)" alt="" v-if="item2.bookCover">
                  <img src="../../assets/images/home/no-cover.jpg" alt="" v-else>
                </div>
                <div class="word">
                  <h1 @click="toDetail(item2,3)">{{item2.name}}</h1>
                  <h2><span>{{item2.author}}</span></h2>
                  <p :id="`sum${index2}`">{{Ellipsis(`sum${index2}`,6,item2.summary,24)}}</p>
                </div>
              </li>
            </ul>
            <div class="more"><span  @click="toMore('温故知疫')">查看更多</span></div>
          </div>
        </div>
      </div>
      <div class="cont3 contCss">
        <div class="cont">
          <div class="cTit">
            <img src="../../assets/images/epidemic/kangyihzhidao-tit.png" alt="">
          </div>
          <div class="three">
            <ul>
              <li v-for="(item3,index3) in cont3" :key="index3">
                <div class="cover" @click="toDetail(item3,3)">
                  <img :src="item3.img" alt="">
                </div>
                <div class="info">
                  <h1 @click="toDetail(item3,3)">{{item3.name}}</h1>
                  <h2>{{item3.source}}</h2>
                  <!--<p>{{item3.cont}}</p>-->
                  <p :id="'id'+index3">{{Ellipsis('id'+index3,5,item3.cont,22)}}</p>
                  <div  class="smallImg">
                    <img :src="item3.ewm" alt="">
                    <div class="bigImg">
                      <img  :src="item3.ewm" alt="">
                    </div>
                  </div>

                </div>
              </li>
            </ul>
            <div class="more"><span @click="toMore('温故知疫')">查看更多</span></div>
          </div>

        </div>
      </div>
      <div class="cont4 contCss">
        <div class="cont">
          <div class="cTit">
            <img src="../../assets/images/epidemic/fangyijiangtang-tit.png" alt="">
          </div>
          <div class="four">
            <ul>
              <li v-for="(item4,index4) in cont4List" :key="index4">
                <div class="cover"  @click="toDetail(item4,4)">
                  <img :src="fileUrl(item4.img)" alt="" v-if="item4.img">
                  <img src="../../assets/images/resources/zanwu.png" alt="" v-else>
                </div>
                <h1 @click="toDetail(item4,4)">{{item4.title}}</h1>
              </li>
            </ul>
            <div class="more"><span  @click="toMore('防疫讲堂')">查看更多</span></div>
          </div>
        </div>

      </div>

      <div class="cont5 contCss">
        <div class="five">
          <div class="cTit">
            <img src="../../assets/images/epidemic/chaxun-tit.png" alt="">
          </div>
          <div class="search">
            <input type="text" placeholder="中医药数据海量查询" v-model="content">
            <div class="button" @click="searchBtn">
              <img src="../../assets/images/epidemic/fdj.png" alt="">
              <span>搜索</span>
            </div>
          </div>
          <div class="cont">
            <ul>
              <li v-for="(item5,index5) in cont5" :key="index5">
                <div class="cover"  @click="toDetail(item5,1)">
                  <img class="noHover" :src="item5.cover" alt="">
                  <img class="hover" :src="item5.coverHover" alt="">
                </div>
                <p v-for="(it,inx) in cont5[index5].data" :key="inx"  @click="toDetail(it,1)">{{it.title}}</p>
                <div class="more"  @click="toMore(item5.name)">查看更多</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="cont6 contCss">
        <div class="six">
          <ul class="cTit">
            <li :class="cont6Active==index6?'active':''" v-for="(item6,index6) in cont6List" :key="index6" @click="cont6Fn(index6)">{{item6}}</li>
            <!--<li>中医诊疗方案</li>
            <li>中医防护知识</li>
            <li>在线咨询</li>-->
          </ul>
          <div class="cont">
            <div class="left">
              <img src="../../assets/images/epidemic/al.png" alt="">
              <h1 v-if="inforList.length>0"  @click="toDetail(inforList[0],2)">{{inforList[0].title}}</h1>
              <!--<p  v-if="inforList.length>0" v-html="inforList[0].content"></p>-->
              <p  v-if="inforList.length>0" id="infor">{{Ellipsis('infor',4,inforList[0].content,30)}}</p>
            </div>
            <ul class="right">
              <li v-for="(item,index) in inforList" :key="index" v-if="index>0"  @click="toDetail(item,2)">{{item.title}}</li>
            </ul>
          </div>
          <div class="more"><span @click="toMore(cont6List[cont6Active])">查看更多</span></div>
        </div>
      </div>
      <epidemicFoot></epidemicFoot>
      <div class="suspension">
        <ul>
          <li class="hover1">全球抗疫
            <div class="ewmZX1">
              <div class="ewmCont">
                <img src="../../../static/img/zx1.png" alt="">
                <span>全球抗疫</span>
              </div>
            </div></li>
          <li class="hover2">自测评估
            <div class="ewmZX2">
              <div class="ewmCont">
                <img src="../../../static/img/zx2.png" alt="">
                <span>自测评估</span>
              </div>
          </div>
          </li>
        </ul>


      </div>
    </div>
</template>

<script>
  import '@/assets/css/font.css';
  import epidemicFoot from '../../components/epidemicFoot';
  import epidemicHeader from '../../components/epidemicHeader';
  import {getImgsAPI,getInforAPI,getTopicAPI} from '../../api/epidemic/index.js';
  import {uploadUrl} from '../../utils/global';
  export default {
    name: 'HelloWorld',
    data () {
      return {
        uploadUrl:uploadUrl,
        imgList:[],
        inforList:[],
        bannerHerght:'500px',
        name:'中医抗疫纪实',
        cont3:[
          {name:'新冠肺炎防控指导手册',source:'中国中医科学院中医临床 基础医学研究所，中医古籍出版社编著',cont:'2019年12月，新型冠状病毒肺炎在湖北肆虐，疫情引起了全社会的广泛关注。全国人民众志成城，为抗击疫情做出了极大努力。本书应疫情所急，组织专家在充分研判此次疫情发病、传染和传播特征的基础上，昼夜编纂而成。',img:'../../static/img/zhidao-book1.png',ewm:'../../static/img/ewmc1.png',id:'057732c011254fa0ba489714737a40c3'},
          {name:'新冠肺炎疫情下的身心对话',source:'北京师范大学认知精神科学...',cont:'全国人民众志成城，为抗击疫情做出了极大努力。本书应疫情所急。组织专家在充分研判此次疫情发病、传染和传播特征的基础上，昼夜编撰而成...',img:'../../static/img/zhidao-book2.png',ewm:'../../static/img/ewmc2.png',id:'a2ad053e83ce4c8985e146d7a8d45aae'},
          {name:'新冠肺炎的康复保健法',source:'中国中医科学院中医临床基础医学研究所，中医古籍出版社联合编写',cont:'庚子年初，新型冠状病毒肺炎疫情爆发。经过全国上下近两个月的奋战和努力，我国战“疫”情况取得了可喜的效果，人们逐步恢复正常生产生活。',img:'../../static/img/zhidao-book3.png',ewm:'../../static/img/ewmc3.png',id:'99436b49075448e4a3f7fd265ac98591'},
        ],
        cont5:[
          {code:'COVID_TOPIC_05',name:'理论',data:[],cover:'../../static/img/ll.png',coverHover:'../../static/img/llsel.png'},
          {code:'COVID_TOPIC_06',name:'药物',data:[],cover:'../../static/img/yw.png',coverHover:'../../static/img/ywsel.png'},
          {code:'COVID_TOPIC_07',name:'临床',data:[],cover:'../../static/img/lc.png',coverHover:'../../static/img/lcsel.png'},
          {code:'COVID_TOPIC_08',name:'医案',data:[],cover:'../../static/img/ya.png',coverHover:'../../static/img/yasel.png'},
        ],
        suspension:[{
          name:'全球抗疫',
          ewm:'../../../static/img/zx1.png',
        }],
        cont1:{},
        cont1ListLeft:[],
        cont1ListRight:[],
        cont2List:[],
        cont4List:[],
        cont6List:['中医抗疫纪实','中医诊疗方案','中医防护知识','在线咨询'],
        cont6Active:0,
        content:'',
      }
    },
    created () {
      let self=this;
      this.bannerHerght = document.body.clientWidth*500/1920+'px';
      self.getImgs();
      Promise.all([self.getCont1(),self.getCont1Left(),self.getCont1Right(),self.getCont2(),self.getCont4(),self.getTopic()])
        .then((result) => {
          self.getInfor();
        })

    },
    mounted () {
      let self=this;
      window.onresize = () => {
        return (() => {
          self.bannerHerght = document.body.clientWidth*500/1920+'px';
        })()
      }
    },
    components:{epidemicFoot,epidemicHeader},
    watch: {},
    methods: {
      //轮播图
      getImgs(){
        getImgsAPI({
          signValue:'COVID_19',
          num:4}).then(res=>{
          if(res.data.status){
            this.imgList=res.data.data;
          }
        })
      },
      getCont1(){
        getTopicAPI({
          code:'COVID_TOPIC_01',
          pageNum:1,
          pageSize:1
        }).then(res=>{
          if(res.data.status){
            /*console.log(1111,code,res.data.data)*/
            this.cont1=res.data.data.recommendResourceList.list[0];
          }

        })
      },
      /*第一部分左下*/
      async getCont1Left(){
        let data={
          code:'COVID_TOPIC_10',
          pageNum:1,
          pageSize:10
        };
        this.cont1ListLeft= await this.getTopicData(data);
      },
      /*第一部分左下*/
      async getCont1Right(){
        let data={
          code:'COVID_TOPIC_09',
          pageNum:1,
          pageSize:5
        };
        this.cont1ListRight= await this.getTopicData(data);
      },
      /*第二部分*/
      async getCont2(){
        let data={
          code:'COVID_TOPIC_02',
          pageNum:1,
          pageSize:6
        };
        this.cont2List=await this.getTopicData(data);
      },

      getCont4(){
        getTopicAPI({
          code:'COVID_TOPIC_04',
          pageNum:1,
          pageSize:9
        }).then(res=>{
          if(res.data.status){
            /*console.log(1111,code,res.data.data)*/
            this.cont4List=res.data.data.recommendResourceList.list;
          }

        })
      },

      //医药资讯/考试专栏列表
      getInfor(){
        getInforAPI({
          name:this.name,
          pageNum:0,
          pageSize:10,
        }).then(res=>{
          if(res.data.status){
            this.inforList=res.data.data.list;
          }
        })
      },

      /*推荐位*/
      async getTopic(){
        let self=this;
        /*仅限：{COVID_TOPIC_01：新冠肺炎防控知识，COVID_TOPIC_02：温故知疫，COVID_TOPIC_03：医药知识，COVID_TOPIC_04：防疫讲堂，COVID_TOPIC_05：理论，COVID_TOPIC_06：药物，COVID_TOPIC_07：临床，COVID_TOPIC_08：医案}*/

        /*this.cont5.forEach((item,index)=>{

            })*/
        for(let i=0; i<this.cont5.length;i++){
          let data={
            code:this.cont5[i].code,
            pageNum:1,
            pageSize:8
          };
          this.cont5[i].data = await self.getTopicData(data);
        }
      },
      getTopicData(data){
        return new Promise(resolve => {
          getTopicAPI(data).then(res=>{
            if(res.data.status){
              /*console.log(1111,code,res.data.data)*/
              resolve(res.data.data.recommendResourceList.list);
            }

          })

        })

      },

      cont6Fn(index){
        this.cont6Active=index;
        if(index==3){
          window.open('https://stctcm.sobot.com/chat/h5/v2/index.html?sysnum=0cba94144caa46ff9148a49742ce07e2&channelid=2');
        }else{
          this.name=this.cont6List[index];
          this.getInfor();
        }

      },
      /*详情*/
      toDetail(item,code){
        if(code==1||code==4){
          let routeUrl = this.$router.resolve({
            path: "/epidemicDetail",
            query: {id:item.id}
          });
          window.open(routeUrl.href, '_blank');
          /*this.$router.push({path:'/epidemicDetail',query:{id:item.id}});*/
        }else if(code==2){
          let data=['中医抗疫纪实','中医诊疗方案','中医防护知识'];
          let index=data.findIndex((curI)=>{
            return  curI==item.name;
          });
          let routeUrl = this.$router.resolve({
            path: "/epidemicRead",
            query: {id:item.id,pageType:index}
          });
          window.open(routeUrl.href, '_blank');
          /*this.$router.push({path:'/epidemicRead',query:{id:item.id,pageType:index}});*/
        }else if(code==3){
          let routeUrl = this.$router.resolve({
            path: "/epidemicBookDetail",
            query: {id:item.id}
          });
          window.open(routeUrl.href, '_blank');
          /*this.$router.push({path:'/epidemicBookDetail',query:{id:item.id}});*/
        }
      },
      /*搜索*/
      searchBtn(){
        if(this.content.trim()==''){
          return
        }
        this.$router.push({name:'epidemicSearch',query:{val:this.content.trim()}});
      },
      /*查看更多*/
      toMore(item){
        if(item=='中医抗疫纪实'||item=='中医诊疗方案'||item=='中医防护知识'){
          this.$router.push({name:'epidemicMessage',query:{type:item}});
        }else if(item=='温故知疫'){
          this.$router.push('/epidemicBook');
        }else if(item=='防疫讲堂'){
          this.$router.push('/epidemicForum');
        }else{
          this.$router.push({name:'epidemicList',query:{type:item}});
        }
      },

      answerFn(boo){
        if(!boo){
         // this.$message.warning('开发中');
          return
        }
        window.open('http://yb.stctcm.com/whybcms/selfAssessmentList.html');
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  ul,li,h1,h2,h3,h4,h5,p,span,div{margin: 0;padding: 0;list-style: none}
.epidemic{
  width: 100%;
  background: #fff;
  .banner{
    width:100%;
    height: 500px;
    position: relative;
    top:0;
    min-width: 1200px;
    /*overflow: hidden;
    display: inline-block;
    vertical-align: middle;*/
    img{
      position: absolute;
      top:0;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
  .ban{
    width: 100%;
    min-width: 1200px;
    height: 500px;
    /*overflow: hidden;
    text-align: center;
    vertical-align: middle;*/
    position: relative;
    top:0;
    img{
      /*min-width: 1200px;
      overflow: hidden;
      text-align: center;
      vertical-align: middle;*/
      position: absolute;
      top:0;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
  .contCss{
    width:100%;
    min-width: 1200px;
    .cont{
      width: 1200px;
      padding-top: 0;
      margin-top: 0;
    }
  }
  .more{width: 100%;
    display: block;
    text-align: center;
  span{
    cursor: pointer;
    display: inline-block;
    width: 156px;
    height: 29px;
    line-height: 29px;
    background: url("../../assets/images/epidemic/more-bg.png") no-repeat;
    font-size:14px;
    font-family:Microsoft YaHei;
    color:rgba(158,123,75,1);
    text-align: left;
    padding-left: 11px;
  }}
  .cont1{
    height: 610px;
    background: url("../../assets/images/epidemic/jujiao-bg.png") no-repeat;
    .cont{
      margin: 0 auto;
      padding-top: 64px;
      .cTit{
        height: 75px;
        position: relative;
        img{height: 75px;}
        span{
          position: absolute;
          right: 10px;
          top:0;
          color: #9C1A1B;
          font-weight: bold;
          font-size: 20px;
          /*font-family: myFont;*/
          cursor: pointer;
          img{
            width: 50px;
            height: 17px;
          }
        }
      }
      .one{
        display: flex;
        justify-content: space-between;
        .left{
          width: 775px;
          padding-top: 9px;
          .lfT{
            display: flex;
            justify-content: space-between;
            padding-bottom: 38px;
            padding-left: 20px;
            img{width: 280px; height: 210px;cursor: pointer}
            .lfTr{
              width: 450px;
              h1{height:32px;
                font-size:24px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(33,33,33,1);
                line-height:30px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                cursor: pointer
              }
              h2{
                height: 40px;
                font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(46,126,136,1);
                line-height:38px;
              }
              p{
                font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(69,69,69,1);
                line-height:30px;
              }
            }

          }
          .lfB{
            margin-left: 6px;
            height: 160px;
            overflow: hidden;
            ul{
              /*display: flex;
              flex-direction: row;*/
              li{
                cursor: pointer;
                float: left;
                margin-left: 16px;
                margin-bottom: 20px;
                display: flex;
                height: 38px;
                line-height: 38px;
                /*position: relative;*/
                /*padding-left: 32px;
                padding-right: 32px;*/

                font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(139,104,53,1);
                div{
                  display: flex;
                  background: url("../../assets/images/epidemic/center.png") repeat-x;
                }
              }
              li:hover{.active}
              .active{color: #9C1A1B}
              li:before{
                content: '';
                /*position: absolute;
                left: 0;
                top: 0;*/
                margin-right: -6px;
                background: url("../../assets/images/epidemic/left.png") no-repeat;
                width: 42px;
                height: 38px;
              }
              li:after{
                content: '';
                margin-left: -6px;
                /*position: absolute;
                right: 0;
                top: 0;*/
                background: url("../../assets/images/epidemic/right.png") no-repeat;
                width: 42px;
                height: 38px;
              }
            }
          }
        }
        .right{
          width: 378px;
          height: 468px;
          background: url("../../assets/images/epidemic/jz.png") no-repeat;
          margin-top: -4px;
          ul{
            padding-top: 54px;
            li{
              width:299px;
              height:48px;
              position: relative;
              left: 38px;
              padding-bottom: 26px;
              cursor: pointer;
              img{
                position: absolute;
                z-index: 0;
                top:0;
                left:0;
                width:299px;
                height:48px;
              }
              span{
                position: absolute;
                top:0;
                left:0;
                width:299px;
                height:48px;
                text-align: center;
                line-height: 48px;
                font-size:20px;
                font-family:myFont;
                font-weight:400;
                color:rgba(255,255,255,1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
  .cont2{
    height:auto;
    padding-bottom: 60px;
    background: url("../../assets/images/epidemic/wenguzhiyi-bg.png") no-repeat;
    .cont{
      margin: 0 auto;
      .cTit{
        width: 100%;
        padding-top: 61px;
        text-align: center;
        img{
          height: 79px;
        }
      }
      .two{
        width:1200px;
        height:auto;
        padding-bottom: 50px;
        margin-top: 14px;
        background:rgba(255,255,255,1);
        border:4px solid rgba(255,255,255,1);
        box-shadow:0px 3px 20px 0px rgba(138,122,99,0.15);
        ul{
          display: block;
          overflow: hidden;
          padding-top: 15px;
          margin-bottom: 35px;
          li{
            display: flex;
            justify-content: space-between;
            width: 346px;
            float: left;
            margin:30px 0 30px 40px;
            .cover{
              width: 150px;
              height: 210px;
              box-shadow:0px 3px 20px 0px rgba(138,122,99,0.15);
              cursor: pointer;
              img{
                width: 150px;
                height: 210px;
              }
            }
            .word{width: 170px;}
            h1{
              font-size:18px;
              font-family:Microsoft YaHei;
              font-weight:bold;
              color:rgba(51,51,51,1);
              height: 22px;
              line-height: 22px;
              padding-bottom: 14px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              cursor: pointer;
            }
            h2{
              height:20px;
              font-size:14px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(177,153,124,1);
              line-height:14px;
              width: 100%;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              span{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 158px;
              }
            }
            h2:before{
              content: '';
              /*padding-right: 5px;*/
              width: 12px;
              height: 16px;
              margin-top: 1px;
              background: url("../../assets/images/epidemic/li.png") no-repeat;
              background-size: contain;

            }
            p{
              font-size:14px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(102,102,102,1);
              line-height:24px;
              margin-top: 13px;
            }
          }
        }
      }
    }
  }
  .cont3{
    height: 726px;
    background: url("../../assets/images/epidemic/kangyizhidao-bg.png") no-repeat;
    .cont{
      margin: 0 auto;
      .cTit{
        text-align: center;
      }
      .three{
        ul{
          display: flex;
          padding-top:18px;
          padding-bottom:20px;
          justify-content: center;
          li{
            display: flex;
            align-items: center;
            width:276px;
            flex-direction: column;
            margin: 0 40px;

            .cover{
              cursor: pointer;
              width:276px;
              height:360px;
              text-align: center;
              background:rgba(255,255,255,1);
              box-shadow:0px 3px 20px 0px rgba(138,122,99,0.15);
              img{
                margin-top: 15px;
              width: 180px;
              height: 282px;}
            }
            .info{
              width: 245px;
              height: 285px;
              margin-top: -97px;
              background: url("../../assets/images/epidemic/text-bg.png") no-repeat;
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;
              h1,h2,p{
                width: 200px;
                margin: 0 auto;
              }
              h1{
                cursor: pointer;
                font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                color:#675945;
                height: 36px;
                line-height: 36px;
                padding-top: 16px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
              h2{
                height: 30px;
                line-height: 30px;
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                color:rgba(156,144,127,1);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
              p{
                margin-top: 7px;
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:#9C907F;
                line-height:22px;
                /*height:131px;*/
              }
              .smallImg{
                width: 32px;
                height: 32px;
                position: absolute;
                bottom:30px;
                cursor: pointer;
                border: 2px solid #fff;
                img{
                  width: 32px;
                  height: 32px;

                }
              }

              .bigImg{
                position:absolute;
                background: #fff;
                width: 256px;
                height: 256px;
                padding: 5px;
                top:-350px;
                left: -118px;
                border: 2px solid rgba(156, 144, 127, .5);
                border-radius: 5px;
                box-shadow:0px 3px 20px 0px rgba(138,122,99,0.15);
                display: none;
                img{
                  width: 256px;
                  height: 256px;

                }
              }
            }

          }
          li:hover{
            .info{
              width: 245px;
              height: 285px;
              margin-top: -97px;
              background: url("../../assets/images/epidemic/text-bg-hover.png") no-repeat;
              display: flex;
              flex-direction: column;
              align-items: center;
              h1,h2,p{
                width: 200px;
                margin: 0 auto;
              }
              h1{
                font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                color:#fff;
                height: 36px;
                line-height: 36px;
                padding-top: 16px;
              }
              h2{
                height: 30px;
                line-height: 30px;
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                color:#F7F0E2;
              }
              p{
                margin-top: 7px;
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:#F7F0E2;
                line-height:22px;
                /*height:131px;*/
              }
              .smallImg:hover{
                /*display: flex;
                justify-content: center;
                align-items: center;*/
                .bigImg{
                  position:absolute;
                  background: #fff;
                  width: 256px;
                  height: 256px;
                  padding: 5px;
                  top:-350px;
                  left: -118px;
                  border: 2px solid rgba(156, 144, 127, .5);
                  border-radius: 5px;
                  display: block;
                  box-shadow:0px 3px 20px 0px rgba(138,122,99,0.15);
                  img{
                    width: 256px;
                    height: 256px;
                    box-shadow:0px 3px 20px 0px rgba(138,122,99,0.15);
                  }
                }
              }
            }

          }
          li:first-child{margin-left: 0}
          li:last-child{margin-right: 0}
        }
      }
    }
  }

  .cont4{
    height:auto;
    background: url("../../assets/images/epidemic/fangyijiangtang-bg.png") no-repeat center bottom;
    padding-bottom: 50px;
    .cont{
      margin: 0 auto;
      .cTit{
        text-align: center;
        padding-top: 78px;
        height: 81px;
        padding-bottom: 17px;
      }

      .four{
        ul{
          li{
            padding-bottom: 34px;
            width: 384px;
            float: left;
            display: block;
            .cover{
              width:384px;
              height:224px;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              img{
                width:384px;
                height:224px;
              }
            }
            .cover:hover:before{
              content: url("../../assets/images/epidemic/play.png");
              position: absolute;
              width: 60px;
              height: 60px;
              z-index: 11;
            }
            .cover:hover:after{
              content: '';
              width: 100%;
              height: 100%;
              background: rgba(0,0,0,0.4);
              position: absolute;
              top: 0;
            }
            h1{
              font-size:16px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(51,51,51,1);
              display: flex;
              align-items: center;
              height: 56px;
              cursor: pointer;
            }
            h1:before{
              content: '';
              background: url("../../assets/images/epidemic/text-li.png") no-repeat;
              width: 18px;
              height: 15px;
              float: left;
              margin-right: 6px;
            }
          }
          li:nth-child(3n+2){
            padding: 0 22px;
          }
        }
      }
    }
  }

  .cont5{
    height: 770px;
    background: url("../../assets/images/epidemic/wenguzhiyi-bg.png") no-repeat;
    .five {
      width:1200px;
      margin: 0 auto;
      position:relative;
      z-index: 11;
      .cTit {
        text-align: center;
        padding-top: 62px;
        height: 78px;
        padding-bottom: 8px;
      }
      .search{
        background: url("../../assets/images/epidemic/sousuokuang.png") no-repeat;
        background-position:0 3px;
        width: 924px;
        height: 99px;
        margin: 2px auto 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        input{
          margin-left: 49px; width:690px;
          height: 30px;
          line-height: 30px;
          border: none;
          outline:0px;
        }
        input::-webkit-input-placeholder { /* WebKit browsers */
          color: #9E7B4B;
        }

        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #9E7B4B;
        }

        input::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #9E7B4B;
        }

        input:-ms-input-placeholder { /* Internet Explorer 10+ */
          color: #9E7B4B;
        }

        .button{
          background: url("../../assets/images/epidemic/sousuo-bg.png") no-repeat center;
          width: 123px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          cursor: pointer;
          border-left:1px solid #D7CBBB;
          border-image: -webkit-linear-gradient(rgba(255,255,255,0), #D7CBBB, rgba(255,255,255,0))1 10 1;
          border-image: -moz-linear-gradient(rgba(255,255,255,0), #D7CBBB, rgba(255,255,255,0))1 10 1;
          border-image: linear-gradient(rgba(255,255,255,0), #D7CBBB, rgba(255,255,255,0))1 10 1;
          padding-left: 13px;
          margin-right: 29px;
          img{
            width: 20px;
            height: 18px;
            margin-left: 13px;
            margin-right: 3px;
          }
          span{
            font-size:16px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(248,244,244,1);
            height: 18px;
            line-height: 18px;
          }

        }
      }
      .cont{
        width:1200px;
        height:440px;
        background:rgba(254,252,249,1);
        box-shadow:0px 3px 20px 0px rgba(138,122,99,0.15);
        margin-top: 50px;
        ul{
          display: flex;
          justify-content: space-between;
          flex-wrap:wrap;
          padding: 40px 30px 0 30px;

          li{
            width: 250px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .cover{
              padding-bottom: 20px;
              .noHover{display: block}
              .hover{display: none}
              img{
                height: 58px;
              }
            }
            p{
              width: 250px;
              font-size:14px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(158,123,75,1);
              height: 36px;
              line-height:36px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            p:before{
              content: url("../../assets/images/epidemic/lis.png");
              width: 12px;
              height: 16px;
              float: left;
              display: block;
              padding-right: 10px;
              padding-top: 2px;
            }
            .more{
              display: none;
            }
          }
          li:hover{
            position: relative;
            width:300px;
            height:504px;
            background:rgba(255,255,255,1);
            box-shadow:0px 5px 27px 0px rgba(0, 0, 0, 0.1);
            margin-left: -25px;
            margin-right: -25px;
            margin-top: -70px;
            .cover{
              padding-top: 47px;
              padding-bottom: 20px;
              .noHover{display: none}
              .hover{display: block}
              img{
                height: 58px;
              }
            }
            p{
              color: #454545;
              cursor: pointer;
            }
            .more{
              cursor: pointer;
              display: block;
              background: url("../../assets/images/epidemic/more.png") no-repeat;
              width: 114px;
              height: 38px;
              text-align: center;
              line-height: 38px;
              font-size:14px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(130,95,46,1);
              margin: 20px auto 0;
            }
          }
          li:hover:before{
            position: absolute;
            content: url("../../assets/images/epidemic/rightTop.png");
            right: 6px;
            top:6px;
            width: 70px;
          }
          li:hover:after{
            position: absolute;
            content: url("../../assets/images/epidemic/leftBottom.png");
            left: 6px;
            bottom:6px;
            width: 70px;
          }
        }
      }
    }
  }
  .cont6 {
    height: 755px;
    background: url("../../assets/images/epidemic/lastL.png") no-repeat left bottom;
    position: relative;
    z-index: 0;
    margin-top: -90px;
    .six{
      width: 1201px;
      margin: 0 auto;
      height: 535px;
      background: url("../../assets/images/epidemic/borderBg.png") no-repeat 0 170px;
      padding-top: 170px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .cTit{
        display: flex;
        align-items: center;
        margin-top: -22px;
        li{
          background: url("../../assets/images/epidemic/tab.png") no-repeat;
          width: 194px;
          height: 44px;
          font-size:24px;
          font-family:myFont;
          /*font-weight:bold;*/
          color:rgba(252,251,251,1);
          margin:0 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .active{
          background: url("../../assets/images/epidemic/tab-hover.png") no-repeat;
          width: 198px;
          height: 53px;
          margin:0 20px;
        }
      }
      .cont{
        margin-top: 65px;
        margin-bottom: 15px;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        .left{
          width: 560px;
          margin-left: 52px;
          img{
            width: 560px;
            margin-bottom: 20px;
          }
          h1{
            font-size:22px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:36px;
            margin-bottom: 15px;
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p{
            font-size:16px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(96,102,107,1);
            line-height:30px;
          }
        }
        .right{
          margin-right: 82px;
          width: 442px;
          li{
            font-size:16px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:40px;
            height: 40px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
          }
          li:before{
            content: url("../../assets/images/epidemic/lis.png");
            width: 12px;
            height: 16px;
            float: left;
            margin-top: 2px;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .cont6:after{
    width: 472px;
    height: 696px;
    content: url("../../assets/images/epidemic/lastR.png");
    position: absolute;
    top: 0;
    right: 0;
    z-index:-1;
  }

  .suspension{
    position: fixed;
    background: url("../../assets/images/epidemic/suspension.png") no-repeat;
    width:137px;
    height: 226px;
    right: 20px;
    bottom: 90px;
    z-index: 22;
    ul{
      padding-top: 90px;
      text-align: center;

      li{
        height: 60px;
        line-height: 60px;
        color: #fff;
        font-family:myFont;
        font-size: 24px;
        margin-bottom: 20px;
        cursor: pointer;
      }
    }
    .hover1:hover{
      .ewmZX1{
        display: block;
      }
    }
    .hover2:hover{
      .ewmZX2{
        display: block;
      }
    }
    .ewmZX1,.ewmZX2{
      position: absolute;
      display: none;

      width: 114px;
      height: 126px;
      right:142px;
      bottom:0px;
    }
    .ewmZX1:before{
      content: '';
      position: absolute;
      background: url("../../../static/img/zxbg.png") no-repeat;
      width: 114px;
      height: 126px;
      z-index: 1;
      top: 0;
      left:0;
    }
    .ewmZX2:before{
      content: '';
      position: absolute;
      background: url("../../../static/img/zxbg.png") no-repeat;
      -moz-transform:scaleY(-1);
      -webkit-transform:scaleY(-1);
      -o-transform:scaleY(-1);
      transform:scaleY(-1);
      width: 114px;
      height: 126px;
      z-index: 1;
      top: 0;
      left:0;
    }
    .ewmCont{
      position: absolute;
      z-index: 11;
      width: 107px;
      height: 126px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img{
        width: 86px;
        height: 86px;
      }
      span{
        font-size: 14px;
        padding-top: 2px;
        height: 16px;
        line-height: 16px;
        color: #333;
        font-family:Microsoft YaHei;
      }
    }
  }

}
</style>
