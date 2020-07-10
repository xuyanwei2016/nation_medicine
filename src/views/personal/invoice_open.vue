<template>
<div>
    <div class="my_form_wrap">
        <el-form ref="invoiceForm" :model="invoiceForm" :rules="rules" :validate-on-rule-change="false" :label-position="rightPos" label-width="100px">
            <el-form-item label="电子发票:" prop="type">
                <span class="invoice_type_tag">电子发票<span class="invoice_tag_good "><i class="el-icon-check"></i></span>
                </span>
            </el-form-item>
            <el-form-item label="发票抬头:" prop="invoiceType">
                <el-radio-group v-model="invoiceForm.invoiceType">
                    <el-radio label="0">个人</el-radio>
                    <el-radio label="1">单位</el-radio>
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
</template>

<script>
import '@static/css/personal/invoice_open.less'
//import { uploadUrl } from '@/utils/global'
import { invoiceBackAPI,invoiceSubmitAPI } from '@/api/personal/myInvoice'
export default {
  name: 'invoiceOpen',
  props:['invoiceId','isChangeFlageEdit'],
  data() {
      return {
        dialogFormVisible:false,
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
  watch: {
    invoiceId: {
        deep: true,
        handler () { // 监听invoiceBack变化
            this.data={
                'id':this.invoiceId
            };
            this.invoiceBack(this.data);//发票回显
            
        }
    },
    isChangeFlageEdit:{
        deep: true,
        handler (){
            console.log('kkkkkkkkkkkk')
            this.invoiceForm= {
                id:'',
                invoiceContext:"1",//图书,明细，资料
                invoiceTel:"",
                invoiceTitle:"",//人、公司
                invoiceType: 0,//发票抬头
                taxpayerIdentificationNumber: ""//纳税人识别号
            };
            this.$refs.invoiceForm.clearValidate(); //移除校验结果
            this.data={
                'id':this.invoiceId
            };
            this.invoiceBack(this.data);//发票回显
        }
    }
},
  mounted() {
    //console.log(this.isChangeFlageEdit,"this.isChangeFlageEdit")
    this.dialogFormVisible = this.isChangeFlageEdit;//修改开关
    this.data={
        'id':this.invoiceId
    };
    this.invoiceBack(this.data);
  },
  created() {
  },
  methods: {
    cancleBtn(){
        this.$emit('cancleP',false);
        this.invoiceForm= {
            id:'',
            invoiceContext:"1",//图书,明细，资料
            invoiceTel:"",
            invoiceTitle:"",//人、公司
            invoiceType: 0,//发票抬头
            taxpayerIdentificationNumber: ""//纳税人识别号
        };
        this.$refs.invoiceForm.clearValidate(); //移除校验结果
    },
    onSubmit(formName) {
        let Vue=this;
        this.$refs[formName].validate((valid) => {
          if (valid) { 
             this.submitFleg=true;          
             Vue.invoiceSubmit(Vue.invoiceForm);
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
                //console.log(result,"r6666666")
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
    //console.log("bbbbbbbbbb",data)
        invoiceSubmitAPI(data).then(res=>{
            if(res.data.code >0) {
                this.$message.warning(res.data.msg)
            } else if (res.data.code <0) {
                this.$message.error('修改失败，请稍后再试')
            } else if(res.data.code == 0){
                this.$message.success('申请成功');
                this.$emit("refresh")
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
    .my_invoice_cover{
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        margin-right:0px;
        img{
            max-width: 100px;
            max-height: 100px
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
</style>
