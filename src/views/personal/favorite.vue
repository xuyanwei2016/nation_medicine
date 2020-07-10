<template>
  <div class="favorite">
    <div class="favorite_rightTitle">我的收藏</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="医著" name="first">
        <div class="favorite_con">
          <div class="favorite_li" v-for="(item,index) in collectionList" :key="index">
            <div class="info_input">
              <input type="checkbox" :checked="item.isChecked" @click="clickChang(item)">
            </div>
            <div class="favorite_left" :style="{height:'148px'}" @click="linkHref(item)">
              <!--height:148px;-->
              <img :src=fileUrl(item.cover) style="height:148;width:100px;" :onerror="errorImg()">
            </div>
            <!-- <img  style="height: 148px; width: 148px; margin: 0 18px;" src="@/assets/images/home/no-cover.jpg" v-else> -->
            <div class="favorite_rightCon">
              <div class="favorite_topic" @click="linkHref(item)" v-if="item.title">{{item.title }}</div>
              <div  style="font-size: 16px;color: #999;"  v-else>此医著已经被删除</div>

              <div class="favorite_author">作者：《{{item.author}}》</div>
              <div class="favorite_details">
                {{item.intro | limit}}
              </div>
              <div class="favorite_time">
                <span>{{item.createTime}}</span>
                <span>
                  <a @click="cancelBtn(item)" class="favoriteBtn1">取消收藏</a>
                  <a @click="addShop(item)" class="favoriteBtn2" v-if="item.title&&item.isStatus==1">加入购物车</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="文章" name="second">
        <div class="favorite_con">
          <div :class="item.cover?'favorite_li':'favorite_article'" v-for="(item,index) in collectionList" :key="index" v-if="collectionList.length>0">
            <div class="info_input">
              <input type="checkbox" :checked="item.isChecked" @click="clickChang(item)">
            </div>
            <div class="favorite_left" :style="{height:'148px',backgroundImage:'url(' + fileUrl(item.cover) + ')'}"  @click="linkHref(item)" v-if="item.cover">
              <!--<img :src=fileUrl(item.cover)>-->
            </div>
            <div class="favorite_rightCon">
              <div class="favorite_topic" @click="linkHref(item)" v-if="item.title">{{item.title}}</div>
              <div  style="font-size: 16px;color: #999;" v-else>此文章已经被删除</div>
              <div class="favorite_author">来源：<router-link :to="{path:'/medetails',query:{id:item.fromId }}">《{{item.fromTitle}}》</router-link></div>
              <div class="favorite_details">
                {{item.intro | limit}}
              </div>
              <div class="favorite_time">
                <span>{{item.createTime}}</span>
                <span>
                  <a @click="cancelBtn(item)" class="favoriteBtn1">取消收藏</a>
                  <a @click="addShop(item)" class="favoriteBtn2" v-if="item.title&&item.isStatus==1">加入购物车</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="favorite_check" style="right:30px;"  v-if="collectionList.length>0">
      <input class="check" type="checkbox" :checked="changAll" @click="checkAll">全选
      <a @click="moreCancel">批量取消</a>
    </div>
    <div class="noHave" v-if="total==0"><img src="@/assets/images/home/no-content.jpg" alt=""></div>
    <div class="pagination_box" v-if="total!=0">
      <pagination @change="pageChange" :current-page="pageNum" :page-size="pageSize" :total-page="lastPage"></pagination>
      <!-- <el-pagination @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize"
                     layout="prev, pager, next, total, jumper" :total="total"></el-pagination> -->
    </div>
  </div>
</template>

<script>
  import '@static/css/personal/favorite.less'
  import {myCollectionAPI, cancelcollectionAPI, shopCartAPI} from '../../api/comment/comments';
  import Cookies from 'js-cookie';

  export default {
    name: 'favorite',
    data() {
      return {
        status: null,
        activeName: 'first',
        collectionList: [],
        activeList: [],
        pageSize: 15,
        pageNum: 1,
        userType: "",
        type: '2-1',
        changAll: false,
        cancelList: [],
        total: 0,
        lastPage:0,
      }
    },
    created() {
      this.userType = Cookies.get('userType');
      this.myCollection();
    },
    methods: {
      handleClick(tab, event) {
        this.pageNum=1;
        this.changAll = false;
        this.cancelList = [];
        this.total = 0;
        this.lastPage=0
        if (tab.index == "1") {
          console.log("2-2")
          this.type = "2-2"
        } else {
          this.type = "2-1"
        }
        this.myCollection();
      },
      /*获取收藏列表*/
      myCollection() {
        let self = this;
        myCollectionAPI({
          goodsType: this.type,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }).then(res => {

          /*if (this.type == "2-1") {*/
            this.collectionList = res.data.data.list;
            if (this.collectionList && this.collectionList.length) {
              this.collectionList.map(function (val) {
                return self.$set(val, "isChecked", false)
              })
            }

          /*} else {
            this.activeList = res.data.data.list;
            if (this.activeList && this.activeList.length) {
              this.activeList.map(function (val) {
                return self.$set(val, "isChecked", false)
              })
            }
          }*/
          this.total = res.data.data.total;
          this.lastPage = Math.ceil(Number(res.data.data.total) / Number(this.pageSize));
        })


      },
      /*单选*/
      clickChang(val) {
        let self = this;
        val.isChecked = !val.isChecked;
        if (val.isChecked) {
          self.cancelList.push(val)
        } else {
          for (let i = 0; i < self.cancelList.length; i++) {
            if (val.objectId == self.cancelList[i].objectId) {
              self.cancelList[i].isChecked=false;
            }

          }
        }
          this.changAll = this.collectionList.every(function (item) {
            return item.isChecked
          })

      },
      /*全选*/
      checkAll() {
        let self = this;
        self.changAll = !self.changAll;

        if (this.collectionList && self.collectionList.length > 0) {

          if (self.changAll) {
            this.cancelList = self.collectionList;
          } else {
            this.cancelList = [];
          }
          this.collectionList.map(function (val) {
            return val.isChecked = self.changAll;
          })

        }

      },
      /*单个取消收藏*/
      cancelBtn(val) {
        this.$confirm('确定取消收藏吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          cancelcollectionAPI({
            goodsList: [{
              id: val.objectId,
              type: this.type
            }],
            goodsType: this.type,
            /*memberType: 1,*/
          }).then(res => {
            if (res.data.status) {
              this.myCollection();
              this.$message.success("已取消收藏")
            }
          })
        }).catch(() => {

        })

      },
      /*批量取消*/
      moreCancel() {
        let goods = [];
        console.log(this.cancelList)


        if(this.cancelList.length>0){
          for (let i = 0; i < this.cancelList.length; i++) {
            if(this.cancelList[i].isChecked){
              let item = {
                id: this.cancelList[i].objectId,
                type: this.type,
              };
              goods.push(item)
            }

          }

          this.$confirm('确定取消收藏吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            cancelcollectionAPI({
              goodsList: goods,
              goodsType: this.type,
            }).then(res => {
              if (res.data.status) {
                this.$message.success('已批量取消收藏')
                this.myCollection();
                this.cancelList = [];
              }else{
                this.$message.error(res.data.msg)
              }
            })
          })

        }else{
          this.$message.warning("请选择要取消的数据！")
        }


      },
      // 分页
        pageChange(val) {
          this.pageNum = val
          this.myCollection()
        },
      // handleCurrentChange(val) {
      //   this.pageNum = val
      //   this.myCollection()
      // },
      /*添加购物车*/
      addShop(item) {
        shopCartAPI({
          goodsId: item.objectId,
          goodsType: this.type,
          num: 1
        }).then(res => {
          console.log("添加购物车")
          if (res.data.status) {
            this.$message.success('商品已加入购物车')
          }else{
            this.$message.error(res.data.msg)
          }

        })
      },
      /*跳转详情页面*/
      linkHref(val) {

        let pathUrl = '';
        this.type == '2-1' ? pathUrl = '/medetails' : pathUrl = '/articleread';
        this.$router.push({path: pathUrl, query: {id: val.objectId}})
      },
    }
  }
</script>

<style lang="less">
  .favorite .el-tabs__nav-wrap {
    width: 926px;
    margin-left: 27px;
  }

  .favorite .favorite_time {
    span {
      a {
        color: #999;
        text-decoration: none;
      }
      .favoriteBtn1:hover {
        background: #fff;
       border-color: #7AAEFC;
        color:#2876F2;
      }

      .favoriteBtn2:hover {
        color: #fff;
        background: #2876F2;
      }
    }
  }

  .favorite .el-tabs__nav-scroll .el-tabs__nav .el-tabs__item {
    font-size: 14px !important;
  }

  a {
    cursor: pointer;
  }

  .favorite #pane-first .favorite_con .favorite_li .favorite_left,.favorite #pane-second .favorite_li .favorite_left {
    background-size: contain !important;
    background-repeat: no-repeat;
    background-position: center;
  }
  .favorite{
    margin-bottom: 20px;
    min-height:932px;
    width:100%;
    .noHave{  background: #fff; display: flex; justify-content: center; align-items: center}
  }

</style>
