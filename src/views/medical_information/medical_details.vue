<template>
    <div class="sub_right" >
        <div class="medical_wrap_title">{{resourceForm.title}}</div>
        <div class="medical_wra_source">
            <span style="margin-right:20px">来源：《{{resourceForm.source}}》</span>分享:
            <div class="bdsharebuttonbox share_box"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣网"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
            </div>
        </div>
        <div class="medical_wra" v-html="resourceForm.content"></div>
        <div ref='share_wrap' class="hhhhh"></div>
    </div>
</template>

<script>
import "@static/css/medical_information/index.less"
import { medicalDetailsAPI } from '@/api/medical/medical'

export default {
    data () {
        return {
            resourceForm: {
                title: null,
                source: null,
                content: null
            },
        }
    },
    mounted () {
        window._bd_share_main ? window._bd_share_main.init() : this.setShare()
        this.details();
    },
    methods: {
        // 详情页
        details() {
            const id = this.$route.query.id;
            medicalDetailsAPI(id).then(res => {
                this.resourceForm = res.data.data;
            })
        },
        setShare(){
            window._bd_share_config={
                "common":{
                    "bdSnsKey":{},
                    "bdText":"",
                    "bdMini":"2",
                    "bdMiniList":false,
                    "bdPic":"",
                    "bdStyle":"0",
                    "bdSize":"16"
                },
                "share":{},
                // "selectShare":{
                //     "bdContainerClass":null,
                //     "bdSelectMiniList":["weixin","tsina","douban","qzone"]
                // }
            };
            //const $el = document.querySelector('#baiduShare')
            //console.log($el,"$elllllllll")
            //$el&&this.$refs.share_wrap.removeChild($el)
            const shareDome = document.createElement('script');
            shareDome.type = 'text/javascript';
            shareDome.src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5);
            //console.log(shareDome,"document.body")
            this.$refs.share_wrap.appendChild(shareDome);
        }
    },
}
</script>

<style>

</style>
