<template>
  <div id="orderdetails">
    <Header></Header>   
    <div class="orderdetails_content">
      <navbar></navbar> 
      <div class="orderdetails_top">
        <div class="orderdetails_left">
          <div class="orderdetails_code">订单编号：{{detailsList.code}}</div>
           <!-- 0(待支付) 1（已支付）6（已完成）-1（已取消） -->
          <div class="orderdetails_statusText" v-if="detailsList.status == 6">已完成</div>
          <div class="orderdetails_statusText" v-if="detailsList.status == -1">已取消</div>
          <div class="orderdetails_status" v-if="detailsList.status == 0">待付款</div>
          <router-link :to="{path:'/pay',query:{id:detailsList.id}}">
            <div class="orderdetails_btn" v-if="detailsList.status == 0">立即支付</div>
          </router-link>
          <div class="orderdetails_tips" v-if="detailsList.status == 0">如果您不想买了，也可以<span @click="cancelOrder(detailsList.id)">取消订单</span></div>
        </div>
        <div class="line_bg"></div>
        <div class="orderdetails_right">
          <div class="orderdetails_text" v-if="detailsList.status == 0">请您在24小时内付款，若未及时付款，系统将自动取消该订单。</div>
          <div class="orderdetails_text" v-if="detailsList.status == 6">您的订单已完成，感谢您的此次购物。</div>
          
          <div class="orderdetails_status">
            <!-- 待支付 -->
            <div v-if="detailsList.status == 0">
              <span class="waiting_payment">等待支付</span>
              <img src="@/assets/images/personal-center/icon-order-hover.png" class="orderdetails_img">
              <img src="@/assets/images/personal-center/line.png" class="orderdetails_line">
              <img src="@/assets/images/personal-center/icon-complate.png" class="orderdetails_img">
              <img src="@/assets/images/personal-center/line-gray.png" class="orderdetails_line">
              <img src="@/assets/images/personal-center/icon-over.png" class="orderdetails_img">
            </div>
            <!-- 已取消 -->
            <div v-if="detailsList.status == -1">
              <img src="@/assets/images/personal-center/icon-apply.png" class="orderdetails_img">
              <img src="@/assets/images/personal-center/line-order.png" class="orderdetails_line">
              <img src="@/assets/images/personal-center/icon-handle-hover.png" class="orderdetails_img">
              <img src="@/assets/images/personal-center/line-order.png" class="orderdetails_line">
              <img src="@/assets/images/personal-center/icon-over-hover.png" class="orderdetails_img">
            </div>
            <!-- 已完成 -->
            <div v-if="detailsList.status == 6">
              <img src="@/assets/images/personal-center/icon-order-hover.png" class="orderdetails_img">
              <img src="@/assets/images/personal-center/line-order.png" class="orderdetails_line">
              <img src="@/assets/images/personal-center/icon-complate-hover.png" class="orderdetails_img">
              <img src="@/assets/images/personal-center/line-order.png" class="orderdetails_line">
              <img src="@/assets/images/personal-center/icon-over-hover.png" class="orderdetails_img">
            </div>
            <!-- 时间-文字 -->
            <div class="orderdetails_text" v-if="detailsList.status == 6">
              <div class="fir">提交订单<p>{{detailsList.createTime.substr(0,11)}}</p><p>{{detailsList.createTime.substr(11)}}</p></div>
              <div class="sec">付款成功<p v-if="detailsList.payTime">{{detailsList.payTime.substr(0,11)}}</p><p v-if="detailsList.payTime">{{detailsList.payTime.substr(11)}}</p></div>
              <div class="third">完成<p v-if="detailsList.payTime">{{detailsList.payTime.substr(0,11)}}</p><p v-if="detailsList.payTime">{{detailsList.payTime.substr(11)}}</p></div>
            </div>
            <!-- 已取消 -->
            <div class="orderdetails_text" v-if="detailsList.status == -1">
              <div class="fir">提交申请<p>{{detailsList.createTime.substr(0,11)}}</p><p>{{detailsList.createTime.substr(11)}}</p></div>
              <div class="sec">系统处理</div>
              <div class="third">完成</div>
            </div>
            <!-- 待支付 -->
            <div class="orderdetails_text" v-if="detailsList.status == 0">
              <div class="fir">提交订单<p>{{detailsList.createTime.substr(0,11)}}</p><p>{{detailsList.createTime.substr(11)}}</p></div>
              <div class="sec not_complate">付款成功</div>
              <div class="third not_complate">完成</div>
            </div>
          </div>
        </div>
      </div>
      <div class="orderdetails_bottom">
        <div class="orderdetails_moneyinfo">
          <div class="moneyinfo_title">付款信息：</div>
          <div class="moneyinfo_text">
            <span>商品总金额：<i>￥{{detailsList.orderPayment}}</i></span>                          
            <span>应支付总金额：<i>￥{{detailsList.payment}}</i></span>
            <span v-if="detailsList.status == -1">取消时间：<i>{{detailsList.updateTime}}</i></span> 
            <span v-if="detailsList.status != -1">付款方式：<i class="moneyinfo_type">{{detailsList.payTypeZh}}</i></span>
          </div>
        </div>
        <div class="orderdetails_moneyinfo">
          <div class="moneyinfo_title">发票信息：</div>
          <div class="moneyinfo_text moneyinfo_invoicetext" v-if="detailsList.needInvoice == 1">
            <span>电子发票</span>    
            <span>{{detailsList.invoiceTitle}}</span>                      
            <span>{{detailsList.invoiceContextZh}}</span>
            <span>{{detailsList.invoiceTitle}}</span>
          </div>
          <div class="moneyinfo_text moneyinfo_invoicetext" v-else>
            <span>不开发票</span>    
          </div>
        </div>
        <div class="orderdetails_goodsinfo">
          <div class="moneyinfo_title">商品信息：</div>
            <div class="orderdetails_table">
              <span class="orderdetails_info">商品信息</span>
              <span class="orderdetails_price">单价（元）</span>
              <span class="orderdetails_num">数量</span>
              <span class="orderdetails_status">小计</span>
              <span class="set">操作</span>
            </div>
            <div class="orderdetails_list" v-for="item in detailsList.infoList" :key="item.id">
              <router-link v-if="item.type == '2-1'" :to="{path:'/medetails',query:{id:item.goodsid}}">
                <div class="orderdetails_image">
                  <img :src="`${uploadUrl}file/?fileName=${item.cover}&isOnLine=true`">
                </div>
                <div class="orderdetails_name">{{item.name}}</div>
              </router-link>
              <router-link v-else :to="{path:'/articleread',query:{id:item.goodsid}}">
                <div class="orderdetails_nameType">{{item.name}}</div>
              </router-link>
              <div class="orderdetails_money">￥{{item.salePrice}}</div>
              <div class="orderdetails_num">{{item.num}}</div>
              <div class="orderdetails_total">￥{{item.totalPrice}}</div>
              <router-link :to="{path:'/review',query:{id:detailsList.id}}">
                <div class="orderdetails_reviewbtn" v-if="detailsList.hasComment == 0 && detailsList.status == 6">去评论</div>
              </router-link>
            </div>
        </div>
      </div>
      <div class="orderdetails_totalText">
        <div class="ordertails_text" v-if="detailsList.infoList">
          <span>￥{{detailsList.orderPayment}}</span>
          <p>
            共{{detailsList.infoList.length}}件商品，商品总金额：
          </p>
        </div>
        <div class="ordertails_text">
          <span>￥{{detailsList.discountTotal}}</span>
          <p>商品优惠：</p>
        </div>
        <div class="ordertails_text total_text">
          <span class="ordertails_money">￥{{detailsList.payment}}</span>
          <p>应付总额：</p>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <!-- 删除对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="20%">
        <div class="el-dialog_text">确定要取消订单吗?</div>
        <div class="dialog_foot">
            <div class="dialog_confirm" @click="confirmDel">确定</div>
            <div class="dialog_cancel" @click="delDialogVisible = false">取消</div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import "@static/css/personal/order-details.less";
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import navbar from '@/components/navbar.vue'
import { detailsAPI } from '@/api/order/details'
import { cancelAPI } from '@/api/order/index'
import { uploadUrl } from '@/utils/global'

export default {
  name: 'order',
  data(){
    return {
      orderId: this.$route.query.id,
      detailsList:{},
      uploadUrl: uploadUrl,
      delDialogVisible:false,
      cancelId: null,

    }
  },
  created(){
    this.getList()
  },
  components:{
    Footer,
    Header,
    navbar
  },
  methods:{
    getList() {
      detailsAPI(this.orderId).then(res => {
        if(res.data.code >0) {
          this.$message.warning(res.data.msg)
        } else if (res.data.code <0) {
          this.$message.error('数据加载失败，请稍后再试')
        } else if(res.data.code == 0){
          this.detailsList = res.data.data;
          console.log(this.detailsList,"this.detailsList")
        }
      })
    },
    cancelOrder(id) {//订单取消
      this.delDialogVisible = true
      this.cancelId = id
      
    },
    confirmDel() {//确认取消订单
      this.delDialogVisible = false
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
      })
    },
  }
}
</script>
