<template>
  <!--理论-->
  <div class="theory">
    <commonHeader></commonHeader>
    <!--banner-->
    <div class="whole_bg">
      <div class="whole_list">
        <div class="scroll_wrap" :class="scrollFleg ? 'leftMove' : 'rightMove' ">
          <div class="whole_listMoudle"
            v-for="(item,index) in resourceList" :key="item.resourceType"
            @click="changeResource(item.resourceType,index)"
            :class=" item.resourceType == listQuery.resourceType?'hover_Moudle': ''">
              <div class="whole_listTitle">{{item.resourceName}}</div>
              <div class="whole_listnum">{{item.num}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--1200居中内容-->
    <div class="theory_content">
      <div class="theoryRightBg"></div>
      <div class="theory_box">
        <navbar></navbar>
        <div class="whole_line" v-if="listQuery.resourceType"></div>
        <div class="theory_main">
          <!--分类--> <!--面包屑-->
          <div class="theoryClass" v-if="listQuery.resourceType">
            <ul class="theoryClassUl">
              <li v-for="item in diyTypeList" :key="item.id">
                <span class="classGener">{{item.showName}}：</span>
                <div class="classCont">
                  <span @click="totalData(item.code,item.children,1)">全部</span>
                  <span v-for="info in item.children" :key="info.id"
                    @click="changeSec(info.code,info.showName,1,item.code)"
                    :class="ids.indexOf(info.code) != -1 ?'hoverCss':''"
                    >
                    {{info.showName}}
                    <!-- <img src="../../assets/images/home/classBtm.png"> -->
                  </span>
                </div>
              </li>
            </ul>
            <ul class="theoryClassUl">
              <li v-for="item in labelList" :key="item.id">
                <span class="classGener">{{item.name}}：</span>
                <div class="classCont">
                  <span @click="totalData(item.code,item.labelContent,1)">全部</span>
                  <span v-for="info in item.labelContent" :key="info.id"
                    @click="changeLabel(info.code,info.labelContent,2,item.code)"
                    :class="LabelIds.indexOf(info.code) != -1 ?'hoverCss':''"
                    >
                    {{info.labelContent}}
                    <!-- <img src="../../assets/images/home/classBtm.png"> -->
                  </span>
                </div>
              </li>
            </ul>
            <div class="selected">
              <span class="selectW" v-if="nameList && nameList.length>0">已选条件：</span>
              <div class="selectCont">
                <div :class="mouseId==item.id?'blurBg':'grayBg'" v-for="item in nameList" :key="item.id"  @mouseover="mouseoverItem(item)" @mouseout="mouseoutItem">{{item.name}}
                  <div class="imgBg" @click="cancelBtn(item.id,item.name,item.type)">
                    <img src="../../assets/images/home/close.png" alt="">
                  </div>
                </div>
                <div v-if="nameList && nameList.length>0" @click="clearAll()">清空全部</div>
              </div>
            </div>
          </div>
          <!-- 民族 -->
          <div class="whole_con" v-if="pageType != 1">
            <div class="whole_line"></div>
            <div class="whole_top">
              <ul>
                  <li>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族:</li>
                  <li
                    @click="changeNation(null)"
                    :class="null == listQuery.nationsType ?'hoverClass':' '">不限
                  </li>
                  <li
                    v-for="(key,value) in nationList" :key="value"
                    @click="changeNation(value)"
                    :class="value == listQuery.nationsType ?'hoverClass':' '">
                    {{key}}
                  </li>
              </ul>
              <!-- <div class="more">更多<img src="@/assets/images/home/more.png"></div> -->
            </div>

          </div>
          <!--排序-->
          <div class="whole_arrange" v-if="list && list.length > 0">
              <div class="whole_arrLeft">
                  <span>排列:</span>
                  <div class="whole_relevance" @click="searchOrder(null,1)" :class="orderIndex == 1? 'hoverStyle':''">
                      <span>关联度</span>
                      <div class="whole_img"></div>
                  </div>
                  <div class="whole_relevance" @click="searchOrder('uploadTime',2)" :class="orderIndex == 2? 'hoverStyle':''">
                      <span>时间</span>
                      <div class="whole_img"></div>
                  </div>
                  <div class="whole_relevance" @click="searchOrder('browseNum',3)" :class="orderIndex == 3? 'hoverStyle':''">
                      <span>浏览量</span>
                      <div class="whole_img"></div>
                  </div>
              </div>
              <span class="whole_result">共{{total}}条搜索结果</span>
          </div>
          <!-- 列表内容 -->
          <div class="loading" v-loading="loading">
            <div class="box" v-if="list.length>0">
              <div v-for="item in list" :key="item.id">
                <!-- 医家 -->
                <div class="doctorArticle" v-if="item.resourceType == 2">
                  <router-link :to="{path:'/medicalother',query:{id:item.id, nationalNum}}">
                    <div class="doctorImg">
                      <img :src="`${uploadUrl}file/?fileName=${item.img}&isOnLine=true`" :onerror="errorImg()">
                      <!-- <img src="@/assets/images/home/no-cover.jpg" v-else> -->
                    </div>
                  </router-link>
                  <div class="doctorCont">
                    <div class="doctorLfLine">
                      <i class="beginS"></i>
                      <router-link :to="{path:'/medicalother',query:{id:item.id, nationalNum}}">
                        <span class="articleTit" v-html="item.name"></span>
                      </router-link>
                      <span>
                        <span v-if="item.institutionName">
                          <span v-html="item.institutionName"></span>
                        </span>
                        <b v-if="item.institutionName">|</b>
                        <span v-if="item.title">
                          <span v-html="item.title"></span>
                        </span>
                      </span>
                    </div>
                    <p class="description">
                      <span v-html="item.description.length > 120 ? item.description.substr(0,120) + '...' : item.description" v-if="item.description"></span>
                    </p>
                    <div class="doctorOther">
                      <span class="look"><img src="../../assets/images/home/eye.png" alt="">{{item.browseNum}}次浏览</span>
                      <router-link :to="{path:'/medicalother',query:{id:item.id}}">
                        <span class="checkDoctor"><a href="#">查看详情 > ></a></span>
                      </router-link>
                    </div>
                  </div>
                </div>
                <!-- 医著 -->
                <div class="doctorArticle" v-else-if="item.resourceType == 1">
                  <router-link :to="{path:'/medetails',query:{id:item.id,nationalNum, arr:[{meta: { title: '医著' },path:'/theory'}]}}">
                    <div class="doctorImg">
                      <img :src="`${uploadUrl}file/?fileName=${item.img}&isOnLine=true`" :onerror="errorImg()">
                      <!-- <img src="@/assets/images/home/no-cover.jpg" v-else> -->
                    </div>
                  </router-link>
                  <div class="doctorCont">
                    <div class="doctorLfLine">
                      <router-link :to="{path:'/medetails',query:{id:item.id,nationalNum, arr:[{meta: { title: '医著' },path:'/theory'}]}}">
                        <span class="articleTit">《<span v-html="item.name"></span>》</span>
                      </router-link>
                      <span>
                        <span v-html="item.author" :class="item.authorId?'author':'not_author'" @click="authorDetails(item.authorId)"></span>   著
                        <b v-if="item.publishTime">|</b>
                        <span v-if="item.publishTime">
                          {{item.publishTime}}出版
                        </span>
                      </span>
                    </div>
                    <p class="description">
                      <span v-if="item.description && item.description!= null">
                        {{item.description.length > 200 ? item.description.substring(0,120)+'...' : item.description}}
                      </span>
                    </p>
                    <div class="doctorOther">
                      <span class="price" v-if="item.realPrice && item.realPrice >0">￥{{item.realPrice}}</span>
                      <div class="whole_free" v-else-if="item.realPrice == 0">免费</div>
                      <div class="whole_nullPrice" v-else>未定价</div>
                      <del v-if="item.price && item.price >0">￥{{item.price}}
                        <span v-if="item.discount">
                          ({{item.discount}}折)
                        </span>
                      </del>
                      <span class="look"><img src="@/assets/images/home/eye.png" alt="">{{item.browseNum}}次浏览</span>
                      <span class="addShop" v-if="item.isStatus == 1" @click="joinShopping(item.id,item.goodsType)">加入购物车</span>
                      <span class="non_addShop" v-if="item.isStatus == 2" @click="noShopping()">加入购物车</span>
                      <div class="whole_contRight" v-if="item.isStatus == 0" @click="readArticle(item.id,item.resourceType)"><span>阅读</span></div>
                    </div>
                  </div>
                </div>
                <!-- 文章 -->
                <div class="theoryArticle" v-else>
                  <div class="articleImg" v-if="item.img">
                    <img :src="`${uploadUrl}file/?fileName=${item.img}&isOnLine=true`">
                  </div>
                  <div class="articleCont">
                    <span class="articleTit" @click="details(item.resourceType,item.id,nationalNum)">
                      <img src="@/assets/images/home/pdf.png" v-if="item.isPdf == 1">
                      <img src="@/assets/images/home/audio.png" v-if="item.isAudio == 1">
                      <img src="@/assets/images/home/video.png" v-if="item.isVideo == 1">
                      <span v-html="item.name"></span>
                    </span>
                    <div class="description">
                      <span v-if="item.description">
                        {{item.description.length > 120 ? item.description.substr(0,120) + '...' : item.description}}
                      </span>
                    </div>
                    <div class="articleOther">
                      <span class="price" v-if="item.realPrice && item.realPrice >0">￥{{item.realPrice}}</span>
                      <div class="whole_free" v-else-if="item.realPrice == 0">免费</div>
                      <div class="whole_nullPrice" v-else>未定价</div>
                      <del v-if="item.price && item.price >0">￥{{item.price}}
                        <span v-if="item.discount">
                          ({{item.discount}}折)
                        </span>
                      </del>
                      <span class="look"><img src="../../assets/images/home/eye.png" alt="">{{item.browseNum}}次浏览</span>
                      <span class="fromBook" v-if="item.bookId || item.bookName">来源：
                        <router-link :to="{path:'/medetails',query:{id:item.bookId}}" v-if="item.bookId">
                          <span>《<span v-html="item.bookName"></span>》</span>
                        </router-link>
                        <span v-else style="color:#999">《<span v-html="item.source"></span>》</span>
                      </span>
                      <span class="addShop" v-if="item.isStatus == 1" @click="joinShopping(item.id,item.goodsType)">加入购物车</span>
                      <span class="non_addShop" v-if="item.isStatus == 2" @click="noShopping()">加入购物车</span>
                      <div class="whole_contRight" v-if="item.isStatus == 0" @click="readArticle(item.id,item.resourceType)"><span>阅读</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="height:500px;background:#fff;" v-else>
              <img src="../../assets/images/home/no-content.jpg" class="no_content">
            </div>
          </div>
          <!-- 分页 -->
          <div class="pagination_box" v-if="list && list.length > 0">
            <pagination  @change="pageChange"
            :current-page="listQuery.pageNum"
            :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
          </div>
        </div>
      </div>
      <div class="theoryLeftBg"></div>
    </div>
    <commentFoot></commentFoot>
    <loginAlert :isShowChild="isShowAlert"  @toFatherData="sendSonData"></loginAlert>
  </div>
</template>

<script>
  import "@static/css/home/theory.less"
  import commonHeader from '@/components/commonHeader.vue';
  import commentFoot from '@/components/commentFoot.vue';
  import navbar from '@/components/navbar.vue';
  import { resourceListAPI, getListAPI } from '@/api/home/resource'
  import {  shopCartAPI, nationListAPI } from '@/api/common'
  import { uploadUrl } from '@/utils/global'
  import Cookies from 'js-cookie';

  export default {
    name: 'theory',
    data() {
      return {
        // detail:'',
        scrollFleg:false,
        resourceList:[],
        nationList: [],
        list:[],
        listQuery: {
          pageNum:1,
          pageSize:15,
          content:''
        },
        total: 0,
        uploadUrl: uploadUrl,
        diyTypeList: [],
        nameList: [],
        ids:[],
        labelList: [],
        LabelIds: [],
        labelNameList: [],
        levelList: null,
        // type: this.$route.query.id,
        pageType: null,
        mouseId:null,
        orderIndex: 1,
        name: this.$route.query.name,
        isShowAlert:false,
        nationalNum: this.$route.query.nationalNum,
        loading: true,
        total:null,
        lastPage:0,
      }
    },
    components: {
      commonHeader,
      commentFoot,
      navbar,
    },
    computed:{
      getCont(){
        return this.$store.state.search;
      },
    },
    watch: {
      getCont:{
        handler(naeVal,oldVal){
          this.listQuery.content = this.$store.state.search.content
          this.listQuery.nationsType = this.$route.query.nationalNum
          this.getResourceList({content:this.listQuery.content,nationsType:this.listQuery.nationsType||''})
          this.getList()
          // this.getResourceList()
        },
        immediate:true,
        deep: true,
      }
    },
    created() {
      this.listQuery.nationsType = this.$route.query.nationalNum
      if(this.$route.query.type){
        this.pageType = this.$route.query.type
      }
      this.getResourceList({content:this.listQuery.content,nationsType:this.listQuery.nationsType})
      this.getNationList()
      this.getList()
      let resource = Cookies.get('resourceType')
      if(resource){
        if(resource==1){//默认医著列表滚动
          this.changeResource(resource,10)
        }else{
          this.changeResource(resource)
        }
      } else{
        this.changeResource(31)
      }
    },
    mounted(){

    },
    methods: {
      sendSonData(val){/*子传父*/
        let self=this;
        self.isShowAlert=false;
      },
      getList() {//获取列表
        this.loading = true
        if(this.$store.state.search.content) {
          this.listQuery.content = this.$store.state.search.content
        }
        getListAPI(this.listQuery).then(res => {
          if(res.data.code >0) {
            this.$message.warning(res.data.msg)
          } else if (res.data.code <0) {
            this.$message.error('数据加载失败，请稍后再试')
          } else if(res.data.code == 0){
            this.diyTypeList = res.data.data.diyTypeList
            console.log(res.data.data,99999999999)
            this.labelList = res.data.data.labelList
            if(res.data.data.resList && res.data.data.resList.length>0){
              this.list = res.data.data.resList
            } else{
              this.list = []
            }
            this.lastPage = Math.ceil(Number(res.data.data.totalCount) / Number(this.listQuery.pageSize));
            this.total = res.data.data.totalCount
          }
          this.loading = false
        })
      },
      authorDetails(id) {//作者详情
        if(id){
          this.$router.push({path: '/medicalother', query: {id: id}})
        }
      },
      getResourceList(data) {//资源列表
        resourceListAPI(data).then(res => {
          if(res.data.data){
            this.resourceList = res.data.data
            console.log(this.resourceList,6666666666666)
          }
        })
      },
      getNationList() {//民族列表
        nationListAPI().then(res => {
          if(res.data.data){
            this.nationList = res.data.data
          }
        })
      },
      changeNation(value) {//改变民族
        this.listQuery.nationsType = value
        this.listQuery.pageNum = 1
        this.getList()
      },
      changeResource(value,index) {//改变资源
        if(index>8){//向左移动的按钮
          this.scrollFleg=true;
        }else if(index<2){//向右移动
          this.scrollFleg=false;
        }

        this.listQuery.resourceType = value
        this.listQuery.pageNum = 1
        this.listQuery.diyTypeCode = null
        this.nameList = [],
        this.ids = [],
        Cookies.set('resourceType',value);
        this.getList()
      },
      clearAll() {
        this.nameList = []
        this.ids = []
        this.listQuery.diyTypeCode = null
        this.getList()
      },
      searchOrder(name,index) {//查询

        if(name){
          this.listQuery.orderBy =  name+' '+`desc` ;
          this.getList()
        } else{
          this.listQuery.orderBy =  null ;
          this.getList()
        }
        this.orderIndex = index
      },
      details(type,id,nationalNum) {//标题-详情
        if(type == 1){//医著详情
          this.$router.push({path: '/medetails', query: {id: id}})
        } else if(type == 2){ //医家详情
          this.$router.push({path: '/medicalother', query: {id: id}})
        } else{ //文章详情
          this.$router.push({path: '/articleread', query: {id: id, nationalNum: nationalNum}})
        }
      },
      totalData(code,list,type) {//全选
        let codeArr = [...new Set(list.map(item => item.code))]
        if(type == 1){//分类全选
          codeArr.map(el => {
            this.ids.splice(this.ids.indexOf(el),1)
            this.nameList.splice(this.nameList.findIndex(item => item.id == el && item.type == type), 1)
          })
          if(this.ids.findIndex(item => item == code) == -1) {
            this.ids.push(code)
          }
          this.listQuery.diyTypeCode = this.ids.join(',')
        } else{
          codeArr.map(el => {
            this.LabelIds.splice(this.ids.indexOf(el),1)
            this.nameList.splice(this.nameList.findIndex(item => item.id == el && item.type == type), 1)
          })
          if(this.LabelIds.findIndex(item => item == code) == -1) {
            this.LabelIds.push(code)
          }
          this.listQuery.labelContentDiyTypeCode = this.LabelIds.join(',')
        }
        this.getList()
      },
      changeSec(id,name,type,codes) {//分类查询-改变按钮
        let index = this.nameList.findIndex(item => item.id == id && item.name == name && item.type == type)
        if(index == -1) {//只添加为存在的
          // this.ids.splice(this.ids.indexOf(codes),1)  //删除父级
          this.ids.push(id) //添加子集
          this.listQuery.diyTypeCode = this.ids.join(',')
          this.nameList.push({name,id,type})
          this.getList()
        }
      },
      changeLabel(id,name,type,codes) {//分类查询-改变标签
        let index = this.nameList.findIndex(item => item.id == id && item.name == name && item.type == type)
        if(index == -1) {//只添加为存在的
          // this.LabelIds.splice(this.LabelIds.indexOf(codes),1)  //删除父级
          this.LabelIds.push(id) //添加子集
          this.listQuery.labelContentDiyTypeCode = this.LabelIds.join(',')
          this.nameList.push({name,id,type})
          this.getList()
        }
      },
      cancelBtn(id,name,type) {//取消-按钮
        if(type == 1){//按钮
          this.nameList.splice(this.nameList.findIndex(item => item.id == id && item.name == name && item.type == type), 1)
          this.ids.splice(this.ids.indexOf(id),1)
          this.listQuery.diyTypeCode = this.ids.join(',')
          this.getList()
        } else{//标签
          this.nameList.splice(this.nameList.findIndex(item => item.id == id && item.name == name && item.type == type), 1)
          this.LabelIds.splice(this.LabelIds.indexOf(id),1)
          this.listQuery.labelContentDiyTypeCode = this.LabelIds.join(',')
          this.getList()
        }
      },
      joinShopping(id,type) { //加入购物车
        if(this.$store.state.userToken){//判断是否登录
          shopCartAPI({
            goodsId: id,
            goodsType: type,
            num: 1
          }).then(res => {
            if(res.data.code>0) {
              this.$message.error(res.data.msg)
            } else if(res.data.code<0) {
              this.$message.error('添加购物车失败，请稍后再试')
            } else{
              this.$message.success('商品已加入购物车！')
            }
          })
        } else{
          this.isShowAlert=true;
        }
      },
      noShopping() {//无法加入购物车
        this.$message.warning('资源更新中，敬请期待~');
      },
      readArticle(id,type) { //阅读
        if(type == 1){//医著详情
          this.$router.push({path: '/medetails', query: {id: id}})
        } else if(type == 2){ //医家详情
          this.$router.push({path: '/medicalother', query: {id: id}})
        } else{ //文章详情
          this.$router.push({path: '/articleread', query: {id: id}})
        }
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val
        this.getList()
        window.scrollTo(0, 0)
      },
      mouseoverItem(item){
        this.mouseId=item.id
      },
      mouseoutItem(){
        this.mouseId=null
      },


      // 分页
      pageChange(val) {
        console.log('切换page')
        this.listQuery.pageNum = val
        this.getList();
        window.scrollTo(0, 0)
      },
    }
  }
</script>

<style>
.doctorLfLine{
  position:relative;
  padding-left:10px;
}
.beginS{
  position:absolute;
  height:41px;
  width:2px;
  background:#89baff;
  left:0;
  top:5px;
}

</style>
