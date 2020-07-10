<template>
  <div class="bookShelf">
    <div class="bookshelf_title">我的书架</div>
    <div class="bookShelfSheach1">
      <div class="search_left1">
        <div class="search_input">
          <input type="text" v-model="context" class="search" placeholder="输入标题搜索">
        </div>
        <div class="search_btn" @click="myShelf">
          <a class="btn">搜索</a>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="医著" name="first">
        <div class="bookshelf_list" v-for="(item,index) in myShelfList" :key="index" v-if="myShelfList.length>0">
          <div class="bookshelf_left bookShelfImg">
            <router-link :to="{path:'/medetails',query:{id:item.goodsid}}">
              <img :src=fileUrl(item.cover) v-if="item.cover">
              <img src="@/assets/images/home/no-cover.jpg" v-else>
            </router-link>
          </div>
          <div class="bookshelf_rightCon">
            <div class="bookshelf_topic" v-if="item.name"><router-link :to="{path:'/medetails',query:{id:item.goodsid}}">《{{item.name}}》</router-link></div>
            <div  style="font-size: 16px;color: #999;" v-else>此医著已经被删除</div>

            <div class="bookshelf_author" v-if="item.goodsBuyVo">作者：{{item.goodsBuyVo.author}}</div>
            <div class="bookshelf_details" v-if="item.goodsBuyVo">
              {{item.goodsBuyVo.summary | limit}}
            </div>
            <div class="bookshelf_time">购买时间：{{item.createTime}}</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="文章" name="second">
        <div :class="item.cover?'bookshelf_list':'bookshelf_article'" v-for="(item,index) in articleList" :key="index">
          <div class="bookshelf_left bookShelfImgSec" v-if="item.cover">
            <router-link :to="{path:'/articleread',query:{id:item.goodsid}}"><img :src=fileUrl(item.cover)></router-link>
          </div>
          <div :class="item.cover?'bookshelf_rightCon':''">
            <div class="bookshelf_topic" v-if="item.name"><router-link :to="{path:'/articleread',query:{id:item.goodsid}}">{{item.name}}</router-link></div>
            <div style="font-size: 16px;color: #999;" v-else>此文章已经被删除</div>
            <div class="bookshelf_author" v-if="item.goodsBuyVo&&item.goodsBuyVo.source" >来源：<span class="source" @click="linkToBook(item.goodsBuyVo.sourceId)">《{{item.goodsBuyVo.source }}》</span></div>
            <div class="bookshelf_author" v-else>来源：<span>《{{item.goodsBuyVo.source }}》</span></div>
            <div class="bookshelf_details" v-if="item.goodsBuyVo">
              {{item.goodsBuyVo.summary | limit}}
            </div>
            <div class="bookshelf_time">购买时间：{{item.createTime}}</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div class="noHave" v-if="total==0"><img src="@/assets/images/home/no-content.jpg" alt=""></div>
    <div class="pagination_box" v-if="total!=0">
    <pagination @change="pageChange" :current-page="pageNum" :page-size="pageSize" :total-page="lastPage"></pagination>
      <!-- <el-pagination  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="prev, pager, next, total, jumper" :total="total"></el-pagination> -->
    </div>


  </div>
</template>

<script>
  import "@static/css/personal/my-bookshelf.less";
  import {myShelfAPI} from "../../api/comment/comments";
  import Cookies from 'js-cookie';

  export default {
    name: 'bookshelf',
    data() {
      return {
        status: null,
        activeName: 'first',
        content: null,
        pageNum: 1,
        pageSize: 15,
        resourceList: {},
        type: '2-1',
        resourceType: null,
        context: null,//搜索框
        myShelfList:[{
          goodsBuyVo:{
            author:'',
            source:'',
            summary:'',
          }
        }],
        articleList:[{
          goodsBuyVo:{
            author:'',
            source:'',
            summary:'',
          }
        }],
        userType:'',
        total:0,
        lastPage:0,
      }
    },
    created() {

      this.myShelf();
    },
    watch:{
      $route(){
        this.context='';
        this.myShelf();
      }
    },
    methods: {
      linkToBook(id){
        this.$router.push({path:'/medetails',query:{id:id}})
        //console.log(id,"ididididid")
      },
      /*获取我的书架列表*/
      myShelf() {
        let self=this;
        myShelfAPI({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          goodsType: this.type,
          context: this.context,

        }).then(res => {
          if(this.type=='2-1'){
            this.myShelfList=res.data.data.list;
          }else{
            this.articleList=res.data.data.list;
          }
          // this.$router.push({path:'/bookshelf',query:{"useless":1}});
          self.total=res.data.data.total;
          self.lastPage = Math.ceil(Number(res.data.data.total) / Number(self.pageSize));
        })
      },
      handleClick(tab, event) {
        this.pageNum=1;
        this.total=0;
        if (tab.index=="1") {
          this.type = "2-2"
        }else{
          this.type = "2-1"
        }

        this.myShelf();

      },
      pageChange(val) {
          console.log('切换page')
          this.pageNum = val
          this.myShelf()
      },
      // handleCurrentChange(val) {
      //   this.pageNum = val
      //   this.myShelf()
      // }
    }
  }
</script>
<style lang="less">
  .bookShelf .el-tabs__header .el-tabs__nav-wrap {
    width: 926px;
    margin-left: 27px;
  }
  .bookShelf .bookshelf_list .bookshelf_rightCon .bookshelf_topic a,.bookShelf .bookshelf_article .bookshelf_topic a{ color:#333}
  .bookShelf .bookshelf_list .bookshelf_rightCon .bookshelf_topic a:hover,.bookShelf .bookshelf_article .bookshelf_topic a:hover{ color:#1F77F2}
  .bookShelfImg{
    /*max-width: 100px;
    max-height:148px;*/
    img{
      max-width: 148px;
      max-height:148px;
    }

  }
  .bookShelfImgSec{
    max-width: 148px;
    max-height:100px;
    img{
      max-width: 148px;
      max-height:100px;
    }
  }
  .bookShelf{
    position: relative;
    .el-tabs__content{
      background: #fff;
    }
  }

  .bookShelfSheach1{
    height: 32px;
    position: absolute;
    right:28px;
    top:83px;
    z-index:1;
    .search_left1 {
      width: 292px;
      height: 32px;
      float: left;
      .search_input {
        width: 230px;
        height: 30px;
        border: 1px solid rgba(238,238,238,1);
        border-radius:3px 0px 0px 3px;
        float: left;
        border-right: none;

        .search {
          width: 220px;
          height: 28px;
          padding-left: 10px;
          /*color: #cccccc!important;*/
        }
      }
      .search_btn {
        float: left;
        width: 60px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        background:rgba(70,146,251,1);
        border-radius:0px 3px 3px 0px;
        cursor: pointer;
        .btn {
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(255,255,255,1);
          text-decoration:none;
        }
      }
      input {
        outline: none;
        border: none;
      }

    }
  }
  .pagination_box {
    background-color: #fff;
    padding: 20px 0;
    width: 100%;
    text-align: center;
  }
  .bookShelf{
    // margin-bottom: 20px;
    min-height:897px;
    width:100%;
    .noHave{background: #fff; display: flex; justify-content: center; align-items: center;min-height: 807px;}
  }
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color:#C1C5CD
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
    color:#C1C5CD
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    color:#C1C5CD
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color:#C1C5CD
  }

</style>
