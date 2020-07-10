<template>
  <div id="confirm">
    <Header></Header>
    <div class="confirm_content">
      <div class="confirm_top">
        <div class="confirm_text">填写并核对订单信息</div>
        <div class="confirm_img">
          <img src="@/assets/images/personal-center/confirm-order.png">
          <span>我的购物车</span>
          <span>填写订单</span>
          <span class="not_confirm">完成订单</span>
        </div>
      </div>
      <div class="confirm_table">
        <span class="confirm_info">商品信息</span>
        <span class="confirm_price">单价（元）</span>
        <span class="confirm_num">数量</span>
        <span class="confirm_total">小计</span>
      </div>
      <div class="confirm_ebook" v-for="(item,index) in list" :key="index">
        <div class="confirm_title">{{item.goodsTypeName}}</div>
        <div class="confirm_list" v-for="(info,index2) in item.shoppingCartInfoVos" :key="index2">
          <div class="confirm_image" @click="listDetails(info.goodsId,info.goodsType)" v-if='info.cover'>
            <img :src="`${uploadUrl}file/?fileName=${info.cover}&isOnLine=true`"  :onerror="errorImg(detail)">
          </div>
          <div class="confirm_name" @click="listDetails(info.goodsId,info.goodsType)">{{info.name}}</div>
          <div class="confirm_money">
            <span>￥{{info.salePrice}}</span>
            <span class="line_price" v-if="info.price">￥{{info.price}}</span>
          </div>
          <div class="confirm_number">{{info.num}}</div>
          <div class="confirm_total">￥{{info.salePrice}}</div>
        </div>
      </div>
      <div class="confirm_invoice">
        <div class="confirm_invoice_title">发票信息：</div>
        <div class="confirm_invoice_text">
          <el-checkbox v-model="invioce" style="margin-right:10px" @change="invoiceChange(invioce)"></el-checkbox>
          需要开发票
        </div>
        <div class="confirm_invoice_info" v-if="invioce == true">
          <span v-if="isEdit == true">{{typeList[dataForm.invoiceContext-1]}}</span>
          <span v-if="isEdit == true">{{dataForm.title}}</span>
          <span v-if="isEdit == true">{{titleName[dataForm.invoiceType]}}</span>
          <span v-if="isEdit == true">{{dataForm.taxpayerIdentificationNumber}}</span>
          <span @click="editInvoice()">编辑</span>
        </div>
      </div>
      <div class="confirm_order">
        <div class="confirm_goods"><div class="confirm_outside">共{{num}}件商品，商品总金额：<span>￥{{totalPrice}}</span></div></div>
        <div class="confirm_goods"><div class="confirm_outside">商品优惠：<span>￥{{saveMoney}}</span></div></div>
        <div class="confirm_goods confirm_payment"><div class="confirm_outside">应付总额：<span>￥{{paymentMoney}}</span></div></div>
        <div class="confirm_bottom">
          <div class="confirm_bottom_btn" @click="submitOrder()">提交订单</div>
          <router-link :to="{path:'/shoppingCart',query:{ids:ids}}">
            <div class="confirm_bottom_tips">返回购物车修改</div>
          </router-link>
        </div>
      </div>

      <el-dialog :title="invioceTitle" :visible.sync="dialogFormVisible" width="600px">
         <invoice-open @change-data="receiveDate" @change-cancel="dialogFormVisible = false"></invoice-open>
      </el-dialog>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import "@static/css/shopping/confirm-order.less";
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import invoiceOpen from "@/views/shopping/invoice"
import { shoppingAPI, createOrderAPI } from '@/api/order/shopping'
import { uploadUrl } from '@/utils/global';
import {ebookDetailAPI,articleDetailAPI} from '../../api/comment/comments';

export default {
  name: 'confirmOrder',
  data(){
    return {
      ids: this.$route.query.id,
      invioce: false,
      dialogFormVisible: false,
      list: [],
      uploadUrl: uploadUrl,
      num: 0,
      totalPrice: 0,
      saveMoney: 0,
      dataForm: {
        invoiceContext:"1",//图书,明细,资料
        invoiceTel:"",
        title:"",//人、公司
        invoiceType: 0,//发票抬头
        taxpayerIdentificationNumber: ""//纳税人识别号
      },
      invioceTitle: '发票信息',
      paymentMoney: 0,
      needInvoice: 0,
      typeList:['图书','明细','资料'],
      titleName:['个人','公司'],
      isEdit:false,
    }
  },
  created(){
    this.list=[{
      goodsTypeName:'',
      shoppingCartInfoVos:[
        {
          id:'',
          goodsId:'',
          cover:'',
          name:'',
          salePrice:'',
          price:'',
          num:0,
        }
      ]
    }
    ];
    if(this.$route.query.type=="医著"){
      ebookDetailAPI({
        id: this.$route.query.id,
      }).then(res => {

        this.list[0].goodsTypeName='电子书';
        this.$set(this.list[0].shoppingCartInfoVos[0],'id',res.data.data.id);
        this.$set(this.list[0].shoppingCartInfoVos[0],'goodsId',res.data.data.id);
        this.$set(this.list[0].shoppingCartInfoVos[0],'cover',res.data.data.bookCover);
        this.$set(this.list[0].shoppingCartInfoVos[0],'name',res.data.data.name);
        this.$set(this.list[0].shoppingCartInfoVos[0],'price',res.data.data.pricing);
        this.$set(this.list[0].shoppingCartInfoVos[0],'salePrice',res.data.data.price);
        this.$set(this.list[0].shoppingCartInfoVos[0],'goodsType',res.data.data.goodsType);
        this.$set(this.list[0].shoppingCartInfoVos[0],'num',1);
        this.num=1;
        this.getNum()
      })

    }else if(this.$route.query.type=="文章"){
      articleDetailAPI({
        id: this.$route.query.id
      }).then(res => {
        console.log("!!!!!!!!!!!",res.data.data)
        this.list[0].goodsTypeName='文章';
        this.$set(this.list[0].shoppingCartInfoVos[0],'id',res.data.data.id);
        this.$set(this.list[0].shoppingCartInfoVos[0],'name',res.data.data.title);
        this.$set(this.list[0].shoppingCartInfoVos[0],'goodsId',res.data.data.id);
        this.$set(this.list[0].shoppingCartInfoVos[0],'cover',res.data.data.img);
        this.$set(this.list[0].shoppingCartInfoVos[0],'price',res.data.data.price);
        this.$set(this.list[0].shoppingCartInfoVos[0],'salePrice',res.data.data.realPrice);
        this.$set(this.list[0].shoppingCartInfoVos[0],'goodsType',res.data.data.goodsType);
        this.$set(this.list[0].shoppingCartInfoVos[0],'num',1);
        this.num=1;
        this.getNum()
      })

    }else{
      this.getList();
    }
  },
  components:{
    Header,
    Footer,
    invoiceOpen
  },
  methods:{
    getList() {
      shoppingAPI(this.ids).then(res => {
        if(res.data.code >0) {
          this.$message.warning(res.data.msg)
        } else if (res.data.code <0) {
          this.$message.error('数据加载失败，请稍后再试')
        } else if(res.data.code == 0){
          this.list = res.data.data.shoppingCartTypeVos
          this.getNum()
        }
      })
    },
    getNum() {//获取总额-总num
      this.num = 0;
      this.totalPrice = 0;
      this.saveMoney = 0;
      this.paymentMoney = 0;
      this.list.map(el => {
        el.shoppingCartInfoVos.map(infoList => {
          this.num = this.num + 1
          this.totalPrice = this.totalPrice + infoList.price
          this.saveMoney = this.saveMoney + (infoList.price-infoList.salePrice)
          this.paymentMoney = this.paymentMoney + infoList.salePrice
        })
      })
    },
    invoiceChange(invioceType) {//更换发票方式
      if(invioceType) {//开发票
        this.dialogFormVisible = true;
        this.needInvoice = 1
      } else{
        this.needInvoice = 0
      }
    },
    editInvoice() {//编辑发票
      this.invioceTitle = '修改发票信息'
      this.dialogFormVisible = true;
    },
    receiveDate(val) {//获取数据
      this.isEdit = true
      this.dialogFormVisible = false;
      let { invoiceTitle: title, ...valData } = val
      this.dataForm =  {title, ...valData}
    },
    submitOrder() {//提交订单
      if(!this.$route.query.type){
        let goodsList = [];
        this.list.map(el => {
          el.shoppingCartInfoVos.map(info =>{
            goodsList.push({
              goodsId:info.goodsId,
              goodsType:info.goodsType,
              num:info.num,
              salePrice:info.salePrice,
            })
          })
        })
        let data = {
          buyType: 3, //购买类型 1.立即购买 2.再次购买 3.购物车 4.组合购买
          express: 0, //(number, optional): 邮费 必传，如果没有邮费传值0
          goodsList: goodsList,
          invoiceForm: this.dataForm,
          shoppingCartIds: this.ids, // (Array[integer], optional): 购物车id
          needInvoice: this.needInvoice
          //orderId (integer, optional): (再次购买)订单id
          //remark (string, optional): 备注
        };
        createOrderAPI(data).then(res =>{
          if(res.data.code >0) {
            this.$message.warning(res.data.msg)
          } else if (res.data.code <0) {
            this.$message.error('订单提交失败，请稍后再试')
          } else if(res.data.code == 0){
            this.$message.success('提交成功')
            console.log(22222)
            this.$router.push({path:'/pay',query:{id:res.data.data}});
          }
        })
      }else{
        this.immeBuy();
      }

    },
    immeBuy(){
      let goodsList = [];
      goodsList.push({
        goodsId:this.list[0].shoppingCartInfoVos[0].goodsId,
        goodsType:this.list[0].shoppingCartInfoVos[0].goodsType,
        num:1,
        salePrice:this.list[0].shoppingCartInfoVos[0].salePrice,
      })
      let data = {
        buyType: 1, //购买类型 1.立即购买 2.再次购买 3.购物车 4.组合购买
        express: 0, //(number, optional): 邮费 必传，如果没有邮费传值0
        goodsList: goodsList,
        invoiceForm: this.dataForm,
        needInvoice: this.needInvoice
        /*shoppingCartIds: this.ids*/// (Array[integer], optional): 购物车id
        //orderId (integer, optional): (再次购买)订单id
        //remark (string, optional): 备注
      };
      createOrderAPI(data).then(res =>{
        if(res.data.code >0) {
          this.$message.warning(res.data.msg)
        } else if (res.data.code <0) {
          this.$message.error('订单提交失败，请稍后再试')
        } else if(res.data.code == 0){
          this.$message.success('提交成功')
          this.$router.push({path:'/pay',query:{id:res.data.data}});
        }
      })
    },
    listDetails(id,type) {//跳转商品详情
      if(type == '2-1'){//电子书
        this.$router.push({path:'/medetails',query:{id:id}});
      } else if(type == '2-2'){//文章
        this.$router.push({path:'/articleread',query:{id:id}});
      }
    },
  }
}
</script>
