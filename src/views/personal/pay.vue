<template>
    <div id="pay_app">
        <Header></Header> 
        <div class="pay_content">
            <div class="pay_top">
                <div class="pay_left">
                    <div class="pay_title">
                        <span>订单提交成功，请尽快付款！</span>
                        <span>订单号：{{order.code}}</span>
                    </div>
                    <div class="pay_tip">下单后，请在24小时内完成支付。若未及时付款，系统自动取消订单，需重新下单购买。</div>
                </div>
                <div class="pay_right">
                    应付金额 : 
                    <span class="num big_num">{{order.orderPayment.split('.')[0]}}</span>
                    <span class="num small_num">.{{order.orderPayment.split('.')[1]}}</span> 元
                </div>
            </div>
            <div class="pay_bottom">
                <div class="bottom_title">常用支付方式 :</div>
                <div class="pay_ment">
                    <div class="ment_left">
                        <input type="radio" name="ment" value="0" v-model='payType'>
                        <img src="../../assets/images/personal/alipay.png" alt="">
                    </div>
                    <div class="ment_left">
                        <input type="radio" name="ment" value="1" v-model='payType'>
                        <img src="../../assets/images/personal/wechat.png" alt="">
                    </div>
                    <div class="ment_left">
                        <input type="radio" name="ment" value="3" v-model='payType'>
                        <img src="../../assets/images/personal/balance.png" alt="">
                    </div>
                </div>
                <div class="immediate_pay" @click="payment">立即支付</div>
            </div>
        </div>
        <Footer></Footer>
        <el-dialog
            title="系统提示消息"
            :visible.sync="dialogVisible"
            width="420px"
            :before-close="handleClose">
            <div class="pay_tip">
                <p>请您在新打开的支付平台页面进行支付</p>
                <p>支付完成前请不要关闭该窗口</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" size="small" @click="dialogVisible = true">已支付完成</el-button>
                <el-button type="primary" size="small" @click="dialogVisible = true">支付遇到问题</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import '@static/css/personal/pay.less'       
import Footer from '@/components/Footer.vue' 
import Header from '@/components/Header.vue'
import { detailsOrderAPI , payOrderAPI ,testOrderAPI } from '@/api/order/pay'
import { uploadUrl } from '@/utils/global'
export default {
    name: 'pay',//立即支付页面
    data(){
        return {
            dialogVisible:false,//已完成支付弹框
            id:"",
            payType:'0',
            order:{
                orderCode:"",
                orderPayment:""
            }

        }
    },
    components:{
        Footer,
        Header
    },
    mounted(){
        this.id=this.$route.query.id;
        this.getOrderDetile(this.id)
        console.log(this.id,"获取参数")
    },
    methods:{
        getOrderDetile(id){
            detailsOrderAPI(id).then(res=>{
                if(res.data.code==0){
                    console.log(res.data.data,"订单获取参数")
                    this.order.code=res.data.data.code
                    this.order.orderPayment=res.data.data.payment.toFixed(2)                
                }else if(res.data.code<0){
                    this.$message('请求失败');
                }
                //console.log(res,"获取订单信息")
            })
        },
        payment(){//点击立即支付
            testOrderAPI({out_trade_no: this.order.code, payType: this.payType }).then(res => {
                if(res.data.code == 0){
                    if(res.data.data == true){
                        this.$message.success('支付成功'); 
                        this.$router.push({path:'/success',query:{id:this.$route.query.id}});
                    } else{
                        this.$message.success('支付失败'); 
                    }
                } else{
                    this.$message.error('数据加载失败');
                }
            })
            // let data={
            //         'orderCode':this.order.code,
            //         'payType':this.payType
            //     };
            // if(this.payType=="0"){//支付宝
            //     this.dialogVisible=true;
            //     this.payOder(data)
            // }else if (this.payType=='1'){//微信支付
            //     let id=this.id;
            //     this.$router.push({path: '/wechat',query:{id:id}})
            // }else if(this.payType=="3"){//余额支付
            //     payOrderAPI(data).then(res=>{
            //         if(res.data.code==0){ 
            //             this.$message.success('余额支付成功');                          
            //         }else if(res.data.code<0){
            //             this.$message.error('余额支付失败');
            //         }
            //     })
            // }


        },
        payOder(data){//支付接口
            //console.log(data,"支付参数")
            payOrderAPI(data).then(res=>{
                if(res.data.code==0){  
                    //console.log(res.data,"打开支付宝的链接 ")                
                    window.open(res.data.data.url)//打开支付宝的链接              
                }else if(res.data.code<0){
                    this.$message('请求支付失败');
                }
               // console.log(res,"支付数据")
            })
        },
        handleClose(){
            this.dialogVisible = false
        }
    }
}
</script>

<style lang="less">
.pay_content{
    .num{
        color: #f44b4a
    }
    .small_num{
        font-size: 22px !important;
    }
    
}
#pay_app .pay_tip{
    text-align: center;
    height: 50px !important;
    p{
        color: #333;
        line-height: 30px;
        font-size: 16px;
    }
}
#pay_app .pay_right{
    width: 218px !important;
}
#pay_app{
    .el-button--danger{
        background-color:#DB5D18 !important;
        border-color:#DB5D18 !important;
    }
    .el-dialog__footer{
        padding-bottom: 36px !important;
        text-align: center !important;
    }
}
</style>
