<template>
<div>
    <div class="invoice_detailsTitle"><span>发票信息</span></div>
    <div class="invoice_details" style="min-height:828px">
        <ul v-for="item in invoiceDetails" :key="item.index" style="margin-bottom:10px">
            <li>订单号:<span>{{item.orderCode}}</span></li>
            <li>发票类型：<span>电子发票</span></li>
            <li>发票内容：<span>{{item.invoiceContext}}</span></li>
            <li>发票抬头：<span>{{item.invoiceTitle}}</span></li>
            <li>纳税人识别号：<span>{{item.taxpayerIdentificationNumber}}</span></li>
            <li>发票代码：<span>{{item.invoiceCode}}</span></li>
            <li>发票号码：<span>{{item.invoiceNumber}}</span></li>
            <li><a href="javascript:void(0)" @click="downloadInvoice(item.invoiceUrl)">下载普通电子发票</a></li>
        </ul>
        <!-- <ul>
            <li>订单号:<span>AM2018110809325816</span></li>
            <li>发票类型：<span>电子发票</span></li>
            <li>发票内容：<span>图书</span></li>
            <li>发票抬头：<span>北京博彦科技技术有限公司</span></li>
            <li>纳税人识别号：<span>1232454778SGHTUM</span></li>
            <li>发票代码：<span>1234567CFSFNS</span></li>
            <li>发票号码：<span>5668889</span></li>
            <li><a href="#">下载普通电子发票</a></li>
        </ul> -->
    </div>
</div>
</template>

<script>
import '@static/css/personal/invoice-details.less'
import PersonLeft from '@/components/PersonLeft.vue'           
import Footer from '@/components/Footer.vue'       
import { invoiceGetDetailsAPI } from '@/api/personal/myInvoice'
export default {
    name: 'details',
    data(){
        return{
            singleId:null,
            invoiceDetails:null
        }
    },
    mounted() {
        this.getId();
        this.getInvoiceDetailsDate(this.singleId);//获取发票详情
        //console.log(this.singleId,"getId()")
    },
    methods: {
        getId(){//获取id
            this.singleId=this.$route.query.id;
        },
        //渲染列表方法
        getInvoiceDetailsDate(id){
            invoiceGetDetailsAPI(id).then(res => {
                 console.log(res,'res.data')
                if(res.data.code==0){
                    this.invoiceDetails=res.data.data;
                    //Vue.invoice.map(function(item,index,arr){
                        //Vue.allId.push(Vue.comment[index]['id']);
                // })
                    console.log(this.invoiceDetails,'res.data.code<0')
                }else if(res.data.code<0){
                    this.$message('请求失败');
                }
            })
        },
        //下载发票pdf
        downloadInvoice(invoiceUrl){
            //console.log(window,"jjjjjj")
            window.open(invoiceUrl)
        }
    },
    components:{
        PersonLeft,
        Footer
    }
}
</script>
