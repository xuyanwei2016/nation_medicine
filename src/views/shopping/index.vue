<template>
  <div id="shopping">
    <Header></Header>
    <div class="shopping_content">
      <div v-if="list.length>0">
        <div class="shopping_top">
          <div class="shopping_text">我的购物车</div>
          <div class="shopping_img">
            <img src="@/assets/images/shopping/line.png">
            <span>我的购物车</span>
            <span class="not_shopping">填写订单</span>
            <span class="not_shopping">完成订单</span>
          </div>
        </div>
        <div class="shopping_soldout" v-if="dropCarts.length>0"> 
          <img src="@/assets/images/shopping/tip.png">
          您的购物车中有<span>{{dropCarts.length}}</span>件商品已下架，您可以<span @click="deleteResource(dropCarts)">清除下架商品</span>
        </div>
        <div class="shopping_table">
          <span class="shopping_select">
            <el-checkbox  v-model="controlCheck" style="margin-right:10px" @change="controlChecked(controlCheck)"></el-checkbox>
            全选
          </span>
          <span class="shopping_info">商品信息</span>
          <span class="shopping_price">单价（元）</span>
          <span class="shopping_num">数量</span>
          <span class="shopping_total">小计</span>
          <span class="shopping_set">操作</span>
        </div>
        <!-- list -->
        <div class="shopping_ebook" v-for="item in list" :key="item.id">
          <div class="shopping_title">
            <el-checkbox v-model="item.totalCheck" style="margin-right:10px" @change="totalChecked(item.totalCheck,item.goodsType)"></el-checkbox>
            <span>{{item.goodsTypeName}}</span>
          </div>
          <div v-for="info in item.shoppingCartInfoVos" :key="info.id">
            <div class="shopping_list" v-if="info.bookStatus != 0">
              <el-checkbox v-model="info.checked" @change="single"></el-checkbox>
              <div class="shopping_image" @click="listDetails(info.goodsId,info.goodsType)" v-if="info.cover">
                <img :src="`${uploadUrl}file/?fileName=${info.cover}&isOnLine=true`"  :onerror="errorImg()">
              </div>
              <div :class="info.cover?'shopping_name':'cover_shopping_name'" @click="listDetails(info.goodsId,info.goodsType)">
                <p v-if="info.name">{{info.name.length>40?info.name.substr(0,40)+'...':info.name}}</p>
              </div>
              <div class="shopping_money">
                <span>￥{{info.salePrice}}</span>
                <span class="line_price" v-if="info.price">￥{{info.price}}</span>
              </div>
              <div class="shopping_number">{{info.num}}</div>
              <div class="shopping_total">￥{{info.salePrice}}</div>
              <div class="shopping_btn">
                <p @click="favorite({id:info.goodsId,type:info.goodsType})">移入收藏</p>
                <p @click="deleteResource([info.id])">删除</p>
              </div>
            </div>
            <div class="shopping_list list_soldout" v-else>
              <span class="shopping_soldtext">下架</span>
              <div class="shopping_image">
                <img :src="`${uploadUrl}file/?fileName=${info.cover}&isOnLine=true`"  :onerror="errorImg()">
              </div>
              <div class="shopping_name">{{info.name}}</div>
              <div class="shopping_money">
                <span>￥{{info.salePrice}}</span>
                <span class="line_price" v-if="info.price">￥{{info.price}}</span>
              </div>
              <div class="shopping_number">{{info.num}}</div>
              <div class="shopping_total">￥{{info.salePrice}}</div>
              <div class="shopping_btn">
                <p>移入收藏</p>
                <p @click="deleteResource([info.id])">删除</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 结算 -->
        <div class="shopping_order">
          <el-checkbox v-model="controlCheck" @change="controlChecked(controlCheck)">全选</el-checkbox>
          <span class="shopping_collect" @click="batchFavorite()">移到我的收藏</span>
          <span class="shopping_delete" @click="batchDelete()">批量删除</span>
          <div class="shopping_bottom_btn" @click="settlement()">去结算</div>
          <div class="shopping_orderinfo">
            <p>商品件数：<i>{{num}}</i> 件  总金额：<i class="shopping_last_money">￥{{totalPrice}}</i>（不含运费）</p>
            <p>已节省：￥{{saveMoney.toFixed(2)}}</p>
          </div>
        </div>
      </div>
      <div v-else class="shopping_null">
        <img src="@/assets/images/shopping/bg.png">
        <div class="info">
          <p>您的购物车空空的哦，赶快去看看心仪的产品吧~</p>
          <router-link :to="{path:'/index'}">
            <span>去逛街</span>
          </router-link>
        </div>
      </div>
      <!-- 推荐 -->
      <div class="shopping_recommend">
        <div class="shopping_recommend_title">为您推荐</div>
          <div class="personal_product">
            <!-- <img src="@/assets/images/personal-center/left.png" class="personal_icon"> -->
            <div class="personal_productCon">
              <div class="personal_list" v-for="item in recommendList" :key="item.id">
                <router-link :to="{path:'/medetails',query:{id:item.id}}">
                  <img :src="`${uploadUrl}file/?fileName=${item.bookCover}&isOnLine=true`"  :onerror="errorImg(detail)" style="cursor: pointer" class="img">
                  <!-- <img  src="@/assets/images/home/no-cover.jpg" v-else class="img"> -->
                  <p class="shopping_name">
                    <span v-if="item.name">{{item.name.length>20?item.name.substr(0,20)+'...':item.name}}</span>
                  </p>
                </router-link>
                <p class="personal_moneytext">￥{{item.price}}</p>
                <div class="img_favorite" @click="pushShopping(item.id,item.goodsType)"></div>
              </div>
            </div>
            <!-- <img src="@/assets/images/personal-center/right.png" class="personal_icon"> -->
          </div>
          <!-- <div class="personal_bottom">
            <span></span>
            <span></span>
            <span class="personal_pointhover"></span>
          </div> -->
      </div>
    </div>
    <Footer></Footer>
    <!-- 删除对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="20%">
        <div class="el-dialog_text">确定要删除已选商品吗?</div>
        <div class="dialog_foot">
            <div class="dialog_confirm" @click="confirmDel">确定</div>
            <div class="dialog_cancel" @click="delDialogVisible = false">取消</div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import "@static/css/shopping/index.less";
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { getListAPI, deleteAPI, recommendAPI, favoriteAPI } from '@/api/order/shopping'
import { shopCartAPI } from '@/api/common'
import { uploadUrl } from '@/utils/global'

export default {
  name: 'shoppingCart',
  data(){
    return {
      checked:null,
      dropCarts:[],
      list:[],
      controlCheck: true,
      num: 0,
      totalPrice: 0,
      saveMoney:0,
      uploadUrl: uploadUrl,
      recommendList:[],
      delDialogVisible: false,
      deleteId: null,
      ids: this.$route.query.ids,

    }
  },
  created(){
    this.getList()
    this.getRecommend()
  },
  components:{
    Header,
    Footer
  },
  methods:{
    getList() {//购物车列表
      getListAPI().then(res => {
        if(res.data.code >0) {
          this.$message.warning(res.data.msg)
        } else if (res.data.code <0) {
          this.$message.error('数据加载失败，请稍后再试')
        } else if(res.data.code == 0){
          this.dropCarts = res.data.data.dropCarts;
          if(this.ids){//确认订单返回
            res.data.data.shoppingCartTypeVos.map(el => {
              el.shoppingCartInfoVos.map(infoList => {
                if(this.ids.indexOf(infoList.id.toString()) != -1 || this.ids.indexOf(infoList.id) != -1){
                  infoList.checked = true
                } else{
                  this.controlCheck = false
                }
              })
            })
          } else{
            res.data.data.shoppingCartTypeVos.map(el => {
              el.totalCheck = false
              el.shoppingCartInfoVos.map(infoList => {
                if(infoList.bookStatus != 0) {
                  infoList.checked = false
                  this.controlCheck = false
                }
              })
            })
          }
          this.list = res.data.data.shoppingCartTypeVos
          this.getNum()
        }
      })
    },
    getNum() {//获取总额-总num
      this.controlCheck = true
      this.num = 0;
      this.totalPrice = 0;
      this.saveMoney = 0;
      this.list.map(el => {
        let checkedNum = 0
        el.shoppingCartInfoVos.map(infoList => {
          if(infoList.checked){
            checkedNum = checkedNum + 1
            this.num = this.num + 1
            this.totalPrice = this.totalPrice + (infoList.salePrice)
            if(infoList.price) {
              this.saveMoney = this.saveMoney + ((infoList.price-infoList.salePrice))
            }
          } else{
            this.controlCheck = false
            infoList.totalCheck = false
          } 
        })
        if(checkedNum == el.shoppingCartInfoVos.length){
          el.totalCheck = true
        } else{
          el.totalCheck = false
        }
      })
    },
    single() {//单选change
      this.getNum()
    },
    controlChecked(controlCheck) {//全选
      this.list.map(el => {
        el.totalCheck = controlCheck
        el.shoppingCartInfoVos.map(infoList => {
          infoList.checked = controlCheck
        })
      }) 
      this.getNum()
    },
    totalChecked(totalCheck,goodsType) {//单块全选
      this.list.map(el => {
        if(el.goodsType == goodsType){
          el.shoppingCartInfoVos.map(infoList => {
            infoList.checked = totalCheck
          })
        }
      }) 
      this.getNum()
    },
    deleteResource(id) {//删除
       this.deleteId = id
      this.delDialogVisible = true;
    },
    confirmDel() {//确认删除
      deleteAPI(this.deleteId).then(res =>{
        this.delDialogVisible = false
        if(res.data.code >0) {
          this.$message.warning(res.data.msg)
        } else if (res.data.code <0) {
          this.$message.error('删除失败，请稍后再试')
        } else if(res.data.code == 0){
          this.$message.success('删除成功')
          this.getList()
        }
      })
    },
    batchDelete() {//选中批量删除
      let ids = []
      this.list.map(el => {
        el.shoppingCartInfoVos.map(infoList => {
          if(infoList.checked){
            ids.push(infoList.id)
          }
        })
      })
      if(ids.length <= 0){
        this.$message.warning('请选择至少一条数据进行删除')
      } else{
        this.deleteResource(ids)
      }
    },
    getRecommend() {//推荐列表
      recommendAPI({num:5}).then(res => {
        if(res.data.code >0) {
          this.$message.warning(res.data.msg)
        } else if (res.data.code <0) {
          this.$message.error('数据加载失败，请稍后再试')
        } else if(res.data.code == 0){
          this.recommendList = res.data.data
        }
      })
    },
    favorite(obj) {//收藏
      let goodsList = []
      if(obj instanceof Array){
        goodsList = obj
      } else{
        goodsList.push(obj)
      }
      favoriteAPI({goodsList:goodsList}).then(res => {
        if(res.data.code >0) {
          this.$message.warning(res.data.msg)
        } else if (res.data.code <0) {
          this.$message.error('收藏失败，请稍后再试')
        } else if(res.data.code == 0){
          this.$message.success('收藏成功')
        }
      })
    },
    batchFavorite() {//选中批量收藏
      let ids = []
      this.list.map(el => {
        el.shoppingCartInfoVos.map(infoList => {
          if(infoList.checked){
            ids.push({
              id:infoList.goodsId,
              type:infoList.goodsType
            })
          }
        })
      })
      if(ids.length <= 0){
        this.$message.warning('请选择至少一条数据进行收藏')
      } else{
        this.favorite(ids)
      }
    },
    settlement() {//结算
      let ids = []
      this.list.map(el => {
        el.shoppingCartInfoVos.map(infoList => {
          if(infoList.checked && infoList.bookStatus){
            ids.push(infoList.id)
          }
        })
      })
      if(ids.length <= 0){
        this.$message.warning('请选择要结算的商品')
      } else{
        this.$router.push({path:'/confirmOrder',query:{id:ids}})
      }
    },
    listDetails(id,type) {//跳转商品详情
      if(type == '2-1'){//电子书
        this.$router.push({path:'/medetails',query:{id:id}});
      } else if(type == '2-2'){//文章
        this.$router.push({path:'/articleread',query:{id:id}});
      }
    },
    pushShopping(id,goodsType) {//加入购物车
      shopCartAPI({
        goodsId: id,
        goodsType,
        num: 1
      }).then(res => {
        if(res.data.code>0) {
          this.$message.error(res.data.msg)
        } else if(res.data.code<0) {
          this.$message.error('添加购物车失败，请稍后再试')
        } else{
          this.$message.success('添加购物车成功！')
          this.getList()
        }
      })
    },
  }
}
</script>
