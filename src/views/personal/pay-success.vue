<template>
    <div id="success_app">
        <Header></Header> 
        <div class="success_top">
            <div class="top_img"><img src="@/assets/images/personal/success_rbg.png"></div>
        </div>
        <div class="success_content">
            <div class="success_left"><img src="@/assets/images/personal/success_ico.png"></div>
            <div class="success_center">
                <div class="center_title">恭喜您已经支付成功!</div>
                <div class="center_order">订 单 号：{{orderDetails.code}}</div>
                <div class="center_pay">支付方式：{{orderDetails.payTypeZh}}</div>
                <div class="center_payMoney">支付金额：￥{{orderDetails.payment}}</div>
                <div class="center_payTime">支付时间：{{orderDetails.payTime}}</div>
                <div class="center_orderDetails">您可能还需要：<span @click="orderDetailsPage()">查看订单详情</span>或者<a href="#" @click="homePage()">去逛逛</a></div>
            </div>
            <div class="success_right">
                <dl>
                    <dt>微信公众号</dt>
                    <dd><img src="@/assets/images/personal/common_number.png"></dd>
                    <dd><span>轻松扫码</span><span>服务相伴</span></dd>
                </dl>
                <dl>
                    <dt>阅读</dt>
                    <dd><img src="@/assets/images/personal/read.png"></dd>
                    <dd><span>随时随地</span><span>想看就看</span></dd>
                </dl>
            </div>
        </div>
        <div class="success_bot">
            <div class="bot_img"><img src="@/assets/images/personal/success_lbg.png"></div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import '@static/css/personal/pay-success.less'   
import Header from '@/components/Header.vue' 
import Footer from '@/components/Footer.vue' 
import { detailsOrderAPI , payOrderAPI ,testOrderAPI } from '@/api/order/pay'

export default {
    name: 'success',
    components:{
        Header,
        Footer
    },
    data () {
        return {
            id: null,
            orderDetails:{

            },
        }
    },
    created () {
        this.id = this.$route.query.id
        this.getOrder()
    },
    methods: {
        getOrder() {//获取订单详情
            detailsOrderAPI(this.id).then(res=>{
            if(res.data.code==0){
                this.orderDetails = res.data.data  
            }else{
                this.$message('请求失败');
            }
            })
        },
        orderDetailsPage() {//订单详情
            this.$router.push({path:'/orderDetails',query:{id:this.orderDetails.id}})
        },
        homePage() {
            this.$router.push({path:'/index'})
        },
    }
}
</script>
