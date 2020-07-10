<template>
    <div class="my_personal_box" style="height:100%;background-color:#fff">
      <div class="personal_top" style="background-color:#f5f5f5">
        <div class="personal_money">
          <div class="personal_rest">{{form.data}}</div>
          <p>余额</p>
          <router-link :to="{path:'/recharge'}">
            <p class="personal_recharge">充值</p>
          </router-link>
        </div>
        <div class="personal_order">
          <ul style="margin: 0;overflow: hidden;">
            <router-link :to="{path: '/order', query: {id: 1}}">
              <li class="personal_orderMon" style="margin-top: 30px;">
                <img src="@/assets/images/personal-center/payment.png">
                <p>待付款</p>
                <span class="personal_orderNum is-fixed" v-if="paySize" >{{paySize}}</span>
              </li>
            </router-link>
            <router-link :to="{path: '/order', query: {id: 3}}">
              <li class="personal_orderMon" style="margin-top: 30px;">
                <img src="@/assets/images/personal-center/complete.png">
                <p>已完成</p>
                <span class="personal_orderNum is-fixed" v-if="cancelSize" >{{cancelSize}}</span>
              </li>
            </router-link>
            <router-link :to="{path: '/order', query: {id: 2}}">
              <li class="personal_orderMon" style="margin-top: 30px;">
                <img src="@/assets/images/personal-center/evaluate.png">
                <p>待评价</p>
                <span class="personal_orderNum is-fixed" v-if="reviewSize">{{reviewSize}}</span>
              </li>
            </router-link>
            <router-link :to="{path: '/order', query: {id: 0}}">
              <li style="margin-top: 30px;"><img src="@/assets/images/personal-center/order.png"><p>全部订单</p></li>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="personal_orderInfo">
        <div class="personal_title">最近订单</div>
        <div class="orderlist_con" v-if="orderList && orderList.length!=0">
            <div class="orderlist_left">
              <div class="order_outcontent">
                <div class="order_img" @click="listDetails(orderList.type,orderList.goodsid)">
                    <!-- <img :src="`${uploadUrl}file/?fileName=${orderList.goodsCover}&isOnLine=true`" v-if="orderList.goodsCover"> -->
                    <img src="@/assets/images/home/no-cover.jpg">
                </div>
                <div class="order_name" style="margin-right: 0;" @click="listDetails(orderList.type,orderList.goodsid)">{{orderList.goodsName.length > 30 ? orderList.goodsName.substr(0,30) + '...' : orderList.goodsName}}</div>
                <div class="order_price_text" >
                  <span>￥{{orderList.payment}}</span>
                  <span class="line_price" v-if="orderList.payment">￥{{orderList.payment}}</span>
                </div>
                <div class="order_num" style="margin-right: 50px;">{{orderList.num}}</div>
              </div>
            </div>
            <div class="orderlist_center">
              <div class="order_centerlist">
                <div class="orderstatus_price">￥{{orderList.payment}}</div>
                <div class="orderstatus_carriage" v-if="orderList.realReaderCarriage">(含运费：￥{{orderList.realReaderCarriage}}）</div>
                <div class="orderstatus_text">{{orderList.statusZh}}</div>
              </div>
            </div>
            <div class="orderlist_right">
              <div class="order_rightlist">
                <!-- 0(待支付) 1（已支付）6（已完成）-1（已取消） -->
                <router-link :to="{path:'/pay',query:{id:orderList.id}}">
                  <div class="order_paymentbtn" v-if="orderList.status == 0">立即支付</div>
                </router-link>
                <p class="order_tips" v-if="orderList.status == 0">（剩余{{orderList.timeTips}}）</p>
                <router-link :to="{path:'/review',query:{id:orderList.id}}">
                  <div class="order_reviewbtn" v-if="orderList.status == 6">去评价</div>
                </router-link>
                <router-link :to="{path:'/orderDetails',query:{id:orderList.id}}" style="color: #000;">
                  <div class="order_detailsbtn">订单详情</div>
                </router-link>
                <div class="order_cancelbtn" v-if="orderList.status == 0" @click="cancelOrder(orderList.id)">取消订单</div>
                <div class="order_deletebtn" v-if="orderList.status == -1" @click="deleteOrder(orderList.id)">删除</div>
              </div>
            </div>
          </div>
        <div class="personal_orderNull" v-else>
          <div class="orderlist_no">
            <img src="@/assets/images/personal-center/order-null.png" >
            <span>您最近没有新的订单哦~</span>
          </div>
        </div>
      </div>
      <div class="personal_productInfo">
        <div class="personal_title">热门产品</div>
        <div class="personal_product">
          <div class="personal_productCon">

            <div class="personal_list" v-for="item in nearlyList" :key="item.id">
              <router-link :to="{path: '/medetails', query: {id: item.id}}">
                <div class="personal_proImg">
                  <img :src="`${uploadUrl}file/?fileName=${item.bookCover}&isOnLine=true`"  :onerror="errorImg(detail)" class="header">
                  <!-- <img src="@/assets/images/home/no-cover.jpg" v-else class="header"> -->
                </div>
                <p class="personal_productName">{{item.name.length > 20 ? item.name.substr(0,20) + '...' : item.name}}</p>
              </router-link>
              <p class="personal_moneytext">￥{{item.price}}</p>
            </div>
          </div>
        </div>
        
      </div>
      <!-- 删除对话框 -->
      <el-dialog title="提示" :visible.sync="delDialogVisible" width="20%">
          <div class="el-dialog_text">确定要{{tipText}}订单吗?</div>
          <div class="dialog_foot">
              <div class="dialog_confirm" @click="confirmDel">确定</div>
              <div class="dialog_cancel" @click="delDialogVisible = false">取消</div>
          </div>
      </el-dialog>
    </div>
</template>

<script>
// import bus from '@/assets/eventBus.js'
import "@static/css/personal/personal.less";
import { getHotProductsAPI , orderListAPI} from '@/api/personal/personal_information'
import { cancelAPI , orderCountAPI , deleteAPI} from '@/api/order/index'
import { getPayAPI } from '@/api/personal/index'
import { uploadUrl } from '@/utils/global'
import { setInterval } from 'timers';
import Cookies from 'js-cookie';

var timerInterval = null

export default {
  name: 'personal',
  data(){
    return {
      uploadUrl:uploadUrl,
      status:null,
      msg: '',
      nearlyList:[],
      orderList: [],
      list: [],
      form: {},
      reviewSize: null,
      paySize: null,
      cancelSize: null,
      delDialogVisible: false,
      cancelId: null,
      deleteId: null,
      tipText: null,
      dataBase: [],
    }
  },
  created(){
    
  },
  destroyed () {
    window.clearInterval(timerInterval)
  },
  mounted() {
    this.getHotProducts()
    this.recOrder()
    this.checkBalance()
    this.getOrderCount()
  },
  methods: {
    // 查询余额
    checkBalance() {
      getPayAPI().then(res => {
        console.log(res);
        this.form = res.data
      })
    },
    getOrderCount() {//获取订单数量
      orderCountAPI({status:6,hasComment:0}).then(res => {
        console.log("aaaaaaaaaaaaaa",res);
        
        if(res.data.data && res.data.data>0){
          if (res.data.data > 99 ) this.reviewSize = '99+'
          else { this.reviewSize = res.data.data }
        }
      })
      orderCountAPI({status:0}).then(res => {
        if(res.data.data && res.data.data>0){
          if (res.data.data > 99 ) this.paySize = '99+'
          else { this.paySize = res.data.data }
        }
      })
      orderCountAPI({status:6}).then(res => {
        if(res.data.data && res.data.data>0){
          if (res.data.data > 99 ) this.cancelSize = '99+'
          else { this.cancelSize = res.data.data }
        }
      })
    },
    // 最近订单列表
    recOrder() {
      orderListAPI().then(res => {
        this.dataBase = res.data.data[0]
        this.getTimes()
        timerInterval = setInterval(this.getTimes, 60000);
        
      })

    },
    // 订单失效倒计时
    getTimes() {
      if(this.dataBase) {
          if(this.dataBase.loseTime && this.dataBase.status == 0){//待支付
            let downDate =(new Date(this.dataBase.loseTime).getTime() - Date.now())/1000
            if(downDate > 0){
              let day = parseInt(downDate / ( 60 * 60 * 24))
              let afterDay = downDate- day*24*60*60;//取得算出天数后剩余的秒数
              let hour = parseInt(afterDay / ( 60 * 60 ))
              let afterHour = downDate - day*24*60*60 - hour*60*60;//取得算出小时数后剩余的秒数
              let min = parseInt(afterHour/60);//计算整数分
              if(day>0) {
                this.dataBase.timeTips = day+'天'+hour+'小时'+min+'分钟'
              } else if(day == 0 && hour>0) {
                this.dataBase.timeTips = hour+'小时'+min+'分钟'
              } else if(day == 0 && hour == 0 && min>0){
                this.dataBase.timeTips = min+'分钟'
              }
            } else{
              this.dataBase.timeTips = '0分钟，订单已失效'
            }
          }
        this.orderList = Object.assign({},this.dataBase,{'timeTips':this.dataBase.timeTips})
      }
    },
    // 取消订单
    cancelOrder(id) {//订单取消
      this.tipText = '取消'
      this.delDialogVisible = true
      this.cancelId = id
    },
    // 删除订单
    deleteOrder(id) {
      this.tipText = '删除'
      this.delDialogVisible = true
      this.deleteId = id
    },
     confirmDel() {//确认取消或删除订单
      this.delDialogVisible = false
      if(this.cancelId) {
        cancelAPI(this.cancelId).then(res => {
          if(res.data.code >0) {
            this.$message.warning(res.data.msg)
          } else if (res.data.code <0) {
            this.$message.error('取消失败，请稍后再试')
          } else if(res.data.code == 0){
            this.$message.success('取消成功')
            clearInterval(timerInterval)
            this.recOrder()
          }
          this.cancelId = null
        })
      }

      if(this.deleteId) {
        const id = this.deleteId;
        deleteAPI([id]).then(res => {
          if(res.data.code >0) {
            this.$message.warning(res.data.msg)
          } else if (res.data.code <0) {
            this.$message.error('删除失败，请稍后再试')
          } else if(res.data.code == 0){
            this.$message.success('删除成功')
            clearInterval(timerInterval)
            this.recOrder()
          }
          this.deleteId = null
        })
      }
      
    },
    
    listDetails(type,id) {//详情
      console.log("mmmmmmm",type,id);
      if(type == '2-1'){//电子书
        this.$router.push({path:'/medetails',query:{id:id}});
      } else if(type == '2-2'){//文章
        this.$router.push({path:'/articleread',query:{id:id}});
      }
    },
    // 热门产品
    getHotProducts() {
      getHotProductsAPI().then(res => {
        this.nearlyList = res.data.data;
      })
    },
  }
}
</script>
