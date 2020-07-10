<template>
    <div id="recharge_app">
        <Header></Header>
        <div class="recharge_content">
            <navbar></navbar>
            <div class="recharge_main">
                <div class="recharge_title">我的可用余额: <span>{{balance}}</span>元 </div>
                <div class="recharge_way">
                    <div class="way_tip">选择充值方式：</div>
                    <div class="way_alipay">
                        <input type="radio" name="recharge" value="0" v-model='payType'>
                        <img src="@/assets/images/personal/alipay.png">
                    </div>
                    <div class="way_alipay">
                        <input type="radio" name="recharge" value="1" v-model='payType'>
                        <img src="@/assets/images/personal/wechat.png">
                    </div>
                </div>
                <div class="recharge_money">
                    <div class="money_tip">选择充值金额：</div>
                    <div class="money_sellping" :class="{pay_active:price==list.trulyprice}" v-for="list in payNum" :key="list.index" @click="selectPaynum(list.trulyprice)">
                        <div class="sell_money">{{list.price}}<span>元</span></div>
                        <div class="sell_price">售价：￥{{list.trulyprice|fiexdFn}}</div>
                    </div>
                </div>
                <div class="recharge" @click="createTopup">充值</div>
                <div class="recharge_bot">
                    <div class="bot_tip">使用说明</div>
                    <div class="bot_tip1">1.充值金额仅用于购买资源使用。</div>
                    <div class="bot_tip1">2.充值金额没有使用期限，会一直保存在你的账户内，可以随时使用。</div>
                    <div class="bot_tip1">3.充值金额不能退回，不能提现。</div>
                    <div class="bot_tip1">4.充值到账时间可能有延迟。如果交易一小时仍未到账，请记录您的用户名和手机号致平台客服电话010-1234567咨询</div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import '@static/css/personal/recharge.less'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import navbar from '@/components/navbar.vue'
import { createTopupAPI,getBalanceAPI } from "@/api/personal/myAccount";
export default {
    name: 'recharge',
    data(){
        return {
            payType:'0',//支付方式，默认支付宝
            price:0,
            payNum:[
                {"price":5,"trulyprice":5.00},
                {"price":10,"trulyprice":10.00},
                {"price":30,"trulyprice":29.94},
                {"price":50,"trulyprice":49.90},
                {"price":100,"trulyprice":99.80}
            ],
          balance:0,
        }
    },
    filters:{
        fiexdFn(num){
            return num.toFixed(2)
        }
    },
    created(){
        this.getBalance()
    },
    methods: {
      /*获取账户余额*/
      getBalance(){
        getBalanceAPI().then(res=>{
          this.balance=res.data.data;
          console.log("账户余额",res.data)
        })
      },
        selectPaynum(payNum){
            this.price=payNum;
        },
        createTopup(){
            if(this.payType==""||this.payType==null||this.payType==undefined||this.price==""||this.price==null||this.price==undefined){
                this.$message.warning("请选择支付方式或支付金额");
                return;
            }
            let data={
                'payType':this.payType,
                'price':this.price
            };
            createTopupAPI(data).then(res=>{//点击充值
            //console.log(data,"999999999999999999")
                if(this.payType=="0" && res.data.code == 0){//支付宝
                    //window.open(res.data.data.url)//打开支付宝的链接 
                }else if(this.payType=="1" && res.data.code == 0){//微信内部跳转
                    //this.$router.push({path: '/wechat',query:{id:id}})
                }
            })
        }
    },
    components:{
        Footer,
        Header,
        navbar
    },
}
</script>

<style lang="less">
.pay_active{
    border-color: #7aaefc !important;
    .sell_money,.sell_price{
        color: #7aaefc;
    }
}
.recharge_content .el-tabs__nav-wrap::after{
    border-color: transparent !important;
}
.recharge_content .el-tabs__active-bar{
    background-color: transparent !important;
}
</style>
