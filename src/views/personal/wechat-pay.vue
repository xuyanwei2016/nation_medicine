<template>
    <div id="wechat_app">
        <Header></Header>
        <div class="wechat_content">
            <div class="wechat_top">
                <div class="wechat_left">
                    <div class="wechat_title">
                        <span>订单提交成功，请尽快付款！</span>
                        <span>订单号：{{order.code}}</span>
                    </div>
                    <div class="wechat_tip">下单后，请在24小时内完成支付。若未及时付款，系统自动取消订单，需重新下单购买。</div>
                </div>
                <div class="wechat_right">
                    应付金额 : <span>{{order.orderPayment}}</span> 元
                </div>
                
            </div>
            <div class="wechat">
                <div class="wechat_pay">
                    <img src="@/assets/images/personal/微信支付.png">
                    <span>微信支付</span>
                </div>

                <div class="wechat_other">
                    <img src="@/assets/images/personal/切换其他支付方式.png">
                    <span @click="changePay">切换其他支付方式</span>
                </div>
            </div>
            <div class="we_tip" v-if="numTime>0">
                <p>距离二维码过期还有<span class="count_down">{{numTime}}</span>秒，过期后请刷新页面重新扫描二维码。</p>
            </div>
            <div class="wechat_bottom">
                <div class="bottom_left">
                    <div class="bottom_img">
                        <img src="@/assets/images/personal/二维码.png">
                        <div class="code_mask" v-if="numTime==0">
                            <p>二维码已失效</p>
                            <el-button type="danger" size="small" @click="updateCode">请点击刷新</el-button>
                        </div>
                    </div>
                    <div class="bottom_search">
                        <div class="pay_left"><img src="@/assets/images/personal/扫码.png"></div>
                        <div class="pay_right">请使用微信扫一扫，扫描二维码支付</div>
                    </div>
                </div>
                <div class="bottom_right">
                    <img src="@/assets/images/personal/手机.png">
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import '@static/css/personal/wechat-pay.less'     
import Footer from '@/components/Footer.vue' 
import Header from '@/components/Header.vue' 
import { detailsOrderAPI ,payOrderAPI} from '@/api/order/pay'
import { setInterval } from 'timers';
export default {
    name: 'wechat',
    components:{
        Footer,
        Header
    },
    data(){
        return{
           id:'',
           numTime:60,
           payType:'1',
           order:{
               code:'',
               orderPayment:''
           } 
        }
    },
    mounted(){
        this.id=this.$route.query.id;
        console.log(this.$route.query,'888888')
        this.getOrderDetile(this.id);
        this.countDown()
    },
    methods:{
        getOrderDetile(id){
            detailsOrderAPI(id).then(res=>{
                if(res.data.code==0){                  
                    this.order.code=res.data.data.code
                    this.order.orderPayment=res.data.data.payment.toFixed(2);
                    this.payweOder({
                        'orderCode':this.order.code,
                        'payType':this.payType
                    });//微信支付二维码 
                    //console.log(this.order.code,this.order.orderPayment,"获取参数")               
                }else if(res.data.code<0){
                    this.$message('请求失败');
                }
                //console.log(res,"获取订单信息")
            })
        },
        changePay(){//更换切换方式
            this.$router.go(-1);
        },
        payweOder(data){//支付接口
            //console.log(data,"支付参数")
            payOrderAPI(data).then(res=>{
                if(res.data.code==0){  
                    console.log(res.data,"打开微信支付码")                
                    //window.location.href=res.data.data.url//打开支付宝的链接              
                }else if(res.data.code<0){
                    this.$message('请求支付失败');
                }
               // console.log(res,"支付数据")
            })
        },
        updateCode(){//更新二维码

        },
        updateCode(){
            this.numTime=60;
        },
        countDown(){
            setInterval(()=>{
                this.numTime--;
                if(this.numTime<=0){
                    this.numTime=0;
                }
            },1000)
        }
    }
}
</script>
<style lang="less">
    #wechat_app {
        .we_tip{
            margin-top:15px;
            color: #A8A8A9;
            font-size: 14px
        }
        .count_down{
            color: #F65850;
            font-weight: 600;
        }
        .bottom_img{
            position: relative;
        }
        .code_mask{
            position: absolute;
            top:0;right:0;left:0;bottom: 0;
            background:rgba(255,255,255,.9);
            border:1px solid rgba(227,227,227,1);
            text-align: center;
            p{
                color:#323232;
                font-size: 14px;
                margin-bottom:10px;
                margin-top: 90px;
            }
        }
    }
</style>


