<template>
<div class="order_box">
  <div class="order_title">我的订单</div>
  <div class="order_pay_size" v-if="paySize">{{paySize}}</div>
  <div class="order_review_size" v-if="reviewSize">{{reviewSize}}</div>
  <div class="order_cancel_size" v-if="cancelSize">{{cancelSize}}</div>
  <div class="search_left">
      <div class="search_input">
          <input type="text" class="search" placeholder="商品名称或订单号" v-model="listQuery.context">
      </div>
      <div class="search_btn">
          <a href="#" class="btn" @click="searchContext()">搜索</a>
      </div>
  </div>
  <el-tabs v-model="activeName" @tab-click="handleClick" style="padding-left:26px; background-color: #fff; width: 100%;">
    <el-tab-pane label="全部订单" name="first"></el-tab-pane>
    <el-tab-pane label="待付款" name="second"></el-tab-pane>
    <el-tab-pane label="待评论" name="third"></el-tab-pane>
    <el-tab-pane label="已完成" name="forth"></el-tab-pane>
  </el-tabs>
  <div class="order_con">
    <div class="order_top">
      <span class="goods_info">商品信息</span>
      <span class="price">单价（元）</span>
      <span class="num">数量</span>
      <span class="status">状态</span>
      <span>操作</span>
    </div>
    <div class="order_list" v-for="item in list" :key="item.id">
      <div class="order_code">{{item.createTime}}     订单编号：<span>{{item.code}}</span></div>
      <div class="orderlist_con">
        <div class="orderlist_left">
          <div class="order_outcontent" v-for="info in item.infoList" :key="info.id">
            <div class="order_img" @click="listDetails(info.type,info.goodsid)">
              <img :src="`${uploadUrl}file/?fileName=${info.cover}&isOnLine=true`" v-if="info.cover">
              <img src="@/assets/images/home/no-cover.jpg" v-else>
            </div>
            <div class="order_name" @click="listDetails(info.type,info.goodsid)">{{info.name.length>40?info.name.substr(0,40)+'...':info.name}}</div>
            <div class="order_price_text">
              <span>￥{{info.salePrice}}</span>
              <span class="line_price" v-if="info.price">￥{{info.price}}</span>
            </div>
            <div class="order_num">{{info.num}}</div>
          </div>
        </div>
        <div class="orderlist_center">
          <div class="order_centerlist">
            <div class="orderstatus_price">￥{{item.payment}}</div>
            <div class="orderstatus_carriage" v-if="item.realReaderCarriage">(含运费：￥{{item.realReaderCarriage}}）</div>
            <div class="orderstatus_text">{{item.statusZh}}</div>
          </div>
        </div>
        <div class="orderlist_right">
          <div class="order_rightlist">
            <!-- 0(待支付) 1（已支付）6（已完成）-1（已取消） -->
            <router-link :to="{path:'/pay',query:{id:item.id}}">
              <div class="order_paymentbtn" v-if="item.status == 0">立即支付</div>
            </router-link>
            <p class="order_tips" v-if="item.status == 0">（剩余{{item.timeTips}}）</p>
            <router-link :to="{path:'/review',query:{id:item.id}}">
              <div class="order_reviewbtn" v-if="item.status == 6 && item.hasComment == 0">去评价</div>
            </router-link>
            <router-link :to="{path:'/orderDetails',query:{id:item.id}}">
              <div class="order_detailsbtn">订单详情</div>
            </router-link>
            <div class="order_cancelbtn" v-if="item.status == 0" @click="cancelOrder(item.id)">取消订单</div>
            <div class="order_deletebtn" v-if="item.status == -1" @click="deleteOrder(item.id)">删除</div>
          </div>
        </div>
      </div>
    </div>
    <div class="nullStyle"  v-if="list.length == 0" >
      <img src="@/assets/images/home/no-content.jpg" class='list_null'>
    </div>
  </div>
  <div class="pagination_box"  v-if="list && list.length != 0">
    <pagination @change="pageChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
    <!-- <el-pagination
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNum"
      :page-size="listQuery.pageSize"
      layout="prev, pager, next, total, jumper"
      :total="total">
    </el-pagination> -->
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
import "@static/css/personal/my-order.less";
import { getListAPI, deleteAPI, cancelAPI, orderCountAPI } from '@/api/order/index'
import { uploadUrl } from '@/utils/global'
var timerInterval = null

export default {
  name: 'order',
  data(){
    return {
      status: null,
      activeName: 'first',
      content: null,
      listQuery: {
        pageNum:1,
        pageSize:15,
        status: null,
        hasComment: null
      },
      total: 0,
      list: [],
      uploadUrl: uploadUrl,
      id: null,
      cancelId: null,
      delDialogVisible: false,
      paySize:null,
      reviewSize: null,
      cancelSize: null,
      tipText: null,
      deleteId: null,
      dataBase:{},
      lastPage:0,
    }
  },
  created(){
    this.getList()
    this.id = this.$route.query.id;
    this.getOrderCount()
    if(this.id){
      this.handleClick({index:this.id})
    }
  },
  destroyed () {
    window.clearInterval(timerInterval)
  },
  methods:{
    handleClick(tab) {
      this.listQuery={
        pageNum:1,
          pageSize:15,
          status: null,
          hasComment: null
      };
      // 0(待支付) 1（已支付）6（已完成）-1（已取消）
      if(tab.index == 1){//待付款
        this.listQuery.status = 0
        this.listQuery.hasComment = null
        this.activeName = 'second'
      } else if(tab.index == 2){//待评论
        this.listQuery.status = 6
        this.listQuery.hasComment = 0
        this.activeName = 'third'
      } else if(tab.index == 3) {//已完成
        this.listQuery.status = 6
        this.listQuery.hasComment = null
        this.activeName = 'forth'
      } else{
        this.listQuery.status = null
        this.listQuery.hasComment = null
        this.activeName = 'first'
      }
      this.getList()
    },
    getList() {//列表
      getListAPI(this.listQuery).then(res => {
        this.dataBase = res.data.data
        this.total = res.data.data.total
        this.lastPage = Math.ceil(Number(res.data.data.total) / Number(this.listQuery.pageSize));
        this.getTimes()
        timerInterval = setInterval(this.getTimes, 60000);
      })
    },
    searchContext() {//搜索框
      this.getList()
    },
    getOrderCount() {//获取订单数量
      orderCountAPI({status:6,hasComment:0}).then(res => {
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
    getTimes() {//order失效倒计时
      if(this.dataBase.list && this.dataBase.list.length>0) {
        this.dataBase.list.map(el => {
          if(el.loseTime && el.status == 0){//待支付
            let downDate =(new Date(el.loseTime).getTime() - Date.now())/1000
            if(downDate > 0){
              let day = parseInt(downDate / ( 60 * 60 * 24))
              let afterDay = downDate- day*24*60*60;//取得算出天数后剩余的秒数
              let hour = parseInt(afterDay / ( 60 * 60 ))
              let afterHour = downDate - day*24*60*60 - hour*60*60;//取得算出小时数后剩余的秒数
              let min = parseInt(afterHour/60);//计算整数分
              if(day>0) {
                el.timeTips = day+'天'+hour+'小时'+min+'分钟'
              } else if(day == 0 && hour>0) {
                el.timeTips = hour+'小时'+min+'分钟'
              } else if(day == 0 && hour == 0 && min>0){
                el.timeTips = min+'分钟'
              }
            } else{
              el.timeTips = '0分钟，订单已失效'
            }
          }
        })
        this.list = Object.assign({},this.dataBase.list)
      } else{
        this.list = []
      }
    },
    deleteOrder(id) {//删除订单
      this.tipText = '删除'
      this.delDialogVisible = true
      this.deleteId = id
    },
    cancelOrder(id) {//订单取消
      this.tipText = '取消'
      this.delDialogVisible = true
      this.cancelId = id
    },
    confirmDel() {//确认取消或删除订单
      this.delDialogVisible = false
      if(this.cancelId) {//取消
        cancelAPI(this.cancelId).then(res => {
          if(res.data.code >0) {
            this.$message.warning(res.data.msg)
          } else if (res.data.code <0) {
            this.$message.error('取消失败，请稍后再试')
          } else if(res.data.code == 0){
            this.$message.success('取消成功')
            clearInterval(timerInterval)
            this.getList()
          }
          this.cancelId = null
        })
      }
      if(this.deleteId) {//删除
        deleteAPI([this.deleteId]).then(res => {
          if(res.data.code >0) {
            this.$message.warning(res.data.msg)
          } else if (res.data.code <0) {
            this.$message.error('删除失败，请稍后再试')
          } else if(res.data.code == 0){
            this.$message.success('删除成功')
            clearInterval(timerInterval)
            this.getList()
          }
          this.deleteId = null
        })
      }
    },
    listDetails(type,id) {//详情
      console.log("mmmmm",type,id);
      
      if(type == '2-1'){//电子书
        this.$router.push({path:'/medetails',query:{id:id}});
      } else if(type == '2-2'){//文章
        this.$router.push({path:'/articleread',query:{id:id}});
      }
    },
    // handleCurrentChange(val) {
    //     this.listQuery.pageNum = val
    //     clearInterval(timerInterval)
    //     this.getList()
    //     window.scrollTo(0, 0)
    // }
    // 分页
    pageChange(val) {
        console.log('切换page')
        this.listQuery.pageNum = val
        clearInterval(timerInterval)
        this.getList();
        window.scrollTo(0, 0)
    },
  }
}
</script>
