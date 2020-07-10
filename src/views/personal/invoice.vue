<template>
<div class="my_invoice_wrap">
    <div class="invoice_title"><span>我的发票</span></div>
    <div class="invoice_substance">
        <div class="invoice_tip">
            <span class="invoice_tipTitle">补开发票:</span>
            <p class="invoice_tipContent">增值税普通发票订单完成后1年内可补开发票，目前暂不支持换开发票，开发票时请仔细检查发票信息。</p>
        </div>
        <div class="invoice_info">
            <div class="invoice_infoTitle">
                <ul>
                    <li>商品信息</li>
                    <li>数量</li>
                    <li>发票类型</li>
                    <li>状态</li>
                    <li>操作</li>
                </ul>
            </div>
            <div class="invoice_infoContent" v-for="item in invoice" :key="item.index">
                <div class="info_con_title">
                    <span>{{item.createTime | invoiceDate}}&nbsp;&nbsp;&nbsp;&nbsp;订单编号:</span>
                    <span style="color:#333">{{item.code}}</span></div>
                <div class="info_con_content">
                    <div class="info_con_left">
                        <ul class="info_con_c1" v-for='list in item.infoList' :key="list.index">
                            <li class="my_invoice_cover">
                                <img :src="`${uploadUrl}file/?fileName=${list.cover}&isOnLine=true`" v-if="list.cover" alt="pic" @click="linkTo(list.type,list.goodsid)">
                                <img  src="@/assets/images/home/no-cover.jpg" v-else>
                            </li>
                            <li class="my_invoice_text">
                                <p class="name"  @click="linkTo(list.type,list.goodsid)">{{list.name}}</p>
                                <p class="num">{{list.num}}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="info_con_right">
                        <p>普通电子发票</p>
                        <p class="info_con_not" :class="{'info_con_make':item.invoiceStatus==1}">{{item.invoiceStatus | myInvoiceType}}</p>
                        <p v-if="item.invoiceStatus==1" @click="invoiceDetails(item.id)">发票详情</p>
                        <p v-else-if="item.invoiceStatus==0" class="my_invoice_btn">
                            <el-button type="warning" plain size="small" @click="invoiceOpen(item.id)">申请开票</el-button>
                        </p>
                    </div>
                </div>
            </div>
            <div class="noHave" v-if="invoice==0"><img src="@/assets/images/home/no-content.jpg" alt=""></div>
        </div>
    </div>
    <div class="pagination_box" v-if="invoice!=0">
        <pagination @change="pageChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
        <!-- <el-pagination  @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" layout="prev, pager, next, total, jumper" :total="total"></el-pagination> -->
    </div>
    <el-dialog title="修改发票信息" :visible.sync="dialogFormVisible" width="600px" @close="cancleBtn">
        <!-- 修改发票弹框 -->
        <!-- <invoice-open :invoiceId="Id" :isChangeFlageEdit="fleg" @cancleP='cancleBtn' @refresh="getInvoiceDate"></invoice-open> -->
        <div>
            <div class="my_form_wrap">
                <el-form ref="invoiceForm" :model="invoiceForm" :rules="rules" :validate-on-rule-change="false" :label-position="rightPos" label-width="100px">
                    <el-form-item label="电子发票:" prop="type">
                        <span class="invoice_type_tag">电子发票<span class="invoice_tag_good "><i class="el-icon-check"></i></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="发票抬头:" prop="invoiceType">
                        <el-radio-group v-model="invoiceForm.invoiceType">
                            <el-radio :label='0'>个人</el-radio>
                            <el-radio :label='1'>单位</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label=""  v-if="invoiceForm.invoiceType==0">
                        <el-input v-model="invoiceForm.invoiceTitle" placeholder="请填写姓名"></el-input>
                    </el-form-item>
                    <el-form-item label=""  v-if="invoiceForm.invoiceType==1" prop="invoiceTitle">
                        <el-input v-model="invoiceForm.invoiceTitle" placeholder="请填写单位名称"></el-input>
                    </el-form-item>
                    <el-form-item label="" v-if="invoiceForm.invoiceType==1"  prop="taxpayerIdentificationNumber">
                        <el-input v-model="invoiceForm.taxpayerIdentificationNumber" placeholder="纳税人识别号"></el-input>
                    </el-form-item>
                    <el-form-item label="发票内容:"  prop="invoiceContext">
                        <el-select v-model="invoiceForm.invoiceContext" placeholder="请选择">
                            <el-option label="图书" value="1"></el-option>
                            <el-option label="明细" value="2"></el-option>
                            <el-option label="资料" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号:"  prop="invoiceTel">
                        <el-input v-model="invoiceForm.invoiceTel"></el-input>
                    </el-form-item>
                    <el-form-item style="" class="my-button-bar">
                        <el-button type="primary" :loading="submitFleg" @click="onSubmit('invoiceForm')">保存</el-button>
                        <el-button class="cancle-btn" @click="cancleBtn">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="bottom_tip">
                <p>1. 电子发票为增值税普通发票，与纸质普通发票具备同等法律效力，可支持报销入账。 </p>
                <p>2. 实体商品收货后1天可进入【我的订单】-【订单详情】下方【发票信息】处点击下载；电子商品支付成功24小时后即可下载。
                </p>
                <p>3. 查看<a href="#" class='invoice_detils'>发票信息相关问题</a>说明了解更多</p>
            </div>
        </div>
    </el-dialog>
</div>
</template>

<script>
import '@static/css/personal/invoice.less'
import '@static/css/personal/invoice_open.less'
import "@static/css/common.less"
import { uploadUrl } from '@/utils/global'
import { invoiceGetAPI } from '@/api/personal/myInvoice'
import { invoiceBackAPI,invoiceSubmitAPI } from '@/api/personal/myInvoice'
//import invoiceOpen from "@/views/personal/invoice_open"
export default {
  name: 'invoice',
  data() {
      return {
          fleg:true,//是否点击弹框
          data:null,
          invoice:[],
          uploadUrl:uploadUrl,
          dialogFormVisible:false,//显示弹框
          Id:null,//申请开票,
          total: null,
          listQuery: {//分页
                pageNum: 1,
                pageSize: 15,
                name: '我的发票'
          },
          lastPage:0,
          submitFleg:false,
          rightPos:"right",
          invoiceForm: {
            id:'',
            invoiceContext:"1",//图书,明细，资料
            invoiceTel:"",
            invoiceTitle:"",//人、公司
            invoiceType: 0,//发票抬头
            taxpayerIdentificationNumber: ""//纳税人识别号

          },
          lastPage:0,
          rules: {
            invoiceTitle:[
                { required: true, message: '请输入名称',trigger: 'blur'},
                { min: 1, max: 20, message: '长度在 20 个字符以内',trigger: 'blur'}
            ],
            taxpayerIdentificationNumber: [
                { required: true, message: '请输入纳税人识别号',trigger: 'blur' }
            ],
            invoiceTel: [
                {required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' ,trigger: 'change'}
            ],
            invoiceContext: [
                { required: true, message: '请选择发票内容' ,trigger: 'change'}
            ],
            invoiceType: [
                { required: true, message: '请选择发票抬头' ,trigger: 'change'}
            ]
            }
      }
  },
  filters:{
      //2019-03-08 14:16:21===>2019-03-08
      invoiceDate(time){//发票创建时间
        return time.split(" ")[0]
      },
      myInvoiceType(typeNum){//发票状态
          switch(typeNum){
              case '1':
              return "已开票"
              break;
              case '0':
              return "未开票"
              break;
              default:
              return "没有此类型"
          }
          //console.log(typeNum,"typeNum")
          return typeNum
      }
  },
  mounted() {
        this.getInvoiceDate(this.listQuery)
  },
  methods: {
    //渲染列表方法
    getInvoiceDate(data){
        console.log("发票列表刷新")
        invoiceGetAPI(data).then(res => {
            let Vue=this;
            if(res.data.code==0){
                Vue.invoice=res.data.data.list;
                Vue.total = res.data.data.total;
                Vue.lastPage = Math.ceil(Number(res.data.data.total) / Number(Vue.listQuery.pageSize));
                //console.log(Vue.invoice,'Vue.invoice')
            }else if(res.data.code<0){
                this.$message('请求失败');
            }
        })
    },
    invoiceDetails(id) {//跳转发票详情
        this.$router.push({path:'invoiceDetails',query:{id:id}});
    },
    invoiceOpen(id){
        this.invoiceForm.id=id;
        this.dialogFormVisible = true;
    },
    // handleCurrentChange(val) {
    //     this.listQuery.pageNum = val;
    //     this.getInvoiceDate(this.listQuery);
    //     window.scrollTo(0, 0)
    // },
    // 分页
    pageChange(val) {
        console.log('切换page')
        this.listQuery.pageNum = val
        this.getInvoiceDate(this.listQuery);
        window.scrollTo(0, 0)
    },
    linkTo(type,id){
        if(type=="2-2"){//文章
            this.$router.push({
                name:"articleread",
                path:"/articleread",
                query:{
                    id:id,
                }
            });
        }else if(type="2-1"){//图书
            this.$router.push({
                name:"medetails",
                path:"/medetails",
                query:{
                    id:id,
                }
            });
        }
        //console.log(88888888888888888)
    },
    cancleBtn(){
        //this.$emit('cancleP',false);
        this.invoiceForm= {
            id:'',
            invoiceContext:"1",//图书,明细，资料
            invoiceTel:"",
            invoiceTitle:"",//人、公司
            invoiceType: 0,//发票抬头
            taxpayerIdentificationNumber: ""//纳税人识别号
        };
        this.$refs.invoiceForm.clearValidate(); //移除校验结果
        this.dialogFormVisible=false;
    },
    onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) { 
             this.submitFleg=true;          
             this.invoiceSubmit(this.invoiceForm);
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
        //console.log('submit!');
    },
    invoiceBack(data){//获取回显数据
        let Vue=this;
        invoiceBackAPI(data).then(res => {
            if(res.data.code==0){
                let result=res.data.data;
                Object.keys(this.invoiceForm).forEach((key)=>{
                    Vue.invoiceForm[key]=result[key];
                    //console.log(result,'key')
                });
                this.invoiceForm.id=result.orderId;
            }else if(res.data.code<0){
                this.$message('请求失败');
            }
        })
    },
    invoiceSubmit(data){//提交发票修改
        invoiceSubmitAPI(data).then(res=>{
            if(res.data.code >0) {
                this.$message.warning(res.data.msg)
            } else if (res.data.code <0) {
                this.$message.error('修改失败，请稍后再试')
            } else if(res.data.code == 0){
                this.$message.success('申请成功');
                this.getInvoiceDate();
                this.cancleBtn()//关闭弹框
                //需要返回token
                //Cookies.set('X-Token',res.data.data.token)
            }
            this.submitFleg=true;
        });
    }
  }

}
</script>

<style lang="less">
//nfo_con_make
//info_con_not
.my_invoice_wrap{
//   margin-bottom: 20px;
    .noHave{
        text-align: center;
    }
    .el-dialog__header{
        background-color: #F4F4F4 !important;
        padding-top:12px;
        padding-bottom: 12px;
    }
    .el-dialog__title{
        color: #454545;
        font-size: 14px;
        font-weight: bold;
    }
    .my_invoice_cover{
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        margin-right:20px;
        cursor: pointer;
        img{
            max-width: 100px;
            max-height: 100px
        }
    }
    .info_con_c1{
        display:flex;
    }
    .my_invoice_text{
        flex:1;
        height: 100px;
        display: flex;
        p{
            height: 100px;
            line-height: 100px;
        }
        .name{
           flex:1;
           cursor: pointer;
        }
        .num{
            width: 160px;
            text-align: center;
        }
    }
    p.info_con_make{
        color: #03B19F !important;
    }
    .my_invoice_btn{
        .el-button--warning.is-plain{
                color: #F4494A;
                background: transparent;
                border-color: #F4494A;
        }
    }
}
</style>
