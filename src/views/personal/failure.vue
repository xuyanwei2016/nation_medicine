<template>
    <div id="wechat_app">
        <div class="wechat_content">
            <div class="wechat_top">
                <div class="wechat_left">
                    <div class="wechat_title">
                        <span>订单提交成功，请尽快付款！</span>
                        <span>订单号：AM20181112174528</span>
                    </div>
                    <div class="wechat_tip">下单后，请在24小时内完成支付。若未及时付款，系统自动取消订单，需重新下单购买。</div>
                </div>
                <div class="wechat_right">
                    应付金额 : <span>95.40</span> 元
                </div>
                
            </div>
            <div class="wechat">
                <div class="wechat_pay">
                    <img src="@/assets/images/personal/微信支付.png">
                    <span>微信支付</span>
                </div>
                <div class="wechat_other">
                    <img src="@/assets/images/personal/切换其他支付方式.png">
                    <span>切换其他支付方式</span>
                </div>
            </div>
            <div class="wechat_bottom">
                <div class="bottom_left">
                    <div class="bottom_img"><img src="@/assets/images/personal/二维码.png"></div>
                    <div class="bottom_search">
                        <div class="wechatsearch_left"><img src="@/assets/images/personal/扫码.png"></div>
                        <div class="wechatsearch_right">请使用微信扫一扫，扫描二维码支付</div>
                    </div>
                    <div class="search_shade">
                        <div class="search_failure">
                            <div class="bottom_wechat">二维码已失效</div>
                            <div class="bottom_refresh">请点击刷新</div>
                        </div>
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
import '@static/css/personal/failure.less'      
import Footer from '@/components/Footer.vue' 

export default {
    name: 'wechat',
    components:{
        Footer
    }
}
</script>

